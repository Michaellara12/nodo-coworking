"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./Reveal";
import { ArrowUpRight } from "./icons";

const FIELDS = [
  { id: "nombre", label: "Nombre *", type: "text", required: true },
  { id: "apellido", label: "Apellido *", type: "text", required: true },
  { id: "email", label: "Email *", type: "email", required: true },
  { id: "telefono", label: "Teléfono *", type: "tel", required: true },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"
      >
        <span className="grid size-16 place-items-center rounded-full bg-green text-3xl font-black text-ink">
          ✓
        </span>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">¡Mensaje enviado!</h2>
        <p className="max-w-sm text-[15.5px] font-medium leading-relaxed">
          Gracias por escribirnos. El equipo de NODO te contacta muy pronto.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-10"
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {FIELDS.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: EASE }}
          >
            <label htmlFor={f.id} className="block text-[15px] font-semibold">
              {f.label}
            </label>
            <input
              id={f.id}
              type={f.type}
              required={f.required}
              className="mt-2 w-full border-b-[1.5px] border-ink/60 bg-transparent py-2 text-[15px] font-medium transition-colors focus:border-ink focus:outline-none"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
        className="mt-8"
      >
        <label htmlFor="mensaje" className="block text-[15px] font-semibold">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          placeholder="Deja tu mensaje aquí"
          className="mt-3 w-full resize-none rounded-2xl border-[1.5px] border-ink/60 bg-transparent p-4 text-[15px] font-medium transition-colors placeholder:text-ink/45 focus:border-ink focus:outline-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.55, ease: EASE }}
        className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="space-y-3.5">
          <label className="flex items-start gap-3 text-[13.5px] font-medium leading-snug">
            <input type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-ink" />
            He leído y acepto los Términos de uso y la Política de privacidad de NODO.
          </label>
          <label className="flex items-start gap-3 text-[13.5px] font-medium leading-snug">
            <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-ink" />
            Quiero recibir novedades, promociones y actividades de NODO.
          </label>
        </div>

        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink px-9 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-green hover:text-ink sm:self-auto"
        >
          Enviar
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </motion.div>
    </form>
  );
}
