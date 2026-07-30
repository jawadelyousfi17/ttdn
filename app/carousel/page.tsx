import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { carouselCopy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/carousel">): Promise<Metadata> {
  const meta = buildPageMetadata(carouselCopy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function CarouselPage({ searchParams }: PageProps<"/carousel">) {
  const sp = await searchParams;
  return <LandingPage copy={carouselCopy} rawUrl={firstString(sp.url)} />;
}
