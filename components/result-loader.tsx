/**
 * Skeleton for the result panel. Used in two places: as the Suspense fallback
 * while the upstream lookup is in flight, and as the route-level loading state
 * during a soft navigation.
 *
 * The outer wrapper, the panel, and the internal column layout mirror the real
 * <DownloadResult> exactly, so the swap from skeleton to result shifts nothing
 * on screen. Only the inner blocks are placeholders.
 */
export function ResultLoader() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
      <div className="rounded-lg border border-line bg-surface p-4 shadow-lift sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-4 w-28 animate-pulse rounded bg-raised" />
          <div className="h-9 w-24 animate-pulse rounded-md bg-raised" />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Cover thumbnail */}
          <div className="aspect-[9/16] w-full shrink-0 animate-pulse rounded-md bg-raised sm:h-60 sm:w-[8.75rem]" />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Author row */}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 animate-pulse rounded-full bg-raised" />
              <div className="h-4 w-32 animate-pulse rounded bg-raised" />
            </div>

            {/* Caption — two lines, the second shorter so it reads as text. */}
            <div className="space-y-2 pt-1">
              <div className="h-4 w-full animate-pulse rounded bg-raised" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-raised" />
            </div>

            {/* Stats row */}
            <div className="flex gap-4 pt-1">
              <div className="h-4 w-16 animate-pulse rounded bg-raised" />
              <div className="h-4 w-16 animate-pulse rounded bg-raised" />
            </div>

            {/* Download buttons */}
            <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:flex-wrap">
              <div className="h-11 w-full animate-pulse rounded-md bg-raised sm:w-40" />
              <div className="h-11 w-full animate-pulse rounded-md bg-raised sm:w-40" />
              <div className="h-11 w-full animate-pulse rounded-md bg-raised sm:w-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
