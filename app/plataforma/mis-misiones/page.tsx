"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { useAuth } from "@/components/plataforma/AuthProvider";
import {
  AvisoSetup,
  Cargando,
  ChipInscripcion,
  TituloPagina,
} from "@/components/plataforma/ui";
import { actualizarInscripcion, fetchMisInscripciones } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import {
  COLOR_BG,
  formatoPrecio,
  nombreMes,
  type Inscripcion,
} from "@/lib/types";

const METODO_LABEL: Record<string, string> = {
  tarjeta: "Tarjeta de crédito",
  pse: "PSE",
  transferencia: "Transferencia",
};

export default function MisMisionesPage() {
  const { user, esAdmin } = useAuth();
  const [inscripciones, setInscripciones] = useState<Inscripcion[] | null>(null);
  const [errorSetup, setErrorSetup] = useState(false);
  const [cancelando, setCancelando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!user) return;
    try {
      setInscripciones(await fetchMisInscripciones(user.id));
    } catch (e) {
      if (esErrorDeSetup(e as { code?: string })) setErrorSetup(true);
      else throw e;
    }
  }, [user]);

  useEffect(() => {
    void (async () => {
      await cargar();
    })();
  }, [cargar]);

  const cancelar = async (id: string) => {
    setCancelando(id);
    try {
      await actualizarInscripcion(id, { estado: "cancelada" });
      await cargar();
    } finally {
      setCancelando(null);
    }
  };

  if (errorSetup) return <AvisoSetup />;

  /* los administradores no se inscriben a misiones */
  if (esAdmin) {
    return (
      <div className="rounded-[28px] bg-purple p-8 sm:p-10">
        <h1 className="text-3xl font-black tracking-[-0.02em]">
          Los admins no se inscriben 🕵️
        </h1>
        <p className="mt-3 max-w-xl text-[15.5px] font-medium leading-relaxed">
          Tu cuenta es de administración: las inscripciones de todos los
          innfiltrados viven en el panel, misión por misión.
        </p>
        <Link
          href="/plataforma/admin"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-[15px] font-bold text-yellow transition-colors hover:bg-cream hover:text-ink"
        >
          Ir al panel de administración
        </Link>
      </div>
    );
  }

  if (!inscripciones) return <Cargando texto="Buscando tus misiones…" />;

  return (
    <div className="space-y-6">
      <TituloPagina
        titulo="Tus inmersiones"
        descripcion="Aquí vive el estado de tus inscripciones, pagos y cupos reservados."
      />

      {inscripciones.length === 0 ? (
        <div className="rounded-[28px] bg-lilac p-8 sm:p-10">
          <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">
            Aún no tienes misiones
          </h2>
          <p className="mt-3 max-w-xl text-[15.5px] font-medium leading-relaxed">
            El backstage de las empresas líderes te está esperando. Explora el
            calendario y asegura tu primer cupo.
          </p>
          <Link
            href="/plataforma/misiones"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Explorar misiones
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {inscripciones.map((ins, i) => {
            const m = ins.mision;
            return (
              <motion.article
                key={ins.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
                className={`flex flex-col gap-5 rounded-[28px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${
                  m ? COLOR_BG[m.color] : "bg-yellow"
                } ${ins.estado === "cancelada" ? "opacity-60" : ""}`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <ChipInscripcion estado={ins.estado} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink/70">
                      {m ? `${nombreMes(m.mes)} ${m.anio}` : ""}
                    </span>
                  </div>
                  <h2 className="mt-2.5 text-2xl font-black leading-tight tracking-[-0.02em] sm:text-[27px]">
                    {m?.titulo ?? "Misión"}
                  </h2>
                  <p className="mt-1 text-[13px] font-extrabold uppercase tracking-[0.06em]">
                    {m?.destino}
                  </p>
                  <p className="mt-2 text-[13.5px] font-semibold text-ink/75">
                    {formatoPrecio(ins.monto, ins.moneda)} ·{" "}
                    {METODO_LABEL[ins.metodo_pago] ?? ins.metodo_pago} · Inscrito el{" "}
                    {new Date(ins.created_at).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  {m && (
                    <Link
                      href={`/plataforma/misiones/${m.id}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
                    >
                      Ver misión
                      <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                  {ins.estado !== "cancelada" && (
                    <button
                      type="button"
                      onClick={() => void cancelar(ins.id)}
                      disabled={cancelando === ins.id}
                      className="rounded-full border-[1.5px] border-ink px-5 py-3 text-[13.5px] font-bold transition-colors hover:bg-ink hover:text-cream disabled:opacity-50"
                    >
                      {cancelando === ins.id ? "Cancelando…" : "Cancelar cupo"}
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
