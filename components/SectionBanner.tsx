"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ArrowDown } from "./icons";

function BouncingArrows({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1.5 ${className}`} aria-hidden>
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

type SectionBannerProps = {
  title: string;
  className?: string;
  arrowClassName?: string;
};

export default function SectionBanner({
  title,
  className = "bg-blue",
  arrowClassName = "text-yellow",
}: SectionBannerProps) {
  return (
    <Reveal>
      <div className={`flex items-center justify-between gap-4 rounded-[24px] px-6 py-7 sm:px-10 ${className}`}>
        <BouncingArrows className={arrowClassName} />
        <h2 className="text-center text-3xl font-black tracking-[-0.02em] sm:text-4xl lg:text-[44px]">
          {title}
        </h2>
        <BouncingArrows className={arrowClassName} />
      </div>
    </Reveal>
  );
}
