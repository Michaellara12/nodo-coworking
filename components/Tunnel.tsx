"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/*
 * Túnel en perspectiva estilo "voxel": anillos concéntricos con celdas de
 * color que se barajan solas (y al presionar el botón).
 */

const PALETTE = ["#0e6be8", "#ffb200", "#ff6100", "#e6313a", "#0cb14e", "#ab54f7", "#c9a2f5"];
const RATIO = 0.82;
const RINGS = 9;
const OUTER = 372;
const SEGS = 4;

type Edge = "top" | "bottom" | "left" | "right";

const CELLS: { ring: number; edge: Edge; seg: number }[] = [
  { ring: 0, edge: "top", seg: 1 },
  { ring: 0, edge: "left", seg: 2 },
  { ring: 0, edge: "right", seg: 0 },
  { ring: 0, edge: "bottom", seg: 3 },
  { ring: 1, edge: "top", seg: 3 },
  { ring: 1, edge: "bottom", seg: 0 },
  { ring: 2, edge: "left", seg: 0 },
  { ring: 2, edge: "right", seg: 2 },
  { ring: 2, edge: "top", seg: 0 },
  { ring: 3, edge: "bottom", seg: 2 },
  { ring: 3, edge: "right", seg: 3 },
  { ring: 4, edge: "top", seg: 2 },
  { ring: 4, edge: "left", seg: 3 },
  { ring: 5, edge: "bottom", seg: 1 },
  { ring: 5, edge: "right", seg: 1 },
  { ring: 6, edge: "top", seg: 1 },
  { ring: 6, edge: "left", seg: 0 },
  { ring: 7, edge: "bottom", seg: 3 },
];

function ringSizes() {
  const sizes: number[] = [];
  let s = OUTER;
  for (let i = 0; i < RINGS; i++) {
    sizes.push(s);
    s *= RATIO;
  }
  return sizes;
}

function cellPoints(sOut: number, sIn: number, edge: Edge, seg: number) {
  const t0 = seg / SEGS;
  const t1 = (seg + 1) / SEGS;
  const r = sIn / sOut;
  const a0 = -sOut + 2 * sOut * t0;
  const a1 = -sOut + 2 * sOut * t1;

  switch (edge) {
    case "top":
      return `${a0},${-sOut} ${a1},${-sOut} ${a1 * r},${-sIn} ${a0 * r},${-sIn}`;
    case "bottom":
      return `${a0},${sOut} ${a1},${sOut} ${a1 * r},${sIn} ${a0 * r},${sIn}`;
    case "left":
      return `${-sOut},${a0} ${-sOut},${a1} ${-sIn},${a1 * r} ${-sIn},${a0 * r}`;
    case "right":
      return `${sOut},${a0} ${sOut},${a1} ${sIn},${a1 * r} ${sIn},${a0 * r}`;
  }
}

export default function Tunnel() {
  const sizes = useMemo(ringSizes, []);
  const [colors, setColors] = useState<number[]>(() => CELLS.map((_, i) => i % PALETTE.length));

  const shuffle = useCallback(() => {
    setColors(CELLS.map(() => Math.floor(Math.random() * PALETTE.length)));
  }, []);

  useEffect(() => {
    const id = setInterval(shuffle, 1700);
    return () => clearInterval(id);
  }, [shuffle]);

  const inner = sizes[sizes.length - 1];

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border-[1.5px] border-ink/70 bg-cream lg:min-h-[560px]">
      <svg
        viewBox="-380 -380 760 760"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        {/* celdas de color */}
        {CELLS.map((cell, i) => (
          <polygon
            key={i}
            points={cellPoints(sizes[cell.ring], sizes[cell.ring + 1], cell.edge, cell.seg)}
            fill={PALETTE[colors[i]]}
            style={{ transition: "fill 0.7s ease" }}
          />
        ))}

        {/* anillos */}
        {sizes.map((s, i) => (
          <rect
            key={i}
            x={-s}
            y={-s}
            width={s * 2}
            height={s * 2}
            rx={Math.max(6, s * 0.055)}
            fill="none"
            stroke="#141414"
            strokeWidth={1.4}
          />
        ))}

        {/* diagonales de esquina */}
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([sx, sy], i) => (
          <line
            key={i}
            x1={sx * OUTER}
            y1={sy * OUTER}
            x2={sx * inner}
            y2={sy * inner}
            stroke="#141414"
            strokeWidth={1.4}
          />
        ))}

        {/* rayos de división */}
        {[0.25, 0.5, 0.75].map((t) => {
          const a = -OUTER + 2 * OUTER * t;
          const r = inner / OUTER;
          return (
            <g key={t} stroke="#141414" strokeWidth={1.2}>
              <line x1={a} y1={-OUTER} x2={a * r} y2={-inner} />
              <line x1={a} y1={OUTER} x2={a * r} y2={inner} />
              <line x1={-OUTER} y1={a} x2={-inner} y2={a * r} />
              <line x1={OUTER} y1={a} x2={inner} y2={a * r} />
            </g>
          );
        })}
      </svg>

      <motion.button
        type="button"
        onClick={shuffle}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-purple hover:text-ink sm:left-10"
      >
        Press to Start
      </motion.button>
    </div>
  );
}
