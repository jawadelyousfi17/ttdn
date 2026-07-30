import { Icon } from "@/components/icon";
import type { PageCopy } from "@/types/content";

interface FeaturesProps {
  copy: PageCopy;
}

/**
 * The "why this tool" grid. Cards are flat panels with a hairline border and a
 * small icon tile — no drop shadows on the grid itself, so the eye keeps
 * treating the hero console as the one raised element on the page.
 */
export function Features({ copy }: FeaturesProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {copy.featuresEyebrow}
          </p>
          <h2 className="font-display mt-3 text-balance text-2xl font-bold text-foreground sm:text-4xl">
            {copy.featuresTitle}
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {copy.featuresIntro}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {copy.features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <span className="inline-grid h-10 w-10 place-items-center rounded-md bg-primary-wash text-primary">
                <Icon name={feature.icon} size={19} />
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
