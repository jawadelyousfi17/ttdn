import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { dmcaCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(dmcaCopy);

export default function DmcaPage() {
  return <LegalDocument copy={dmcaCopy} />;
}
