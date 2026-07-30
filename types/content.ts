/**
 * Icon slugs the copy layer is allowed to reference. Keeping this a closed
 * union means lib/content.ts never imports a React component — copy stays
 * plain data — while components/icon.tsx still fails to compile if a slug
 * loses its mapping.
 */
export type IconName =
  | "shield"
  | "bolt"
  | "music"
  | "images"
  | "sparkle"
  | "lock"
  | "wallet"
  | "device"
  | "layers"
  | "clock"
  | "check"
  | "film";

export interface Highlight {
  icon: IconName;
  label: string;
}

export interface FeatureItem {
  icon: IconName;
  title: string;
  body: string;
}

export interface StepItem {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** One row of the "what you actually get" format table. */
export interface FormatRow {
  /** File extension shown in the leading cell, e.g. "MP4". */
  format: string;
  label: string;
  detail: string;
}

/**
 * Everything one landing page needs. Each of the four pages ships its own
 * features, steps, and FAQ rather than sharing a single block, so no two
 * routes compete for the same keywords with byte-identical body copy.
 */
export interface PageCopy {
  /** Route path, used for canonical URLs and the internal link rows. */
  path: string;
  /** Label for this page in navigation and footer link lists. */
  navLabel: string;

  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;

  h1: string;
  subtitle: string;

  highlights: Highlight[];

  featuresEyebrow: string;
  featuresTitle: string;
  featuresIntro: string;
  features: FeatureItem[];

  stepsEyebrow: string;
  stepsTitle: string;
  steps: StepItem[];

  formatsTitle: string;
  formatsIntro: string;
  formats: FormatRow[];

  faqTitle: string;
  faqIntro: string;
  faq: FaqItem[];
}

/**
 * One block of a legal document. Structured rather than a raw HTML blob so the
 * three policies render through a single component and cannot drift apart
 * typographically — and so no page ships `dangerouslySetInnerHTML`.
 */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalPageCopy {
  path: string;
  navLabel: string;

  metaTitle: string;
  metaDescription: string;

  title: string;
  intro: string;
  /** Human-readable revision date shown under the title. */
  lastUpdated: string;

  sections: LegalSection[];
}
