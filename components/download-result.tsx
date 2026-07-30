"use client";

import Link from "next/link";
import * as React from "react";
import {
  Download,
  Heart,
  Loader2,
  Music4,
  Package,
  Play,
  RotateCcw,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ui } from "@/lib/content";
import { formatBytes, formatCount, formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DownloadOption, DownloadResult } from "@/types/tiktok";

interface DownloadResultProps {
  result: DownloadResult;
  /** Current path without ?url=, for the "Start over" link. */
  resetHref: string;
}

/**
 * Route a file through our own proxy. This is not optional plumbing: browsers
 * ignore the `download` attribute on cross-origin anchors, so linking straight
 * at the TikTok CDN opens the video in a new tab instead of saving it.
 */
function proxyHref(url: string, filename: string): string {
  return `/api/download?${new URLSearchParams({ u: url, filename })}`;
}

/** Initials shown when a post has no usable avatar image. */
function monogram(handle: string, nickname: string): string {
  const source = (handle || nickname).trim();
  return source ? source.slice(0, 2).toUpperCase() : "TT";
}

export function DownloadResult({ result, resetHref }: DownloadResultProps) {
  const isSlideshow = result.photos.length > 0;
  const hd = result.videos.find((v) => v.kind === "video-hd");
  const sd = result.videos.find((v) => v.kind === "video-sd");
  const [zipping, setZipping] = React.useState(false);

  /**
   * Ask the server to bundle the carousel and hand the archive to the browser.
   *
   * The response is buffered into a Blob rather than streamed to disk, because
   * an object URL is the only universally supported way to trigger a save from
   * a POST. For the sixty-image ceiling the route enforces, the buffered size
   * stays within what a phone can hold comfortably.
   */
  async function handleDownloadAll() {
    if (zipping) return;
    setZipping(true);
    try {
      const response = await fetch("/api/download-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls: result.photos,
          filename: `tiktok-${result.id}-photos`,
        }),
      });
      if (!response.ok) return;

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `tiktok-${result.id}-photos.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setZipping(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-lift">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          {ui.result.heading}
        </p>
        <Link
          href={resetHref}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-foreground"
        >
          <RotateCcw size={14} aria-hidden />
          {ui.result.reset}
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative w-full shrink-0 overflow-hidden rounded-md border border-line bg-raised sm:h-60 sm:w-[8.75rem]">
            {result.cover ? (
              /*
               * Plain <img> on purpose. These are signed CDN URLs that expire
               * within hours, so next/image would fill its optimizer cache
               * with entries that are dead before they could ever be reused —
               * paying the optimization cost for zero cache hits.
               */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.cover}
                alt=""
                className="aspect-[9/16] w-full object-cover sm:aspect-auto sm:h-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="grid aspect-[9/16] w-full place-items-center text-faint sm:aspect-auto sm:h-full">
                <Play size={24} aria-hidden />
              </div>
            )}

            {result.durationSeconds ? (
              <span className="absolute bottom-2 left-2 rounded bg-canvas/85 px-1.5 py-0.5 font-display text-xs font-medium tabular-nums text-foreground backdrop-blur-sm">
                {formatDuration(result.durationSeconds)}
              </span>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {result.author.uniqueId ? (
              <div className="flex items-center gap-2.5">
                {result.author.avatar ? (
                  // Same expiring-URL reasoning as the cover above.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.author.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full border border-line object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-full bg-primary-wash font-display text-xs font-bold text-primary"
                  >
                    {monogram(result.author.uniqueId, result.author.nickname)}
                  </span>
                )}
                <span className="min-w-0 text-sm">
                  <span className="text-faint">{ui.result.by} </span>
                  <span className="font-medium text-foreground">
                    @{result.author.uniqueId}
                  </span>
                </span>
              </div>
            ) : null}

            {result.title ? (
              <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted">
                {result.title}
              </p>
            ) : null}

            {result.stats.views !== null || result.stats.likes !== null ? (
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-faint">
                {result.stats.views !== null ? (
                  <li className="inline-flex items-center gap-1.5">
                    <Play size={13} aria-hidden />
                    <span className="tabular-nums">
                      {formatCount(result.stats.views)}
                    </span>
                    <span className="sr-only">{ui.result.views}</span>
                  </li>
                ) : null}
                {result.stats.likes !== null ? (
                  <li className="inline-flex items-center gap-1.5">
                    <Heart size={13} aria-hidden />
                    <span className="tabular-nums">
                      {formatCount(result.stats.likes)}
                    </span>
                    <span className="sr-only">{ui.result.likes}</span>
                  </li>
                ) : null}
              </ul>
            ) : null}

            <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:flex-wrap">
              {isSlideshow ? (
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  disabled={zipping}
                  className={cn(buttonVariants({ size: "md" }), "justify-center")}
                >
                  {zipping ? (
                    <Loader2 size={16} aria-hidden className="animate-spin" />
                  ) : (
                    <Package size={16} aria-hidden />
                  )}
                  {zipping ? ui.result.preparingZip : ui.result.downloadAll}
                </button>
              ) : (
                <>
                  {hd ? <DownloadButton option={hd} variant="primary" /> : null}
                  {sd ? <DownloadButton option={sd} variant="outline" /> : null}
                </>
              )}

              {result.audio ? (
                <DownloadButton option={result.audio} variant="outline" />
              ) : null}
            </div>
          </div>
        </div>

        {isSlideshow ? (
          <div className="mt-8 border-t border-line pt-6">
            <p className="mb-4 text-sm text-faint">
              {ui.result.photoCount.replace("{count}", String(result.photos.length))}
            </p>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {result.photos.map((photo, i) => (
                <li
                  key={photo}
                  className="group relative overflow-hidden rounded-md border border-line bg-raised"
                >
                  {/* Same expiring-URL reasoning as the cover above. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt=""
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    aria-hidden
                    className="absolute left-2 top-2 rounded bg-canvas/85 px-1.5 py-0.5 font-display text-[11px] font-semibold tabular-nums text-muted"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    // The extension here is a guess from the URL; /api/download
                    // rewrites it from the real Content-Type before saving.
                    href={proxyHref(photo, `tiktok-${result.id}-${i + 1}.jpg`)}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "absolute inset-x-2 bottom-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
                      // Hover does not exist on touch, so the button stays
                      // visible there rather than being unreachable.
                      "max-sm:opacity-100",
                    )}
                  >
                    <Download size={13} aria-hidden />
                    {ui.result.downloadPhoto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface DownloadButtonProps {
  option: DownloadOption;
  variant: "primary" | "outline";
}

function DownloadButton({ option, variant }: DownloadButtonProps) {
  const label =
    option.kind === "video-hd"
      ? ui.result.downloadHd
      : option.kind === "video-sd"
        ? ui.result.downloadStandard
        : ui.result.downloadAudio;

  const IconComponent = option.kind === "audio" ? Music4 : Download;
  const size = option.sizeBytes ? formatBytes(option.sizeBytes) : "";

  return (
    <a
      href={proxyHref(option.url, option.filename)}
      className={cn(buttonVariants({ size: "md", variant }), "justify-center")}
    >
      <IconComponent size={16} aria-hidden />
      <span>{label}</span>
      {size ? <span className="text-xs tabular-nums opacity-70">{size}</span> : null}
    </a>
  );
}
