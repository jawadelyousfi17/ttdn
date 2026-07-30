import Image from "next/image";
import Link from "next/link";

import { allPages, ui } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Sticky top bar. It carries the wordmark and every tool link, which does
 * double duty: people can move between the downloaders, and each one ends up
 * one hop from every other for crawlers. Guides, policies, and the About and
 * Contact pages live in the footer instead — putting them up here would push
 * the downloaders off the bar on a phone, and they are not what anyone came
 * for.
 *
 * The nav is a plain scrollable row rather than a hamburger. The labels are
 * short enough to sit side by side on a laptop and to scroll comfortably on a
 * phone, which is a better trade than a client component, a state hook, and a
 * focus trap to hide seven words.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/*
           * The artwork is already black-on-black with the mark floating in it,
           * so it needs no background of its own — only the rounded corner to
           * stop its square edge reading as a crop against the page.
           * `priority` because this is above the fold on every route.
           */}
          <Image
            src={site.logo}
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-md"
          />
          {/*
           * Hidden on the narrowest screens: "TikTok Downloader" is long, and
           * on a 360px phone it would crowd the four nav links off the bar. The
           * mark alone carries the brand there.
           */}
          <span className="hidden font-display text-base font-bold text-foreground sm:inline">
            {site.name}
          </span>
        </Link>

        <nav
          aria-label={ui.nav.toolsLabel}
          className="-mr-1 ml-auto flex items-center gap-1 overflow-x-auto"
        >
          {allPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-raised hover:text-foreground"
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
