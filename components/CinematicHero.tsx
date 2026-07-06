"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import KaraokeText from "./KaraokeText";
import PlantIllustration from "./PlantIllustration";
import { usePinnedProgress } from "./usePinnedProgress";

/*
 * Hero scrollytelling (pineado + scrub), como el original:
 * título gigante → globo pixel con statement → smiley + ticker → manifiesto karaoke.
 */

const MANIFIESTO =
  "Creemos que la mejor escuela no tiene salones: tiene plantas de producción, bodegas y oficinas ajenas. Que un día dentro de la empresa correcta vale más que un semestre de teoría. Por eso abrimos el backstage de las compañías líderes, curamos cada visita con objetivos claros y convertimos lo aprendido en un plan que se ejecuta. Porque viajar sin método es turismo. Innfiltrarse es volver con ventaja.";

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
  /* espía de la marca como glifo del título */
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/innfiltrados/espia-v2.png" alt="" className={className} aria-hidden />
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
  const p = usePinnedProgress(ref);

  /* fondo: amarillo → naranja → rojo (mismo ritmo del original en px de scroll) */
  const bg = useTransform(p, [0, 0.097, 0.181, 0.306, 0.383], ["#ffb200", "#ffb200", "#ff6100", "#e6313a", "#e6313a"]);

  /* fase A: título (fade por estado + CSS para evitar el secuestro WAAPI del binding) */
  const [titleHidden, setTitleHidden] = useState(false);
  useMotionValueEvent(p, "change", (v) => setTitleHidden(v > 0.104));
  const titleScale = useTransform(p, [0, 0.139], [1, 0.9]);
  const titleY = useTransform(p, [0, 0.139], [0, -80]);

  /* fase B: globo pixel con statement (mismo ritmo del original) */
  const blobOpacity = useTransform(p, [0.111, 0.153, 0.264, 0.313], [0, 1, 1, 0]);
  const blobScale = useTransform(p, [0.111, 0.181, 0.313], [0.35, 1, 1.25]);

  /* fase C: smiley + ticker horizontal — el doble de recorrido que el original */
  const smileyOpacity = useTransform(p, [0.306, 0.389, 0.527, 0.61], [0, 1, 1, 0]);
  const smileyScale = useTransform(p, [0.306, 0.472], [0.3, 1]);
  const tickerX = useTransform(p, [0.306, 0.61], ["105%", "-105%"]);
  const tickerOpacity = useTransform(p, [0.306, 0.347, 0.555, 0.61], [0, 1, 1, 0]);

  /* fase D: manifiesto karaoke + mini-tarjetas — el doble de recorrido que el
   * original, y termina en 0.88 para que el texto completo quede legible un
   * tramo antes de que la sección se despinee */
  const maniOpacity = useTransform(p, [0.6, 0.63], [0, 1]);
  const card1Opacity = useTransform(p, [0.62, 0.65, 0.72, 0.75], [0, 1, 1, 0]);
  const card2Opacity = useTransform(p, [0.72, 0.75, 0.82, 0.85], [0, 1, 1, 0]);
  const card3Opacity = useTransform(p, [0.82, 0.85, 1, 1], [0, 1, 1, 1]);

  return (
    <section ref={ref} className="relative h-[560svh]">
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
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              titleHidden ? "opacity-0" : "opacity-100"
            }`}
          >
          <motion.h1
            style={{ scale: titleScale, y: titleY }}
            className="absolute inset-0 flex flex-col justify-center px-[6%] text-[13.5vw] font-black leading-[0.92] tracking-[-0.03em] lg:text-[9.5vw]"
          >
            <span className="flex items-end gap-[2vw] self-start">
              Así funciona
              <HouseGlyph className="mb-[1.2vw] w-[4vw] min-w-10" />
            </span>
            <span className="self-end lg:mr-[2%]">una misión</span>
          </motion.h1>
          </div>

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
                  Un nuevo enfoque del aprendizaje.
                </p>
                <p className="mt-3 hidden text-[15px] font-semibold leading-snug sm:block lg:text-lg">
                  Construido alrededor de empresas reales, retos reales y la
                  gente que ya los resolvió.
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
              Cómo pensamos las misiones
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
                start={0.63}
                end={0.88}
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
