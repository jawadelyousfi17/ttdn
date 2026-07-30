import "server-only";

import { headers } from "next/headers";

import { ui } from "@/lib/content";
import { normalizeTikTokUrl } from "@/lib/tiktok";
import { checkRateLimit } from "@/services/rate-limit";
import { TikTokFetchError, fetchTikTok } from "@/services/tiktok";
import type { DownloadResult } from "@/types/tiktok";

/**
 * Per-IP cap on the server-rendered lookup path. This is the route that spends
 * metered RapidAPI credit, so it is the one worth guarding. Fifteen a minute is
 * far more than a person pastes by hand and far less than a scraper wants.
 */
const FETCH_LIMIT = 15;
const FETCH_WINDOW_MS = 60_000;

/**
 * Synchronous URL check. Pages call this during render to decide whether to
 * suspend on a lookup or to show "not a TikTok link" right away — a malformed
 * URL should never cost an upstream request.
 *
 * It returns the normalized URL rather than a boolean so the caller can feed
 * the cleaned-up value back into the input and the user sees exactly what we
 * used.
 */
export function normalizeForRender(rawUrl: string | null | undefined): {
  normalized: string | null;
  formError: string | null;
} {
  if (!rawUrl) return { normalized: null, formError: null };
  const normalized = normalizeTikTokUrl(rawUrl);
  if (!normalized) {
    return { normalized: null, formError: ui.form.errorInvalid };
  }
  return { normalized, formError: null };
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const candidate =
    h.get("x-vercel-forwarded-for") ??
    h.get("x-forwarded-for") ??
    h.get("x-real-ip") ??
    "anonymous";
  return candidate.split(",")[0]?.trim() || "anonymous";
}

export interface FetchOutcome {
  result: DownloadResult | null;
  errorMessage: string | null;
}

/**
 * Run the upstream lookup. Called from inside a Suspense boundary so the page
 * shell — header, hero, form, marketing sections, FAQ — flushes immediately and
 * only the result chunk waits on the network.
 *
 * The URL must already be normalized by `normalizeForRender`. This never
 * throws; a failure comes back as a message the result area can render.
 */
export async function fetchForRender(normalizedUrl: string): Promise<FetchOutcome> {
  const decision = checkRateLimit(
    `fetch:${await clientIp()}`,
    FETCH_LIMIT,
    FETCH_WINDOW_MS,
  );
  if (!decision.allowed) {
    return { result: null, errorMessage: ui.form.errorRateLimit };
  }

  try {
    const result = await fetchTikTok(normalizedUrl);
    return { result, errorMessage: null };
  } catch (err) {
    if (err instanceof TikTokFetchError) {
      switch (err.code) {
        case "not-found":
          return { result: null, errorMessage: ui.form.errorFetch };
        case "rate-limited":
          return { result: null, errorMessage: ui.form.errorRateLimit };
        default:
          return { result: null, errorMessage: ui.form.errorServer };
      }
    }
    return { result: null, errorMessage: ui.form.errorServer };
  }
}
