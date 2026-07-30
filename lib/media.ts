/**
 * CDN hostnames the download proxy is allowed to fetch from. Without this
 * allowlist /api/download would be an open proxy anyone could point anywhere.
 *
 * The set is wider than it first looks because TikTok spreads assets across
 * several CDN families and rotates the shard prefix per request:
 *   v16m.tiktokcdn-us.com             video streams
 *   v16.tokcdn.com                    the original-quality upload
 *   p19-common-sign.tiktokcdn-us.com  covers, avatars, carousel images
 *   v16-ies-music.tiktokcdn-us.com    audio
 * Matching on the registrable domain rather than the shard keeps this stable
 * as the numbering shifts.
 */
const ALLOWED_HOST_PATTERNS = [
  /(^|\.)tiktokcdn\.com$/i,
  /(^|\.)tiktokcdn-us\.com$/i,
  /(^|\.)tiktokcdn-eu\.com$/i,
  /(^|\.)tokcdn\.com$/i,
  /(^|\.)ibytedtos\.com$/i,
  /(^|\.)ibyteimg\.com$/i,
  /(^|\.)muscdn\.com$/i,
  /(^|\.)tiktok\.com$/i,
];

export function isAllowedMediaHost(hostname: string): boolean {
  return ALLOWED_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

/**
 * Guess a file extension from a URL path.
 *
 * Worth doing rather than hard-coding: a post's audio is sometimes a real
 * `.mp3` and sometimes an extensionless `audio/mp4` stream, and carousel
 * images arrive as JPEG on some posts and WebP on others. Only the path is
 * inspected — signed CDN query strings are full of dots and would produce
 * nonsense.
 *
 * This is a guess by design. /api/download corrects it from the response
 * Content-Type before the browser ever sees the name.
 */
export function extensionFromUrl(rawUrl: string, fallback: string): string {
  let pathname: string;
  try {
    pathname = new URL(rawUrl).pathname;
  } catch {
    return fallback;
  }
  const match = pathname.match(/\.([a-z0-9]{2,5})$/i);
  if (!match) return fallback;
  return match[1].toLowerCase();
}

/**
 * Extensions we trust a Content-Type to imply. Anything not listed — including
 * the generic application/octet-stream that CDNs fall back to — leaves the
 * filename alone rather than renaming a file based on a guess.
 */
const TYPE_EXTENSIONS: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/webm": "webm",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function extensionFromContentType(contentType: string | null): string | null {
  if (!contentType) return null;
  const base = contentType.split(";")[0]?.trim().toLowerCase();
  if (!base) return null;
  return TYPE_EXTENSIONS[base] ?? null;
}

/**
 * Swap a filename's extension, used when the upstream Content-Type disagrees
 * with the name we generated from the URL. Saving an audio/mp4 stream as
 * ".mp3" produces a file some players simply refuse to open, so this is a
 * correctness fix rather than cosmetics.
 */
export function withExtension(filename: string, extension: string): string {
  const stem = filename.replace(/\.[a-z0-9]{2,5}$/i, "");
  return `${stem}.${extension}`;
}
