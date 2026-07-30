import type { MetadataRoute } from "next";

import { allPages } from "@/lib/content";
import { legalPages } from "@/lib/legal";
import { siteOrigin } from "@/lib/site";

/**
 * Generated from the same arrays that drive the navigation and the footer, so
 * adding a page anywhere puts it in the sitemap automatically. A hand-kept
 * list is the kind that silently goes stale.
 *
 * Legal pages are included but weighted low: they should be findable — users,
 * app stores, and ad networks all look for them — without competing against
 * the tool pages for crawl budget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const lastModified = new Date();
  const url = (path: string) => `${origin}${path === "/" ? "" : path}`;

  return [
    ...allPages.map((page) => ({
      url: url(page.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.path === "/" ? 1 : 0.8,
    })),
    ...legalPages.map((page) => ({
      url: url(page.path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
