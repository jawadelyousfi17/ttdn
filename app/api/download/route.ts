import { NextResponse } from "next/server";

import {
  extensionFromContentType,
  isAllowedMediaHost,
  withExtension,
} from "@/lib/media";
import { isSameOriginRequest } from "@/services/origin";
import { checkRateLimit, clientKey, rateLimitHeaders } from "@/services/rate-limit";

/**
 * Per-IP cap on the streaming proxy. One resolved post usually turns into one
 * to three clicks (HD, maybe standard, maybe audio), so 60 a minute leaves a
 * real person plenty of headroom while capping a hostile client at roughly one
 * bandwidth-heavy pass-through per second.
 */
const DOWNLOAD_LIMIT = 60;
const DOWNLOAD_WINDOW_MS = 60_000;

/**
 * Pin a filename onto the response. The browser uses this instead of guessing
 * from the URL. The RFC 5987 form carries non-ASCII captions intact while the
 * plain form keeps older clients happy.
 */
function dispositionHeader(filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  const utf8 = encodeURIComponent(filename);
  return `attachment; filename="${ascii}"; filename*=UTF-8''${utf8}`;
}

/**
 * Streaming download proxy. Browsers ignore the `download` attribute on
 * cross-origin anchors, so a direct CDN link would just play the video in a new
 * tab instead of saving it. We fetch upstream and pipe the body back with
 * Content-Disposition: attachment, which is what actually triggers a save.
 */
export async function GET(request: Request) {
  // Reject off-site callers before they consume any rate-limit budget. An
  // anchor click from our own page sends Referer but no Origin, which the
  // helper accepts.
  if (!isSameOriginRequest(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const decision = checkRateLimit(
    `download:${clientKey(request)}`,
    DOWNLOAD_LIMIT,
    DOWNLOAD_WINDOW_MS,
  );
  if (!decision.allowed) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: rateLimitHeaders(decision),
    });
  }

  const { searchParams } = new URL(request.url);
  const target = searchParams.get("u");
  const requestedName = (searchParams.get("filename") || "tiktok").trim();

  if (!target) {
    return new NextResponse("Missing u", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("Bad URL", { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return new NextResponse("Bad protocol", { status: 400 });
  }
  if (!isAllowedMediaHost(parsed.hostname)) {
    return new NextResponse("Host not allowed", { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(parsed, {
      // Some TikTok CDN edges refuse to serve without a Referer. Sending
      // tiktok.com mirrors what a normal share-link flow would look like.
      headers: { Referer: "https://www.tiktok.com/" },
      cache: "no-store",
    });
  } catch {
    return new NextResponse("Upstream fetch failed", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Upstream error", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = upstream.headers.get("content-length");

  /**
   * Correct the extension against what actually came back.
   *
   * TikTok serves a post's audio as a real MP3 on some videos and as an
   * extensionless audio/mp4 stream on others, and carousel images arrive as
   * JPEG or WebP depending on the post. The filename was guessed from the URL
   * upstream of here; now that the response is in hand we know the truth, and
   * a file whose extension lies about its container is one some players simply
   * refuse to open.
   */
  const trueExtension = extensionFromContentType(contentType);
  const filename = trueExtension
    ? withExtension(requestedName, trueExtension)
    : requestedName;

  const headers = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": dispositionHeader(filename),
    "Cache-Control": "private, no-store",
    ...rateLimitHeaders(decision),
  });
  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, { status: 200, headers });
}
