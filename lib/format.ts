/**
 * The site ships English only, so every Intl call pins the same locale rather
 * than threading one through every component signature.
 */
const LOCALE = "en-US";

/**
 * Format a byte count as a short label ("4.2 MB"). Shown inside download
 * buttons so people know roughly what they are about to pull down. Returns an
 * empty string for unknown sizes, which callers render as nothing.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const formatted = new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: value >= 100 || unit === 0 ? 0 : 1,
  }).format(value);
  return `${formatted} ${units[unit]}`;
}

/**
 * Compact a play / like count into "1.2M" or "12K". TikTok returns literal
 * values in the millions, which are hard to scan at a glance.
 */
export function formatCount(count: number): string {
  if (!Number.isFinite(count) || count < 0) return "0";
  return new Intl.NumberFormat(LOCALE, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}

/**
 * Turn a raw second count into "0:42" / "1:05". The result card overlays this
 * on the cover thumbnail, where a bare "42 sec" reads as clutter.
 */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const whole = Math.round(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = whole % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}
