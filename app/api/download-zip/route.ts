import archiver from "archiver";
import { Readable } from "node:stream";

import { extensionFromContentType, extensionFromUrl, isAllowedMediaHost } from "@/lib/media";
import { isSameOriginRequest } from "@/services/origin";
import { checkRateLimit, clientKey, rateLimitHeaders } from "@/services/rate-limit";

/**
 * `archiver` is built on Node streams, so this route needs the Node.js
 * runtime — it will not run on Edge.
 */
export const runtime = "nodejs";

/** Ceiling on files per archive, so one request cannot balloon memory. */
const MAX_FILES = 60;

/**
 * The tightest limit of the two routes: each request fans out into dozens of
 * upstream fetches and builds a multi-megabyte archive. Five a minute still
 * covers a retry plus several carousels in one sitting.
 */
const ZIP_LIMIT = 5;
const ZIP_WINDOW_MS = 60_000;

function dispositionHeader(filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  const utf8 = encodeURIComponent(filename);
  return `attachment; filename="${ascii}"; filename*=UTF-8''${utf8}`;
}

interface ZipRequest {
  filename?: string;
  urls?: unknown;
}

/**
 * Bundle a carousel's images into one ZIP and stream it back as an attachment.
 * Doing it server-side turns forty browser downloads — which browsers throttle
 * and interrupt with permission prompts — into a single clean save.
 *
 * The host allowlist is the anti-abuse boundary: a caller cannot smuggle
 * arbitrary URLs through this endpoint.
 */
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const decision = checkRateLimit(`zip:${clientKey(request)}`, ZIP_LIMIT, ZIP_WINDOW_MS);
  if (!decision.allowed) {
    return new Response("Too many requests", {
      status: 429,
      headers: rateLimitHeaders(decision),
    });
  }

  let body: ZipRequest;
  try {
    body = (await request.json()) as ZipRequest;
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  if (!Array.isArray(body.urls) || body.urls.length === 0) {
    return new Response("Missing urls", { status: 400 });
  }

  const photoUrls = (body.urls as unknown[])
    .filter((u): u is string => typeof u === "string" && u.length > 0)
    .slice(0, MAX_FILES);

  for (const candidate of photoUrls) {
    let parsed: URL;
    try {
      parsed = new URL(candidate);
    } catch {
      return new Response("Bad URL in list", { status: 400 });
    }
    if (!isAllowedMediaHost(parsed.hostname)) {
      return new Response("Host not allowed", { status: 400 });
    }
  }

  const archive = archiver("zip", { zlib: { level: 6 } });
  // Log rather than abort on per-file trouble: if one image URL has expired we
  // would still rather deliver the other thirty-nine.
  archive.on("warning", (err) => console.warn("zip warning", err));
  archive.on("error", (err) => console.error("zip error", err));

  // Kick the fetches off in parallel, then feed the bodies into the archive one
  // at a time — archiver expects sequential appends when the entries are
  // themselves streams.
  (async () => {
    try {
      const fetched = await Promise.all(
        photoUrls.map(async (url, i) => {
          try {
            const r = await fetch(url, {
              headers: { Referer: "https://www.tiktok.com/" },
              cache: "no-store",
            });
            if (!r.ok || !r.body) return null;
            // Carousel images come back as JPEG on some posts and WebP on
            // others, so the entry name follows the response rather than a
            // hard-coded ".jpg" that would mislabel half the archives.
            const extension =
              extensionFromContentType(r.headers.get("content-type")) ??
              extensionFromUrl(url, "jpg");
            return { index: i, body: r.body, extension };
          } catch {
            return null;
          }
        }),
      );
      for (const item of fetched) {
        if (!item) continue;
        // Zero-padded so a plain name sort reproduces the original order.
        const name = `photo-${String(item.index + 1).padStart(2, "0")}.${item.extension}`;
        // Web ReadableStream<Uint8Array<ArrayBuffer>> against Node's expected
        // ReadableStream<any>: identical at runtime, the generic just tightened
        // in @types/node. The cast keeps the compiler quiet without changing
        // behavior.
        archive.append(
          Readable.fromWeb(item.body as unknown as Parameters<typeof Readable.fromWeb>[0]),
          { name },
        );
      }
    } finally {
      archive.finalize();
    }
  })();

  const zipFilename = (body.filename ?? "tiktok-photos") + ".zip";
  const stream = Readable.toWeb(archive) as unknown as ReadableStream<Uint8Array>;

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": dispositionHeader(zipFilename),
      "Cache-Control": "private, no-store",
      ...rateLimitHeaders(decision),
    },
  });
}
