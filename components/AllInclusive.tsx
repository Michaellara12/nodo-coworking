"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./Reveal";
import PlantIllustration from "./PlantIllustration";

type ListCardProps = {
  title: string;
  subtitle: string;
  items: string[];
  className?: string;
};

function ListCard({ title, subtitle, items, className = "" }: ListCardProps) {
  return (
    <div className={`rounded-[26px] p-6 sm:p-7 ${className}`}>
      <h3 className="text-2xl font-black tracking-tight sm:text-[27px]">{title}</h3>
      <p className="mt-1 text-[15px] font-bold">{subtitle}</p>
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item}
            className="border-b-[1.5px] border-ink/60 py-2.5 text-[15px] font-medium last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhotoCard({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`group relative min-h-[240px] flex-1 overflow-hidden rounded-[26px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 440px, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

function Column({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
      className="flex shrink-0 flex-col gap-5 lg:w-[430px]"
    >
      {children}
    </motion.div>
  );
}

export default function AllInclusive() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setMaxX(isDesktop ? Math.max(0, track.scrollWidth - window.innerWidth + 244) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="todo-incluido" ref={sectionRef} className="lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-col gap-5 lg:h-[calc(100vh-2.5rem)] lg:flex-row lg:items-stretch"
        >
          {/* tarjeta roja de intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex shrink-0 flex-col justify-between rounded-[28px] bg-red p-7 sm:p-9 lg:w-[520px]"
          >
            <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
              Todo incluido
            </span>
            <PlantIllustration className="mx-auto my-8 h-52 sm:h-60" />
            <div>
              <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-[44px]">
                Una misión. Un universo de aprendizajes.
              </h2>
              <p className="mt-4 text-lg font-extrabold">Tu cupo lo cubre todo</p>
              <p className="mt-3 text-[15.5px] font-medium leading-relaxed">
                Cada misión combina recorridos, sesiones y logística para que
                tú solo te ocupes de aprender. Todo va incluido: sin costos
                ocultos, sin sorpresas. Tú te innfiltras; nosotros nos
                encargamos del resto.
              </p>
            </div>
          </motion.div>

          <Column index={0}>
            <PhotoCard
              src="/images/innfiltrados/mision-1.jpg"
              alt="Recorrido backstage por la planta de una empresa anfitriona"
            />
            <ListCard
              className="bg-lilac"
              title="Antes de la misión"
              subtitle="Preparamos el terreno"
              items={[
                "Diagnóstico de los retos de tu equipo",
                "Agenda curada por objetivo",
                "Briefing de cada empresa anfitriona",
                "Kit del innfiltrado",
              ]}
            />
          </Column>

          <Column index={1}>
            <ListCard
              className="bg-orange"
              title="Durante la misión"
              subtitle="Acceso sin filtros"
              items={[
                "Recorridos backstage guiados",
                "Q&A con los protagonistas",
                "Sesiones de síntesis diarias",
                "Traducción simultánea",
              ]}
            />
            <PhotoCard
              src="/images/innfiltrados/mision-2.jpg"
              alt="Sesión cara a cara con líderes de una empresa anfitriona"
            />
          </Column>

          <Column index={2}>
            <PhotoCard src="/images/meeting.jpg" alt="Workshop de síntesis del equipo innfiltrado" />
            <ListCard
              className="bg-yellow"
              title="Después de la misión"
              subtitle="Del viaje al plan"
              items={[
                "Playbook de hallazgos",
                "Plan de implementación a 90 días",
                "Sesión de seguimiento con tu equipo",
                "Acceso a la comunidad alumni",
                "Repositorio de aprendizajes",
              ]}
            />
          </Column>

          <Column index={3}>
            <ListCard
              className="bg-green"
              title="Logística completa"
              subtitle="Cero fricción, puro aprendizaje"
              items={[
                "Vuelos y hoteles gestionados",
                "Transporte en destino",
                "Seguro de viaje internacional",
                "Alimentación curada",
                "Acompañamiento permanente",
              ]}
            />
            <PhotoCard src="/images/phone.jpg" alt="Toda la agenda de la misión en tu móvil" />
          </Column>
        </motion.div>
      </div>
    </section>
  );
}
