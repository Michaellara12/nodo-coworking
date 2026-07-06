"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { useAuth } from "@/components/plataforma/AuthProvider";
import MisionCard from "@/components/plataforma/MisionCard";
import { AvisoSetup, Cargando, StatCard } from "@/components/plataforma/ui";
import { fetchMisInscripciones, fetchMisiones } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import { nombreMes, type Inscripcion, type Mision } from "@/lib/types";

export default function DashboardPage() {
  const { user, profile, esAdmin, setupPendiente } = useAuth();
  const [misiones, setMisiones] = useState<Mision[] | null>(null);
  const [inscripciones, setInscripciones] = useState<Inscripcion[] | null>(null);
  const [errorSetup, setErrorSetup] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [ms, ins] = await Promise.all([
          fetchMisiones(),
          fetchMisInscripciones(user.id),
        ]);
        setMisiones(ms);
        setInscripciones(ins);
      } catch (e) {
        if (esErrorDeSetup(e as { code?: string })) setErrorSetup(true);
        else throw e;
      }
    })();
  }, [user]);

  const nombre =
    profile?.nombre || (user?.user_metadata?.nombre as string) || "innfiltrado";

  if (setupPendiente || errorSetup) {
    return (
      <div className="space-y-5">
        <AvisoSetup />
      </div>
    );
  }

  if (!misiones || !inscripciones) return <Cargando texto="Preparando tu misión…" />;

  const activas = inscripciones.filter((i) => i.estado !== "cancelada");
  const idsInscritas = new Set(activas.map((i) => i.mision_id));
  const abiertas = misiones.filter((m) => m.estado === "abierta");
  const proximas = esAdmin
    ? abiertas.slice(0, 3)
    : abiertas.filter((m) => !idsInscritas.has(m.id)).slice(0, 3);
  const proxima = esAdmin
    ? abiertas[0]
    : activas
        .map((i) => i.mision)
        .filter((m): m is Mision => Boolean(m))
        .sort((a, b) => a.anio * 100 + a.mes - (b.anio * 100 + b.mes))[0];

  return (
    <div className="space-y-5">
      {/* saludo */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="rounded-[28px] bg-yellow p-7 sm:p-10"
      >
        <h1 className="text-4xl font-black leading-[1.0] tracking-[-0.02em] sm:text-5xl">
          ¡Hola, {nombre}!
        </h1>
        <p className="mt-3 max-w-2xl text-[15.5px] font-medium leading-relaxed">
          {esAdmin
            ? `Tienes ${abiertas.length} ${abiertas.length === 1 ? "misión abierta" : "misiones abiertas"} en el calendario. El backstage está en movimiento.`
            : proxima
              ? `Tu próxima misión es “${proxima.titulo}” en ${nombreMes(proxima.mes).toLowerCase()}. Prepárate para el backstage.`
              : "Todavía no tienes misiones activas. Explora el calendario y asegura tu cupo."}
        </p>
      </motion.section>

      {/* stats */}
      <section className="grid gap-5 sm:grid-cols-3">
        {esAdmin ? (
          <>
            <StatCard
              valor={String(abiertas.length)}
              etiqueta="Misiones con inscripciones abiertas"
              className="bg-lilac"
            />
            <StatCard
              valor={String(misiones.length)}
              etiqueta="Misiones en el calendario"
              className="bg-mint"
            />
            <StatCard
              valor={proxima ? `${nombreMes(proxima.mes).slice(0, 3)} ${proxima.anio}` : "—"}
              etiqueta={proxima ? `Próxima misión: ${proxima.titulo}` : "Sin misiones programadas"}
              className="bg-orange"
            />
          </>
        ) : (
          <>
            <StatCard
              valor={String(abiertas.length)}
              etiqueta="Misiones con inscripciones abiertas"
              className="bg-lilac"
            />
            <StatCard
              valor={String(activas.length)}
              etiqueta="Mis inscripciones activas"
              className="bg-mint"
            />
            <StatCard
              valor={proxima ? `${nombreMes(proxima.mes).slice(0, 3)} ${proxima.anio}` : "—"}
              etiqueta={proxima ? `Próximo destino: ${proxima.destino}` : "Aún sin próximo destino"}
              className="bg-orange"
            />
          </>
        )}
      </section>

      {/* admin acceso rápido */}
      {esAdmin && (
        <Link
          href="/plataforma/admin"
          className="group flex items-center justify-between rounded-[24px] bg-purple px-6 py-5 transition-transform duration-300 hover:scale-[1.01] sm:px-8"
        >
          <span className="text-lg font-black tracking-[-0.01em] sm:text-xl">
            Panel de administración: calendario, misiones e inscritos
          </span>
          <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}

      {/* próximas misiones */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">
            Próximas misiones
          </h2>
          <Link
            href="/plataforma/misiones"
            className="group inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            Ver todas
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {proximas.length === 0 ? (
          <p className="rounded-[24px] border-[1.5px] border-ink/40 p-6 text-[15px] font-semibold text-ink/70">
            {esAdmin
              ? "No hay misiones abiertas. Crea la próxima desde el panel de administración."
              : "Ya estás inscrito en todas las misiones abiertas. 👏"}
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {proximas.map((m, i) => (
              <MisionCard key={m.id} mision={m} index={i} admin={esAdmin} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
