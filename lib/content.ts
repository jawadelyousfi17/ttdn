import type { PageCopy } from "@/types/content";

/**
 * Every user-facing string on the site. The project is English-only by design,
 * so copy lives in typed constants rather than a runtime dictionary — pages
 * import what they need and TypeScript catches a missing field at build time
 * instead of rendering an empty span in production.
 */

/** Chrome, form, and result-card labels shared by all four landing pages. */
export const ui = {
  skipToContent: "Skip to content",

  nav: {
    toolsLabel: "Tools",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  form: {
    label: "TikTok link",
    placeholder: "Drop a TikTok link here",
    paste: "Paste",
    clear: "Clear input",
    submit: "Get files",
    submitting: "Fetching",
    hint: "Works with tiktok.com links and vm/vt short links.",
    errorInvalid: "That is not a TikTok link. Check the URL and try once more.",
    errorClipboard: "Your browser blocked clipboard access. Paste the link manually.",
    errorFetch:
      "Nothing came back for this post. It may be private, deleted, or region-locked.",
    errorRateLimit: "You are going faster than our limit allows. Give it a minute.",
    errorServer: "Our end tripped over something. Try that link again.",
  },

  result: {
    by: "Posted by",
    views: "views",
    likes: "likes",
    photoCount: "{count} images in this post",
    downloadHd: "HD video",
    downloadStandard: "Standard video",
    downloadAudio: "Audio only",
    downloadPhoto: "Save",
    downloadAll: "Download all as ZIP",
    preparingZip: "Packing ZIP",
    reset: "Start over",
    heading: "Ready to save",
    errorHeading: "That did not work",
  },

  footer: {
    blurb:
      "A single-purpose tool: paste a TikTok link, get the file. No account, no queue, no upsell.",
    toolsHeading: "Downloaders",
    guidesHeading: "Guides",
    companyHeading: "Site",
    legalHeading: "Legal",
    rights: "All rights reserved.",
    disclaimer:
      "TikTok Downloader is an independent project and is not affiliated with, endorsed by, or connected to TikTok or ByteDance. Download only what you have the right to use, and credit the people who made it.",
  },

  notFound: {
    code: "404",
    title: "Nothing lives at this URL",
    body: "The page moved or never existed. The downloader is one click away.",
    action: "Back to the downloader",
  },

  error: {
    title: "Something broke on this page",
    body: "This is on us, not on your link. Retry and the page will rebuild itself.",
    action: "Retry",
  },
} as const;

/** Home — the general video downloader. */
export const homeCopy: PageCopy = {
  path: "/",
  navLabel: "Video",

  metaTitle: "TikTok Downloader — Save TikTok Videos in HD Without Watermark",
  metaDescription:
    "Paste a TikTok link and get the source MP4 back, watermark-free and in the highest quality TikTok stores. No account, no app, no limits.",
  ogTitle: "TikTok Downloader — No Watermark, Full Quality",
  ogDescription:
    "Paste a TikTok link, get a clean HD MP4. No watermark, no account, no install.",

  h1: "Save TikTok videos in HD, watermark-free",
  subtitle:
    "Drop a link in the box below. We pull the file TikTok itself stores and hand it straight back — no logo burned into the corner, no re-encode, no quality lost on the way through.",

  highlights: [
    { icon: "shield", label: "Zero watermark" },
    { icon: "sparkle", label: "Source quality" },
    { icon: "wallet", label: "Free, unlimited" },
    { icon: "lock", label: "No links stored" },
  ],

  featuresEyebrow: "What makes it different",
  featuresTitle: "Built to do one job properly",
  featuresIntro:
    "Most downloaders re-wrap the video, slap on their own branding, or gate the good quality behind a signup. This one does none of that.",
  features: [
    {
      icon: "shield",
      title: "The frame stays clean",
      body: "You get the version without the bouncing TikTok logo and the @handle overlay — the same pixels the creator uploaded, edge to edge.",
    },
    {
      icon: "bolt",
      title: "No second re-encode",
      body: "We never transcode. The MP4 that reaches your device is byte-for-byte what TikTok's own CDN serves, so nothing softens the detail a second time.",
    },
    {
      icon: "lock",
      title: "Nothing is kept",
      body: "No accounts, no download history, no link log tied to you. A resolved post sits in a short-lived memory cache and ages out on its own.",
    },
    {
      icon: "device",
      title: "Phone-first, everywhere",
      body: "The whole flow is one paste and one tap, sized for a thumb. It behaves the same in Safari on iOS, Chrome on Android, and any desktop browser.",
    },
  ],

  stepsEyebrow: "The whole process",
  stepsTitle: "Three moves, about ten seconds",
  steps: [
    {
      title: "Copy the link in TikTok",
      body: "Open the post, hit Share, then Copy link. The short vm.tiktok.com and vt.tiktok.com links work exactly as well as the long ones.",
    },
    {
      title: "Paste it above",
      body: "Use the Paste button and the field fills and submits in one go. We check the URL shape before spending a request on it.",
    },
    {
      title: "Pick your file",
      body: "The result card lists every version the post has — HD video, standard video, audio. Tap one and it lands in your downloads folder.",
    },
  ],

  formatsTitle: "What comes back",
  formatsIntro:
    "One link resolves to every version the post carries. Nothing is locked behind a tier.",
  formats: [
    {
      format: "MP4",
      label: "HD video",
      detail: "Highest resolution stored for the post, watermark removed",
    },
    {
      format: "MP4",
      label: "Standard video",
      detail: "Smaller file, same clean frame — handy on mobile data",
    },
    {
      format: "MP3",
      label: "Audio track",
      detail: "The original sound on its own, no video attached",
    },
  ],

  faqTitle: "Questions people actually ask",
  faqIntro: "Short answers, no marketing detour.",
  faq: [
    {
      question: "How do I download a TikTok video?",
      answer:
        "Open the post in TikTok, tap Share and then Copy link. Paste that link into the field at the top of this page and press Get files. The result card appears with every available format — pick one and the browser saves it.",
    },
    {
      question: "Will the file have the TikTok watermark on it?",
      answer:
        "No. We request the version without the animated logo and username overlay, so what you save is the clean frame the creator uploaded.",
    },
    {
      question: "What quality do I get?",
      answer:
        "The highest TikTok kept for that post. If the creator uploaded in HD, an HD button appears. If they filmed at a lower resolution, no tool can invent detail that was never recorded — you get the true source instead of an upscaled fake.",
    },
    {
      question: "Do I need an account or an app?",
      answer:
        "Neither. There is nothing to sign up for and nothing to install. The page works in any modern browser, including the in-app browsers inside TikTok, Instagram, and Telegram.",
    },
    {
      question: "Is there a download limit?",
      answer:
        "There is no per-user cap. A light rate limit runs per IP address to keep automated traffic from swamping the service, and normal use never comes close to it.",
    },
    {
      question: "Can I download private or age-restricted posts?",
      answer:
        "No. This tool can only reach posts that are publicly visible. If a post is private, deleted, or blocked in the server's region, the lookup comes back empty and we say so instead of guessing.",
    },
    {
      question: "Is it legal to download TikTok videos?",
      answer:
        "Saving a video for personal offline viewing is generally fine in most places. Reposting someone else's work, monetising it, or stripping their credit is not. The tool gives you the file; using it responsibly is on you.",
    },
  ],
};

/** /mp3 — audio extraction. */
export const mp3Copy: PageCopy = {
  path: "/mp3",
  navLabel: "MP3",

  metaTitle: "TikTok to MP3 — Extract Audio From Any TikTok Video",
  metaDescription:
    "Turn any public TikTok into a clean MP3. Paste the link and save the original sound — songs, voiceovers, and original audio, with nothing layered on top.",
  ogTitle: "TikTok to MP3 Converter",
  ogDescription: "Paste a TikTok link and save the original sound as an MP3.",

  h1: "Pull the audio out of any TikTok",
  subtitle:
    "Sometimes the sound is the whole point. Paste a link and we hand back the track on its own as an MP3 — the untouched original, without a spoken watermark announcing where it came from.",

  highlights: [
    { icon: "music", label: "Clean MP3" },
    { icon: "shield", label: "No voice tag" },
    { icon: "bolt", label: "Ready in seconds" },
    { icon: "wallet", label: "Free, unlimited" },
  ],

  featuresEyebrow: "Why grab the audio",
  featuresTitle: "For the sound, not the video",
  featuresIntro:
    "Trending audio moves faster than the videos built on it. Getting the raw track is the difference between reacting today and reacting next week.",
  features: [
    {
      icon: "music",
      title: "The original track, untouched",
      body: "No intro jingle, no robotic voice reading out a website name. The MP3 starts where the sound starts and ends where it ends.",
    },
    {
      icon: "layers",
      title: "Slideshows count too",
      body: "Photo carousels carry audio just like videos do. Paste a slideshow link and the sound button shows up in the same place.",
    },
    {
      icon: "bolt",
      title: "No conversion queue",
      body: "There is no waiting room and no progress bar to babysit. The audio URL resolves with the rest of the post and downloads immediately.",
    },
    {
      icon: "clock",
      title: "Full length, not a preview",
      body: "You get the complete track as the post carries it, not a clipped thirty-second sample that cuts out mid-phrase.",
    },
  ],

  stepsEyebrow: "How to convert",
  stepsTitle: "From link to MP3",
  steps: [
    {
      title: "Copy the post link",
      body: "Any public TikTok works — a normal video, a slideshow, or a duet. Share, then Copy link.",
    },
    {
      title: "Paste and fetch",
      body: "Drop it into the field above. We resolve the post and read the audio stream attached to it.",
    },
    {
      title: "Tap Audio only",
      body: "Skip the video buttons and use the audio one. The file saves as an .mp3 named after the post.",
    },
  ],

  formatsTitle: "What you get",
  formatsIntro: "The audio route returns the sound, and the video stays available if you change your mind.",
  formats: [
    {
      format: "MP3",
      label: "Original audio",
      detail: "The post's sound in full, exactly as TikTok stores it",
    },
    {
      format: "M4A",
      label: "When the source is AAC",
      detail: "Some posts are stored as AAC — we label those honestly, never a fake .mp3",
    },
    {
      format: "MP4",
      label: "Video, if you want it",
      detail: "The same result card still offers the watermark-free video",
    },
  ],

  faqTitle: "TikTok to MP3 questions",
  faqIntro: "Everything specific to pulling audio.",
  faq: [
    {
      question: "How do I save TikTok audio as an MP3?",
      answer:
        "Paste any public TikTok link at the top of this page. When the result card appears, use the audio button rather than the video ones — the browser saves an .mp3 file straight away.",
    },
    {
      question: "Does the MP3 have a spoken watermark?",
      answer:
        "No. Some converters splice in a voice reading out their own domain name. We return the sound exactly as the post carries it, with nothing added at either end.",
    },
    {
      question: "What bitrate is the file?",
      answer:
        "Whatever TikTok serves for that post, which is typically around 128 kbps. That is the ceiling for the source, so nothing is lost in the handoff — a tool promising 320 kbps from a TikTok is padding a smaller file, not adding detail.",
    },
    {
      question: "Why did my download arrive as .m4a instead of .mp3?",
      answer:
        "Because that post's audio was stored as AAC rather than MP3, and we name the file after what is actually inside it. Handing you an AAC stream labelled .mp3 is what causes the 'this file won't open' problem in older players. Every phone, browser, and modern player handles .m4a natively, and you can convert it if you need MP3 specifically.",
    },
    {
      question: "Can I get audio from a photo slideshow?",
      answer:
        "Yes. Carousel posts carry a sound track the same way videos do, and the audio button appears above the photo grid so you do not have to scroll past every image to reach it.",
    },
    {
      question: "Can I use the audio in my own video?",
      answer:
        "That depends on the track. Original audio recorded by the creator belongs to them, and licensed music belongs to its rights holder. Personal use is one thing; publishing or monetising someone else's sound is another. Check before you post.",
    },
  ],
};

/** /photos — single-image saves from photo posts. */
export const photosCopy: PageCopy = {
  path: "/photos",
  navLabel: "Photos",

  metaTitle: "TikTok Photo Downloader — Save Images From TikTok Posts",
  metaDescription:
    "Save images from TikTok photo posts at their original resolution. Paste the link, then take one picture or the whole set. No compression, no signup.",
  ogTitle: "TikTok Photo Downloader",
  ogDescription: "Save TikTok photo posts at full resolution. One image or all of them.",

  h1: "Save TikTok photos at full resolution",
  subtitle:
    "Screenshotting a photo post costs you resolution and adds your status bar to the frame. Paste the link instead and take the actual image files — every one of them, at the size they were uploaded.",

  highlights: [
    { icon: "images", label: "Original size" },
    { icon: "sparkle", label: "No re-compression" },
    { icon: "check", label: "One or all" },
    { icon: "wallet", label: "Free, unlimited" },
  ],

  featuresEyebrow: "Better than a screenshot",
  featuresTitle: "The file, not a photo of the file",
  featuresIntro:
    "A screenshot captures your screen. This captures the image. The difference shows the moment you crop, print, or reshare it.",
  features: [
    {
      icon: "images",
      title: "The dimensions as uploaded",
      body: "We pass through the image TikTok hosts at its stored size. No downscale to fit a phone screen, no second JPEG pass on our side.",
    },
    {
      icon: "check",
      title: "Cherry-pick or take everything",
      body: "Every image in the grid gets its own save button, and one action above the grid bundles the whole set into a ZIP.",
    },
    {
      icon: "shield",
      title: "No UI baked into the frame",
      body: "No status bar, no like counter, no caption overlay. The saved file is only the picture.",
    },
    {
      icon: "music",
      title: "The sound is right there",
      body: "Photo posts carry audio too. The MP3 button sits above the grid, so it is reachable without scrolling past twenty thumbnails.",
    },
  ],

  stepsEyebrow: "How it works",
  stepsTitle: "Link in, images out",
  steps: [
    {
      title: "Copy the photo post link",
      body: "Open the post, tap Share, then Copy link. TikTok calls these photo posts; other apps call them slideshows or carousels.",
    },
    {
      title: "Paste it above",
      body: "We resolve the post and lay every image out in a grid so you can see what you are about to save.",
    },
    {
      title: "Save what you need",
      body: "Tap a single image, or use Download all to take the whole set as one ZIP file.",
    },
  ],

  formatsTitle: "What comes back",
  formatsIntro: "Photo posts resolve to the images plus the sound behind them.",
  formats: [
    {
      format: "JPG",
      label: "Individual images",
      detail: "Each picture at its stored resolution, saved one tap at a time",
    },
    {
      format: "ZIP",
      label: "The complete set",
      detail: "Every image in the original order, bundled into one download",
    },
    {
      format: "MP3",
      label: "Post audio",
      detail: "The sound attached to the slideshow, on its own",
    },
  ],

  faqTitle: "TikTok photo questions",
  faqIntro: "Everything specific to image posts.",
  faq: [
    {
      question: "How do I download photos from a TikTok post?",
      answer:
        "Paste the post link at the top of this page. Every image appears in a grid with its own save button, so you can take one picture without touching the rest.",
    },
    {
      question: "Are the images full resolution?",
      answer:
        "Yes. We stream the image straight from TikTok's servers at its stored size and never re-encode it, so the file you save is the file they host.",
    },
    {
      question: "Why not just screenshot?",
      answer:
        "A screenshot is capped at your screen resolution and captures whatever the app was drawing on top — status bar, buttons, caption. Downloading gives you the clean image at its real dimensions.",
    },
    {
      question: "Can I take every image at once?",
      answer:
        "Yes. Download all as ZIP bundles the complete set into a single file in the original order, which beats tapping through twenty separate saves.",
    },
    {
      question: "Does it work on a phone?",
      answer:
        "Yes, on both iOS and Android. On iPhone, saved images land in Files by default — long-press the thumbnail there to move it into Photos.",
    },
  ],
};

/** /carousel — bulk ZIP download of slideshow posts. */
export const carouselCopy: PageCopy = {
  path: "/carousel",
  navLabel: "Carousel",

  metaTitle: "TikTok Carousel Downloader — Save Slideshow Posts as a ZIP",
  metaDescription:
    "Download every image from a TikTok carousel in one go. Paste the link and get the full set as a single ZIP, in order and at full quality.",
  ogTitle: "TikTok Carousel Downloader",
  ogDescription: "Every image from a TikTok slideshow, bundled into one ZIP.",

  h1: "Download a whole TikTok carousel at once",
  subtitle:
    "Long slideshows are the worst thing to save one tap at a time. Paste the link and we bundle every image into a single ZIP, numbered in the order the creator arranged them.",

  highlights: [
    { icon: "layers", label: "One ZIP file" },
    { icon: "check", label: "Original order" },
    { icon: "sparkle", label: "Full quality" },
    { icon: "wallet", label: "Free, unlimited" },
  ],

  featuresEyebrow: "Why bulk matters",
  featuresTitle: "Forty taps, or one",
  featuresIntro:
    "Browsers throttle rapid consecutive downloads and start asking permission halfway through. Bundling on the server sidesteps the whole mess.",
  features: [
    {
      icon: "layers",
      title: "One download, not forty",
      body: "The server fetches every image and streams back a single archive, so the browser sees one clean save instead of a burst it wants to block.",
    },
    {
      icon: "check",
      title: "Numbered in sequence",
      body: "Files come out as photo-01, photo-02, and so on, matching the order in the post. Sorting by name reproduces the slideshow exactly.",
    },
    {
      icon: "sparkle",
      title: "Compressed, not degraded",
      body: "The ZIP wraps the original images without touching them. Unpack it and you have the same files, pixel for pixel.",
    },
    {
      icon: "music",
      title: "Audio stays separate",
      body: "The sound is a standalone MP3 button rather than a file inside the archive, so you can grab it without unpacking anything.",
    },
  ],

  stepsEyebrow: "How to bulk save",
  stepsTitle: "One link, one archive",
  steps: [
    {
      title: "Copy the carousel link",
      body: "Share, then Copy link, on any public slideshow post. Short vm.tiktok.com links are fine too.",
    },
    {
      title: "Paste and preview",
      body: "We resolve the post and show the full grid, so you can confirm it caught every image before downloading.",
    },
    {
      title: "Download all as ZIP",
      body: "One tap builds the archive and saves it. Larger sets take a moment while the server packs them.",
    },
  ],

  formatsTitle: "What comes back",
  formatsIntro: "Carousels resolve to the archive, the individual images, and the sound.",
  formats: [
    {
      format: "ZIP",
      label: "The full set",
      detail: "Every image, numbered in order, wrapped in one download",
    },
    {
      format: "JPG",
      label: "Single images",
      detail: "Still available per tile if you only want two or three",
    },
    {
      format: "MP3",
      label: "Post audio",
      detail: "The slideshow's sound, kept outside the archive",
    },
  ],

  faqTitle: "TikTok carousel questions",
  faqIntro: "Everything specific to bulk slideshow downloads.",
  faq: [
    {
      question: "What counts as a carousel?",
      answer:
        "Any TikTok post built from multiple still images instead of a video. TikTok calls them photo posts; elsewhere you will see slideshow, carousel, or image post — they are the same thing.",
    },
    {
      question: "How do I download the entire slideshow?",
      answer:
        "Paste the post link at the top of the page. Above the image grid you will find Download all as ZIP, which packages every picture into one file.",
    },
    {
      question: "Are all the images included?",
      answer:
        "Yes, up to sixty images per archive — comfortably above the longest posts TikTok allows. Each file keeps its position in the original sequence.",
    },
    {
      question: "Why is the audio not inside the ZIP?",
      answer:
        "Because most people want one or the other, not both. Keeping the MP3 as its own button means you can grab the sound without downloading and unpacking an archive of images you did not need.",
    },
    {
      question: "The ZIP is taking a while. Is it stuck?",
      answer:
        "Probably not. The server downloads every image before it can finish the archive, so a forty-image post genuinely takes longer than a four-image one. Give it a few seconds before retrying.",
    },
  ],
};

/**
 * /no-watermark — the watermark keyword, given its own page.
 *
 * The home page mentions the watermark; this one is about nothing else. That
 * split is deliberate: "tiktok downloader no watermark" is a different query
 * from "tiktok downloader", and a page that spends its whole body on how the
 * clean version is obtained ranks for it better than a paragraph buried in a
 * general page ever will.
 */
export const noWatermarkCopy: PageCopy = {
  path: "/no-watermark",
  navLabel: "No Watermark",

  metaTitle: "TikTok Downloader No Watermark — Clean MP4, No Logo, No Crop",
  metaDescription:
    "Download TikTok videos with no watermark at all — not blurred, not cropped, not covered. We fetch the clean source file TikTok stores before the logo is applied.",
  ogTitle: "TikTok Downloader — No Watermark, No Crop",
  ogDescription:
    "The clean source MP4, not a blurred or cropped fake. Paste a link and save it.",

  h1: "Download TikTok videos with no watermark",
  subtitle:
    "There are two ways to get rid of a watermark: hide it, or never receive it. Blur boxes and auto-crops do the first and leave a scar. We do the second — we ask TikTok's servers for the copy that was never stamped in the first place.",

  highlights: [
    { icon: "shield", label: "Never stamped" },
    { icon: "film", label: "No crop, no blur" },
    { icon: "sparkle", label: "Source quality" },
    { icon: "wallet", label: "Free, unlimited" },
  ],

  featuresEyebrow: "Removed, not covered up",
  featuresTitle: "The difference you can see on the last frame",
  featuresIntro:
    "Most 'watermark remover' tools take the stamped file and edit it. Zoom in on the corner and you can always tell. This one never handles a stamped file at all.",
  features: [
    {
      icon: "shield",
      title: "Fetched clean, not cleaned up",
      body: "TikTok stores an unstamped rendition alongside the one the app shows. We request that rendition by name. There is nothing to erase because the logo was never there.",
    },
    {
      icon: "film",
      title: "The frame keeps its edges",
      body: "Crop-based removers shave 5-10% off every side to push the logo out of frame, quietly reframing the shot and breaking the aspect ratio. Your file comes back at the exact dimensions it was uploaded at.",
    },
    {
      icon: "sparkle",
      title: "No blur patch, no smear",
      body: "Inpainting tools leave a soft rectangle that drifts across the video as the logo bounces. There is no patch in your download, because there was nothing to patch over.",
    },
    {
      icon: "lock",
      title: "The username goes too",
      body: "The stamped build carries the @handle as well as the animated logo, and both live in the same overlay. Taking the clean rendition removes the pair of them in one go.",
    },
  ],

  stepsEyebrow: "How to get the clean file",
  stepsTitle: "Three steps, nothing to configure",
  steps: [
    {
      title: "Copy the video link",
      body: "Share, then Copy link, on any public post. Both the long tiktok.com address and the short vm/vt one carry the same post ID, so either works.",
    },
    {
      title: "Paste it into the box above",
      body: "No quality dropdown, no watermark toggle to remember. The clean rendition is the only one this site ever offers.",
    },
    {
      title: "Save the MP4",
      body: "Pick HD or standard from the result card. Both are unstamped — the choice is about file size, never about the logo.",
    },
  ],

  formatsTitle: "What you actually receive",
  formatsIntro:
    "Every file below comes from the unstamped rendition. The watermarked build TikTok also stores is never offered here.",
  formats: [
    {
      format: "MP4",
      label: "HD, no watermark",
      detail: "Highest stored resolution, full frame, no logo and no @handle",
    },
    {
      format: "MP4",
      label: "Standard, no watermark",
      detail: "Same clean frame at a smaller size, for saving on mobile data",
    },
    {
      format: "MP3",
      label: "Audio, no voice tag",
      detail: "The sound alone, with no spoken advert spliced onto either end",
    },
  ],

  faqTitle: "Watermark questions",
  faqIntro: "The ones worth answering honestly.",
  faq: [
    {
      question: "How do I remove the watermark from a TikTok video?",
      answer:
        "You do not have to remove anything. Paste the post link at the top of this page and the file that comes back has never had a watermark applied — TikTok keeps an unstamped rendition of every public post and that is the one we request.",
    },
    {
      question: "Is the video cropped to hide the logo?",
      answer:
        "No. Cropping is what tools do when they only have the stamped file to work with — they cut the edges until the logo falls outside the frame, which changes the composition and the aspect ratio. Your download is the full original frame.",
    },
    {
      question: "Will there be a blurred patch where the logo was?",
      answer:
        "No. A blur patch is the giveaway of an inpainting tool, and it is especially obvious on a TikTok because the logo bounces between corners, dragging the soft rectangle around with it. Nothing on this site paints over anything.",
    },
    {
      question: "Does removing the watermark lower the quality?",
      answer:
        "Not here, because nothing is re-encoded. Tools that crop or blur have to decode the video, edit the pixels, and encode it again, and that second encode is where detail is lost. We stream the untouched file through, so what you save is bit-for-bit what TikTok serves.",
    },
    {
      question: "Does the creator's username stay on the video?",
      answer:
        "No. The @handle and the animated logo are drawn into the same overlay, so the clean rendition has neither. If you republish the video, credit the creator yourself — the absence of a stamp is not permission to pass work off as your own.",
    },
    {
      question: "Can I download without a watermark on my phone?",
      answer:
        "Yes, and there is nothing to install. The flow is identical in Safari on iOS and Chrome on Android, and it works inside the in-app browsers in TikTok, Instagram, and Telegram.",
    },
  ],
};

/** /hd — the resolution keyword. Everything on this page is about quality. */
export const hdCopy: PageCopy = {
  path: "/hd",
  navLabel: "HD",

  metaTitle: "TikTok HD Downloader — Save TikTok Videos in Full Quality",
  metaDescription:
    "Download TikTok videos in HD at the highest resolution the post was stored in — 1080p when the creator uploaded it. No upscaling, no re-encoding, no fake 4K.",
  ogTitle: "TikTok HD Downloader",
  ogDescription:
    "The original upload, not the compressed preview. HD when the post has it.",

  h1: "Download TikTok videos in HD",
  subtitle:
    "The clip you watch in the app is a compressed preview built for a scrolling feed. There is a larger original sitting behind it. Paste a link and we hand you that file instead — often ten times the size, and it shows.",

  highlights: [
    { icon: "sparkle", label: "Original upload" },
    { icon: "film", label: "Up to 1080p" },
    { icon: "bolt", label: "No re-encode" },
    { icon: "shield", label: "No watermark" },
  ],

  featuresEyebrow: "Where the quality goes",
  featuresTitle: "Two renditions, and the app shows you the small one",
  featuresIntro:
    "TikTok stores each post more than once. Understanding which copy you are getting is the whole difference between an HD download and a blurry one.",
  features: [
    {
      icon: "sparkle",
      title: "The original, not the preview",
      body: "The feed version is squeezed hard so it starts instantly over mobile data. We request the high-definition rendition instead — on a one-minute clip that is routinely 100 MB against 9 MB.",
    },
    {
      icon: "bolt",
      title: "Nothing is re-encoded",
      body: "We never open the video. It is streamed from TikTok's CDN straight to your device, so there is no second compression pass to soften edges or band the gradients.",
    },
    {
      icon: "clock",
      title: "The size is on the button",
      body: "HD files are large enough that downloading one by accident on a metered connection stings. The result card prints the byte size next to each option before you commit.",
    },
    {
      icon: "check",
      title: "Honest about the ceiling",
      body: "If a post was filmed and uploaded at 720p, that is what exists. We hand you the true source rather than upscaling it and calling the result 4K.",
    },
  ],

  stepsEyebrow: "How to get the HD file",
  stepsTitle: "Link in, original out",
  steps: [
    {
      title: "Copy the link to the post",
      body: "Share, then Copy link, inside TikTok. Grabbing the address from your browser's bar works identically.",
    },
    {
      title: "Paste it above and fetch",
      body: "We resolve the post and read every rendition attached to it, high definition included.",
    },
    {
      title: "Choose HD video",
      body: "The result card lists HD first with its file size. Tap it and the original starts downloading — larger files simply take longer to arrive.",
    },
  ],

  formatsTitle: "What comes back",
  formatsIntro:
    "Both video options are watermark-free. They differ in resolution and size, nothing else.",
  formats: [
    {
      format: "MP4",
      label: "HD video",
      detail: "The original upload, up to 1080p, typically 10x the standard file size",
    },
    {
      format: "MP4",
      label: "Standard video",
      detail: "The compressed feed rendition — smaller, faster, still unstamped",
    },
    {
      format: "MP3",
      label: "Audio track",
      detail: "The sound on its own, at whatever bitrate the post carries",
    },
  ],

  faqTitle: "Quality questions",
  faqIntro: "What HD does and does not mean on TikTok.",
  faq: [
    {
      question: "How do I download a TikTok video in HD?",
      answer:
        "Paste the post link at the top of this page. When the result card appears, use the HD video button rather than the standard one — it points at the high-definition rendition TikTok stores for the post.",
    },
    {
      question: "Why is there no HD button on some videos?",
      answer:
        "Because that post has no high-definition rendition. Older uploads, videos filmed in-app on a low-end phone, and reposts of already-compressed clips often only exist in one quality. When that happens we show what there is instead of relabelling the standard file as HD.",
    },
    {
      question: "Can I download TikTok videos in 4K?",
      answer:
        "Only if a 4K master existed, which it effectively never does — TikTok caps what it stores well below that. Any tool advertising 4K TikTok downloads is upscaling a 1080p file, which invents pixels without adding detail and just makes the download bigger.",
    },
    {
      question: "Why is the HD file so much larger?",
      answer:
        "Because it holds more picture information. The feed rendition is built to start playing in under a second on a weak connection; the HD one is built to look right on a large screen. A ten-fold difference between the two is normal, not a bug.",
    },
    {
      question: "Does the HD version still have no watermark?",
      answer:
        "Correct. Both video options here come from unstamped renditions. Choosing HD is a decision about resolution and file size only — the frame is clean either way.",
    },
    {
      question: "Will the HD file play on my phone?",
      answer:
        "Yes. It is a standard H.264 MP4, which every phone, browser, editor, and TV stick made in the past decade plays without a codec pack.",
    },
  ],
};

/** /slideshow — the slideshow keyword for photo posts. */
export const slideshowCopy: PageCopy = {
  path: "/slideshow",
  navLabel: "Slideshow",

  metaTitle: "TikTok Slideshow Downloader — Save the Images and the Sound",
  metaDescription:
    "Download a TikTok slideshow: every image at full resolution plus the track playing behind it. Save one picture, take the whole set as a ZIP, or grab the audio alone.",
  ogTitle: "TikTok Slideshow Downloader",
  ogDescription:
    "Every image from a TikTok slideshow, plus the sound behind it.",

  h1: "Download a TikTok slideshow, pictures and sound",
  subtitle:
    "A slideshow is not a video, and that is why screen recording it goes so badly. It is a stack of still images with a track playing over them. Paste the link and we give you both halves separately, each at full quality.",

  highlights: [
    { icon: "images", label: "Stills, not frames" },
    { icon: "music", label: "The sound too" },
    { icon: "check", label: "Original order" },
    { icon: "wallet", label: "Free, unlimited" },
  ],

  featuresEyebrow: "Why recording it fails",
  featuresTitle: "A slideshow is images plus audio, never a video file",
  featuresIntro:
    "Screen recording flattens both halves into one compressed clip and picks up your notifications on the way. Downloading keeps them apart and keeps them sharp.",
  features: [
    {
      icon: "images",
      title: "Real image files",
      body: "Each slide comes back as the JPEG TikTok hosts, at the size it was uploaded. A screen recording would hand you a video frame at your phone's resolution instead.",
    },
    {
      icon: "music",
      title: "The track, on its own",
      body: "The audio is a separate MP3 button. You can save the sound without the pictures, or the pictures without the sound, rather than being handed them fused together.",
    },
    {
      icon: "check",
      title: "The sequence survives",
      body: "Slides are numbered in the order the creator arranged them, so a set stays readable after it lands in your files — which matters most on the text-heavy slideshows where the order is the content.",
    },
    {
      icon: "layers",
      title: "One tap for a long set",
      body: "Thirty slides is thirty saves and a browser that starts blocking them halfway. Download all as ZIP bundles the set into a single file instead.",
    },
  ],

  stepsEyebrow: "How to save one",
  stepsTitle: "From link to files",
  steps: [
    {
      title: "Copy the slideshow link",
      body: "Open the post, tap Share, then Copy link. TikTok labels these photo posts; slideshow and carousel are the same thing by another name.",
    },
    {
      title: "Paste it above",
      body: "We resolve the post and lay out every slide in a grid, so you can check nothing is missing before saving.",
    },
    {
      title: "Take the images, the sound, or both",
      body: "Save a single slide, take the whole set as a ZIP, or use the audio button on its own. Nothing forces you to download the part you did not want.",
    },
  ],

  formatsTitle: "What a slideshow resolves to",
  formatsIntro: "Three separate things, offered separately.",
  formats: [
    {
      format: "JPG",
      label: "Each slide",
      detail: "Full stored resolution, one save button per image",
    },
    {
      format: "ZIP",
      label: "The whole set",
      detail: "Every slide numbered in sequence, wrapped in one download",
    },
    {
      format: "MP3",
      label: "The backing track",
      detail: "The post's audio, kept outside the archive so you can take it alone",
    },
  ],

  faqTitle: "Slideshow questions",
  faqIntro: "Specific to photo posts.",
  faq: [
    {
      question: "How do I download a TikTok slideshow?",
      answer:
        "Paste the post link at the top of this page. Every slide appears in a grid with its own save button, with Download all as ZIP above the grid and the audio button beside it.",
    },
    {
      question: "Can I download the slideshow as a video?",
      answer:
        "No, and no honest tool can hand you one straight from TikTok, because no video file exists for these posts — the app assembles the slides on your screen as it plays. You get the images and the track, which is everything you need to rebuild it in any editor.",
    },
    {
      question: "Why is there no HD video button on this post?",
      answer:
        "Because it is a slideshow. The upstream data labels the post's audio stream in the same field a video would occupy, so a tool that trusts that field blindly gives you an 'HD video' button that quietly saves a sound file. We check for images first and hide the video buttons when there are any.",
    },
    {
      question: "Do the images keep their order?",
      answer:
        "Yes. Files are numbered photo-01, photo-02, and so on, matching the sequence in the post. Sorting by filename reproduces the slideshow exactly.",
    },
    {
      question: "Can I get just the sound from a slideshow?",
      answer:
        "Yes. The audio button sits above the image grid, so you never have to scroll past the slides or download a single picture to reach the track.",
    },
  ],
};

/** Every landing page, in the order they appear in navigation and the sitemap. */
export const allPages: readonly PageCopy[] = [
  homeCopy,
  noWatermarkCopy,
  hdCopy,
  mp3Copy,
  photosCopy,
  slideshowCopy,
  carouselCopy,
] as const;
