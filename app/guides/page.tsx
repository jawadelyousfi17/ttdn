import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/icon";
import { guidePages, guidePath, guidesIndexCopy } from "@/lib/guides";
import { buildSectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildSectionMetadata(guidesIndexCopy);

/**
 * The section index. Its job is crawl paths first and browsing second: it is
 * the one page that links to every guide, so a crawler that finds it from the
 * footer reaches the whole section in one more hop.
 */
export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-balance text-3xl font-bold text-foreground sm:text-4xl">
          {guidesIndexCopy.title}
        </h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {guidesIndexCopy.intro}
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {guidePages.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={guidePath(guide.slug)}
              className="group flex gap-5 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-wash text-primary">
                <Icon name={guide.icon} size={19} />
              </span>
              <span className="min-w-0">
                <span className="font-display block text-pretty text-base font-semibold text-foreground sm:text-lg">
                  {guide.title}
                </span>
                <span className="mt-2 block text-pretty text-sm leading-relaxed text-muted">
                  {guide.summary}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read the guide
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
