"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

/*
 * Texto "karaoke": las palabras pasan de tenues a plenas a medida que avanza
 * un MotionValue de progreso (scrub de scroll), como el SplitText del original.
 */

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

type KaraokeTextProps = {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  className?: string;
};

export default function KaraokeText({ text, progress, start, end, className }: KaraokeTextProps) {
  const words = text.split(" ");
  const span = end - start;
  return (
    <p className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={progress}
          range={[start + (span * i) / words.length, start + (span * (i + 1)) / words.length]}
        />
      ))}
    </p>
  );
}
