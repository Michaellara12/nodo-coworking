"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import KaraokeText from "./KaraokeText";
import { ArrowDown } from "./icons";

/*
 * "¿Por qué es diferente?": tarjetas a pantalla completa que se apilan una
 * sobre otra mientras la sección está pineada; cada frase se revela en karaoke.
 */

const CARDS = [
  { bg: "bg-green", text: "Porque está pensado alrededor de tu vida real." },
  { bg: "bg-red", text: "Porque es más que un lugar donde trabajar." },
  { bg: "bg-blue", text: "Porque sentirte en casa es lo que más importa." },
];

function StackCard({
  card,
  index,
  progress,
}: {
  card: (typeof CARDS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const slideStart = index / CARDS.length;
  const y = useTransform(
    progress,
    [slideStart, slideStart + 0.1],
    [index === 0 ? "0%" : "112%", "0%"]
  );
  const textStart = slideStart + (index === 0 ? 0.03 : 0.11);
  const textEnd = (index + 1) / CARDS.length - 0.02;

  return (
    <motion.div
      style={{ y }}
      className={`${card.bg} absolute inset-0 flex flex-col justify-between rounded-[28px] p-7 sm:p-12`}
    >
      <KaraokeText
        text={card.text}
        progress={progress}
        start={textStart}
        end={textEnd}
        className="max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl"
      />
      <span className="grid size-12 shrink-0 place-items-center self-end rounded-full border-[1.8px] border-ink text-[15px] font-bold">
        0{index + 1}
      </span>
    </motion.div>
  );
}

function BouncingArrows() {
  return (
    <div className="flex gap-1.5 text-green" aria-hidden>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        >
          <ArrowDown className="size-7 sm:size-9" />
        </motion.span>
      ))}
    </div>
  );
}

export default function WhyDifferentStack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 flex h-svh flex-col py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4 px-2 pb-4 sm:pb-5">
          <BouncingArrows />
          <h2 className="text-center text-3xl font-black tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
            ¿Por qué es diferente?
          </h2>
          <BouncingArrows />
        </div>
        <div className="relative flex-1 overflow-hidden rounded-[28px]">
          {CARDS.map((card, i) => (
            <StackCard key={card.text} card={card} index={i} progress={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
