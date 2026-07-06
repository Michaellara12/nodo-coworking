"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdminGuard from "@/components/plataforma/AdminGuard";
import MisionForm, { type MisionFormValues } from "@/components/plataforma/MisionForm";
import { Cargando, TituloPagina } from "@/components/plataforma/ui";
import { crearMision } from "@/lib/db";
import { nombreMes } from "@/lib/types";

function NuevaMisionContenido() {
  const router = useRouter();
  const params = useSearchParams();
  const mes = Number(params.get("mes")) || undefined;
  const anio = Number(params.get("anio")) || undefined;

  const onSubmit = async (values: MisionFormValues) => {
    await crearMision(values);
    router.push("/plataforma/admin");
  };

  return (
    <div className="space-y-6">
      <Link
        href="/plataforma/admin"
        className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
      >
        ← Volver al panel
      </Link>

      <TituloPagina
        titulo={
          mes ? `Misión para ${nombreMes(mes).toLowerCase()} ${anio ?? ""}` : "Crear una misión"
        }
        descripcion="Completa la ficha y la misión quedará publicada en la plataforma para que los innfiltrados se inscriban."
      />

      <div className="rounded-[28px] border-[1.5px] border-ink/60 p-6 sm:p-8">
        <MisionForm
          mesInicial={mes}
          anioInicial={anio}
          textoBoton="Publicar misión"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default function NuevaMisionPage() {
  return (
    <AdminGuard>
      <Suspense fallback={<Cargando />}>
        <NuevaMisionContenido />
      </Suspense>
    </AdminGuard>
  );
}
