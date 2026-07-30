import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ui } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-4 py-20 text-center">
      <p className="font-display text-sm font-bold tracking-[0.2em] text-primary">
        {ui.notFound.code}
      </p>
      <h1 className="font-display text-balance text-3xl font-bold text-foreground">
        {ui.notFound.title}
      </h1>
      <p className="text-pretty text-sm leading-relaxed text-muted">
        {ui.notFound.body}
      </p>
      <Link href="/" className={buttonVariants({ size: "md" })}>
        {ui.notFound.action}
      </Link>
    </div>
  );
}
