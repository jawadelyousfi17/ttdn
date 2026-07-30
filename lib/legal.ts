import type { LegalPageCopy } from "@/types/content";

/**
 * Copy for the three legal pages.
 *
 * Two conventions worth knowing before editing:
 *
 *  - `{email}` is substituted at render with lib/site#contactEmail, so the
 *    address lives in configuration rather than being duplicated a dozen times
 *    through prose that would inevitably fall out of sync.
 *  - The privacy claims describe what the code in this repository actually
 *    does. If you add analytics, cookies, a database, or any third-party
 *    script, that page becomes false the moment you ship — update it in the
 *    same commit.
 */

/** Revision date shown on every policy. Bump when the substance changes. */
const LAST_UPDATED = "30 July 2026";

export const privacyCopy: LegalPageCopy = {
  path: "/privacy",
  navLabel: "Privacy",
  metaTitle: "Privacy Policy",
  metaDescription:
    "What this site collects when you use the TikTok downloader, what it does not collect, and how long anything is kept. No accounts, no cookies, no trackers.",

  title: "Privacy Policy",
  intro:
    "TikTok Downloader is a tool you paste a link into. There is no account to create, so there is very little about you for us to hold in the first place. This page describes exactly what happens to the data that does pass through.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "The short version",
      paragraphs: [
        "We do not use cookies, we do not run analytics or advertising trackers, and we do not build a profile of you. We never store a history of what you have downloaded. The TikTok links you submit are held briefly in server memory to avoid repeating work, and then they are gone.",
      ],
    },
    {
      heading: "What passes through the service",
      bullets: [
        "The TikTok link you submit. It is sent to our lookup provider so the post can be resolved, and it is held in a short-lived in-memory cache so that submitting the same link twice does not trigger a second lookup.",
        "Your IP address. It is used to enforce rate limits, which is what stops automated traffic from exhausting the service. It is held in server memory as a counter, not written to a database.",
        "Standard request information — the page requested, the time, your browser's user-agent string — as recorded in ordinary server logs by our hosting provider.",
      ],
    },
    {
      heading: "What we do not do",
      bullets: [
        "No cookies are set by this site, for any purpose, including analytics.",
        "No analytics, advertising, fingerprinting, or session-replay scripts run on these pages.",
        "No account, email address, or payment detail is ever requested.",
        "No record is kept linking you to the posts you looked up or the files you saved.",
        "Nothing is sold, rented, or shared with data brokers.",
      ],
    },
    {
      heading: "How long anything is kept",
      paragraphs: [
        "Resolved post information is cached in server memory for up to one hour, then discarded. Rate-limit counters expire within minutes. Both live in the memory of a running server process — when that process restarts, they are gone, and neither is written to disk.",
        "Server logs are retained by our hosting provider under their own retention schedule, which is typically measured in days to weeks.",
      ],
    },
    {
      heading: "Third parties involved in a download",
      paragraphs: [
        "Resolving a link requires sending it to a third-party TikTok data provider accessed through RapidAPI. That provider receives the link. It does not receive your IP address, because the request is made by our server rather than by your browser.",
        "When you save a file, your browser requests it from our server, and our server fetches it from TikTok's content delivery network and streams it back to you. TikTok therefore sees our server, not you. This is a side effect of how the proxy works rather than a privacy feature we are promising to maintain.",
        "Fonts are served from our own domain. No request is made to Google Fonts or any other font host while you browse.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on where you live, you may have the right to access, correct, export, or delete personal data an organisation holds about you, and to object to its processing.",
        "We mention these rights in good faith while being straightforward about the practical position: because there are no accounts and nothing durable is stored, in almost every case we simply hold no personal data about you to produce or erase. If you believe otherwise, write to us at {email} and we will look into it.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "This service is not directed at children under 13, and we do not knowingly collect personal information from them. Since we collect no personal information from anyone, this is a statement of intent rather than a screening process.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "Traffic is served over HTTPS. That said, no internet service can promise perfect security, and we do not claim to be an exception. The strongest protection here is structural rather than procedural: there is no store of user data to breach, because we do not build one.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If this policy changes materially, the revision date at the top of the page will change with it. Continuing to use the service after a change means you accept the updated policy.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about privacy can be sent to {email}.",
      ],
    },
  ],
};

export const termsCopy: LegalPageCopy = {
  path: "/terms",
  navLabel: "Terms",
  metaTitle: "Terms of Service",
  metaDescription:
    "The terms covering use of this TikTok downloader: what the service does, what you are responsible for, acceptable use, and the limits of any warranty.",

  title: "Terms of Service",
  intro:
    "These terms cover your use of TikTok Downloader. They are written to be read rather than skimmed past, and the substance is ordinary: use the tool responsibly, respect the people who made the content, and understand that a free service comes with no guarantees.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "Accepting these terms",
      paragraphs: [
        "By using TikTok Downloader you agree to these terms. If you do not agree with them, please do not use the service. There is no account to close — simply stop using the site.",
      ],
    },
    {
      heading: "What the service does",
      paragraphs: [
        "TikTok Downloader takes a link to a publicly visible TikTok post, retrieves the media associated with that post, and passes it to your browser as a file download. It works only with posts that are already public. It does not bypass privacy settings, unlock private accounts, defeat access controls, or reach anything that is not openly viewable on TikTok.",
        "We host no content of our own. Every file you receive originates from TikTok's servers and is passed through ours in transit.",
      ],
    },
    {
      heading: "Your responsibilities",
      bullets: [
        "You are solely responsible for what you download and for what you do with it afterwards.",
        "Content on TikTok belongs to the people who created it, and often to third parties who licensed the music in it. Downloading does not transfer any of those rights to you.",
        "Saving a post for personal, offline viewing is generally acceptable in most jurisdictions. Republishing someone's work, using it commercially, presenting it as your own, or stripping the creator's credit generally is not.",
        "You are responsible for complying with the law where you live, and with TikTok's own terms as they apply to you.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Use bots, scrapers, or scripted clients against the service, or attempt to work around its rate limits.",
        "Resell access to the service, or wrap it inside your own product or API.",
        "Use it to infringe copyright, harass anyone, or distribute unlawful material.",
        "Attempt to disrupt, overload, probe, or reverse-engineer the service or its infrastructure.",
      ],
    },
    {
      heading: "Availability",
      paragraphs: [
        "TikTok Downloader is provided free and without any guarantee of uptime. Features may change or disappear, and the service may be suspended or discontinued at any time without notice.",
        "It depends on third-party services and on TikTok's own systems, which change without warning. Periods where lookups fail are expected rather than exceptional.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "The service is provided \"as is\" and \"as available\", without warranties of any kind, whether express or implied, including any implied warranty of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the service will be uninterrupted, error-free, or that any particular post will resolve successfully.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, revenue, or profits, arising out of your use of or inability to use the service.",
        "Some jurisdictions do not allow certain limitations of liability, in which case those limitations apply only to the extent permitted there.",
      ],
    },
    {
      heading: "Indemnity",
      paragraphs: [
        "You agree to hold us harmless from claims arising out of your use of the service or your breach of these terms — most obviously, claims brought by a rights holder over content you downloaded and then republished.",
      ],
    },
    {
      heading: "No affiliation with TikTok",
      paragraphs: [
        "TikTok Downloader is an independent project. It is not affiliated with, endorsed by, sponsored by, or connected to TikTok, ByteDance, or any of their subsidiaries. TikTok is a trademark of its respective owner, used here only to describe what the tool works with.",
      ],
    },
    {
      heading: "Blocking access",
      paragraphs: [
        "We may block traffic that abuses the service, and we may do so without notice. In practice this means automated traffic and requests that exceed the rate limits.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "These terms may be updated. The revision date at the top of the page reflects the last substantive change, and continuing to use the service after a change means you accept the revised terms.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Questions about these terms can be sent to {email}."],
    },
  ],
};

export const dmcaCopy: LegalPageCopy = {
  path: "/dmca",
  navLabel: "Copyright",
  metaTitle: "Copyright and DMCA Policy",
  metaDescription:
    "How to send a copyright notice about this site, what we are able to act on, and why a takedown for TikTok content usually needs to go to TikTok directly.",

  title: "Copyright & DMCA",
  intro:
    "We respect copyright and will act on valid notices. Before writing one, it is worth understanding what this service actually does, because it determines whether we are the right people to contact.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "We host nothing",
      paragraphs: [
        "TikTok Downloader stores no media. It resolves a public TikTok link, then streams the file from TikTok's own content delivery network to the person who requested it. Nothing is uploaded to us, indexed by us, or kept on our servers.",
        "This matters for a takedown: because there is no copy on our side, there is no copy for us to remove. The content stays exactly where it has always been, on TikTok.",
      ],
    },
    {
      heading: "If your work is on TikTok without permission",
      paragraphs: [
        "The effective route is TikTok's own copyright reporting process. Removing the post at the source removes it everywhere, including from any tool that could otherwise resolve it. A notice sent to us cannot achieve that, because we are not the host.",
      ],
    },
    {
      heading: "What we can act on",
      bullets: [
        "Blocking specific posts or accounts from being resolved by this service, where we are able to do so.",
        "Removing any material that genuinely does reside on our own site or pages.",
        "Restricting access for users who repeatedly use the service to infringe copyright.",
      ],
    },
    {
      heading: "Sending a notice",
      paragraphs: [
        "Send copyright notices to {email} with the subject line \"DMCA Notice\". To be actionable under 17 U.S.C. § 512(c)(3), your notice must include all of the following:",
      ],
      bullets: [
        "A physical or electronic signature of the copyright owner, or of someone authorised to act for them.",
        "Identification of the copyrighted work you claim has been infringed.",
        "Identification of the material you are complaining about, with enough detail for us to locate it — the specific TikTok post URL, not a profile or a search result.",
        "Your contact details: name, address, telephone number, and email address.",
        "A statement that you believe in good faith that the use is not authorised by the copyright owner, its agent, or the law.",
        "A statement that the information in your notice is accurate, and, under penalty of perjury, that you are the copyright owner or authorised to act on their behalf.",
      ],
    },
    {
      heading: "Notices sent in bad faith",
      paragraphs: [
        "Under 17 U.S.C. § 512(f), knowingly misrepresenting that material is infringing carries liability for damages, including costs and legal fees. Please be certain before sending a notice, particularly where the use may be fair use, licensed, or your own.",
      ],
    },
    {
      heading: "Counter-notice",
      paragraphs: [
        "If we restricted something of yours and you believe that was a mistake or a misidentification, you can send a counter-notice to the same address. It should identify the material, state under penalty of perjury that you believe in good faith it was removed in error, and provide your contact details along with your consent to the jurisdiction of an appropriate court.",
      ],
    },
    {
      heading: "Repeat infringers",
      paragraphs: [
        "We restrict access for users who repeatedly use the service to infringe copyright, in the circumstances the law requires.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Copyright correspondence: {email}. Notices missing the elements listed above may not be actionable, and we may ask you to resend a complete one.",
      ],
    },
  ],
};

/** Every legal page, in the order they appear in the footer and the sitemap. */
export const legalPages: readonly LegalPageCopy[] = [
  privacyCopy,
  termsCopy,
  dmcaCopy,
] as const;
