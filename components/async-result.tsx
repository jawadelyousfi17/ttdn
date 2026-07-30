import { AlertTriangle } from "lucide-react";

import { DownloadResult as ResultPanel } from "@/components/download-result";
import { ScrollToResult } from "@/components/scroll-to-result";
import { ui } from "@/lib/content";
import { fetchForRender } from "@/services/render-fetch";

interface AsyncResultProps {
  /** Normalized https TikTok URL — the caller validates it synchronously. */
  url: string;
  /** Current path without ?url=, for the "Start over" link. */
  resetHref: string;
}

/**
 * Async server component that lives inside a Suspense boundary. The page shell
 * — header, hero, form, marketing sections, FAQ — flushes immediately while
 * this awaits the upstream lookup, and Next streams the panel in when it
 * resolves.
 *
 * Failures render here as a notice rather than bouncing back up to the form,
 * so people can read what went wrong without losing their place on the page.
 */
export async function AsyncResult({ url, resetHref }: AsyncResultProps) {
  const outcome = await fetchForRender(url);

  if (outcome.errorMessage) {
    return (
      <section id="result" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-16 sm:px-6">
        <div className="flex items-start gap-3 rounded-lg border border-danger/40 bg-danger-wash p-5">
          <AlertTriangle size={18} aria-hidden className="mt-0.5 shrink-0 text-danger" />
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              {ui.result.errorHeading}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {outcome.errorMessage}
            </p>
          </div>
        </div>
        <ScrollToResult />
      </section>
    );
  }

  if (outcome.result) {
    return (
      <section id="result" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-16 sm:px-6">
        <ResultPanel result={outcome.result} resetHref={resetHref} />
        <ScrollToResult />
      </section>
    );
  }

  return null;
}
