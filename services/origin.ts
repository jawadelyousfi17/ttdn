import "server-only";

/**
 * Best-effort same-origin check: accept a request only when its Origin or
 * Referer header matches the host it was sent to.
 *
 * - Browser fetch() with a non-GET method always attaches Origin, so the
 *   primary path is a straight `Origin === request origin` comparison.
 * - Plain GET navigations (our /api/download anchor clicks) omit Origin but do
 *   send Referer, which we fall back to.
 *
 * Worth being blunt about the limit: any non-browser caller can set both
 * headers with a single curl flag. This turns away casual scraping, accidental
 * hotlinking, and lazy bots — nothing more. The defenses that actually bound
 * the damage are the RapidAPI quota cap configured in their dashboard, which
 * hard-limits the bill, and a bot challenge such as Turnstile if real abuse
 * ever shows up.
 */
export function isSameOriginRequest(request: Request): boolean {
  let expectedOrigin: string;
  try {
    expectedOrigin = new URL(request.url).origin;
  } catch {
    return false;
  }

  const origin = request.headers.get("origin");
  if (origin) return origin === expectedOrigin;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin === expectedOrigin;
    } catch {
      return false;
    }
  }

  // Neither header present means a direct script call. Turn it away.
  return false;
}
