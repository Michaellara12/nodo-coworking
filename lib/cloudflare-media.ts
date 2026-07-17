/** Public Cloudflare delivery helpers (no API secrets). */

export const CF_IMAGES_ACCOUNT_HASH =
  process.env.NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH ?? "qw62OEWCF533UZ-cfR0n4A";

export const CF_IMAGES_DEFAULT_VARIANT =
  process.env.NEXT_PUBLIC_CF_IMAGES_VARIANT ?? "public";

export const CF_IMAGES_BASE = `https://imagedelivery.net/${CF_IMAGES_ACCOUNT_HASH}`;
export const CF_STREAM_IFRAME_BASE = "https://iframe.videodelivery.net";
export const CF_STREAM_MEDIA_BASE = "https://videodelivery.net";

export function cfImage(
  imageId: string,
  variant: string = CF_IMAGES_DEFAULT_VARIANT,
): string {
  return `${CF_IMAGES_BASE}/${imageId}/${variant}`;
}

export function cfStreamIframe(
  uid: string,
  opts?: {
    muted?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    preload?: boolean;
  },
): string {
  const params = new URLSearchParams();
  if (opts?.muted !== false) params.set("muted", "true");
  if (opts?.autoplay !== false) params.set("autoplay", "true");
  if (opts?.loop !== false) params.set("loop", "true");
  if (opts?.controls === false || opts?.controls === undefined) {
    params.set("controls", "false");
  }
  if (opts?.preload !== false) params.set("preload", "true");
  params.set("letterboxColor", "transparent");
  const qs = params.toString();
  return `${CF_STREAM_IFRAME_BASE}/${uid}${qs ? `?${qs}` : ""}`;
}

export function cfStreamHls(uid: string): string {
  return `${CF_STREAM_MEDIA_BASE}/${uid}/manifest/video.m3u8`;
}

export function cfStreamDash(uid: string): string {
  return `${CF_STREAM_MEDIA_BASE}/${uid}/manifest/video.mpd`;
}

export function cfStreamThumb(uid: string, time = "0s"): string {
  return `${CF_STREAM_MEDIA_BASE}/${uid}/thumbnails/thumbnail.jpg?time=${time}`;
}
