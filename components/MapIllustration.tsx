"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";

/* Mapa decorativo estilo "city grid" en la paleta de la marca. */

const BLOCKS = [
  { x: 40, y: 40, w: 150, h: 110 },
  { x: 230, y: 20, w: 120, h: 130 },
  { x: 390, y: 50, w: 170, h: 100 },
  { x: 600, y: 20, w: 160, h: 130 },
  { x: 20, y: 200, w: 130, h: 140 },
  { x: 190, y: 190, w: 160, h: 100 },
  { x: 390, y: 190, w: 120, h: 150 },
  { x: 550, y: 190, w: 210, h: 90 },
  { x: 60, y: 390, w: 170, h: 120 },
  { x: 270, y: 330, w: 140, h: 180 },
  { x: 450, y: 380, w: 180, h: 130 },
  { x: 670, y: 320, w: 110, h: 190 },
  { x: 200, y: 550, w: 190, h: 100 },
  { x: 440, y: 550, w: 150, h: 100 },
];

const PINS = [
  { x: 110, y: 130 },
  { x: 320, y: 90 },
  { x: 700, y: 110 },
  { x: 90, y: 300 },
  { x: 620, y: 250 },
  { x: 160, y: 470 },
  { x: 360, y: 430 },
  { x: 720, y: 430 },
  { x: 520, y: 610 },
];

export default function MapIllustration() {
  return (
    <div className="absolute inset-0 bg-yellow">
      <svg
        viewBox="0 0 800 660"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label="Mapa ilustrado con los destinos de las misiones Innfiltrados"
      >
        {/* manzanas */}
        <g transform="rotate(-4 400 330)">
          {BLOCKS.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={14}
              fill={i % 3 === 0 ? "#ffdb08" : "#ffc53d"}
              opacity={0.9}
            />
          ))}

          {/* calles */}
          <g stroke="#ff9500" strokeWidth={7} strokeLinecap="round" opacity={0.85}>
            <path d="M-40 170 H840" />
            <path d="M-40 355 H840" />
            <path d="M-40 530 H840" />
            <path d="M170 -40 V700" />
            <path d="M370 -40 V700" />
            <path d="M575 -40 V700" />
          </g>
          <path d="M-60 620 L860 80" stroke="#ff8a00" strokeWidth={13} strokeLinecap="round" opacity={0.9} />
        </g>

        {/* pins secundarios */}
        {PINS.map((p, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.45, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={p.x} cy={p.y} r={15} fill="#f1e8e0" stroke="#141414" strokeWidth={2} />
            <rect x={p.x - 5} y={p.y - 5.5} width={10} height={11} rx={1.5} fill="#141414" />
            <rect x={p.x - 2.6} y={p.y - 2.8} width={2} height={2} fill="#f1e8e0" />
            <rect x={p.x + 0.8} y={p.y - 2.8} width={2} height={2} fill="#f1e8e0" />
            <rect x={p.x - 2.6} y={p.y + 0.6} width={2} height={2} fill="#f1e8e0" />
            <rect x={p.x + 0.8} y={p.y + 0.6} width={2} height={2} fill="#f1e8e0" />
          </motion.g>
        ))}

        {/* pin principal */}
        <motion.g
          initial={{ opacity: 0, y: -26, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <g className="animate-bob">
            <rect x={310} y={230} width={212} height={46} rx={23} fill="#ff5a36" />
            <text
              x={416}
              y={260}
              textAnchor="middle"
              fontSize={20}
              fontWeight={700}
              fill="#141414"
            >
              Próxima misión
            </text>
            <path
              d="M416 322c-14-14-24-25-24-36a24 24 0 1 1 48 0c0 11-10 22-24 36Z"
              fill="#141414"
            />
            <circle cx={416} cy={286} r={8} fill="#ff5a36" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
