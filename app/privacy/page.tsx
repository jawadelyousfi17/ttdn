import type { Metadata } from "next";

import { ProseDocument } from "@/components/prose-document";
import { privacyCopy } from "@/lib/legal";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata(privacyCopy);

export default function PrivacyPage() {
  return <ProseDocument copy={privacyCopy} />;
}
