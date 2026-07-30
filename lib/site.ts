/**
 * Brand-level facts that are not page copy. Anything referenced by metadata,
 * robots.txt, the sitemap, and the chrome around the pages lives here so there
 * is exactly one place to change the name or the deployed origin.
 */
export const site = {
  name: "TikTok Downloader",
  /** Used in the footer copyright line. */
  legalName: "TikTok Downloader",
  /**
   * The brand mark, in public/. It is a square, icon-only artwork on a black
   * field — no wordmark baked in — so the header and footer pair it with the
   * site name as live text rather than shipping the name as pixels.
   */
  logo: "/logo.png",
} as const;

/**
 * Absolute origin of the deployment, with any trailing slash removed.
 * `NEXT_PUBLIC_SITE_URL` should be set in production — the localhost fallback
 * only keeps `next build` from emitting a broken sitemap during development.
 */
export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/**
 * Address the legal pages point people at for privacy requests and copyright
 * notices. Set NEXT_PUBLIC_CONTACT_EMAIL before launch — the fallback uses the
 * reserved `.example` TLD, which can never resolve to a real inbox, so a
 * missed configuration fails visibly instead of silently swallowing takedown
 * notices at an address nobody reads.
 */
export function contactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "legal@example.invalid";
}
