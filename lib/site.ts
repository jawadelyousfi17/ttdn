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
  /**
   * Canonical origin of the production deployment. Hard-coded rather than
   * env-only on purpose: if `NEXT_PUBLIC_SITE_URL` is ever missing on the
   * host, a localhost fallback would quietly publish a sitemap and a set of
   * canonicals pointing at 127.0.0.1 — the kind of breakage that costs weeks
   * of indexing before anyone notices. The env var still wins, so preview
   * deployments can point the metadata at their own origin.
   */
  origin: "https://www.idownit.com",
} as const;

/**
 * Absolute origin of the deployment, with any trailing slash removed.
 * `NEXT_PUBLIC_SITE_URL` overrides the canonical origin — set it on previews
 * and staging so those builds do not advertise the production address.
 */
export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? site.origin;
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
