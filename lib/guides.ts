import type { GuidePageCopy } from "@/types/content";

/**
 * The /guides section: device-specific how-tos that the tool pages cannot
 * carry themselves.
 *
 * The split exists for a search reason and a product reason. A landing page
 * has one job — get a link pasted into the box — and every paragraph about
 * where iOS files land pushes that box further down the screen. Meanwhile
 * "how to download TikTok videos on iPhone" is its own query with its own
 * intent, and it deserves a page whose H1 answers it directly instead of a
 * subsection buried under a downloader.
 *
 * Every guide ends by handing the reader to a tool page, so the section feeds
 * the product rather than parking traffic in an article.
 */

/** Revision date shown on every guide. Bump when the instructions change. */
const LAST_UPDATED = "30 July 2026";

/** Copy for the section index at /guides. */
export const guidesIndexCopy = {
  path: "/guides",
  navLabel: "Guides",

  metaTitle: "TikTok Download Guides — Step-by-Step for iPhone, Android, and PC",
  metaDescription:
    "Short, device-specific walkthroughs for saving TikTok videos, photos, and audio — where the file lands on each platform and what to do when it does not appear.",

  title: "Guides",
  intro:
    "The downloader is the same everywhere; what differs is where your device puts the file afterwards and which browser quirks get in the way. These walkthroughs cover that part, one platform at a time.",
} as const;

const iphoneGuide: GuidePageCopy = {
  slug: "download-tiktok-on-iphone",
  navLabel: "On iPhone",
  icon: "device",

  metaTitle: "How to Download TikTok Videos on iPhone (No App, No Watermark)",
  metaDescription:
    "Save TikTok videos to your iPhone or iPad in Safari — no app, no shortcut, no watermark. Includes where the file lands and how to move it into Photos.",
  ogTitle: "How to Download TikTok Videos on iPhone",
  ogDescription:
    "Safari, no app, no watermark — and where iOS actually puts the file.",

  title: "How to download TikTok videos on iPhone",
  intro:
    "iOS makes this look harder than it is. There is no app to install and no shortcut to sideload — Safari can save the file on its own. The only genuinely confusing part is where iOS puts it afterwards, which is the part most instructions skip.",
  summary:
    "Save to Files in Safari, then move it into Photos — plus the fix for downloads that vanish.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "Save the video",
      steps: [
        {
          title: "Copy the link in TikTok",
          body: "Open the post, tap the arrow on the right, then Copy link. If you are on tiktok.com in Safari instead, the address in the URL bar works just as well.",
        },
        {
          title: "Open the downloader in Safari",
          body: "Go to the video downloader and tap Paste. Safari asks for clipboard permission the first time — allow it, and the field fills and submits in one action.",
        },
        {
          title: "Choose HD or standard",
          body: "Both are watermark-free. HD is the original upload and can be ten times larger, so on cellular the standard file is the kinder choice.",
        },
        {
          title: "Confirm the download",
          body: "Safari asks whether to download the file. Tap Download, and the blue arrow in the address bar shows the progress.",
        },
      ],
    },
    {
      heading: "Where the file goes",
      paragraphs: [
        "Safari does not put videos into Photos. It saves them into Files, under On My iPhone → Downloads, and that single fact accounts for nearly every 'the download disappeared' report.",
        "To move it: open Files, go to Downloads, long-press the video, then choose Save Video. It appears in Photos, in your camera roll, at that point.",
      ],
      bullets: [
        "Tapping the blue arrow beside the address bar in Safari jumps straight to the file you just saved.",
        "If your Downloads location is set to iCloud Drive, the file lands there instead of on the device — check Settings → Apps → Safari → Downloads if you cannot find it.",
        "Photos, unlike Files, strips nothing and re-compresses nothing on import. Moving the file across costs you no quality.",
      ],
    },
    {
      heading: "Photos, slideshows, and audio",
      paragraphs: [
        "Photo posts behave slightly differently. Individual images can be long-pressed straight out of the result grid and saved to Photos directly, skipping the Files detour entirely.",
        "A whole slideshow taken as a ZIP stays in Files — iOS can unzip it in place: tap the archive once and a folder of the same name appears beside it.",
        "Audio saved as MP3 or M4A also lands in Files. The built-in player opens it on a tap; to get it into a music library, share it from Files into whichever app you use.",
      ],
    },
    {
      heading: "If it does not work",
      bullets: [
        "Opened from inside TikTok's own browser? Tap the three dots and choose Open in Safari. In-app browsers on iOS block file downloads outright.",
        "Nothing pasted? Safari's clipboard prompt was probably declined. Tap and hold the field and choose Paste manually.",
        "Download failed part-way on a large HD file? Cellular connections drop these often — retry on Wi-Fi, or take the standard file instead.",
        "Low Data Mode pauses Safari downloads in the background. Turn it off in Settings → Cellular while a big file is coming down.",
      ],
    },
  ],

  faq: [
    {
      question: "Do I need an app to download TikTok videos on iPhone?",
      answer:
        "No. Safari can download and save files on its own since iOS 13. Any app claiming to be required for this is asking for permissions it does not need to do a job the browser already does.",
    },
    {
      question: "Why is the video in Files instead of Photos?",
      answer:
        "Because that is where Safari puts every download. It is not an error. Open Files, go to On My iPhone → Downloads, long-press the video, and choose Save Video to move it into Photos.",
    },
    {
      question: "Does saving from TikTok's own Save video button work?",
      answer:
        "It works, but the file it produces carries the animated TikTok logo and the creator's @handle burned into the frame, and many creators disable the button entirely. Downloading through this site gives you the unstamped file regardless of that setting.",
    },
    {
      question: "Can I do this on an iPad?",
      answer:
        "Yes, identically. iPadOS Safari uses the same download flow and the same Files → Downloads location.",
    },
    {
      question: "Does it work in Chrome on iPhone?",
      answer:
        "Yes. Every iOS browser is built on the same underlying engine, so the download behaves the same way. Chrome keeps its own Downloads list, reachable from the three-dot menu.",
    },
  ],

  ctaPath: "/",
  ctaLabel: "Open the video downloader",
};

const androidGuide: GuidePageCopy = {
  slug: "download-tiktok-on-android",
  navLabel: "On Android",
  icon: "device",

  metaTitle: "How to Download TikTok Videos on Android (Browser, No App)",
  metaDescription:
    "Save TikTok videos on any Android phone using Chrome — no APK, no watermark. Where the file lands, how to get it into your gallery, and what to do if it stalls.",
  ogTitle: "How to Download TikTok Videos on Android",
  ogDescription: "Chrome, no APK, no watermark — and where the file lands.",

  title: "How to download TikTok videos on Android",
  intro:
    "Android is the easy platform for this: the browser downloads straight to shared storage and the gallery picks it up on its own. Two things still trip people up — the in-app browser, and the gallery not refreshing — and both take seconds to fix.",
  summary:
    "Chrome downloads it straight to storage — plus the fix for a gallery that will not refresh.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "Save the video",
      steps: [
        {
          title: "Copy the link in TikTok",
          body: "Tap Share on the post, then Copy link. The short vm.tiktok.com address that produces is exactly as good as the long one.",
        },
        {
          title: "Open the downloader in Chrome",
          body: "Go to the video downloader and tap Paste. Chrome shows a one-time clipboard prompt; allow it and the link submits itself.",
        },
        {
          title: "Pick a format",
          body: "HD is the original upload and is much larger. On a metered plan the standard file gives you the same clean frame for a fraction of the data.",
        },
        {
          title: "Let it download",
          body: "Chrome starts immediately and reports progress in the notification shade. Tap the finished notification to open the file.",
        },
      ],
    },
    {
      heading: "Where the file goes",
      paragraphs: [
        "Chrome saves to the shared Download folder — reachable through the Files app, or through Chrome's own Downloads screen in the three-dot menu.",
        "Most gallery apps index that folder automatically and the video shows up within a few seconds. When it does not, the media scanner simply has not run yet.",
      ],
      bullets: [
        "Gallery not showing it? Reboot, or open the video once from the Files app — either forces a media rescan.",
        "Samsung devices sometimes file browser downloads under a separate Downloads album rather than mixing them into Camera. It is the same file.",
        "To keep sets together, move a batch into its own folder in the Files app. The gallery treats each folder as an album.",
      ],
    },
    {
      heading: "Slideshows and audio",
      paragraphs: [
        "A slideshow ZIP lands in Download like anything else. Android's Files app extracts it in place: tap the archive, then Extract, and the numbered images appear alongside it.",
        "MP3 and M4A files also go to Download. Most Android music players index that folder by default, so the track usually appears in your library on its own.",
      ],
    },
    {
      heading: "If it does not work",
      bullets: [
        "Opened from inside TikTok? Tap the three dots and choose Open in browser. TikTok's in-app browser blocks downloads and is the single most common cause of a button that appears to do nothing.",
        "'Storage permission' error? Chrome needs file access — grant it in Settings → Apps → Chrome → Permissions → Files and media.",
        "Download stuck at 0%? That is usually a captive Wi-Fi portal or a VPN interfering. Switch networks and retry.",
        "Data Saver compresses aggressively and can stall large downloads. Turn it off before pulling an HD file.",
      ],
    },
  ],

  faq: [
    {
      question: "Do I need to install an APK to download TikTok videos?",
      answer:
        "No, and you should not. A browser download needs no app at all. Sideloaded downloader APKs routinely ask for storage, contacts, and overlay permissions that have nothing to do with saving a video.",
    },
    {
      question: "Where do downloaded TikTok videos go on Android?",
      answer:
        "Into the shared Download folder. Open the Files app and look under Downloads, or use Chrome's own Downloads screen from the three-dot menu.",
    },
    {
      question: "Why can't I see the video in my gallery?",
      answer:
        "The media scanner has not indexed it yet. Opening the file once from the Files app or rebooting the phone forces a rescan and it appears.",
    },
    {
      question: "The download button does nothing. What is wrong?",
      answer:
        "You are almost certainly inside TikTok's in-app browser, which blocks file downloads. Use the three-dot menu to open the page in Chrome and try again.",
    },
    {
      question: "Does this work on Samsung Internet or Firefox?",
      answer:
        "Yes. Any modern Android browser handles the download; only the location of the Downloads list differs between them.",
    },
  ],

  ctaPath: "/",
  ctaLabel: "Open the video downloader",
};

const pcGuide: GuidePageCopy = {
  slug: "download-tiktok-on-pc",
  navLabel: "On PC or Mac",
  icon: "desktop",

  metaTitle: "How to Download TikTok Videos on PC and Mac (No Software)",
  metaDescription:
    "Save TikTok videos on a desktop browser — Windows, macOS, or Linux. No software to install, no watermark, and the fastest way to collect several posts in a row.",
  ogTitle: "How to Download TikTok Videos on PC and Mac",
  ogDescription: "Any desktop browser, no software, no watermark.",

  title: "How to download TikTok videos on PC and Mac",
  intro:
    "Desktop is the most comfortable place to do this. There is nothing to install, the link is already in your address bar, and a wired connection makes the large HD files painless — which matters if you are collecting more than one.",
  summary:
    "The fastest platform for this, and the best one for saving several posts in a row.",
  lastUpdated: LAST_UPDATED,

  sections: [
    {
      heading: "Save the video",
      steps: [
        {
          title: "Get the link",
          body: "Open the post on tiktok.com and copy the address straight from the browser bar, or use the Share button and Copy link. Both resolve to the same post.",
        },
        {
          title: "Paste it into the downloader",
          body: "Open the video downloader in another tab and paste with Ctrl+V, or Cmd+V on a Mac. Press Enter to submit.",
        },
        {
          title: "Choose your file",
          body: "The result card lists HD video, standard video, and audio, each with its size. On a desktop connection there is rarely a reason not to take HD.",
        },
        {
          title: "Find it in Downloads",
          body: "The file goes to your usual downloads folder with the post's caption as its name. Ctrl+J, or Cmd+Shift+J on a Mac, opens the browser's download list.",
        },
      ],
    },
    {
      heading: "Saving several in a row",
      paragraphs: [
        "Desktop is where batches make sense. The pattern that works: middle-click several posts to open them in background tabs, then work through them, pasting one link at a time.",
        "Browsers do throttle rapid consecutive downloads and will start asking for confirmation. Allowing multiple automatic downloads for this site, in your browser's site settings, removes the prompts.",
      ],
      bullets: [
        "For a slideshow, take the ZIP rather than clicking each image — one file instead of forty, and the browser stops objecting.",
        "Rename as you go if the captions are similar. Two posts with the same first eighty characters produce filenames that differ only by a suffix your browser adds.",
        "Nothing here needs an extension. Downloader extensions ask to read and change data on every site you visit, which is a steep price for a paste box.",
      ],
    },
    {
      heading: "Editing what you saved",
      paragraphs: [
        "The MP4 is standard H.264 and imports into Premiere, Resolve, Final Cut, CapCut, and every free editor without conversion.",
        "Because there is no watermark and no crop, the frame arrives at its original dimensions — usually 1080x1920 — so a vertical timeline needs no reframing.",
        "Slideshow images come out numbered in sequence, which means dropping the whole folder onto a timeline preserves the creator's order automatically.",
      ],
    },
    {
      heading: "If it does not work",
      bullets: [
        "A tiktok.com URL with tracking parameters attached still works — they are stripped before the lookup, so there is no need to clean the link by hand.",
        "Corporate networks and some DNS filters block TikTok's CDN hosts. If the page resolves the post but the download stalls, that filter is why.",
        "Private, deleted, and region-locked posts cannot be fetched by any tool. The lookup returns empty rather than guessing.",
      ],
    },
  ],

  faq: [
    {
      question: "Do I need software to download TikTok videos on PC?",
      answer:
        "No. Everything runs in the browser. Desktop downloader programs for this exist mainly as a delivery mechanism for bundled extras, and none of them can obtain a better file than the one TikTok's own servers hand out.",
    },
    {
      question: "Does this work on a Mac?",
      answer:
        "Yes, in Safari, Chrome, Firefox, and Edge alike. Files go to your Downloads folder and Cmd+Shift+J opens the download list in Chrome; Safari's is the arrow in the toolbar.",
    },
    {
      question: "Can I download several TikTok videos at once?",
      answer:
        "One link at a time, but nothing stops you working through a row of tabs quickly. For a photo post, Download all as ZIP takes the entire set in a single request rather than one image at a time.",
    },
    {
      question: "Why does my browser ask permission for multiple downloads?",
      answer:
        "It is a built-in safeguard against pages that trigger download bursts. Allowing multiple automatic downloads for this site in your browser's site settings stops the prompt.",
    },
    {
      question: "Is a browser extension safer than this page?",
      answer:
        "Generally the opposite. An extension that downloads TikTok videos needs permission to read and change data on the sites you visit, which is far broader access than a page you paste a link into and close.",
    },
  ],

  ctaPath: "/hd",
  ctaLabel: "Open the HD downloader",
};

/** Every guide, in the order they appear in the index, footer, and sitemap. */
export const guidePages: readonly GuidePageCopy[] = [
  iphoneGuide,
  androidGuide,
  pcGuide,
] as const;

/** The one place a guide's URL is assembled. */
export function guidePath(slug: string): string {
  return `${guidesIndexCopy.path}/${slug}`;
}

export function findGuide(slug: string): GuidePageCopy | undefined {
  return guidePages.find((guide) => guide.slug === slug);
}
