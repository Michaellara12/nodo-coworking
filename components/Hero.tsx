"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";
import { ArrowUpRight } from "./icons";
import StreamMedia from "./StreamMedia";
import { MEDIA_PLANTA } from "@/lib/media";

const LINES = ["Aprende del", "conocimiento de otros."];

export default function Hero() {
  return (
    <section id="inicio">
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative h-[calc(100svh-7.25rem)] min-h-[540px] overflow-hidden rounded-[28px] lg:h-[calc(100svh-2.5rem)]"
      >
        <StreamMedia
          imageUrl={MEDIA_PLANTA.imageUrl}
          streamSrc={MEDIA_PLANTA.streamSrc}
          alt={MEDIA_PLANTA.alt}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-ink/45" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <h1 className="max-w-5xl text-[44px] font-black leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[88px]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden py-1">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.14, duration: 0.9, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-5 max-w-2xl text-lg font-semibold leading-snug sm:text-2xl"
          >
            El backstage de las empresas líderes, abierto para ti con nuestros
            tours de inmersión empresarial.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            href="/contacto"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-yellow hover:text-ink sm:text-lg"
          >
            Innfíltrate
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
