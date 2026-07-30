import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { slideshowCopy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/slideshow">): Promise<Metadata> {
  const meta = buildPageMetadata(slideshowCopy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function SlideshowPage({
  searchParams,
}: PageProps<"/slideshow">) {
  const sp = await searchParams;
  return <LandingPage copy={slideshowCopy} rawUrl={firstString(sp.url)} />;
}
