import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/guide-article";
import { findGuide, guidePages } from "@/lib/guides";
import { buildGuideMetadata } from "@/lib/metadata";

/**
 * The guides are a fixed, hand-written set, so every URL is known at build
 * time. Prerendering them all and turning `dynamicParams` off means an invented
 * slug 404s immediately instead of being rendered on demand — no soft 404s for
 * a crawler to index.
 */
export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return {};
  return buildGuideMetadata(guide);
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  return <GuideArticle copy={guide} />;
}
