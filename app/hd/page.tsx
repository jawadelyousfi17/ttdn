import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { hdCopy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/hd">): Promise<Metadata> {
  const meta = buildPageMetadata(hdCopy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function HdPage({ searchParams }: PageProps<"/hd">) {
  const sp = await searchParams;
  return <LandingPage copy={hdCopy} rawUrl={firstString(sp.url)} />;
}
