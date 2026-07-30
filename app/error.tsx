"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ui } from "@/lib/content";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-level error boundary.
 *
 * `error.message` is deliberately not shown. In production React replaces it
 * with a generic digest string anyway, and on the server it can carry internals
 * — an upstream hostname, a stack frame — that belong in logs, not on screen.
 */
export default function RouteError({ reset }: ErrorProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-4 py-20 text-center">
      <h1 className="font-display text-balance text-2xl font-bold text-foreground">
        {ui.error.title}
      </h1>
      <p className="text-pretty text-sm leading-relaxed text-muted">
        {ui.error.body}
      </p>
      <Button onClick={reset}>
        <RotateCcw size={16} aria-hidden />
        {ui.error.action}
      </Button>
    </div>
  );
}
