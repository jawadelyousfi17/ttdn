import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { photosCopy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/photos">): Promise<Metadata> {
  const meta = buildPageMetadata(photosCopy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function PhotosPage({ searchParams }: PageProps<"/photos">) {
  const sp = await searchParams;
  return <LandingPage copy={photosCopy} rawUrl={firstString(sp.url)} />;
}
