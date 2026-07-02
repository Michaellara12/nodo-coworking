"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section id="contacto">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="flex items-center justify-center rounded-[999px] bg-red px-8 py-6 sm:py-7 lg:flex-1">
            <h2 className="whitespace-nowrap text-[26px] font-black tracking-[-0.01em] sm:text-4xl">
              Únete al newsletter
            </h2>
          </div>

          {done ? (
            <div className="flex flex-[1.35] items-center justify-center rounded-[999px] bg-green px-8 py-6 text-center text-xl font-black sm:text-2xl">
              ¡Listo! Nos vemos en tu inbox
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex flex-[1.35] gap-4"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Tu email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Tu email aquí"
                className="min-h-[72px] w-full rounded-[999px] bg-yellow px-8 text-center text-lg font-semibold outline-offset-2 outline-ink placeholder:text-ink/70 focus-visible:outline-2 sm:min-h-[88px]"
              />
              <button
                type="submit"
                aria-label="Suscribirme"
                className="group grid w-20 shrink-0 place-items-center rounded-[26px] bg-ink text-white transition-colors hover:bg-purple hover:text-ink sm:w-24"
              >
                <ArrowUpRight className="size-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
