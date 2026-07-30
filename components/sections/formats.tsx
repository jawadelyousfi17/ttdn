import type { PageCopy } from "@/types/content";

interface FormatsProps {
  copy: PageCopy;
}

/**
 * A spec table of what a link actually resolves to.
 *
 * This is the section that most earns the "tooling, not marketing" framing:
 * it answers "what do I get" concretely, and it doubles as the page's most
 * quotable block for search snippets. Rendered as a definition-style list
 * rather than a <table> because there is no second axis — each row is one
 * format described, not a cell in a grid.
 */
export function Formats({ copy }: FormatsProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-balance text-2xl font-bold text-foreground sm:text-4xl">
            {copy.formatsTitle}
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {copy.formatsIntro}
          </p>
        </div>

        <ul className="mt-10 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
          {copy.formats.map((row) => (
            <li
              key={`${row.format}-${row.label}`}
              className="flex flex-col gap-1.5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            >
              <span className="font-display inline-flex w-fit shrink-0 items-center rounded border border-primary/30 bg-primary-wash px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary sm:w-16 sm:justify-center">
                {row.format}
              </span>
              <span className="font-display w-full shrink-0 font-semibold text-foreground sm:w-48">
                {row.label}
              </span>
              <span className="text-sm leading-relaxed text-muted">{row.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
