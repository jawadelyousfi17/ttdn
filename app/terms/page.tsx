import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { termsCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(termsCopy);

export default function TermsPage() {
  return <LegalDocument copy={termsCopy} />;
}
