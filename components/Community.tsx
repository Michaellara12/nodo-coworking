import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function Community() {
  return (
    <section id="comunidad" className="grid gap-5 lg:grid-cols-3">
      <Reveal className="h-full">
        <div className="group relative h-64 overflow-hidden rounded-[28px] sm:h-80 lg:h-full lg:min-h-[500px]">
          <Image
            src="/images/insta-3.jpg"
            alt="Innfiltrados trabajando en equipo durante una sesión de síntesis"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="h-full">
        <div className="flex h-full flex-col justify-center gap-6 rounded-[28px] bg-red p-8 sm:p-10 lg:min-h-[500px]">
          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-[42px]">
            Una comunidad de innfiltrados
          </h2>
          <p className="text-[16px] font-medium leading-relaxed">
            Cada misión termina, pero la red se queda. Cientos de ejecutivos de
            las compañías líderes de la región comparten hallazgos, contactos y
            oportunidades mucho después de deshacer la maleta.
          </p>
          <a
            href="/comunidad"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Conoce la comunidad
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="h-full">
        <div className="group relative h-64 overflow-hidden rounded-[28px] sm:h-80 lg:h-full lg:min-h-[500px]">
          <Image
            src="/images/terrace.jpg"
            alt="Innfiltrados compartiendo después de un recorrido"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>
    </section>
  );
}
