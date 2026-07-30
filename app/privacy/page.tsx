import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { privacyCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(privacyCopy);

export default function PrivacyPage() {
  return <LegalDocument copy={privacyCopy} />;
}
