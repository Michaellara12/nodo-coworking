"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminGuard from "@/components/plataforma/AdminGuard";
import MisionForm, { type MisionFormValues } from "@/components/plataforma/MisionForm";
import {
  Cargando,
  ChipInscripcion,
  Pill,
  TituloPagina,
} from "@/components/plataforma/ui";
import {
  actualizarInscripcion,
  actualizarMision,
  fetchInscripcionesDeMision,
  fetchMision,
} from "@/lib/db";
import { formatoPrecio, type Inscripcion, type Mision } from "@/lib/types";

const METODO_LABEL: Record<string, string> = {
  tarjeta: "Tarjeta",
  pse: "PSE",
  transferencia: "Transferencia",
};

function AdminMisionContenido() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [mision, setMision] = useState<Mision | null | undefined>(undefined);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [guardado, setGuardado] = useState(false);
  const [actualizando, setActualizando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!id) return;
    const [m, ins] = await Promise.all([
      fetchMision(id),
      fetchInscripcionesDeMision(id),
    ]);
    setMision(m);
    setInscripciones(ins);
  }, [id]);

  useEffect(() => {
    void (async () => {
      await cargar();
    })();
  }, [cargar]);

  if (mision === undefined) return <Cargando texto="Abriendo la misión…" />;
  if (mision === null) {
    return (
      <div className="rounded-[28px] border-[1.5px] border-ink/50 p-8">
        <h1 className="text-2xl font-black">Misión no encontrada</h1>
        <Link href="/plataforma/admin" className="mt-4 inline-block font-bold underline underline-offset-4">
          ← Volver al panel
        </Link>
      </div>
    );
  }

  const onSubmit = async (values: MisionFormValues) => {
    await actualizarMision(mision.id, values);
    setGuardado(true);
    await cargar();
    setTimeout(() => setGuardado(false), 2500);
  };

  const cambiarEstadoPago = async (ins: Inscripcion, estado: "pagada" | "cancelada") => {
    setActualizando(ins.id);
    try {
      await actualizarInscripcion(ins.id, { estado });
      await cargar();
    } finally {
      setActualizando(null);
    }
  };

  const activas = inscripciones.filter((i) => i.estado !== "cancelada");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/plataforma/admin"
          className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
        >
          ← Volver al panel
        </Link>
        <button
          type="button"
          onClick={() => router.push(`/plataforma/misiones/${mision.id}`)}
          className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
        >
          Ver como innfiltrado
        </button>
      </div>

      <TituloPagina
        titulo={mision.titulo}
        descripcion={`${activas.length} de ${mision.cupos} cupos ocupados.`}
      />

      {guardado && (
        <p role="status" className="rounded-2xl bg-mint px-5 py-3.5 text-[14.5px] font-bold">
          ✓ Cambios guardados
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        {/* editar */}
        <section className="rounded-[28px] border-[1.5px] border-ink/60 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-black tracking-[-0.02em]">Editar ficha</h2>
          <MisionForm inicial={mision} textoBoton="Guardar cambios" onSubmit={onSubmit} />
        </section>

        {/* inscritos */}
        <section className="h-fit rounded-[28px] bg-ink p-6 text-cream sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-yellow">
              Inscritos
            </h2>
            <Pill className="bg-yellow text-ink">
              {activas.length}/{mision.cupos}
            </Pill>
          </div>

          {inscripciones.length === 0 ? (
            <p className="mt-5 text-[14.5px] font-semibold text-cream/60">
              Todavía no hay inscritos en esta misión.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {inscripciones.map((ins) => (
                <li
                  key={ins.id}
                  className={`rounded-2xl bg-cream/10 p-4 ${
                    ins.estado === "cancelada" ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[15px] font-black">
                      {ins.profile
                        ? `${ins.profile.nombre} ${ins.profile.apellido}`.trim()
                        : "Innfiltrado"}
                    </p>
                    <ChipInscripcion estado={ins.estado} />
                  </div>
                  <p className="mt-1 text-[12.5px] font-semibold text-cream/70">
                    {ins.profile?.empresa || "—"} · {ins.profile?.email}
                  </p>
                  <p className="mt-1 text-[12.5px] font-semibold text-cream/70">
                    {formatoPrecio(ins.monto, ins.moneda)} ·{" "}
                    {METODO_LABEL[ins.metodo_pago] ?? ins.metodo_pago}
                  </p>

                  {ins.estado === "pendiente" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={actualizando === ins.id}
                        onClick={() => void cambiarEstadoPago(ins, "pagada")}
                        className="rounded-full bg-mint px-4 py-2 text-[12.5px] font-bold text-ink transition hover:brightness-105 disabled:opacity-50"
                      >
                        Confirmar pago
                      </button>
                      <button
                        type="button"
                        disabled={actualizando === ins.id}
                        onClick={() => void cambiarEstadoPago(ins, "cancelada")}
                        className="rounded-full border-[1.5px] border-cream/50 px-4 py-2 text-[12.5px] font-bold text-cream transition hover:border-cream disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default function AdminMisionPage() {
  return (
    <AdminGuard>
      <AdminMisionContenido />
    </AdminGuard>
  );
}
