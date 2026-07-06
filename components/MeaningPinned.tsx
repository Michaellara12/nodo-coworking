"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { usePinnedProgress } from "./usePinnedProgress";

/*
 * Sección pineada: foto a pantalla completa con tarjetas glass que se van
 * apilando a medida que scrolleas (como "What this means for you" del original).
 * La foto de fondo se puede reemplazar por un <video> más adelante.
 */

const ITEMS = [
  {
    title: "Diagnóstico previo",
    body: "Antes de volar entendemos qué necesita aprender tu equipo — y para qué.",
  },
  {
    title: "Acceso backstage",
    body: "Puertas que no se abren con una tarjeta de presentación: se abren con nuestra red.",
  },
  {
    title: "Líderes cara a cara",
    body: "Los protagonistas cuentan cómo lo hicieron: con cifras, errores y decisiones.",
  },
  {
    title: "Síntesis diaria",
    body: "Cada día cierra convirtiendo lo visto en ideas accionables para tu negocio.",
  },
  {
    title: "Playbook final",
    body: "Vuelves con un plan de implementación, no con una libreta de notas sueltas.",
  },
  {
    title: "Red innfiltrada",
    body: "La comunidad y los contactos siguen trabajando para ti después del viaje.",
  },
];

function GlassCard({
  item,
  index,
  progress,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.06 + index * 0.13;
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const y = useTransform(progress, [start, start + 0.06], [26, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-2xl bg-ink/75 p-4 text-cream backdrop-blur-md sm:p-5"
    >
      <h3 className="text-[16px] font-black tracking-tight sm:text-[17px]">{item.title}</h3>
      <p className="mt-1 text-[13px] font-medium leading-snug text-cream/85 sm:text-[13.5px]">
        {item.body}
      </p>
    </motion.div>
  );
}

export default function MeaningPinned() {
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);
  const scale = useTransform(p, [0, 0.12], [1.08, 1]);

  return (
    <section ref={ref} className="relative h-[340svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center py-4 sm:py-5">
        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
          {/* aquí puede ir un <video autoPlay muted loop playsInline> en lugar de la foto */}
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image
              src="/images/innfiltrados/mision-1.jpg"
              alt="Un día cualquiera dentro de una misión Innfiltrados"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/15" />

          <span className="absolute left-5 top-5 rounded-full border-[1.5px] border-cream/90 px-5 py-2 text-[15px] font-bold text-cream sm:left-8 sm:top-8">
            Qué significa para ti
          </span>

          <div className="absolute right-4 top-16 flex w-[330px] max-w-[80%] flex-col gap-2.5 sm:right-8 sm:top-8 sm:w-[380px]">
            {ITEMS.map((item, i) => (
              <GlassCard key={item.title} item={item} index={i} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
