import Link from "next/link";
import PixelArt from "./PixelArt";
import SectionBanner from "./SectionBanner";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";

/* Valores sobre lienzo amarillo: tarjetas outline + pixel-art + CTA de ancho completo. */

const SMILEY = [
  ".....######.....",
  "...##......##...",
  "..#..........#..",
  ".#............#.",
  "#....##..##....#",
  "#....##..##....#",
  "#..............#",
  "#...#......#...#",
  ".#...######...#.",
  "..#..........#..",
  "...##......##...",
  ".....######.....",
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
    matrix: SMILEY,
    color: "#0cb14e",
    title: "Curiosidad radical",
    body: "Preguntamos lo que nadie se atreve. Las mejores respuestas del mundo empresarial están detrás de la puerta que dice “solo personal autorizado”.",
  },
  {
    matrix: BOLT,
    color: "#0e6be8",
    title: "Aprender haciendo",
    body: "Nada de teoría en salones. El conocimiento que sirve se ve, se toca y se conversa con quien lo construyó, dentro de la operación real.",
  },
  {
    matrix: HEART,
    color: "#e6313a",
    title: "Generosidad de red",
    body: "Compartimos contactos, hallazgos y errores. Lo que una empresa aprende en una misión, la comunidad entera lo capitaliza.",
  },
];

export default function DefinesYellow() {
  return (
    <section className="space-y-5">
      <SectionBanner title="Lo que nos define" className="bg-yellow" arrowClassName="text-green" />

      <div className="grid gap-5 lg:grid-cols-3">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.1} className="h-full">
            <div className="flex h-full flex-col rounded-[28px] border-[1.5px] border-ink/60 bg-yellow p-6 pb-8 text-center sm:p-7">
              <PixelArt matrix={value.matrix} fill={value.color} className="w-full" />
              <h3 className="mt-6 text-[24px] font-black tracking-tight">{value.title}</h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] font-medium leading-relaxed">
                {value.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          href="/#misiones"
          className="group flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-5 text-lg font-bold text-white transition-colors duration-300 hover:bg-blue"
        >
          Explora las misiones 2026
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Reveal>
    </section>
  );
}
