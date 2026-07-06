"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import PixelArt from "./PixelArt";
import { ArrowDown } from "./icons";

const BUBBLE = [
  "..##########....",
  ".#..........#...",
  ".#..........#...",
  ".#..........#...",
  ".#..........#...",
  ".#..........#...",
  "..##########....",
  "....#...........",
  "...#............",
];

const BOLT = [
  "........####....",
  ".......####.....",
  "......####......",
  ".....####.......",
  "....#######.....",
  "......#####.....",
  ".......####.....",
  "......####......",
  ".....####.......",
  "....###.........",
  "...##...........",
];

const HEART = [
  "..###....###....",
  ".#####..#####...",
  ".############...",
  ".############...",
  "..##########....",
  "...########.....",
  "....######......",
  ".....####.......",
  "......##........",
];

const VALUES = [
  {
    matrix: BUBBLE,
    color: "#1be349",
    title: "Curiosidad radical",
    body: "Preguntamos lo que nadie se atreve. Las mejores respuestas del mundo empresarial están detrás de la puerta que dice “solo personal autorizado”.",
  },
  {
    matrix: BOLT,
    color: "#e6313a",
    title: "Aprender haciendo",
    body: "Nada de teoría en salones. El conocimiento que sirve se ve, se toca y se conversa con quien lo construyó, dentro de la operación real.",
  },
  {
    matrix: HEART,
    color: "#ffb200",
    title: "Generosidad de red",
    body: "Compartimos contactos, hallazgos y errores. Lo que una empresa aprende en una misión, la comunidad entera lo capitaliza.",
  },
];

function BouncingArrows() {
  return (
    <div className="flex gap-1.5 text-yellow" aria-hidden>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        >
          <ArrowDown className="size-7 sm:size-8" />
        </motion.span>
      ))}
    </div>
  );
}

export default function Defines() {
  return (
    <section className="space-y-5">
      <Reveal>
        <div className="flex items-center justify-between gap-4 rounded-[24px] bg-blue px-6 py-7 sm:px-10">
          <BouncingArrows />
          <h2 className="text-center text-3xl font-black tracking-[-0.02em] sm:text-4xl lg:text-[44px]">
            Lo que nos define
          </h2>
          <BouncingArrows />
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.1} className="h-full">
            <div className="flex h-full flex-col rounded-[28px] bg-blue p-6 pb-8 sm:p-7">
              <PixelArt matrix={value.matrix} fill={value.color} className="w-full" />
              <h3 className="mt-6 text-[22px] font-black tracking-tight">{value.title}</h3>
              <p className="mt-3 text-[15px] font-medium leading-relaxed">{value.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
