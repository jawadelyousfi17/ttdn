"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { flushSync } from "react-dom";
import { ArrowRight, ClipboardPaste, Link2, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ui } from "@/lib/content";
import { isTikTokUrl } from "@/lib/tiktok";
import { cn } from "@/lib/utils";

interface DownloaderFormProps {
  /** Pre-fills the field from ?url= when the page is rendering a result. */
  initialUrl?: string | null;
  /**
   * Validation message produced on the server by normalizeForRender. The form
   * only renders it; it never decides this itself.
   */
  errorMessage?: string | null;
}

/**
 * The URL console. Submits by pushing ?url=… onto the current route inside a
 * transition, which buys two things at once:
 *
 *  - `isPending` flips the button into its loading state on the same paint as
 *    the click, so nothing feels unresponsive while the lookup runs
 *  - the navigation makes the result area's Suspense boundary show its
 *    skeleton, so progress is visible in both places at once
 *
 * The form keeps method="GET" and a real `name` on the input, so it still works
 * with JavaScript disabled or broken: the browser performs its own submission
 * to the same ?url= address the server already knows how to render.
 */
export function DownloaderForm({ initialUrl, errorMessage }: DownloaderFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(initialUrl ?? "");
  const [clipboardError, setClipboardError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  /*
   * Resync the field when the page re-renders with a different ?url= — the
   * "Start over" link navigates to the bare path, and the input should clear
   * to match. Adjusting state during render is React's documented pattern for
   * deriving state from props; doing it in an effect would render the stale
   * value once first and warn about the cascading update.
   */
  const [lastInitialUrl, setLastInitialUrl] = React.useState(initialUrl);
  if (lastInitialUrl !== initialUrl) {
    setLastInitialUrl(initialUrl);
    setValue(initialUrl ?? "");
  }

  const displayError = errorMessage ?? clipboardError;
  const isError = Boolean(displayError);

  function navigate(rawUrl: string) {
    const trimmed = rawUrl.trim();
    const search = trimmed ? `?${new URLSearchParams({ url: trimmed })}` : "";
    setClipboardError(null);
    startTransition(() => {
      // "." keeps the current pathname and swaps only the query, so a submit
      // on /mp3 stays on /mp3 instead of bouncing to the home downloader.
      router.push(search || ".");
    });
  }

  async function handlePaste() {
    setClipboardError(null);
    try {
      const text = (await navigator.clipboard.readText()).trim();
      // flushSync commits the new value to the DOM before the navigation
      // starts; without it the field flashes empty for a frame.
      flushSync(() => setValue(text));
      if (isTikTokUrl(text)) {
        navigate(text);
      } else {
        inputRef.current?.focus();
      }
    } catch {
      // Firefox and any non-secure context refuse clipboard reads outright.
      setClipboardError(ui.form.errorClipboard);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(value);
  }

  return (
    <form method="GET" onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="tiktok-url" className="sr-only">
        {ui.form.label}
      </label>

      <div
        className={cn(
          "flex flex-col gap-2 rounded-lg border bg-surface p-2 shadow-lift transition-colors sm:flex-row sm:items-center",
          isError
            ? "border-danger/60"
            : "border-line-strong focus-within:border-primary/60",
        )}
      >
        <div className="relative flex min-w-0 flex-1 items-center">
          <Link2
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-3 shrink-0 text-faint"
          />
          <Input
            id="tiktok-url"
            ref={inputRef}
            name="url"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder={ui.form.placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setClipboardError(null);
            }}
            aria-invalid={isError}
            aria-describedby="tiktok-url-status"
            disabled={isPending}
            className="pl-10 pr-2"
          />

          {value ? (
            <button
              type="button"
              onClick={() => {
                setValue("");
                setClipboardError(null);
                inputRef.current?.focus();
              }}
              aria-label={ui.form.clear}
              disabled={isPending}
              className="mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-md text-faint transition-colors hover:bg-raised hover:text-foreground disabled:opacity-50"
            >
              <X size={16} aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePaste}
              disabled={isPending}
              className="mr-1 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted transition-colors hover:bg-raised hover:text-foreground disabled:opacity-50"
            >
              <ClipboardPaste size={15} aria-hidden />
              <span>{ui.form.paste}</span>
            </button>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full shrink-0 sm:w-auto sm:min-w-36"
        >
          {isPending ? (
            <Loader2 size={18} aria-hidden className="animate-spin" />
          ) : (
            <ArrowRight size={18} aria-hidden />
          )}
          {isPending ? ui.form.submitting : ui.form.submit}
        </Button>
      </div>

      <p
        id="tiktok-url-status"
        role={isError ? "alert" : undefined}
        aria-live="polite"
        className={cn(
          "mt-2.5 min-h-5 px-1 text-sm",
          isError ? "text-danger" : "text-faint",
        )}
      >
        {isError ? displayError : ui.form.hint}
      </p>
    </form>
  );
}
