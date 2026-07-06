"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, PlusIcon } from "@/components/icons";
import AdminGuard from "@/components/plataforma/AdminGuard";
import Calendario from "@/components/plataforma/Calendario";
import {
  AvisoSetup,
  Cargando,
  ChipMision,
  StatCard,
  TituloPagina,
} from "@/components/plataforma/ui";
import { fetchMisiones, fetchTodasInscripciones } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import {
  formatoPrecio,
  nombreMes,
  type Inscripcion,
  type Mision,
} from "@/lib/types";

function AdminContenido() {
  const [misiones, setMisiones] = useState<Mision[] | null>(null);
  const [inscripciones, setInscripciones] = useState<Inscripcion[] | null>(null);
  const [anio, setAnio] = useState(2026);
  const [errorSetup, setErrorSetup] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [ms, ins] = await Promise.all([fetchMisiones(), fetchTodasInscripciones()]);
        setMisiones(ms);
        setInscripciones(ins);
      } catch (e) {
        if (esErrorDeSetup(e as { code?: string })) setErrorSetup(true);
        else throw e;
      }
    })();
  }, []);

  const stats = useMemo(() => {
    if (!misiones || !inscripciones) return null;
    const activas = inscripciones.filter((i) => i.estado !== "cancelada");
    const pagadas = inscripciones.filter((i) => i.estado === "pagada");
    const usd = pagadas
      .filter((i) => i.moneda === "USD")
      .reduce((s, i) => s + Number(i.monto), 0);
    const cop = pagadas
      .filter((i) => i.moneda === "COP")
      .reduce((s, i) => s + Number(i.monto), 0);
    return {
      abiertas: misiones.filter((m) => m.estado === "abierta").length,
      inscritos: activas.length,
      pendientes: inscripciones.filter((i) => i.estado === "pendiente").length,
      recaudo:
        [
          usd > 0 ? formatoPrecio(usd, "USD") : null,
          cop > 0 ? formatoPrecio(cop, "COP") : null,
        ]
          .filter(Boolean)
          .join(" + ") || "USD $0",
    };
  }, [misiones, inscripciones]);

  if (errorSetup) return <AvisoSetup />;
  if (!misiones || !inscripciones || !stats)
    return <Cargando texto="Abriendo el panel…" />;

  const inscritosPorMision = new Map<string, number>();
  for (const i of inscripciones) {
    if (i.estado === "cancelada") continue;
    inscritosPorMision.set(i.mision_id, (inscritosPorMision.get(i.mision_id) ?? 0) + 1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <TituloPagina
          titulo="Centro de operaciones"
          descripcion="Calendario de misiones, inscritos y recaudo — todo el backstage de Innfiltrados en un solo lugar."
        />
        <Link
          href="/plataforma/admin/misiones/nueva"
          className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-bold text-yellow transition-colors duration-300 hover:bg-yellow hover:text-ink"
        >
          <PlusIcon className="size-4" />
          Nueva misión
        </Link>
      </div>

      {/* stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard valor={String(stats.abiertas)} etiqueta="Misiones abiertas" className="bg-yellow" />
        <StatCard valor={String(stats.inscritos)} etiqueta="Innfiltrados inscritos" className="bg-mint" />
        <StatCard valor={String(stats.pendientes)} etiqueta="Pagos por confirmar" className="bg-lemon" />
        <StatCard valor={stats.recaudo} etiqueta="Recaudo confirmado" className="bg-lilac" />
      </section>

      {/* calendario */}
      <section className="rounded-[28px] border-[1.5px] border-ink/60 p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">
            Calendario de misiones
          </h2>
          <div className="flex rounded-full border-[1.5px] border-ink p-1">
            {[2026, 2027].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAnio(a)}
                className={`rounded-full px-5 py-2 text-[13.5px] font-bold transition-colors ${
                  anio === a ? "bg-ink text-cream" : "hover:bg-ink/10"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <Calendario anio={anio} misiones={misiones} />
      </section>

      {/* lista de misiones */}
      <section className="space-y-3">
        <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">
          Todas las misiones
        </h2>
        {misiones.map((m) => (
          <Link
            key={m.id}
            href={`/plataforma/admin/misiones/${m.id}`}
            className="group flex flex-col gap-3 rounded-[22px] border-[1.5px] border-ink/40 p-5 transition-colors hover:border-ink sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-[11px] font-black uppercase text-yellow">
                {nombreMes(m.mes).slice(0, 3)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[17px] font-black tracking-[-0.01em]">
                  {m.titulo}
                </p>
                <p className="truncate text-[13px] font-semibold text-ink/60">
                  {m.destino} · {formatoPrecio(m.precio, m.moneda)} ·{" "}
                  {inscritosPorMision.get(m.id) ?? 0}/{m.cupos} inscritos
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <ChipMision estado={m.estado} />
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContenido />
    </AdminGuard>
  );
}
