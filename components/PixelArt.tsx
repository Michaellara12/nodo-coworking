"use client";

import { motion } from "framer-motion";

const CELL = 22;

type PixelArtProps = {
  matrix: string[];
  fill: string;
  className?: string;
};

export default function PixelArt({ matrix, fill, className = "" }: PixelArtProps) {
  const rows = matrix.length;
  const cols = Math.max(...matrix.map((r) => r.length));
  const w = cols * CELL;
  const h = rows * CELL;

  const cells: { x: number; y: number }[] = [];
  matrix.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === "#") cells.push({ x, y });
    });
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      {/* cuadrícula */}
      <g stroke="#141414" strokeOpacity={0.4} strokeWidth={1}>
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={h} />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * CELL} x2={w} y2={i * CELL} />
        ))}
      </g>

      {/* celdas */}
      {cells.map((c, i) => (
        <motion.rect
          key={i}
          x={c.x * CELL}
          y={c.y * CELL}
          width={CELL}
          height={CELL}
          fill={fill}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15 + i * 0.018, duration: 0.3, ease: "backOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
