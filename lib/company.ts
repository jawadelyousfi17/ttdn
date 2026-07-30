import type { LegalPageCopy } from "@/types/content";

/**
 * About and Contact.
 *
 * They share the LegalPageCopy shape and the ProseDocument renderer because
 * they are the same kind of artefact — a structured prose page with no
 * downloader on it — and giving them a parallel type would have bought a
 * second renderer that drifts typographically from the first.
 *
 * `{email}` is substituted at render with lib/site#contactEmail, exactly as it
 * is in the legal copy.
 */

const LAST_UPDATED = "30 July 2026";

export const aboutCopy: LegalPageCopy = {
  path: "/about",
  navLabel: "About",
  metaTitle: "About",
  metaDescription:
    "What this TikTok downloader is, how it gets a watermark-free file, what it deliberately does not do, and who is behind it.",

  title: "About this site",
  intro:
    "A single-purpose tool: paste a TikTok link, get the file. This page explains how that actually works, and where the limits are — including the ones we could remove and choose not to.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "What it does",
      paragraphs: [
        "You paste the link to a public TikTok post. We ask TikTok's own infrastructure what that post contains, and hand you back every file it holds: the video without a watermark, the audio on its own, and the images if it is a photo post.",
        "There are four downloaders on the site and they share one pipeline. They differ in what they lead with — the clean frame, the resolution, the audio, the images — because those are different things to come looking for, not because they are different tools.",
      ],
    },
    {
      heading: "How the watermark-free file is obtained",
      paragraphs: [
        "TikTok stores more than one rendition of a post. One has the animated logo and the creator's @handle drawn over it; another does not. We request the second one by name.",
        "This is worth stating plainly because most tools in this category do something else: they take the stamped file and crop the edges off or paint a blur over the corner. Both leave visible damage, and both require re-encoding the video, which costs quality a second time. Nothing on this site is re-encoded — the bytes that reach your device are the bytes TikTok served.",
      ],
    },
    {
      heading: "What it deliberately does not do",
      bullets: [
        "No accounts. There is nothing to sign up for, so there is no profile of you to build.",
        "No download history. We never record which posts you looked up.",
        "No cookies, analytics, or advertising trackers on any page.",
        "No private posts. The tool can only reach what is publicly visible, and no amount of engineering changes that — a private post is private at TikTok's end.",
        "No re-encoding, no upscaling, and no '4K' claim on a file that was never shot in 4K.",
      ],
    },
    {
      heading: "What it costs and why",
      paragraphs: [
        "Nothing, and there is no account tier that changes that. The running costs are a lookup provider billed per request and ordinary hosting, both of which are small at this scale.",
        "There is a light rate limit per IP address. It exists to stop automated traffic from exhausting the request quota that keeps the site free for everyone else; normal use never reaches it.",
      ],
    },
    {
      heading: "Independence",
      paragraphs: [
        "This is an independent project. It is not affiliated with, endorsed by, or connected to TikTok or ByteDance, and it does not represent them in any capacity.",
        "The files belong to the people who made them. Downloading a video for your own offline viewing is one thing; republishing someone's work, monetising it, or stripping their credit is another, and the second one is on you.",
      ],
    },
    {
      heading: "Getting in touch",
      paragraphs: [
        "Copyright notices, privacy requests, and anything else reach us at {email}. The contact page sets out what to include so a request can actually be acted on.",
      ],
    },
  ],
};

export const contactCopy: LegalPageCopy = {
  path: "/contact",
  navLabel: "Contact",
  metaTitle: "Contact",
  metaDescription:
    "How to reach us about copyright notices, privacy requests, bug reports, and everything else — including what to include so a request can be acted on.",

  title: "Contact",
  intro:
    "One address handles everything: {email}. What follows is what to put in the message so it can be dealt with on the first reply rather than the third.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "Copyright and takedown notices",
      paragraphs: [
        "If content you own the rights to is reachable through this service, write to {email} with COPYRIGHT in the subject line. The DMCA page sets out the full requirements; the short version is below.",
      ],
      bullets: [
        "The exact URL on this site, and the TikTok post it resolves to.",
        "A description of the work and evidence that you hold the rights to it.",
        "Your contact details, and a statement that the complaint is made in good faith.",
      ],
    },
    {
      heading: "Privacy requests",
      paragraphs: [
        "There is no account system and no database of users, so in most cases there is nothing held about you to export or erase. Rate-limit counters and cached lookups live in server memory for minutes to an hour and then cease to exist.",
        "If you still want that confirmed in writing, ask at {email} with PRIVACY in the subject line.",
      ],
    },
    {
      heading: "Bugs and broken links",
      paragraphs: [
        "A report is far more useful with the link that failed in it. Without one there is usually no way to reproduce the problem.",
      ],
      bullets: [
        "The TikTok link you pasted, exactly as you pasted it.",
        "What you expected and what appeared instead, including any error text.",
        "Your device and browser — 'iPhone, Safari' is enough detail.",
      ],
    },
    {
      heading: "What we cannot help with",
      bullets: [
        "Recovering a deleted TikTok post. Once TikTok removes it, it is gone upstream and no tool can retrieve it.",
        "Accessing private or age-restricted posts. That restriction is enforced at TikTok's end, by design.",
        "Anything to do with your TikTok account — logins, bans, appeals. We have no relationship with TikTok and no ability to act on their platform.",
        "Clearing the rights to reuse someone else's video or music. That is a conversation with the rights holder, not with us.",
      ],
    },
    {
      heading: "Response times",
      paragraphs: [
        "This is a small project, not a support desk. Copyright notices are handled first and usually within a few working days. Everything else is answered when there is time, and a message that already contains the details above is answered considerably faster.",
      ],
    },
  ],
};

/** The non-legal prose pages, for the footer and the sitemap. */
export const companyPages: readonly LegalPageCopy[] = [aboutCopy, contactCopy] as const;
