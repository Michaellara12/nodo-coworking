"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";
import { SITE } from "@/lib/site";

const PIXELS = [
  { left: "34%", top: "8%", color: "#ab54f7" },
  { left: "92%", top: "16%", color: "#0e6be8" },
  { left: "60%", top: "24%", color: "#ffb200" },
  { left: "13%", top: "58%", color: "#0cb14e" },
  { left: "21%", top: "72%", color: "#e6313a" },
  { left: "78%", top: "64%", color: "#ff6100" },
  { left: "45%", top: "86%", color: "#141414" },
  { left: "5%", top: "30%", color: "#ffdb08" },
];

const LINKS = [
  { label: "Plataforma", href: "/plataforma" },
  { label: "Instagram", href: SITE.instagram },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Política de datos", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-4">
      <div className="relative">
        {/* cuadrícula */}
        <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden>
          <defs>
            <pattern id="fgrid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0v44" fill="none" stroke="currentColor" strokeOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fgrid)" />
        </svg>

        {/* pixeles dispersos */}
        {PIXELS.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: "backOut" }}
            className="absolute size-[26px] sm:size-[44px]"
            style={{ left: p.left, top: p.top, backgroundColor: p.color }}
            aria-hidden
          />
        ))}

        {/* wordmark gigante */}
        <div className="relative flex justify-center pb-8 pt-14 sm:pb-12 sm:pt-20">
          <h2
            aria-label="innfiltrados."
            className="flex text-[11.5vw] font-black leading-[0.82] tracking-[-0.05em] lg:text-[8vw]"
          >
            {[..."innfiltrados."].map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "45%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05, duration: 0.8, ease: EASE }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      <div className="relative mt-2 flex flex-col gap-5 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-extrabold">© 2026 Innfiltrados® — Todos los derechos reservados</p>
          <p className="mt-1 text-sm font-medium text-ink/70">
            {SITE.city} ·{" "}
            <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
              {SITE.phone}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-bold transition-colors hover:bg-ink hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
