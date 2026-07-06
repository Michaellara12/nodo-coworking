"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import { ArrowUpRight, BankIcon, CardIcon, CashIcon, CheckIcon } from "@/components/icons";
import { useAuth } from "@/components/plataforma/AuthProvider";
import {
  AvisoSetup,
  BotonInk,
  Campo,
  Cargando,
  inputCls,
} from "@/components/plataforma/ui";
import Select from "@/components/plataforma/Select";
import { crearInscripcion, fetchMisInscripciones, fetchMision } from "@/lib/db";
import { esErrorDeSetup } from "@/lib/supabase";
import {
  COLOR_BG,
  formatoPrecio,
  nombreMes,
  type MetodoPago,
  type Mision,
} from "@/lib/types";

const METODOS: {
  id: MetodoPago;
  titulo: string;
  detalle: string;
  Icon: typeof CardIcon;
}[] = [
  {
    id: "tarjeta",
    titulo: "Tarjeta de crédito",
    detalle: "Visa, Mastercard o Amex. Confirmación inmediata.",
    Icon: CardIcon,
  },
  {
    id: "pse",
    titulo: "PSE",
    detalle: "Débito desde tu cuenta bancaria en Colombia.",
    Icon: BankIcon,
  },
  {
    id: "transferencia",
    titulo: "Transferencia",
    detalle: "Te enviamos los datos; el cupo queda pendiente hasta confirmar.",
    Icon: CashIcon,
  },
];

const BANCOS_PSE = [
  "Bancolombia",
  "Davivienda",
  "BBVA Colombia",
  "Banco de Bogotá",
  "Nequi",
  "Otro banco",
];

export default function PagoPage() {
  const { id } = useParams<{ id: string }>();
  const { user, esAdmin } = useAuth();
  const [mision, setMision] = useState<Mision | null | undefined>(undefined);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [metodo, setMetodo] = useState<MetodoPago>("tarjeta");
  const [procesando, setProcesando] = useState(false);
  const [exito, setExito] = useState<null | { estado: "pagada" | "pendiente" }>(null);
  const [error, setError] = useState<string | null>(null);
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
        setYaInscrito(
          ins.some((i) => i.mision_id === id && i.estado !== "cancelada")
        );
      } catch (e) {
        if (esErrorDeSetup(e as { code?: string })) setErrorSetup(true);
        else throw e;
      }
    })();
  }, [user, id]);

  if (errorSetup) return <AvisoSetup />;
  if (mision === undefined) return <Cargando texto="Preparando el pago…" />;
  if (mision === null || !user) {
    return (
      <div className="rounded-[28px] border-[1.5px] border-ink/50 p-8">
        <h1 className="text-2xl font-black">Misión no encontrada</h1>
        <Link href="/plataforma/misiones" className="mt-4 inline-block font-bold underline underline-offset-4">
          ← Volver a misiones
        </Link>
      </div>
    );
  }

  /* los administradores gestionan misiones, no se inscriben */
  if (esAdmin) {
    return (
      <div className="rounded-[28px] bg-purple p-8 sm:p-10">
        <h1 className="text-3xl font-black tracking-[-0.02em]">
          Los admins no se inscriben 🕵️
        </h1>
        <p className="mt-3 max-w-xl text-[15.5px] font-medium leading-relaxed">
          Tu cuenta es de administración: gestiona los cupos, inscritos y pagos
          de esta misión desde el panel.
        </p>
        <Link
          href={`/plataforma/admin/misiones/${mision.id}`}
          className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          Gestionar esta misión
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    );
  }

  const pagar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setProcesando(true);
    const estado = metodo === "transferencia" ? "pendiente" : "pagada";
    try {
      /* pequeña pausa para simular la pasarela de pago */
      await new Promise((r) => setTimeout(r, 1400));
      await crearInscripcion({
        misionId: mision.id,
        userId: user.id,
        metodoPago: metodo,
        monto: mision.precio,
        moneda: mision.moneda,
        estado,
      });
      setExito({ estado });
    } catch (err) {
      const mensaje = (err as { code?: string; message?: string }) ?? {};
      setError(
        mensaje.code === "23505"
          ? "Ya tienes una inscripción a esta misión."
          : "No pudimos procesar la inscripción. Inténtalo de nuevo."
      );
    } finally {
      setProcesando(false);
    }
  };

  /* ——— éxito ——— */
  if (exito) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid min-h-[70vh] place-items-center"
      >
        <div className="max-w-xl rounded-[28px] bg-green p-10 text-center sm:p-14">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: "backOut" }}
            className="mx-auto grid size-20 place-items-center rounded-full bg-ink"
          >
            <CheckIcon className="size-10 text-mint" />
          </motion.span>
          <h1 className="mt-6 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
            {exito.estado === "pagada"
              ? "¡Cupo confirmado, innfiltrado!"
              : "¡Cupo reservado!"}
          </h1>
          <p className="mt-4 text-[15.5px] font-medium leading-relaxed">
            {exito.estado === "pagada"
              ? `Tu pago por ${formatoPrecio(mision.precio, mision.moneda)} fue aprobado. Nos vemos en “${mision.titulo}”.`
              : `Te enviamos los datos de transferencia a tu correo. Tu cupo en “${mision.titulo}” queda reservado por 72 horas.`}
          </p>
          <Link
            href="/plataforma/mis-misiones"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Ver mis misiones
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ——— ya inscrito ——— */
  if (yaInscrito) {
    return (
      <div className="rounded-[28px] bg-lemon p-8 sm:p-10">
        <h1 className="text-3xl font-black tracking-[-0.02em]">
          Ya tienes un cupo en esta misión
        </h1>
        <p className="mt-3 text-[15.5px] font-medium">
          Revisa el estado de tu inscripción en “Mis misiones”.
        </p>
        <Link
          href="/plataforma/mis-misiones"
          className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white"
        >
          Ir a mis misiones
          <ArrowUpRight className="size-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link
        href={`/plataforma/misiones/${mision.id}`}
        className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-bold transition-colors hover:bg-ink hover:text-cream"
      >
        ← Volver a la misión
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        {/* ——— resumen ——— */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className={`flex h-fit flex-col rounded-[28px] p-7 sm:p-8 ${COLOR_BG[mision.color]}`}
        >
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-ink/60">
            Resumen de tu inscripción
          </p>
          <h1 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-0.02em]">
            {mision.titulo}
          </h1>
          <p className="mt-2 text-[13.5px] font-extrabold uppercase tracking-[0.06em]">
            {mision.destino} · {nombreMes(mision.mes)} {mision.anio}
          </p>

          <dl className="mt-6 space-y-2.5 border-t-[1.5px] border-ink/50 pt-5 text-[14.5px] font-semibold">
            <div className="flex justify-between">
              <dt>Cupo todo incluido</dt>
              <dd className="font-black">{formatoPrecio(mision.precio, mision.moneda)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tasas e impuestos</dt>
              <dd className="font-black">Incluidos</dd>
            </div>
            <div className="flex justify-between border-t-[1.5px] border-ink/50 pt-3 text-[17px]">
              <dt className="font-black">Total</dt>
              <dd className="font-black">{formatoPrecio(mision.precio, mision.moneda)}</dd>
            </div>
          </dl>

          <p className="mt-6 text-[12.5px] font-semibold leading-relaxed text-ink/70">
            Cancela sin costo hasta 45 días antes de la misión. Tu cupo es
            transferible a otra persona de tu empresa.
          </p>
        </motion.aside>

        {/* ——— pago ——— */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: EASE }}
          className="rounded-[28px] border-[1.5px] border-ink/60 p-6 sm:p-8"
        >
          <h2 className="text-2xl font-black tracking-[-0.02em] sm:text-[27px]">
            ¿Cómo quieres pagar?
          </h2>

          {/* métodos */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {METODOS.map(({ id: mid, titulo, detalle, Icon }) => (
              <button
                key={mid}
                type="button"
                onClick={() => setMetodo(mid)}
                aria-pressed={metodo === mid}
                className={`rounded-2xl p-4 text-left transition-all duration-200 ${
                  metodo === mid
                    ? "bg-ink text-cream shadow-[4px_4px_0_0_#ffb200]"
                    : "border-[1.5px] border-ink/40 hover:border-ink"
                }`}
              >
                <Icon className={`size-6 ${metodo === mid ? "text-yellow" : ""}`} />
                <p className="mt-2.5 text-[14.5px] font-black leading-tight">{titulo}</p>
                <p
                  className={`mt-1 text-[11.5px] font-semibold leading-snug ${
                    metodo === mid ? "text-cream/75" : "text-ink/60"
                  }`}
                >
                  {detalle}
                </p>
              </button>
            ))}
          </div>

          {/* formulario por método */}
          <form onSubmit={pagar} className="mt-7 space-y-5">
            <AnimatePresence mode="wait">
              {metodo === "tarjeta" && (
                <motion.div
                  key="tarjeta"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <Campo id="numero" label="Número de tarjeta *">
                    <input
                      id="numero"
                      required
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className={inputCls}
                    />
                  </Campo>
                  <Campo id="titular" label="Nombre en la tarjeta *">
                    <input id="titular" required placeholder="LAURA GÓMEZ" className={inputCls} />
                  </Campo>
                  <div className="grid grid-cols-2 gap-5">
                    <Campo id="vence" label="Vencimiento *">
                      <input id="vence" required placeholder="MM/AA" maxLength={5} className={inputCls} />
                    </Campo>
                    <Campo id="cvc" label="CVC *">
                      <input id="cvc" required placeholder="123" maxLength={4} className={inputCls} />
                    </Campo>
                  </div>
                </motion.div>
              )}

              {metodo === "pse" && (
                <motion.div
                  key="pse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <Campo id="banco" label="Tu banco *">
                    <Select
                      id="banco"
                      options={BANCOS_PSE.map((b) => ({ value: b, label: b }))}
                    />
                  </Campo>
                  <Campo id="tipo-persona" label="Tipo de persona *">
                    <Select
                      id="tipo-persona"
                      options={[
                        { value: "Natural", label: "Natural" },
                        { value: "Jurídica", label: "Jurídica" },
                      ]}
                    />
                  </Campo>
                </motion.div>
              )}

              {metodo === "transferencia" && (
                <motion.div
                  key="transferencia"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-lemon p-5 text-[14px] font-semibold leading-relaxed"
                >
                  <p className="font-black">Datos para la transferencia</p>
                  <p className="mt-2">
                    Innfiltrados S.A.S. · NIT 901.234.567-8
                    <br />
                    Cuenta de ahorros Bancolombia 123-456789-01
                  </p>
                  <p className="mt-2 text-[12.5px] text-ink/70">
                    Al confirmar, tu cupo queda reservado 72 horas mientras
                    validamos el pago. Te llegará el paso a paso al correo.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="flex items-start gap-3 text-[13px] font-medium leading-snug">
              <input type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-ink" />
              Acepto los términos de la misión y la Política de tratamiento de
              datos de Innfiltrados.
            </label>

            {error && (
              <p role="alert" className="rounded-2xl bg-red px-4 py-3 text-[14px] font-bold text-white">
                {error}
              </p>
            )}

            <BotonInk type="submit" disabled={procesando} className="w-full py-4 text-base">
              {procesando ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="size-5 rounded-full border-[2.5px] border-cream/40 border-t-cream"
                    aria-hidden
                  />
                  Procesando pago seguro…
                </>
              ) : metodo === "transferencia" ? (
                <>Reservar mi cupo</>
              ) : (
                <>Pagar {formatoPrecio(mision.precio, mision.moneda)}</>
              )}
            </BotonInk>

            <p className="text-center text-[12px] font-semibold text-ink/50">
              🔒 Pago simulado para la demo — no se hace ningún cobro real.
            </p>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
