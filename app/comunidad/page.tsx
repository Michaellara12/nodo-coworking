import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import SectionBanner from "@/components/SectionBanner";
import EventsTrack from "@/components/EventsTrack";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Comunidad",
  description:
    "Más que espacios compartidos: una forma compartida de trabajar. Eventos, bienestar y una comunidad que crece a su propio ritmo.",
};

const RITMOS = [
  "Ritmos distintos",
  "Salud y bienestar",
  "Rutinas distintas",
  "Cultura y desarrollo",
  "Devolver a la ciudad",
  "Maneras distintas de trabajar",
  "Días y noches sociales",
];

const PILLS = ["Tour 360", "Gimnasio 24/7", "Zonas sociales", "Terraza rooftop"];

export default function Comunidad() {
  return (
    <>
      {/* hero: foto + manifiesto rojo */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="group relative h-72 overflow-hidden rounded-[28px] sm:h-96 lg:h-full lg:min-h-[560px]">
            <Image
              src="/images/terrace.jpg"
              alt="Miembros de la comunidad NODO compartiendo"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <div className="flex h-full min-h-[520px] flex-col justify-between rounded-[28px] bg-red p-7 sm:p-10">
            <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
              Cómo vemos la comunidad
            </span>
            <div className="mt-10">
              <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                Más que espacios compartidos. Una forma compartida de trabajar.
              </h1>
              <p className="mt-6 text-[16px] font-bold leading-relaxed">
                No creemos en conexiones forzadas ni en fórmulas fijas.
                Creemos en crear las condiciones correctas.
              </p>
              <p className="mt-4 text-[15.5px] font-medium leading-relaxed">
                La comunidad en NODO crece con los momentos de todos los días:
                espacios compartidos y la libertad de sumarte — o tomar
                distancia — cuando quieras. Cada quien va a su ritmo y conecta
                cuando se siente bien. No es algo a lo que te inscribes; es algo
                que se va dando, día a día.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Marquee items={RITMOS} className="bg-purple text-red" duration={44} />

      {/* banner + eventos en carril horizontal pineado */}
      <SectionBanner title="Eventos en NODO" className="bg-orange" arrowClassName="text-ink" />
      <EventsTrack />

      {/* espacios que juntan */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between rounded-[28px] bg-blue p-7 sm:p-10">
            <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[40px]">
              Espacios que juntan a la gente
            </h2>
            <div className="mt-8">
              <p className="max-w-lg text-[16px] font-medium leading-relaxed">
                Espacios compartidos diseñados para la vida real: para trabajar,
                descansar, moverte y conectar. No para pasar el tiempo, sino
                para compartirlo — a tu manera.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[15px] font-bold"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <div className="group relative h-72 overflow-hidden rounded-[28px] sm:h-96 lg:h-full lg:min-h-[440px]">
            <Image
              src="/images/meeting.jpg"
              alt="Zonas sociales de NODO"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
      </section>

      {/* cierre */}
      <section>
        <Reveal>
          <div className="flex flex-col items-center gap-7 rounded-[28px] bg-green px-6 py-14 text-center sm:py-16">
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              La comunidad no se mira.
              <br />
              Se vive.
            </h2>
            <a
              href="/contacto"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Explora la vida en NODO
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
