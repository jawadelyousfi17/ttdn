import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { noWatermarkCopy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/no-watermark">): Promise<Metadata> {
  const meta = buildPageMetadata(noWatermarkCopy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function NoWatermarkPage({
  searchParams,
}: PageProps<"/no-watermark">) {
  const sp = await searchParams;
  return <LandingPage copy={noWatermarkCopy} rawUrl={firstString(sp.url)} />;
}
