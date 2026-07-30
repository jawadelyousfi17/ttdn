/**
 * Types for the tiktok-scraper7 response on RapidAPI. The upstream also
 * returns ad metadata, comment settings, commerce blocks, and mention lists;
 * only the fields this app reads are typed, so it stays obvious what we
 * actually depend on.
 */
export interface RapidApiResponse {
  code: number;
  msg: string;
  data?: RapidApiData;
}

export interface RapidApiData {
  id: string;
  aweme_id?: string;
  region?: string;
  /** The post caption. Used as the download filename stem. */
  title?: string;

  /** JPEG. Safe to render directly in an <img>. */
  cover?: string;
  /** WebP in practice — also fine in every current browser. */
  origin_cover?: string;
  ai_dynamic_cover?: string;

  /** Duration in SECONDS. Zero on photo carousels. */
  duration?: number;

  /**
   * No-watermark MP4.
   *
   * Careful: on a photo carousel this field holds the post's AUDIO stream
   * (audio/mp4), not a video. Always check `images` before treating it as a
   * video URL — see services/tiktok.ts.
   */
  play?: string;
  /** Watermarked MP4. Typed so it is clear we never offer it. */
  wmplay?: string;
  /** The original upload, returned when the request sets hd=1. Often large. */
  hdplay?: string;

  /** Direct audio URL. Sometimes a real MP3, sometimes an audio/mp4 stream. */
  music?: string;
  music_info?: {
    title?: string;
    author?: string;
    cover?: string;
    duration?: number;
    /** The same audio URL, mirrored onto the music_info object. */
    play?: string;
  };

  /** Populated only for photo carousels. JPEG URLs, watermark-free. */
  images?: string[];

  /** Byte size of `play`. */
  size?: number;
  /** Byte size of `hdplay`. */
  hd_size?: number;
  /** Byte size of `wmplay`. Unused, typed for completeness. */
  wm_size?: number;

  play_count?: number;
  digg_count?: number;
  comment_count?: number;
  share_count?: number;

  author?: {
    id?: string;
    unique_id?: string;
    nickname?: string;
    /** JPEG. Unlike some TikTok endpoints, this one is directly renderable. */
    avatar?: string;
  };
}

export type DownloadKind = "video-hd" | "video-sd" | "audio";

export interface DownloadOption {
  kind: DownloadKind;
  /** Direct CDN URL — handed to /api/download for streaming. */
  url: string;
  /** Size in bytes when the upstream reported one, else null. */
  sizeBytes: number | null;
  /** Suggested filename including extension, used in Content-Disposition. */
  filename: string;
}

export interface DownloadAuthor {
  uniqueId: string;
  nickname: string;
  avatar: string | null;
}

export interface DownloadStats {
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
}

/**
 * The lean shape the browser receives: URLs, filenames, and the metadata the
 * result card renders. No upstream keys and no fields we never display.
 */
export interface DownloadResult {
  id: string;
  title: string;
  /** Empty string when the post had no usable cover. */
  cover: string;
  durationSeconds: number | null;
  author: DownloadAuthor;
  stats: DownloadStats;
  /** Empty for single-video posts; populated for photo carousels. */
  photos: string[];
  /** Empty for photo carousels, which carry no real video track. */
  videos: DownloadOption[];
  audio: DownloadOption | null;
}
