"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { getSupabase } from "@/lib/supabase";
import { Pill } from "@/components/plataforma/ui";

const ACCESOS_DEMO = [
  {
    id: "infiltrado",
    titulo: "Entrar como infiltrado",
    descripcion: "Explora misiones, inscríbete y revisa tus cupos.",
    email: "laura@alpina.com",
    password: "espia2026",
    color: "bg-blue",
  },
  {
    id: "admin",
    titulo: "Entrar como administrador",
    descripcion: "Gestiona misiones, calendario e inscripciones.",
    email: "admin@innfiltrados.com",
    password: "espia2026",
    color: "bg-purple",
  },
] as const;

type AccesoId = (typeof ACCESOS_DEMO)[number]["id"];

export default function LoginPage() {
  const [entrandoComo, setEntrandoComo] = useState<AccesoId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const entrarDemo = async (acceso: (typeof ACCESOS_DEMO)[number]) => {
    setError(null);
    setEntrandoComo(acceso.id);

    const { error: err } = await getSupabase().auth.signInWithPassword({
      email: acceso.email,
      password: acceso.password,
    });

    if (err) {
      setEntrandoComo(null);
      setError("No pudimos abrir la demo. Intenta de nuevo en un momento.");
    }
    /* Si entra bien, AuthProvider redirige automáticamente a la plataforma. */
  };

  return (
    <main className="grid min-h-svh gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_1.15fr]">
      <motion.section
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative hidden flex-col justify-between overflow-hidden rounded-[28px] bg-yellow p-8 sm:p-10 lg:flex"
      >
        <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden>
          <defs>
            <pattern id="logingrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0v56" fill="none" stroke="currentColor" strokeOpacity="0.16" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#logingrid)" />
        </svg>

        <div className="relative">
          <Pill>Demo interactiva</Pill>
        </div>

        <div className="relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/innfiltrados/espia-v2.png"
              alt=""
              width={438}
              height={383}
              priority
              className="mx-auto w-40 xl:w-52"
            />
          </motion.div>
          <h1 className="mt-8 text-center text-4xl font-black leading-[1.0] tracking-[-0.02em] xl:text-5xl">
            El backstage
            <br />
            empieza aquí.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-center text-[15.5px] font-medium leading-relaxed">
            Recorre la experiencia desde ambos lados de la plataforma.
          </p>
        </div>

        <div className="relative flex items-center justify-between">
          <span className="text-[20px] font-black tracking-[-0.045em]">innfiltrados®</span>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            Volver al sitio
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
        className="flex flex-col justify-center rounded-[28px] border-[1.5px] border-ink/60 bg-cream p-6 sm:p-10 xl:px-16"
      >
        <div className="mb-2 flex items-center gap-2 lg:hidden">
          <Image src="/images/innfiltrados/espia-v2.png" alt="" width={54} height={47} className="w-8" />
          <span className="text-[21px] font-black tracking-[-0.045em]">innfiltrados®</span>
        </div>

        <Pill className="mt-6 w-fit lg:hidden">Demo interactiva</Pill>
        <h2 className="mt-5 text-4xl font-black leading-[1.0] tracking-[-0.02em] sm:text-5xl">
          Elige cómo entrar
        </h2>
        <p className="mt-3 max-w-lg text-[15.5px] font-medium leading-relaxed text-ink/80">
          No necesitas crear una cuenta ni escribir una contraseña. Elige un perfil y explora la demo.
        </p>

        <div className="mt-8 grid gap-4">
          {ACCESOS_DEMO.map((acceso) => {
            const cargando = entrandoComo === acceso.id;
            return (
              <button
                key={acceso.id}
                type="button"
                onClick={() => void entrarDemo(acceso)}
                disabled={entrandoComo !== null}
                className={`${acceso.color} group flex w-full items-center justify-between gap-5 rounded-[22px] border-[1.5px] border-ink p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0_#141414] disabled:cursor-wait disabled:opacity-60 sm:p-6`}
              >
                <span>
                  <span className="block text-xl font-black sm:text-2xl">
                    {cargando ? "Abriendo la demo…" : acceso.titulo}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] font-semibold leading-relaxed text-ink/75 sm:text-sm">
                    {acceso.descripcion}
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-cream transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-2xl bg-red px-4 py-3 text-[14px] font-bold text-white">
            {error}
          </p>
        )}

        <p className="mt-7 text-center text-[13px] font-semibold text-ink/55">
          Esta plataforma es una muestra. Ninguna acción ni pago es real.
        </p>
      </motion.section>
    </main>
  );
}
