import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The one button in the system. Every clickable affordance — including anchors
 * styled as buttons — routes through these variants, because ad-hoc button
 * styling in pages is how a design system quietly stops being one.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-colors select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  {
    variants: {
      variant: {
        /** The single call to action. Only one of these per view. */
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        /** Secondary actions that still sit on a panel. */
        outline:
          "border border-line-strong bg-raised text-foreground hover:border-primary/50 hover:bg-primary-wash",
        /** Tertiary, for things like Clear that should almost disappear. */
        ghost: "bg-transparent text-muted hover:bg-raised hover:text-foreground",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, type, ...props }, ref) {
    return (
      <button
        ref={ref}
        // Default to "button": an unspecified type inside a form is "submit",
        // which has caused accidental submissions from unrelated controls.
        type={type ?? "button"}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { buttonVariants };
