"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { AvisoSetup, Cargando } from "./ui";

/* Envuelve las páginas de /plataforma/admin: solo perfiles con rol admin. */

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { cargando, profile, setupPendiente } = useAuth();

  if (setupPendiente) return <AvisoSetup />;
  if (cargando || (!profile && !setupPendiente)) {
    return <Cargando texto="Verificando credenciales…" />;
  }

  if (profile?.role !== "admin") {
    return (
      <div className="rounded-[28px] bg-red p-8 text-white sm:p-10">
        <h1 className="text-3xl font-black tracking-[-0.02em]">Zona restringida 🕵️</h1>
        <p className="mt-3 max-w-xl text-[15.5px] font-medium leading-relaxed">
          Este panel es solo para el equipo de Innfiltrados. Si crees que
          deberías tener acceso, pide que te asignen el rol de administrador.
        </p>
        <Link
          href="/plataforma"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-cream hover:text-ink"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
