"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

/*
 * Sección pineada: foto a pantalla completa con tarjetas glass que se van
 * apilando a medida que scrolleas (como "What this means for you" del original).
 * La foto de fondo se puede reemplazar por un <video> más adelante.
 */

const ITEMS = [
  {
    title: "Tu puesto",
    body: "Tu espacio propio, diseñado para el foco, la comodidad y el día a día.",
  },
  {
    title: "Espacios de comunidad",
    body: "Lugares que inspiran sin estorbar: para concentrarte, moverte, descansar y conectar.",
  },
  {
    title: "Soporte diario",
    body: "Todo lo que necesitas, justo cuando lo necesitas. Nos ocupamos de los detalles.",
  },
  {
    title: "Seguridad",
    body: "Un entorno cuidado y seguro que te deja trabajar tranquilo, de día y de noche.",
  },
  {
    title: "Comunidad y eventos",
    body: "Oportunidades para conocer, compartir y pertenecer — de forma natural.",
  },
  {
    title: "Experiencia digital",
    body: "Herramientas smart que hacen tu día simple: llave móvil, reservas y soporte en la app.",
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
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, 0.12], [1.08, 1]);

  return (
    <section ref={ref} className="relative h-[340svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center py-4 sm:py-5">
        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
          {/* aquí puede ir un <video autoPlay muted loop playsInline> en lugar de la foto */}
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image
              src="/images/lobby.jpg"
              alt="Un día cualquiera dentro de NODO"
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
