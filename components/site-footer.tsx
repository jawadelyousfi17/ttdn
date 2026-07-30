import Image from "next/image";
import Link from "next/link";

import { allPages, ui } from "@/lib/content";
import { legalPages } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * Footer: brand blurb, the internal link row for the sibling tool pages, and
 * the legal disclaimer.
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
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
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
