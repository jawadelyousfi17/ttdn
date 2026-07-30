import type { Metadata } from "next";

import { ProseDocument } from "@/components/prose-document";
import { termsCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(termsCopy);

export default function TermsPage() {
  return <ProseDocument copy={termsCopy} />;
}
