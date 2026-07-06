"use client";

import { motion } from "framer-motion";
import type { InscripcionEstado, MisionEstado } from "@/lib/types";

/* Piezas pequeñas de UI de la plataforma, en el design system del sitio. */

/* Chip informativo sólido — distinto a propósito de los botones outlined. */
export function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block w-fit rounded-full bg-ink px-4 py-1.5 text-[13px] font-bold text-cream ${className}`}
    >
      {children}
    </span>
  );
}

export function TituloPagina({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1 className="text-4xl font-black leading-[1.0] tracking-[-0.02em] sm:text-5xl">
        {titulo}
      </h1>
      {descripcion && (
        <p className="mt-3 max-w-2xl text-[15.5px] font-medium leading-relaxed text-ink/80">
          {descripcion}
        </p>
      )}
    </motion.header>
  );
}

export function StatCard({
  valor,
  etiqueta,
  className = "bg-yellow",
}: {
  valor: string;
  etiqueta: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[22px] p-5 ${className}`}>
      <p className="text-3xl font-black tracking-[-0.02em] sm:text-4xl">{valor}</p>
      <p className="mt-1 text-[13.5px] font-bold">{etiqueta}</p>
    </div>
  );
}

const ESTADO_INSCRIPCION: Record<InscripcionEstado, { label: string; cls: string }> = {
  pagada: { label: "Pagada", cls: "bg-mint text-ink" },
  pendiente: { label: "Pago pendiente", cls: "bg-lemon text-ink" },
  cancelada: { label: "Cancelada", cls: "bg-red text-white" },
};

export function ChipInscripcion({ estado }: { estado: InscripcionEstado }) {
  const e = ESTADO_INSCRIPCION[estado];
  return (
    <span className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold ${e.cls}`}>
      {e.label}
    </span>
  );
}

const ESTADO_MISION: Record<MisionEstado, { label: string; cls: string }> = {
  abierta: { label: "Inscripciones abiertas", cls: "bg-mint text-ink" },
  agotada: { label: "Cupos agotados", cls: "bg-lemon text-ink" },
  finalizada: { label: "Finalizada", cls: "bg-ink text-cream" },
};

export function ChipMision({ estado }: { estado: MisionEstado }) {
  const e = ESTADO_MISION[estado];
  return (
    <span className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold ${e.cls}`}>
      {e.label}
    </span>
  );
}

/* ——— Formularios ——— */

export function Campo({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-bold">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export const inputCls =
  "w-full rounded-2xl border-[1.5px] border-ink/50 bg-transparent px-4 py-3 text-[15px] font-medium transition-colors placeholder:text-ink/40 focus:border-ink focus:outline-none";

export function BotonInk({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:bg-ink/85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="flex gap-1.5" aria-hidden>
        {["#e6313a", "#ffb200", "#0e6be8", "#0cb14e"].map((c, i) => (
          <motion.span
            key={c}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            className="block size-3.5"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <p className="text-[14px] font-bold text-ink/60">{texto}</p>
    </div>
  );
}

export function AvisoSetup() {
  return (
    <div className="rounded-[28px] bg-yellow p-8 sm:p-10">
      <Pill>Configuración pendiente</Pill>
      <h2 className="mt-5 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
        Falta preparar la base de datos
      </h2>
      <p className="mt-4 max-w-2xl text-[15.5px] font-medium leading-relaxed">
        La plataforma ya está conectada a Supabase, pero el proyecto aún no
        tiene las tablas. Abre el <strong>SQL Editor</strong> de tu proyecto en
        Supabase, pega el contenido de{" "}
        <code className="rounded-md bg-ink px-2 py-0.5 text-[13px] font-bold text-lemon">
          supabase/schema.sql
        </code>{" "}
        y presiona <strong>Run</strong>. Luego recarga esta página.
      </p>
      <p className="mt-3 text-[14px] font-semibold text-ink/70">
        El paso a paso completo está en supabase/README.md.
      </p>
    </div>
  );
}
