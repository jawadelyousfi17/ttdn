"use client";

import * as React from "react";

/**
 * Scrolls the result panel into view once the page hydrates.
 *
 * Needed because the result is server-rendered from ?url= — the user submits,
 * the browser navigates, and they land back at the top of the document with
 * the thing they asked for sitting below the fold. The result wrapper carries
 * `scroll-mt-20` so the sticky header does not cover its top edge.
 */
export function ScrollToResult() {
  React.useEffect(() => {
    const target = document.getElementById("result");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return null;
}
