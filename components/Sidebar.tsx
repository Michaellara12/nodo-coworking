"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./Reveal";
import {
  ArrowUpRight,
  CloseIcon,
  FacebookIcon,
  Globe,
  InstagramIcon,
  MenuIcon,
  TiktokIcon,
} from "./icons";

const NAV = [
  { n: "01", label: "Espacios", href: "#espacios", bg: "bg-blue" },
  { n: "02", label: "Todo incluido", href: "#todo-incluido", bg: "bg-yellow" },
  { n: "03", label: "Comunidad", href: "#comunidad", bg: "bg-orange" },
  { n: "04", label: "Contacto", href: "#contacto", bg: "bg-green" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="block select-none">
      <span
        className={`block font-black leading-none tracking-[-0.045em] ${
          compact ? "text-[26px]" : "text-[38px]"
        }`}
      >
        nodo.
      </span>
      <span
        className={`mt-1 block font-bold uppercase tracking-[0.24em] text-ink/80 ${
          compact ? "text-[6.5px]" : "text-[8px]"
        }`}
      >
        Espacios de trabajo únicos
      </span>
    </a>
  );
}

function NavCard({
  item,
  index,
  onClick,
  className = "",
}: {
  item: (typeof NAV)[number];
  index: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.6, ease: EASE }}
      className={`${item.bg} group relative flex flex-col justify-between overflow-hidden rounded-2xl p-3.5 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-bold">{item.n}</span>
        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <span className="text-[15px] font-bold leading-tight">{item.label}</span>
    </motion.a>
  );
}

function SocialBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-around rounded-full bg-ink px-2 py-3 text-cream ${className}`}>
      <a href="#" aria-label="Instagram" className="transition-colors hover:text-yellow">
        <InstagramIcon className="size-[18px]" />
      </a>
      <a href="#" aria-label="Facebook" className="transition-colors hover:text-yellow">
        <FacebookIcon className="size-[18px]" />
      </a>
      <a href="#" aria-label="TikTok" className="transition-colors hover:text-yellow">
        <TiktokIcon className="size-[18px]" />
      </a>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ——— Sidebar escritorio ——— */}
      <aside className="fixed inset-y-5 left-5 z-40 hidden w-[164px] flex-col lg:flex">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Wordmark />
        </motion.div>

        <nav className="mt-5 flex flex-1 flex-col gap-3">
          {NAV.map((item, i) => (
            <NavCard key={item.n} item={item} index={i} className="flex-1" />
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
          className="mt-3 space-y-2.5"
        >
          <a
            href="#contacto"
            className="block rounded-xl bg-purple px-3 py-3.5 text-center text-[14px] font-bold transition hover:brightness-110 active:scale-[0.98]"
          >
            Reserva tu puesto
          </a>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-full bg-ink px-4 py-3 text-[13px] font-semibold text-cream transition hover:text-yellow"
          >
            <span>English</span>
            <Globe className="size-4" />
          </button>
          <SocialBar />
        </motion.div>
      </aside>

      {/* ——— Header móvil ——— */}
      <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-2xl border border-ink/10 bg-cream/85 py-2.5 pl-4 pr-2.5 backdrop-blur-md lg:hidden">
        <Wordmark compact />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="rounded-xl bg-ink p-2.5 text-cream"
        >
          <MenuIcon className="size-5" />
        </button>
      </header>

      {/* ——— Menú móvil ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream p-4 lg:hidden"
          >
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 py-2.5 pl-4 pr-2.5">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-xl bg-ink p-2.5 text-cream"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav className="mt-4 grid flex-1 grid-cols-2 gap-3">
              {NAV.map((item, i) => (
                <NavCard key={item.n} item={item} index={i} onClick={() => setOpen(false)} className="min-h-32" />
              ))}
            </nav>

            <div className="mt-4 space-y-3">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block rounded-2xl bg-purple px-4 py-4 text-center text-base font-bold"
              >
                Reserva tu puesto
              </a>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-between rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-cream"
                >
                  <span>English</span>
                  <Globe className="size-4" />
                </button>
                <SocialBar className="flex-1 gap-4 px-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
