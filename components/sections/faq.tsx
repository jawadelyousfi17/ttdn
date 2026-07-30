import { Plus } from "lucide-react";

import type { PageCopy } from "@/types/content";

interface FaqProps {
  copy: PageCopy;
}

/**
 * Build the FAQPage JSON-LD that Google reads to render rich FAQ results.
 * Generated from the same array the section renders, so the structured data
 * cannot drift out of sync with what a person actually sees on the page.
 */
function toJsonLd(copy: PageCopy): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

/**
 * FAQ accordion built on native <details>/<summary>. Keyboard support, screen
 * reader semantics, and open/close state all come for free — no client
 * component, no state hook, no JavaScript shipped for any of it.
 */
export function Faq({ copy }: FaqProps) {
  return (
    <section className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-balance text-2xl font-bold text-foreground sm:text-4xl">
          {copy.faqTitle}
        </h2>
        <p className="mt-3 text-sm text-muted">{copy.faqIntro}</p>

        <ul className="mt-10 space-y-2.5">
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

        <script
          type="application/ld+json"
          // Built from typed constants in lib/content.ts, never from user
          // input, and JSON.stringify escapes it into a JSON literal.
          dangerouslySetInnerHTML={{ __html: toJsonLd(copy) }}
        />
      </div>
    </section>
  );
}
