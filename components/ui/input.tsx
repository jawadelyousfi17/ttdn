import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * The project's text input. The focus ring is deliberately omitted here — the
 * downloader form wraps this in a container that owns the ring, so the glow
 * lands on the whole console bar rather than on the bare field inside it.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type, ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type ?? "text"}
        className={cn(
          "h-13 w-full bg-transparent text-base text-foreground placeholder:text-faint",
          "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
