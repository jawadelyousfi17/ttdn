import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Streaming proxies. No SEO value, and every crawl of one burns
          // real bandwidth pulling a video nobody asked for.
          "/api/",
          // Result addresses. They are unique per video and would flood the
          // index with thousands of pages competing with the landings.
          "/*?url=",
        ],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
