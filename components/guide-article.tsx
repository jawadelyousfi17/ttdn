import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

import { guidePages, guidePath, guidesIndexCopy } from "@/lib/guides";
import { site, siteOrigin } from "@/lib/site";
import type { GuidePageCopy } from "@/types/content";

interface GuideArticleProps {
  copy: GuidePageCopy;
}

/**
 * Structured data for a guide, emitted as one @graph rather than three
 * separate script tags — Google reads them identically and a single block
 * keeps the node references (the article's breadcrumb, the page's URL)
 * pointing at each other instead of at duplicates.
 *
 * Built from the same constants the page renders, so the markup cannot claim
 * something the visible page does not say — which is the one thing that turns
 * structured data from an asset into a manual action.
 */
function toJsonLd(copy: GuidePageCopy): string {
  const origin = siteOrigin();
  const url = `${origin}${guidePath(copy.slug)}`;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: copy.title,
        description: copy.metaDescription,
        mainEntityOfPage: url,
        inLanguage: "en",
        author: { "@type": "Organization", name: site.name, url: origin },
        publisher: { "@type": "Organization", name: site.name, url: origin },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: origin },
          {
            "@type": "ListItem",
            position: 2,
            name: guidesIndexCopy.title,
            item: `${origin}${guidesIndexCopy.path}`,
          },
          { "@type": "ListItem", position: 3, name: copy.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  });
}

/**
 * Renderer for a guide page.
 *
 * Deliberately narrower than a landing page and with no downloader in the
 * hero: someone who arrived on "where do TikTok downloads go on iPhone" is
 * reading, not pasting. The console they came for is one tap away at the
 * bottom, where the answer runs out.
 */
export function GuideArticle({ copy }: GuideArticleProps) {
  const others = guidePages.filter((guide) => guide.slug !== copy.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Visible breadcrumb, matching the BreadcrumbList below it. Search
          results show the trail either way; having it on the page as well is
          what makes it useful to a person who landed here from one. */}
      <nav aria-label="Breadcrumb" className="text-xs text-faint">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              {site.name}
            </Link>
          </li>
          <ChevronRight size={13} aria-hidden className="shrink-0" />
          <li>
            <Link
              href={guidesIndexCopy.path}
              className="transition-colors hover:text-primary"
            >
              {guidesIndexCopy.title}
            </Link>
          </li>
          <ChevronRight size={13} aria-hidden className="shrink-0" />
          <li aria-current="page" className="text-muted">
            {copy.navLabel}
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-line pb-8">
        <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {copy.intro}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.14em] text-faint">
          Updated {copy.lastUpdated}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {copy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">
              {section.heading}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-pretty text-sm leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}

            {section.steps ? (
              <ol className="mt-5 space-y-4">
                {section.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-display grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong bg-raised text-xs font-bold tabular-nums text-primary">
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}

            {section.bullets ? (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-5 text-pretty text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-primary"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {/* The exit. A guide that answers the question and then leaves the
          reader to find the tool again on their own has done half a job. */}
      <div className="mt-12 rounded-lg border border-line bg-surface p-6 shadow-lift sm:p-7">
        <p className="font-display text-lg font-semibold text-foreground">
          Ready to try it
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Have the link on your clipboard already? The box is one tap away.
        </p>
        <Link
          href={copy.ctaPath}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {copy.ctaLabel}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
          Questions about this
        </h2>
        <ul className="mt-6 space-y-2.5">
          {copy.faq.map((item) => (
            <li key={item.question}>
              <details className="group rounded-lg border border-line bg-surface px-5 transition-colors open:border-line-strong hover:border-line-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4.5 text-left font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  <span className="text-pretty text-sm sm:text-base">
                    {item.question}
                  </span>
                  <Plus
                    size={17}
                    aria-hidden
                    className="shrink-0 text-faint transition-transform duration-200 group-open:rotate-45 group-open:text-primary"
                  />
                </summary>
                <p className="border-t border-line py-4 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {others.length ? (
        <nav className="mt-14 border-t border-line pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            Other guides
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {others.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={guidePath(guide.slug)}
                  className="text-muted transition-colors hover:text-primary"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <script
        type="application/ld+json"
        // Built from typed constants in lib/guides.ts, never from user input,
        // and JSON.stringify escapes it into a JSON literal.
        dangerouslySetInnerHTML={{ __html: toJsonLd(copy) }}
      />
    </article>
  );
}
