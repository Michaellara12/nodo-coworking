"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/plataforma/AuthProvider";
import MisionCard from "@/components/plataforma/MisionCard";
import { AvisoSetup, Cargando, TituloPagina } from "@/components/plataforma/ui";
import { fetchMisInscripciones, fetchMisiones } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import type { Inscripcion, Mision } from "@/lib/types";

type Filtro = "todas" | "internacional" | "colombia";

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "internacional", label: "Internacionales" },
  { id: "colombia", label: "En Colombia" },
];

export default function MisionesPage() {
  const { user, esAdmin } = useAuth();
  const [misiones, setMisiones] = useState<Mision[] | null>(null);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
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

  const idsInscritas = useMemo(
    () =>
      new Set(
        inscripciones.filter((i) => i.estado !== "cancelada").map((i) => i.mision_id)
      ),
    [inscripciones]
  );

  if (errorSetup) {
    return (
      <div className="space-y-5">
        <AvisoSetup />
      </div>
    );
  }

  if (!misiones) return <Cargando texto="Buscando destinos…" />;

  const visibles = misiones.filter((m) => filtro === "todas" || m.tipo === filtro);

  return (
    <div className="space-y-6">
      <TituloPagina
        titulo="Calendario de misiones"
        descripcion="Elige tu próxima inmersión: internacionales de una semana o intensivas de 1 a 3 días en Colombia. Todas con metodología, backstage y playbook incluidos."
      />

      {/* filtros */}
      <div className="flex w-fit rounded-full border-[1.5px] border-ink p-1">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            className={`rounded-full px-5 py-2 text-[13.5px] font-bold transition-colors ${
              filtro === f.id ? "bg-ink text-cream" : "hover:bg-ink/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="rounded-[24px] border-[1.5px] border-ink/40 p-6 text-[15px] font-semibold text-ink/70">
          No hay misiones en esta categoría todavía.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibles.map((m, i) => (
            <MisionCard
              key={m.id}
              mision={m}
              index={i}
              inscrito={idsInscritas.has(m.id)}
              admin={esAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
