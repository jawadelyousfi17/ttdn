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
  | "film"
  | "desktop"
  | "mail";

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

/**
 * One block of a how-to guide. Same shape as a legal section plus an optional
 * numbered list, because the whole point of a guide is that some of its blocks
 * are a sequence you follow in order and the rest are prose around them.
 */
export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: StepItem[];
}

/**
 * A guide article under /guides. These carry no downloader form: they exist to
 * answer a device-specific question ("where did the file go on my iPhone?")
 * that the tool pages cannot answer without burying their own H1 in caveats,
 * and they hand the reader back to the right tool page at the end.
 */
export interface GuidePageCopy {
  /** Final URL segment. The full path is derived — see lib/guides#guidePath. */
  slug: string;
  navLabel: string;
  icon: IconName;

  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;

  /** H1. Distinct from metaTitle, which carries the brand suffix. */
  title: string;
  /** Standfirst under the H1. */
  intro: string;
  /** One line on the /guides index card. Shorter than the intro. */
  summary: string;
  lastUpdated: string;

  sections: GuideSection[];
  faq: FaqItem[];

  /** Tool page this guide sends the reader to, and the button's label. */
  ctaPath: string;
  ctaLabel: string;
}
