import Link from "next/link";
import * as React from "react";

import { contactEmail } from "@/lib/site";
import { legalPages } from "@/lib/legal";
import type { LegalPageCopy } from "@/types/content";

/** The minimum a cross-link needs: somewhere to point and something to say. */
interface DocumentLink {
  path: string;
  navLabel: string;
}

interface ProseDocumentProps {
  copy: LegalPageCopy;
  /**
   * Related pages listed under the document. Defaults to the other policies,
   * which is what the three legal pages want; About and Contact pass their own
   * set so they cross-link to each other rather than only to the policies.
   */
  siblings?: readonly DocumentLink[];
}

/**
 * Split a copy string on the {email} token and render the address as a real
 * mailto link.
 *
 * Doing it this way rather than with a string replace and
 * dangerouslySetInnerHTML keeps the whole legal layer free of raw HTML
 * injection — the copy stays plain text and React does the escaping.
 */
function withEmailLinks(text: string, email: string): React.ReactNode {
  const parts = text.split("{email}");
  if (parts.length === 1) return text;

  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <a
          href={`mailto:${email}`}
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          {email}
        </a>
      ) : null}
    </React.Fragment>
  ));
}

/**
 * Shared renderer for every prose page on the site — the three policies plus
 * About and Contact. One component means the documents cannot drift apart
 * typographically, and the structured section data means none of them ships
 * raw HTML.
 */
export function ProseDocument({ copy, siblings }: ProseDocumentProps) {
  const email = contactEmail();
  const links = (siblings ?? legalPages).filter((page) => page.path !== copy.path);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-balance text-3xl font-bold text-foreground sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {copy.intro}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.14em] text-faint">
          Last updated {copy.lastUpdated}
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
                {withEmailLinks(paragraph, email)}
              </p>
            ))}

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
                    {withEmailLinks(bullet, email)}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {/* Cross-links between the documents. Someone reading one of these is
          disproportionately likely to want another, and it saves a trip back
          to the footer. */}
      <nav className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm">
        {links.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="text-muted transition-colors hover:text-primary"
          >
            {page.navLabel}
          </Link>
        ))}
        <Link href="/" className="text-muted transition-colors hover:text-primary">
          Back to the downloader
        </Link>
      </nav>
    </article>
  );
}
