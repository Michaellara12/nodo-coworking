"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { getSupabase } from "@/lib/supabase";
import { BotonInk, Campo, inputCls, Pill } from "@/components/plataforma/ui";

type Modo = "entrar" | "registro";

export default function LoginPage() {
  const [modo, setModo] = useState<Modo>("entrar");
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const entrar = async (form: FormData) => {
    setError(null);
    setAviso(null);
    setEnviando(true);
    const { error: err } = await getSupabase().auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setEnviando(false);
    if (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos."
          : err.message
      );
    }
    /* si entra bien, el AuthProvider redirige solo */
  };

  const registrar = async (form: FormData) => {
    setError(null);
    setAviso(null);
    setEnviando(true);
    const { data, error: err } = await getSupabase().auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: {
        data: {
          nombre: String(form.get("nombre") ?? ""),
          apellido: String(form.get("apellido") ?? ""),
          empresa: String(form.get("empresa") ?? ""),
          cargo: String(form.get("cargo") ?? ""),
          codigo_equipo: String(form.get("codigo_equipo") ?? ""),
        },
      },
    });
    if (err) {
      setEnviando(false);
      setError(err.message);
      return;
    }

    if (!data.session) {
      /* la cuenta ya queda confirmada por el trigger de la base de datos:
       * entramos directo, sin pedir verificación de correo */
      const { error: errEntrar } = await getSupabase().auth.signInWithPassword({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      setEnviando(false);
      if (errEntrar) {
        setAviso("Cuenta creada. Inicia sesión con tu email y contraseña.");
        setModo("entrar");
      }
      /* si entra bien, el AuthProvider redirige solo */
      return;
    }
    setEnviando(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (modo === "entrar") void entrar(form);
    else void registrar(form);
  };

  return (
    <main className="grid min-h-svh gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_1.15fr]">
      {/* ——— Panel de marca ——— */}
      <motion.section
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative hidden flex-col justify-between overflow-hidden rounded-[28px] bg-yellow p-8 sm:p-10 lg:flex"
      >
        {/* cuadrícula */}
        <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden>
          <defs>
            <pattern id="logingrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0v56" fill="none" stroke="currentColor" strokeOpacity="0.16" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#logingrid)" />
        </svg>

        <div className="relative">
          <Pill>Plataforma interna</Pill>
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
            Inscríbete a las misiones, gestiona tu cupo y conéctate con la
            comunidad de innfiltrados.
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

      {/* ——— Formulario ——— */}
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

        <h2 className="mt-4 text-4xl font-black leading-[1.0] tracking-[-0.02em] sm:text-5xl">
          {modo === "entrar" ? "¡Hola de nuevo!" : "Crea tu cuenta"}
        </h2>
        <p className="mt-3 text-[15.5px] font-medium text-ink/80">
          {modo === "entrar"
            ? "Entra a tu cuenta para ver las misiones."
            : "Únete a la plataforma y asegura tu cupo en la próxima misión."}
        </p>

        {/* tabs */}
        <div className="mt-7 flex w-fit rounded-full border-[1.5px] border-ink p-1">
          {(["entrar", "registro"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setModo(m);
                setError(null);
              }}
              className={`rounded-full px-5 py-2 text-[13.5px] font-bold transition-colors ${
                modo === m ? "bg-ink text-cream" : "hover:bg-ink/10"
              }`}
            >
              {m === "entrar" ? "Iniciar sesión" : "Registrarme"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          {modo === "registro" && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo id="nombre" label="Nombre *">
                  <input id="nombre" name="nombre" required className={inputCls} placeholder="Laura" />
                </Campo>
                <Campo id="apellido" label="Apellido *">
                  <input id="apellido" name="apellido" required className={inputCls} placeholder="Gómez" />
                </Campo>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo id="empresa" label="Empresa *">
                  <input id="empresa" name="empresa" required className={inputCls} placeholder="Alpina" />
                </Campo>
                <Campo id="cargo" label="Cargo">
                  <input id="cargo" name="cargo" className={inputCls} placeholder="Gerente de innovación" />
                </Campo>
              </div>
            </>
          )}

          <Campo id="email" label="Email corporativo *">
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputCls}
              placeholder="tu@empresa.com"
            />
          </Campo>
          <Campo id="password" label="Contraseña *">
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className={inputCls}
              placeholder="Mínimo 6 caracteres"
            />
          </Campo>

          {modo === "registro" && (
            <Campo id="codigo_equipo" label="Código de equipo (opcional)">
              <input
                id="codigo_equipo"
                name="codigo_equipo"
                className={inputCls}
                placeholder="Solo para el equipo de Innfiltrados"
              />
            </Campo>
          )}

          {error && (
            <p role="alert" className="rounded-2xl bg-red px-4 py-3 text-[14px] font-bold text-white">
              {error}
            </p>
          )}
          {aviso && (
            <p role="status" className="rounded-2xl bg-mint px-4 py-3 text-[14px] font-bold">
              {aviso}
            </p>
          )}

          <BotonInk type="submit" disabled={enviando} className="w-full py-4 text-base">
            {enviando
              ? "Un momento…"
              : modo === "entrar"
                ? "Entrar a la plataforma"
                : "Crear mi cuenta"}
            <ArrowUpRight className="size-5" />
          </BotonInk>
        </form>

        <p className="mt-6 text-center text-[13px] font-semibold text-ink/60">
          ¿Problemas para entrar? Escríbenos por WhatsApp al +57 300 539 3295.
        </p>
      </motion.section>
    </main>
  );
}
