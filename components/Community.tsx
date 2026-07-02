import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function Community() {
  return (
    <section id="comunidad" className="grid gap-5 lg:grid-cols-3">
      <Reveal className="h-full">
        <div className="group relative h-64 overflow-hidden rounded-[28px] sm:h-80 lg:h-full lg:min-h-[500px]">
          <Image
            src="/images/exterior.jpg"
            alt="Fachada de la sede NODO Centro"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="h-full">
        <div className="flex h-full flex-col justify-center gap-6 rounded-[28px] bg-red p-8 sm:p-10 lg:min-h-[500px]">
          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-[42px]">
            Una forma compartida de trabajar
          </h2>
          <p className="text-[16px] font-medium leading-relaxed">
            En NODO la comunidad pasa sola. A través de espacios comunes,
            momentos compartidos y experiencias que juntan a la gente — con la
            libertad de sumarte cuando quieras y como quieras.
          </p>
          <a
            href="#contacto"
            className="group relative inline-flex w-fit items-center gap-2.5 overflow-hidden px-8 py-4 text-lg font-bold text-white"
            style={{ borderRadius: "48% 52% 55% 45% / 58% 46% 54% 42%" }}
          >
            <span className="absolute inset-0 bg-yellow" aria-hidden />
            <span
              className="absolute -inset-x-2 top-1/2 h-[130%] -translate-y-1/2 rotate-[-4deg] bg-orange transition-transform duration-500 group-hover:rotate-[3deg] group-hover:scale-110"
              style={{ borderRadius: "50% 50% 45% 55% / 60% 45% 55% 40%" }}
              aria-hidden
            />
            <span className="relative">Únete a la comunidad</span>
            <ArrowUpRight className="relative size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="h-full">
        <div className="group relative h-64 overflow-hidden rounded-[28px] sm:h-80 lg:h-full lg:min-h-[500px]">
          <Image
            src="/images/terrace.jpg"
            alt="Miembros de NODO compartiendo en la terraza"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>
    </section>
  );
}
