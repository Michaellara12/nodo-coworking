"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight, CheckIcon } from "@/components/icons";
import { useAuth } from "@/components/plataforma/AuthProvider";
import {
  AvisoSetup,
  Cargando,
  ChipInscripcion,
  ChipMision,
  Pill,
} from "@/components/plataforma/ui";
import { fetchMisInscripciones, fetchMision } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import {
  COLOR_BG,
  formatoPrecio,
  nombreMes,
  type Inscripcion,
  type Mision,
} from "@/lib/types";

export default function MisionDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { user, esAdmin } = useAuth();
  const [mision, setMision] = useState<Mision | null | undefined>(undefined);
  const [inscripcion, setInscripcion] = useState<Inscripcion | null>(null);
  const [errorSetup, setErrorSetup] = useState(false);

  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      try {
        const [m, ins] = await Promise.all([
          fetchMision(id),
          fetchMisInscripciones(user.id),
        ]);
        setMision(m);
        setInscripcion(
          ins.find((i) => i.mision_id === id && i.estado !== "cancelada") ?? null
        );
      } catch (e) {
        if (esErrorDeSetup(e as { code?: string })) setErrorSetup(true);
        else throw e;
      }
    })();
  }, [user, id]);

  if (errorSetup) return <AvisoSetup />;
  if (mision === undefined) return <Cargando texto="Abriendo el expediente…" />;

  if (mision === null) {
    return (
      <div className="rounded-[28px] border-[1.5px] border-ink/50 p-8">
        <h1 className="text-2xl font-black">Misión no encontrada</h1>
        <Link href="/plataforma/misiones" className="mt-4 inline-block font-bold underline underline-offset-4">
          ← Volver a misiones
        </Link>
      </div>
    );
  }

  const puedeInscribirse = mision.estado === "abierta" && !inscripcion && !esAdmin;

  return (
    <div className="space-y-5">
      <Link
        href="/plataforma/misiones"
        className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
      >
        ← Todas las misiones
      </Link>

      {/* encabezado */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`overflow-hidden rounded-[28px] ${COLOR_BG[mision.color]}`}
      >
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-between p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Pill className="uppercase tracking-[0.08em]">
                {nombreMes(mision.mes)} {mision.anio}
              </Pill>
              <ChipMision estado={mision.estado} />
              {inscripcion && <ChipInscripcion estado={inscripcion.estado} />}
            </div>

            <div className="my-8">
              <h1 className="text-4xl font-black leading-[1.0] tracking-[-0.02em] sm:text-5xl">
                {mision.titulo}
              </h1>
              <p className="mt-3 text-[15px] font-extrabold uppercase tracking-[0.06em]">
                {mision.destino}
              </p>
              <p className="mt-5 max-w-xl text-[16px] font-medium leading-relaxed">
                {mision.descripcion}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {mision.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-[1.5px] border-ink/70 px-3.5 py-1.5 text-[12.5px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-ink/50 pt-6">
              <div>
                <p className="text-3xl font-black tracking-[-0.02em]">
                  {formatoPrecio(mision.precio, mision.moneda)}
                </p>
                <p className="text-[13px] font-bold text-ink/70">
                  por innfiltrado · {mision.cupos} cupos · Todo incluido
                </p>
              </div>

              {esAdmin ? (
                <Link
                  href={`/plataforma/admin/misiones/${mision.id}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  Gestionar misión
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ) : puedeInscribirse ? (
                <Link
                  href={`/plataforma/misiones/${mision.id}/pago`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  Inscribirme a esta misión
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ) : inscripcion ? (
                <Link
                  href="/plataforma/mis-misiones"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  Ver mi inscripción
                  <ArrowUpRight className="size-5" />
                </Link>
              ) : (
                <span className="rounded-full bg-ink px-7 py-4 text-base font-bold text-cream/80">
                  Inscripciones cerradas
                </span>
              )}
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-full">
            <Image
              src={mision.imagen}
              alt={`Imagen de la misión ${mision.titulo}`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* qué incluye */}
      <section className="grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="rounded-[28px] border-[1.5px] border-ink/60 p-7 sm:p-8"
        >
          <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-[27px]">
            Tu cupo incluye
          </h2>
          <ul className="mt-5 space-y-3">
            {mision.incluye.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-[15px] font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: EASE }}
          className="flex flex-col justify-between rounded-[28px] bg-ink p-7 text-cream sm:p-8"
        >
          <div>
            <h2 className="text-2xl font-black tracking-[-0.02em] text-yellow sm:text-[27px]">
              Así se vive una misión
            </h2>
            <ul className="mt-5 space-y-4 text-[15px] font-medium leading-relaxed">
              <li>
                <strong className="text-yellow">Antes:</strong> diagnóstico de tu
                reto, briefing de anfitrionas y kit del innfiltrado.
              </li>
              <li>
                <strong className="text-yellow">Durante:</strong> recorridos
                backstage, Q&A con líderes y síntesis diaria.
              </li>
              <li>
                <strong className="text-yellow">Después:</strong> playbook de
                hallazgos, plan a 90 días y comunidad alumni.
              </li>
            </ul>
          </div>
          <p className="mt-6 text-[13px] font-semibold text-cream/60">
            ¿Dudas sobre esta misión? Escríbenos al +57 300 539 3295.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
