import type { Metadata } from "next";

import { ProseDocument } from "@/components/prose-document";
import { companyPages, contactCopy } from "@/lib/company";
import { legalPages } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(contactCopy);

export default function ContactPage() {
  return (
    <ProseDocument copy={contactCopy} siblings={[...companyPages, ...legalPages]} />
  );
}
