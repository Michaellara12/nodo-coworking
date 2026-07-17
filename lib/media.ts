/**
 * Catálogo de media Innfiltrados (Cloudflare Images + Stream).
 * Estilo: escultura de papel / cartón recortado.
 */

import { cfImage, cfStreamIframe, cfStreamThumb } from "./cloudflare-media";

export type MediaAsset = {
  /** Cloudflare Images id */
  imageId: string;
  /** Cloudflare Stream uid (opcional) */
  videoUid?: string;
  alt: string;
  /** Aspecto predominante para layout */
  aspect?: "16/9" | "1/1" | "3/4";
};

function asset(a: MediaAsset) {
  return {
    ...a,
    imageUrl: cfImage(a.imageId),
    posterUrl: a.videoUid ? cfStreamThumb(a.videoUid) : cfImage(a.imageId),
    streamSrc: a.videoUid
      ? cfStreamIframe(a.videoUid, {
          muted: true,
          autoplay: true,
          loop: true,
          controls: false,
          preload: true,
        })
      : undefined,
  };
}

/** Recorrido backstage en planta (hero / misiones) */
export const MEDIA_PLANTA = asset({
  imageId: "1bee0adb-7b09-449b-e37c-0a508ba08800",
  videoUid: "97cdf18e264c818a07d923bb3b878ec1",
  alt: "Recorrido backstage por la planta de una empresa anfitriona",
  aspect: "16/9",
});

/** Sesión con líderes */
export const MEDIA_LIDERES = asset({
  imageId: "f247ba1b-5804-487f-551a-05c1dba0d600",
  videoUid: "aec0c40b3cb70567879db158d38703ff",
  alt: "Sesión cara a cara con líderes de una empresa anfitriona",
  aspect: "16/9",
});

/** Workshop de síntesis */
export const MEDIA_WORKSHOP = asset({
  imageId: "906bbac6-d31d-484c-c900-5c83f9c2e300",
  videoUid: "c4c271ce5b194d3a68f0d895481c29f2",
  alt: "Workshop de síntesis del equipo innfiltrado",
  aspect: "16/9",
});

/** Agenda en el móvil */
export const MEDIA_PHONE = asset({
  imageId: "2b98fe4f-3bfc-4f70-c08c-86e92d2fee00",
  alt: "Toda la agenda de la misión en tu móvil",
  aspect: "3/4",
});

/** Networking */
export const MEDIA_NETWORKING = asset({
  imageId: "d5aec0ea-b7cd-4fae-4454-ad7776328000",
  videoUid: "a2cf847966775d688f352c6d4170c778",
  alt: "Noche de networking entre innfiltrados",
  aspect: "1/1",
});

/** Trabajo en equipo */
export const MEDIA_TEAMWORK = asset({
  imageId: "6606a721-55b8-44b0-dd1d-d5a75e909000",
  videoUid: "6d26a4938e4a9e52a43e5cf5b3bded43",
  alt: "Innfiltrados trabajando en equipo durante una sesión de síntesis",
  aspect: "3/4",
});

/** Lounge / pausa */
export const MEDIA_LOUNGE = asset({
  imageId: "e9854b31-99ee-4d87-708c-ac4ab74ba800",
  videoUid: "6242c35ccf42b760c8fe6293bc715e1f",
  alt: "Pausa entre recorridos de la misión",
  aspect: "1/1",
});

/** Terraza post-misión */
export const MEDIA_TERRACE = asset({
  imageId: "11c7f2d7-31da-43a0-fb37-08b809c5c400",
  videoUid: "4ad458ebd849db6830dff31a41bea41c",
  alt: "Innfiltrados compartiendo después de un recorrido",
  aspect: "3/4",
});

/** Galería de imágenes para misiones (admin) */
export const MISION_IMAGENES = [
  { src: MEDIA_PLANTA.imageUrl, label: "Recorrido en planta" },
  { src: MEDIA_LIDERES.imageUrl, label: "Sesión con líderes" },
  { src: MEDIA_WORKSHOP.imageUrl, label: "Workshop" },
  { src: MEDIA_NETWORKING.imageUrl, label: "Networking" },
  { src: MEDIA_TEAMWORK.imageUrl, label: "Trabajo en equipo" },
  { src: MEDIA_LOUNGE.imageUrl, label: "Lounge" },
] as const;
