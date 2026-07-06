"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, CheckIcon } from "@/components/icons";

/*
 * Dropdown propio con el design system de la marca: nada de <select> nativo.
 * Compatible con formularios no controlados vía un <input type="hidden">.
 */

export type Opcion = { value: string; label: string };

export default function Select({
  id,
  name,
  options,
  defaultValue,
  value,
  onChange,
  className = "",
}: {
  id?: string;
  name?: string;
  options: Opcion[];
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [interno, setInterno] = useState(defaultValue ?? options[0]?.value ?? "");
  const actual = value !== undefined ? value : interno;
  const seleccionada = options.find((o) => o.value === actual);
  const ref = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const clickFuera = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("mousedown", clickFuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", clickFuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  /* al abrir, deja a la vista la opción seleccionada */
  useEffect(() => {
    if (!abierto) return;
    listaRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [abierto]);

  const elegir = (v: string) => {
    setInterno(v);
    onChange?.(v);
    setAbierto(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {name && <input type="hidden" name={name} value={actual} />}

      <button
        type="button"
        id={id}
        onClick={() => setAbierto((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border-[1.5px] bg-transparent px-4 py-3 text-left text-[15px] font-medium transition-colors focus:outline-none ${
          abierto ? "border-ink" : "border-ink/50 hover:border-ink focus-visible:border-ink"
        }`}
      >
        <span className="truncate">{seleccionada?.label ?? "Selecciona…"}</span>
        <span
          className={`grid size-6 shrink-0 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 ${
            abierto ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <ArrowDown className="size-3.5" />
        </span>
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.ul
            ref={listaRef}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-64 origin-top overflow-auto rounded-2xl border-[1.5px] border-ink bg-cream p-1.5 shadow-[5px_5px_0_0_#141414] scrollbar-hide"
          >
            {options.map((o) => {
              const activa = o.value === actual;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={activa}
                    onClick={() => elegir(o.value)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-[14.5px] font-semibold transition-colors ${
                      activa ? "bg-ink text-cream" : "hover:bg-yellow"
                    }`}
                  >
                    <span className="truncate">{o.label}</span>
                    {activa && <CheckIcon className="size-4 shrink-0 text-yellow" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
