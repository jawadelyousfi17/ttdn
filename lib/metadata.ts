import type { Metadata } from "next";

import { siteOrigin } from "@/lib/site";
import type { LegalPageCopy, PageCopy } from "@/types/content";

/**
 * Build the Metadata object for a landing page.
 *
 * Centralised because canonical URLs are easy to get subtly wrong in ways
 * nothing surfaces until traffic is already split across duplicate addresses.
 * One helper means one place where the canonical, the OpenGraph URL, and the
 * sitemap all agree on what a page's address is.
 */
export function buildPageMetadata(copy: PageCopy): Metadata {
  const origin = siteOrigin();
  const url = `${origin}${copy.path === "/" ? "" : copy.path}`;

  return {
    /*
     * Absolute, so the root layout's "%s · TikTok Downloader" template does not
     * get appended. These titles already lead with "TikTok" — letting the
     * template run would push them past the ~60 characters search results
     * display and end them on a redundant repeat of the brand.
     */
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: { canonical: copy.path },
    openGraph: {
      title: copy.ogTitle,
      description: copy.ogDescription,
      url,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Metadata for a page currently rendering a lookup result.
 *
 * A ?url= address is unique per video and worthless in an index — thousands of
 * near-identical pages competing with the landing page they came from. Marking
 * them noindex while keeping follow lets crawlers walk the internal links out
 * without hoarding the result URLs themselves.
 */
export function withResultRobots(metadata: Metadata): Metadata {
  return { ...metadata, robots: { index: false, follow: true } };
}

/**
 * Metadata for a legal page. These stay indexable — a findable privacy policy
 * is something users, app stores, and ad networks all check for — but they get
 * no OpenGraph imagery, since a policy shared as a rich card is noise.
 */
export function buildLegalMetadata(copy: LegalPageCopy): Metadata {
  const origin = siteOrigin();

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: copy.path },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${origin}${copy.path}`,
      type: "article",
      locale: "en_US",
    },
    robots: { index: true, follow: true },
  };
}
