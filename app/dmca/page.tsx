import type { Metadata } from "next";

import { ProseDocument } from "@/components/prose-document";
import { dmcaCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(dmcaCopy);

export default function DmcaPage() {
  return <ProseDocument copy={dmcaCopy} />;
}
