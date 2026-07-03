"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KaraokeText from "./KaraokeText";
import PlantIllustration from "./PlantIllustration";

/*
 * Hero scrollytelling (pineado + scrub), como el original:
 * título gigante → globo pixel con statement → smiley + ticker → manifiesto karaoke.
 */

const MANIFIESTO =
  "Creemos que trabajar debería sentirse natural, no provisional. Funcional, pero también personal. Social, sin forzarlo. Por eso diseñamos espacios que acompañan tu día, crean lugar para conectar y le quitan la fricción a todo lo demás. Porque trabajar no debería sentirse como un sacrificio. Debería sentirse en su punto.";

/* globo pixel: B = borde negro, # = relleno rojo */
const BLOB = [
  "......BBBBBBBBBB......",
  "....BB##########BB....",
  "..BB##############BB..",
  ".B##################B.",
  "B####################B",
  "B####################B",
  "B####################B",
  "B####################B",
  ".B##################B.",
  "..BB##############BB..",
  "....BB##########BB....",
  "......BBBBBBBBBB......",
];

/* smiley pixel */
const SMILEY = [
  ".....######.....",
  "...##......##...",
  "..#..........#..",
  ".#............#.",
  ".#............#.",
  "#....##..##....#",
  "#....##..##....#",
  "#..............#",
  "#..............#",
  "#...#......#...#",
  ".#...######...#.",
  ".#............#.",
  "..#..........#..",
  "...##......##...",
  ".....######.....",
];

function PixelSvg({ matrix, colors, className, opacity = 1 }: {
  matrix: string[];
  colors: Record<string, string>;
  className?: string;
  opacity?: number;
}) {
  const rows = matrix.length;
  const cols = Math.max(...matrix.map((r) => r.length));
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" className={className} aria-hidden opacity={opacity}>
      {matrix.flatMap((row, y) =>
        [...row].map((ch, x) =>
          colors[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={colors[ch]} /> : null
        )
      )}
    </svg>
  );
}

function HouseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 44" className={className} aria-hidden>
      <path d="M24 2 46 22h-6v20H8V22H2L24 2Z" fill="#141414" />
    </svg>
  );
}

/* mini-tarjetas laterales que rotan durante el manifiesto */
function MiniCard({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-[20px] ${bg}`}>
      <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden>
        <defs>
          <pattern id="minigrid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0v14" fill="none" stroke="currentColor" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#minigrid)" />
      </svg>
      <div className="relative flex h-full items-center justify-center">{children}</div>
    </div>
  );
}

function VaseIllustration() {
  return (
    <svg viewBox="0 0 120 140" className="h-3/4" aria-hidden>
      <rect x="18" y="86" width="60" height="16" rx="8" fill="#c9a2f5" />
      <rect x="24" y="46" width="20" height="18" fill="#ffdb08" />
      <rect x="46" y="46" width="20" height="18" fill="#f1e8e0" />
      <rect x="24" y="66" width="20" height="18" fill="#f1e8e0" />
      <rect x="46" y="66" width="20" height="18" fill="#c9a2f5" />
      <path d="M88 60c0-20 8-30 8-30s8 10 8 30a8 8 0 0 1-16 0Z" fill="#0e6be8" stroke="#f1e8e0" strokeWidth="3" />
      <rect x="84" y="72" width="24" height="34" rx="6" fill="#1be349" />
      <circle cx="78" cy="34" r="5" fill="#ff6100" />
      <circle cx="104" cy="24" r="5" fill="#ffdb08" />
      <circle cx="92" cy="16" r="5" fill="#f1e8e0" />
    </svg>
  );
}

function KeysIllustration() {
  return (
    <svg viewBox="0 0 120 140" className="h-3/4" aria-hidden>
      <circle cx="46" cy="36" r="18" fill="none" stroke="#f1e8e0" strokeWidth="9" />
      <rect x="41" y="52" width="10" height="58" rx="4" fill="#f1e8e0" />
      <rect x="51" y="86" width="16" height="9" rx="3" fill="#f1e8e0" />
      <rect x="51" y="100" width="12" height="9" rx="3" fill="#f1e8e0" />
      <path d="M84 26l14 10-5 16-17-1-4-15Z" fill="#0e6be8" />
      <path d="M30 96l-12 8 4 14 15-2 3-12Z" fill="#ffdb08" />
    </svg>
  );
}

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  /* fondo: amarillo → naranja → rojo */
  const bg = useTransform(p, [0, 0.14, 0.26, 0.44, 0.55], ["#ffb200", "#ffb200", "#ff6100", "#e6313a", "#e6313a"]);

  /* fase A: título */
  const titleOpacity = useTransform(p, [0, 0.12, 0.2], [1, 1, 0]);
  const titleScale = useTransform(p, [0, 0.2], [1, 0.9]);
  const titleY = useTransform(p, [0, 0.2], [0, -80]);

  /* fase B: globo pixel con statement */
  const blobOpacity = useTransform(p, [0.16, 0.22, 0.38, 0.45], [0, 1, 1, 0]);
  const blobScale = useTransform(p, [0.16, 0.26, 0.45], [0.35, 1, 1.25]);

  /* fase C: smiley + ticker horizontal */
  const smileyOpacity = useTransform(p, [0.44, 0.5, 0.6, 0.66], [0, 1, 1, 0]);
  const smileyScale = useTransform(p, [0.44, 0.56], [0.3, 1]);
  const tickerX = useTransform(p, [0.44, 0.66], ["105%", "-105%"]);
  const tickerOpacity = useTransform(p, [0.44, 0.47, 0.62, 0.66], [0, 1, 1, 0]);

  /* fase D: manifiesto karaoke + mini-tarjetas */
  const maniOpacity = useTransform(p, [0.66, 0.71], [0, 1]);
  const card1Opacity = useTransform(p, [0.7, 0.73, 0.79, 0.82], [0, 1, 1, 0]);
  const card2Opacity = useTransform(p, [0.79, 0.82, 0.88, 0.91], [0, 1, 1, 0]);
  const card3Opacity = useTransform(p, [0.88, 0.91, 1, 1], [0, 1, 1, 1]);

  return (
    <section ref={ref} className="relative h-[420svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center py-4 sm:py-5">
        <motion.div
          style={{ backgroundColor: bg }}
          className="relative h-full w-full overflow-hidden rounded-[28px]"
        >
          {/* cuadrícula */}
          <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden>
            <defs>
              <pattern id="cinegrid" width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M72 0H0v72" fill="none" stroke="currentColor" strokeOpacity="0.18" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cinegrid)" />
          </svg>

          {/* fase A: título gigante */}
          <motion.h1
            style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
            className="absolute inset-0 flex flex-col justify-center px-[6%] text-[13.5vw] font-black leading-[0.92] tracking-[-0.03em] lg:text-[9.5vw]"
          >
            <span className="flex items-end gap-[2vw] self-start">
              Nuestra forma
              <HouseGlyph className="mb-[1.2vw] w-[3.2vw] min-w-8" />
            </span>
            <span className="self-end lg:mr-[2%]">de trabajar</span>
          </motion.h1>

          {/* fase B: globo pixel */}
          <motion.div
            style={{ opacity: blobOpacity, scale: blobScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative flex aspect-[22/12] w-[min(92%,880px)] items-center justify-center">
              <PixelSvg
                matrix={BLOB}
                colors={{ "#": "#e6313a", B: "#141414" }}
                className="absolute inset-0 h-full w-full"
              />
              <div className="relative max-w-[70%] text-center">
                <p className="text-xl font-black leading-tight sm:text-3xl lg:text-4xl">
                  Un nuevo enfoque del trabajo.
                </p>
                <p className="mt-3 hidden text-[15px] font-semibold leading-snug sm:block lg:text-lg">
                  Construido alrededor de las personas, el día a día y un
                  sentido real de pertenencia.
                </p>
              </div>
            </div>
          </motion.div>

          {/* fase C: smiley + ticker */}
          <motion.div
            style={{ opacity: smileyOpacity, scale: smileyScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PixelSvg
              matrix={SMILEY}
              colors={{ "#": "#ab54f7" }}
              className="h-[70%] max-h-[640px]"
            />
          </motion.div>
          <motion.div
            style={{ x: tickerX, opacity: tickerOpacity }}
            className="absolute inset-y-0 flex items-center"
          >
            <span className="whitespace-nowrap text-[11vw] font-black leading-none tracking-[-0.03em] lg:text-[8vw]">
              Cómo pensamos el trabajo
            </span>
          </motion.div>

          {/* fase D: manifiesto karaoke */}
          <motion.div
            style={{ opacity: maniOpacity }}
            className="absolute inset-0 flex items-center gap-8 px-[6%]"
          >
            <div className="max-w-4xl flex-1">
              <KaraokeText
                text={MANIFIESTO}
                progress={p}
                start={0.72}
                end={0.97}
                className="text-[22px] font-extrabold leading-[1.25] tracking-[-0.01em] sm:text-3xl lg:text-[40px]"
              />
            </div>
            <div className="relative hidden h-72 w-56 shrink-0 md:block">
              <motion.div style={{ opacity: card1Opacity }} className="absolute inset-0">
                <MiniCard bg="bg-orange">
                  <PlantIllustration className="h-3/4" />
                </MiniCard>
              </motion.div>
              <motion.div style={{ opacity: card2Opacity }} className="absolute inset-0">
                <MiniCard bg="bg-blue">
                  <VaseIllustration />
                </MiniCard>
              </motion.div>
              <motion.div style={{ opacity: card3Opacity }} className="absolute inset-0">
                <MiniCard bg="bg-lilac">
                  <KeysIllustration />
                </MiniCard>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
