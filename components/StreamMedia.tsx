"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type StreamMediaProps = {
  /** Poster / still (Cloudflare Images o Stream thumb) */
  imageUrl: string;
  alt: string;
  /** URL iframe Stream con autoplay/muted/loop (opcional) */
  streamSrc?: string;
  className?: string;
  /** next/image sizes */
  sizes?: string;
  /** LCP: hero priority */
  priority?: boolean;
  /** Si true, reproduce video; si false solo imagen */
  playVideo?: boolean;
  /** object-cover scale wrapper */
  objectFit?: "cover" | "contain";
};

/**
 * Media optimizado: poster CDN inmediato + Stream adaptive streaming
 * (iframe sin controles, autoplay muted loop) cuando hay video.
 */
export default function StreamMedia({
  imageUrl,
  alt,
  streamSrc,
  className = "",
  sizes = "100vw",
  priority = false,
  playVideo = true,
  objectFit = "cover",
}: StreamMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
  const canPlay = Boolean(streamSrc && playVideo);

  useEffect(() => {
    if (!canPlay) return;
    // Deja pintar el poster primero (LCP), luego monta Stream
    const t = window.setTimeout(() => setShowVideo(true), priority ? 80 : 280);
    return () => window.clearTimeout(t);
  }, [canPlay, priority]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={objectFit === "cover" ? "object-cover" : "object-contain"}
      />

      {canPlay && showVideo && streamSrc && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          {/* Escala para simular object-cover sobre el player 16:9 de Stream */}
          <iframe
            src={streamSrc}
            title={alt}
            loading={priority ? "eager" : "lazy"}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            className="absolute left-1/2 top-1/2 border-0"
            style={{
              width: "max(100%, 177.78vh)",
              height: "max(100%, 56.25vw)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
