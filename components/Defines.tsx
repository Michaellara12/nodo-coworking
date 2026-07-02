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
    title: "Primero las personas",
    body: "Todo empieza por cómo se siente trabajar aquí. De los puestos privados a las experiencias compartidas, la gente siempre va primero.",
  },
  {
    matrix: BOLT,
    color: "#e6313a",
    title: "Diseño con intención",
    body: "Nada es casualidad. Cada detalle está pensado para apoyar tu forma de trabajar y de sentirte, todos los días.",
  },
  {
    matrix: HEART,
    color: "#ffb200",
    title: "Cuidado de verdad",
    body: "Está en el centro de todo lo que hacemos. Cuidamos a quienes trabajan aquí, los espacios que creamos y la ciudad de la que somos parte.",
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
