import type { MetadataRoute } from "next";

import { companyPages } from "@/lib/company";
import { allPages } from "@/lib/content";
import { guidePages, guidePath, guidesIndexCopy } from "@/lib/guides";
import { legalPages } from "@/lib/legal";
import { siteOrigin } from "@/lib/site";

/**
 * Generated from the same arrays that drive the navigation and the footer, so
 * adding a page anywhere puts it in the sitemap automatically. A hand-kept
 * list is the kind that silently goes stale.
 *
 * Priorities encode what should be recrawled first, not what we wish ranked
 * highest: the tool pages carry the product, the guides change when a mobile
 * OS moves its downloads folder, and the policies change once a year.
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
    {
      url: url(guidesIndexCopy.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...guidePages.map((guide) => ({
      url: url(guidePath(guide.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...companyPages.map((page) => ({
      url: url(page.path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...legalPages.map((page) => ({
      url: url(page.path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
