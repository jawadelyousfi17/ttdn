import type { Metadata } from "next";

import { LandingPage, firstString } from "@/components/landing-page";
import { mp3Copy } from "@/lib/content";
import { buildPageMetadata, withResultRobots } from "@/lib/metadata";

export async function generateMetadata({
  searchParams,
}: PageProps<"/mp3">): Promise<Metadata> {
  const meta = buildPageMetadata(mp3Copy);
  const sp = await searchParams;
  return firstString(sp.url) ? withResultRobots(meta) : meta;
}

export default async function Mp3Page({ searchParams }: PageProps<"/mp3">) {
  const sp = await searchParams;
  return <LandingPage copy={mp3Copy} rawUrl={firstString(sp.url)} />;
}
