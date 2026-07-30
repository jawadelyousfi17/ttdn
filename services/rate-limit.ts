import "server-only";

import { LruTtlCache, getOrCreateCache } from "@/services/cache";

interface Bucket {
  count: number;
  /** Unix ms at which this bucket expires and the count resets. */
  resetAt: number;
}

/**
 * Shared bucket store, reused across routes through getOrCreateCache so dev
 * HMR and warm serverless containers both see one instance.
 *
 * The cache TTL is deliberately loose (10 minutes) — the rate-limit logic
 * below is the real source of truth for whether a window is still open. The
 * TTL only exists so abandoned IP keys get swept out of long-lived processes.
 */
const buckets = getOrCreateCache<Bucket>(
  "__ttdnRateLimitBuckets",
  () => new LruTtlCache<Bucket>(10_000, 10 * 60 * 1000),
);

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Unix ms at which the current window ends. */
  resetAt: number;
  /** Seconds to wait before retrying. Only set when the request was blocked. */
  retryAfterSeconds?: number;
}

/**
 * Fixed-window limiter: each (key, window) pair gets `limit` requests before
 * the bucket denies everything until `resetAt`.
 *
 * Fixed windows have a mild burst risk right at the boundary, but they are far
 * simpler than a sliding window and the effect is invisible to humans — it
 * only helps a bot that aligns itself perfectly to the window edge, which the
 * upstream quota cap already contains.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitDecision {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const fresh: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, fresh);
    return { allowed: true, limit, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  const next: Bucket = { count: existing.count + 1, resetAt: existing.resetAt };
  buckets.set(key, next);
  return {
    allowed: true,
    limit,
    remaining: limit - next.count,
    resetAt: next.resetAt,
  };
}

/**
 * Best-effort client identity for bucketing. Vercel sets its own header that
 * survives the edge network untouched; x-forwarded-for is the open-web
 * fallback. People behind one NAT collapse into a single bucket, which we
 * accept — the alternatives (cookies, fingerprinting) are trivially cleared
 * and carry privacy baggage we do not want.
 */
export function clientKey(request: Request): string {
  const candidate =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "anonymous";
  return candidate.split(",")[0]?.trim() || "anonymous";
}

/**
 * RFC-style rate-limit headers, so any polite client can read its remaining
 * budget without parsing our response body.
 */
export function rateLimitHeaders(decision: RateLimitDecision): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": String(decision.remaining),
    "X-RateLimit-Reset": String(Math.floor(decision.resetAt / 1000)),
  };
  if (decision.retryAfterSeconds !== undefined) {
    headers["Retry-After"] = String(decision.retryAfterSeconds);
  }
  return headers;
}
