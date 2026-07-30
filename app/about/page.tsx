import type { Metadata } from "next";

import { ProseDocument } from "@/components/prose-document";
import { aboutCopy, companyPages } from "@/lib/company";
import { legalPages } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(aboutCopy);

export default function AboutPage() {
  return (
    <ProseDocument copy={aboutCopy} siblings={[...companyPages, ...legalPages]} />
  );
}
