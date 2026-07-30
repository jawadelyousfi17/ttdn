/**
 * Hosts we accept as TikTok links: the public site, the mobile subdomain, and
 * the two short share hosts the app generates. The upstream provider resolves
 * short links itself, so both kinds can be passed straight through.
 */
const TIKTOK_HOSTS = [
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
  "vm.tiktok.com",
  "vt.tiktok.com",
];

/**
 * Turn a raw pasted string into a fully-formed https TikTok URL, or null when
 * it is not a TikTok link at all.
 *
 * `new URL()` alone is not enough: shares copied out of the app arrive with a
 * scheme, but a link grabbed from a desktop address bar or retyped out of a
 * chat often does not — `tiktok.com/@user/video/123` is a shape real people
 * paste. Prepending https:// before parsing accepts it without loosening the
 * host check that follows.
 */
export function normalizeTikTokUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (!TIKTOK_HOSTS.includes(url.hostname.toLowerCase())) return null;

  // Force https before it leaves this function: the cache key and the rate
  // limiter downstream both assume one consistent scheme.
  url.protocol = "https:";
  return url.toString();
}

export function isTikTokUrl(value: string): boolean {
  return normalizeTikTokUrl(value) !== null;
}
