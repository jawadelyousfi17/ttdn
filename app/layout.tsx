import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homeCopy, ui } from "@/lib/content";
import { site, siteOrigin } from "@/lib/site";

/**
 * Two families, split by job. Space Grotesk carries headings and anything
 * numeric — its flat terminals and single-storey 'a' are most of what gives
 * the site its technical register. Inter handles body copy, where Grotesk's
 * wide apertures get tiring past a sentence or two.
 *
 * Both load with display: swap so first paint never blocks on the font.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

/**
 * Root metadata. `metadataBase` is what turns the relative canonical paths the
 * pages declare into the absolute URLs crawlers expect — without it Next warns
 * and emits relative canonicals, which not every crawler resolves correctly.
 *
 * Per-page titles and descriptions come from each route's generateMetadata;
 * only the template and site-wide defaults live here.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    // Only reached if a route sets no title of its own; every current route
    // does, so this is a safety net rather than something users see.
    default: homeCopy.metaTitle,
    // Applies to nested segments only — the legal pages pick it up and become
    // "Privacy Policy · TikTok Downloader". The tool pages opt out with an
    // absolute title, since their own headlines already say "TikTok".
    template: `%s · ${site.name}`,
  },
  applicationName: site.name,
};

/**
 * themeColor belongs on the viewport export, not on metadata — Next moved it
 * and warns at build time if it is set in the wrong place. The palette is
 * dark-only, so mobile browsers are told to tint their chrome to match rather
 * than framing the page in white.
 */
export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          {ui.skipToContent}
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
