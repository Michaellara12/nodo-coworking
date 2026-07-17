"use client";

import { useRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { usePinnedProgress } from "./usePinnedProgress";
import StreamMedia from "./StreamMedia";
import { MEDIA_PLANTA } from "@/lib/media";

/*
 * Sección pineada: video Stream de fondo + tarjetas de color al estilo
 * EventsTrack / AllInclusive, que se apilan al scrollear.
 */

const ITEMS = [
  {
    title: "Diagnóstico previo",
    body: "Antes de volar entendemos qué necesita aprender tu equipo — y para qué.",
    bg: "bg-yellow",
  },
  {
    title: "Acceso backstage",
    body: "Puertas que no se abren con una tarjeta de presentación: se abren con nuestra red.",
    bg: "bg-red",
  },
  {
    title: "Líderes cara a cara",
    body: "Los protagonistas cuentan cómo lo hicieron: con cifras, errores y decisiones.",
    bg: "bg-blue",
  },
  {
    title: "Síntesis diaria",
    body: "Cada día cierra convirtiendo lo visto en ideas accionables para tu negocio.",
    bg: "bg-green",
  },
];

function MeaningCard({
  item,
  index,
  progress,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const n = ITEMS.length;
  const enter = index / n;
  const settle = enter + 0.12;

  const y = useTransform(
    progress,
    [enter, settle],
    [index === 0 ? "0%" : "112%", "0%"],
  );
  const opacity = useTransform(progress, [enter, settle], [index === 0 ? 1 : 0, 1]);

  const stackScale = useTransform(progress, (p) => {
    const active = Math.min(n - 1, Math.floor(p * n + 0.001));
    if (index > active) return 1;
    const depth = active - index;
    return Math.max(0.94, 1 - depth * 0.025);
  });

  return (
    <motion.div
      style={{ y, opacity, scale: stackScale, zIndex: index + 1, transformOrigin: "50% 100%" }}
      className={`${item.bg} absolute inset-x-0 bottom-0 flex min-h-[220px] flex-col justify-between rounded-[26px] p-6 sm:min-h-[250px] sm:p-8`}
    >
      <div>
        <h3 className="text-[24px] font-black leading-tight tracking-tight sm:text-[26px]">
          {item.title}
        </h3>
        <p className="mt-3 border-b-[1.5px] border-ink/70 pb-4 text-[15.5px] font-medium leading-relaxed sm:text-[16px]">
          {item.body}
        </p>
      </div>
      <span className="mt-5 grid size-11 place-items-center self-end rounded-full border-[1.8px] border-ink text-[14px] font-bold">
        0{index + 1}
      </span>
    </motion.div>
  );
}

export default function MeaningPinned() {
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);
  const scale = useTransform(p, [0, 0.1], [1.06, 1]);

  return (
    <section ref={ref} className="relative h-[280svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center py-4 sm:py-5">
        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
          <motion.div style={{ scale }} className="absolute inset-0">
            <StreamMedia
              imageUrl={MEDIA_PLANTA.imageUrl}
              streamSrc={MEDIA_PLANTA.streamSrc}
              alt="Un día cualquiera dentro de una misión Innfiltrados"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/35" />

          <span className="absolute left-5 top-5 z-20 rounded-full border-[1.5px] border-cream px-5 py-2 text-[15px] font-bold text-cream sm:left-8 sm:top-8">
            Qué significa para ti
          </span>

          <div className="absolute inset-x-4 bottom-4 z-10 h-[270px] sm:inset-x-6 sm:bottom-6 sm:h-[290px] lg:left-auto lg:right-8 lg:w-[min(420px,42vw)]">
            {ITEMS.map((item, i) => (
              <MeaningCard key={item.title} item={item} index={i} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
