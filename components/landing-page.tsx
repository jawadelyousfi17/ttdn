import { Suspense } from "react";

import { AsyncResult } from "@/components/async-result";
import { ResultLoader } from "@/components/result-loader";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Formats } from "@/components/sections/formats";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { normalizeForRender } from "@/services/render-fetch";
import type { PageCopy } from "@/types/content";

interface LandingPageProps {
  copy: PageCopy;
  /** The raw ?url= value, straight off the query string. */
  rawUrl: string | null;
}

/**
 * The shared body of all four landing pages. They differ only in their copy
 * object, so the structure lives here once — a page that drifts out of sync
 * with its siblings is a bug, not a feature.
 *
 * Validation is split deliberately. `normalizeForRender` is synchronous, so a
 * malformed link renders its error in the form on the first paint without
 * costing a billed upstream request. Only a URL that passes reaches the
 * Suspense boundary, letting the entire page shell stream out while the
 * network call is still in flight.
 */
export function LandingPage({ copy, rawUrl }: LandingPageProps) {
  const { normalized, formError } = normalizeForRender(rawUrl);

  return (
    <>
      <Hero
        copy={copy}
        initialUrl={normalized ?? rawUrl}
        errorMessage={formError}
      />

      {normalized ? (
        <section className="border-b border-line py-8 sm:py-10">
          <Suspense fallback={<ResultLoader />}>
            <AsyncResult url={normalized} resetHref={copy.path} />
          </Suspense>
        </section>
      ) : null}

      <Features copy={copy} />
      <HowItWorks copy={copy} />
      <Formats copy={copy} />
      <Faq copy={copy} />
    </>
  );
}

/**
 * Pull a single value out of a searchParams entry. Next hands back a string
 * array when a parameter repeats (?url=a&url=b), and taking the first is the
 * only sane reading of a duplicated single-value field.
 */
export function firstString(value: string | string[] | undefined): string | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}
