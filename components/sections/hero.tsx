import { DownloaderForm } from "@/components/downloader-form";
import { Icon } from "@/components/icon";
import type { PageCopy } from "@/types/content";

interface HeroProps {
  copy: PageCopy;
  /** Pre-fills the form from ?url= when the page is rendering a result. */
  initialUrl?: string | null;
  /** Server-side validation message, or null. */
  errorMessage?: string | null;
}

/**
 * The landing section: H1, one paragraph, the console, and the highlight chips.
 *
 * The H1 sits directly above the form deliberately. It is the page's keyword
 * statement and its instruction at the same time, and separating them would
 * push the only thing anyone came here to use further down the screen.
 */
export function Hero({ copy, initialUrl, errorMessage }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Decorative backdrop: a dot grid faded out toward the edges, plus one
          cyan bloom behind the headline. Both are pointer-events-none and
          aria-hidden — they carry no meaning, only depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dots opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/12 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-20">
        <h1 className="font-display text-balance text-3xl font-bold leading-[1.1] text-foreground sm:text-5xl">
          {copy.h1}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {copy.subtitle}
        </p>

        <div className="mt-9 text-left">
          <DownloaderForm initialUrl={initialUrl} errorMessage={errorMessage} />
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {copy.highlights.map((highlight) => (
            <li
              key={highlight.label}
              className="inline-flex items-center gap-2 text-xs text-muted sm:text-sm"
            >
              <Icon name={highlight.icon} size={15} className="text-primary" />
              {highlight.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
