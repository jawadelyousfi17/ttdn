import Image from "next/image";
import Link from "next/link";

import { companyPages } from "@/lib/company";
import { allPages, ui } from "@/lib/content";
import { guidePages, guidePath, guidesIndexCopy } from "@/lib/guides";
import { legalPages } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * Footer: brand blurb, every internal link the site has, and the disclaimer.
 *
 * This is the site's link graph in one component. The header carries the tool
 * pages only, so the footer is what puts the guides, the policies, and the
 * About and Contact pages one hop from every URL on the site — for people who
 * scroll, and for crawlers that would otherwise reach the guides solely
 * through their own index.
 *
 * The year is computed at render on the server. That keeps the page a single
 * static payload — a live clock would mean a client component for a number
 * that changes once a year.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={site.logo}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-md"
              />
              <span className="font-display text-lg font-bold text-foreground">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {ui.footer.blurb}
            </p>
          </div>

          <nav aria-label={ui.footer.toolsHeading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {ui.footer.toolsHeading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {allPages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={ui.footer.guidesHeading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {ui.footer.guidesHeading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {guidePages.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={guidePath(guide.slug)}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {guide.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={guidesIndexCopy.path}
                  className="text-muted transition-colors hover:text-primary"
                >
                  All guides
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={ui.footer.companyHeading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {ui.footer.companyHeading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyPages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={ui.footer.legalHeading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {ui.footer.legalHeading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalPages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-3 border-t border-line pt-6">
          <p className="text-sm text-muted">
            © {year} {site.legalName}. {ui.footer.rights}
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-faint">
            {ui.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
