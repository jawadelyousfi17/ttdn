import type { PageCopy } from "@/types/content";

interface HowItWorksProps {
  copy: PageCopy;
}

/**
 * The three steps, laid out as a vertical timeline rather than a card row.
 *
 * A numbered sequence is the point here, and three side-by-side cards read as
 * peers you could take in any order. The connecting rule makes the ordering
 * structural instead of relying on people noticing the numbers.
 */
export function HowItWorks({ copy }: HowItWorksProps) {
  return (
    <section className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {copy.stepsEyebrow}
          </p>
          <h2 className="font-display mt-3 text-balance text-2xl font-bold text-foreground sm:text-4xl">
            {copy.stepsTitle}
          </h2>
        </div>

        <ol className="mt-12 max-w-3xl">
          {copy.steps.map((step, i) => {
            const isLast = i === copy.steps.length - 1;
            return (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                {/* The rule joining one marker to the next. Skipped on the last
                    item so the timeline terminates instead of trailing off. */}
                {!isLast ? (
                  <span
                    aria-hidden
                    className="absolute left-[1.4375rem] top-12 bottom-2 w-px bg-line"
                  />
                ) : null}

                <span className="relative z-10 grid h-11.5 w-11.5 shrink-0 place-items-center rounded-full border border-line-strong bg-raised font-display text-sm font-bold tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
