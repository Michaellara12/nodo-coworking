"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { PlusIcon } from "@/components/icons";
import { COLOR_BG, MESES, type Mision } from "@/lib/types";

/*
 * Calendario anual del admin: 12 meses en grilla, cada misión como chip de
 * color en su mes. El “+” de cada mes crea una misión prefijada en ese mes.
 */

export default function Calendario({
  anio,
  misiones,
}: {
  anio: number;
  misiones: Mision[];
}) {
  const porMes = new Map<number, Mision[]>();
  for (const m of misiones.filter((m) => m.anio === anio)) {
    porMes.set(m.mes, [...(porMes.get(m.mes) ?? []), m]);
  }
  const mesActual = new Date().getMonth() + 1;
  const anioActual = new Date().getFullYear();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {MESES.map((nombre, idx) => {
        const mes = idx + 1;
        const delMes = porMes.get(mes) ?? [];
        const esActual = anio === anioActual && mes === mesActual;

        return (
          <motion.div
            key={nombre}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03, duration: 0.45, ease: EASE }}
            className={`flex min-h-[132px] flex-col rounded-[20px] p-4 ${
              esActual
                ? "bg-ink text-cream"
                : "border-[1.5px] border-ink/40 bg-cream"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-[13px] font-black uppercase tracking-[0.1em] ${
                  esActual ? "text-yellow" : ""
                }`}
              >
                {nombre}
              </p>
              <Link
                href={`/plataforma/admin/misiones/nueva?mes=${mes}&anio=${anio}`}
                aria-label={`Agregar misión en ${nombre} ${anio}`}
                className={`grid size-7 place-items-center rounded-full transition-colors ${
                  esActual
                    ? "bg-cream/15 text-cream hover:bg-yellow hover:text-ink"
                    : "border-[1.5px] border-ink/40 hover:bg-ink hover:text-cream"
                }`}
              >
                <PlusIcon className="size-3.5" />
              </Link>
            </div>

            <div className="mt-3 flex flex-1 flex-col gap-2">
              {delMes.length === 0 ? (
                <span
                  className={`text-[12px] font-semibold ${
                    esActual ? "text-cream/50" : "text-ink/40"
                  }`}
                >
                  Sin misiones
                </span>
              ) : (
                delMes.map((m) => (
                  <Link
                    key={m.id}
                    href={`/plataforma/admin/misiones/${m.id}`}
                    className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-ink transition-transform duration-200 hover:scale-[1.03] ${COLOR_BG[m.color]} ${
                      m.estado === "finalizada" ? "opacity-60" : ""
                    }`}
                  >
                    <span className="truncate text-[12.5px] font-bold leading-tight">
                      {m.titulo}
                    </span>
                    <span className="shrink-0 text-[10.5px] font-black uppercase tracking-wide text-ink/60">
                      {m.tipo === "internacional" ? "INT" : "COL"}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
