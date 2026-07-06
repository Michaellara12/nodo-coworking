"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { COLOR_BG, formatoPrecio, nombreMes, type Mision } from "@/lib/types";
import { ChipMision } from "./ui";

export default function MisionCard({
  mision,
  index = 0,
  inscrito = false,
  admin = false,
}: {
  mision: Mision;
  index?: number;
  inscrito?: boolean;
  /* los admins gestionan la misión en lugar de inscribirse */
  admin?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.55, ease: EASE }}
      className={`flex h-full flex-col rounded-[28px] p-6 sm:p-7 ${COLOR_BG[mision.color]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-ink px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-cream">
          {nombreMes(mision.mes)} {mision.anio}
        </span>
        <ChipMision estado={mision.estado} />
      </div>

      <h3 className="mt-5 text-[26px] font-black leading-[1.05] tracking-[-0.02em] sm:text-[30px]">
        {mision.titulo}
      </h3>
      <p className="mt-1.5 text-[13.5px] font-extrabold uppercase tracking-[0.06em]">
        {mision.destino}
      </p>
      <p className="mt-3 flex-1 text-[14.5px] font-medium leading-relaxed">
        {mision.descripcion.length > 150
          ? `${mision.descripcion.slice(0, 150)}…`
          : mision.descripcion}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t-[1.5px] border-ink/50 pt-4">
        <div>
          <p className="text-[17px] font-black leading-tight">
            {formatoPrecio(mision.precio, mision.moneda)}
          </p>
          <p className="text-[12px] font-bold text-ink/70">
            {mision.cupos} cupos · Todo incluido
          </p>
        </div>
        <Link
          href={
            admin
              ? `/plataforma/admin/misiones/${mision.id}`
              : `/plataforma/misiones/${mision.id}`
          }
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          {admin ? "Gestionar" : inscrito ? "Inscrito ✓" : "Ver misión"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </motion.article>
  );
}
