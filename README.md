# Klipp — TikTok Downloader

Paste a TikTok link, get the file. Four SEO-targeted landing pages over one
lookup pipeline: video, audio, photos, and carousels.

Built with Next.js 16 (App Router, Turbopack), React 19, and Tailwind CSS v4.
English only — no i18n layer.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in RAPIDAPI_KEY
npm run dev
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `RAPIDAPI_KEY` | yes | RapidAPI key for the lookup provider. Without it every lookup fails with a configuration error. |
| `RAPIDAPI_HOST` | no | Defaults to `tiktok-scraper7.p.rapidapi.com`. |
| `NEXT_PUBLIC_SITE_URL` | production | Absolute origin, no trailing slash. Drives canonical URLs, `sitemap.xml`, and `robots.txt`. |

Set a **hard quota cap in the RapidAPI dashboard**. The in-app rate limits slow
abuse down; the quota cap is the only thing that actually bounds the bill.

## Routes

| Path | Targets |
| --- | --- |
| `/` | TikTok video downloader (HD + standard MP4) |
| `/mp3` | Audio extraction |
| `/photos` | Individual images from photo posts |
| `/carousel` | Whole slideshows bundled as a ZIP |

Each page owns its copy — headings, features, steps, format table, and FAQ all
differ per route, so the four pages do not compete for the same keywords with
duplicate body text. Everything lives in `lib/content.ts`.

Submitting a link navigates to `?url=…` on the current path, so results are
server-rendered and shareable. Those addresses are `noindex, follow` and are
disallowed in `robots.txt` — they are unique per video and would otherwise
flood the index.

## How a lookup flows

1. `normalizeForRender` validates the URL **synchronously**, so a bad link
   shows an inline error without spending a billed API request.
2. A valid link renders inside a `<Suspense>` boundary. The full page shell —
   header, hero, marketing sections, FAQ — flushes immediately while the
   network call is still in flight.
3. `services/tiktok.ts` calls the provider, normalizes the response, and caches
   it for an hour keyed on the URL with tracking parameters stripped.
4. Files download through `/api/download`, which streams from TikTok's CDN with
   `Content-Disposition: attachment`. This is not optional — browsers ignore the
   `download` attribute on cross-origin links, so a direct CDN link would just
   open the video in a new tab.

## Things worth knowing before changing the pipeline

These are behaviours of the upstream data that are easy to get wrong:

- **Photo posts lie about having a video.** On a carousel, `play`, `wmplay`,
  and `hdplay` all contain the post's *audio* stream, not a video. The presence
  of `images` — never the presence of `play` — decides whether a post has video.
  Getting this wrong ships "HD video" buttons that silently save an MP3.
- **Audio is not always MP3.** Some posts serve `audio/mp4`. Filenames are
  guessed from the URL, then corrected in `/api/download` from the real
  `Content-Type`, because an AAC stream named `.mp3` fails to open in some
  players.
- **Carousel images are JPEG on some posts and WebP on others.** ZIP entry names
  follow the response type for the same reason.
- **`hdplay` is the original upload** and can be an order of magnitude larger
  than `play` (107 MB vs 9 MB on a one-minute clip), which is why the size is
  printed on the button.
- **CDN hosts are allowlisted** in `lib/media.ts`. Anything not matching a
  TikTok CDN domain is rejected, which is what stops `/api/download` from being
  a general-purpose open proxy. TikTok rotates shard prefixes and spans several
  CDN families, so match on the registrable domain, never the full hostname.

## Abuse controls

Per-IP fixed-window limits: 15/min on lookups, 60/min on downloads, 5/min on
ZIP builds. Both API routes also require a same-origin `Origin` or `Referer`.

That header check stops casual scraping and hotlinking, not a determined
attacker — headers are trivially spoofed with one curl flag. State is
in-process, so limits apply per container rather than globally; Redis would be
the fix if that ever matters.

## Layout

```
app/           routes, API handlers, robots.ts, sitemap.ts
components/    UI, sections/ for page bands, ui/ for the primitives
lib/           content.ts (all copy), media.ts, tiktok.ts, format.ts, metadata.ts
services/      upstream fetch, cache, rate limiting, origin checks
types/         content and upstream response shapes
```

Design tokens are defined once in `app/globals.css` and consumed only through
Tailwind utilities, so the palette can be swapped from that one file.
# ttdn
