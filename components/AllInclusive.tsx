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
                Un puesto. Un universo entero.
              </h2>
              <p className="mt-4 text-lg font-extrabold">Tu membresía lo cubre todo</p>
              <p className="mt-3 text-[15.5px] font-medium leading-relaxed">
                Cada puesto en NODO combina espacios y servicios para que
                trabajar sea fácil. Todo va incluido en tu plan: sin costos
                ocultos, sin sorpresas. Espacios equipados y con diseño, para
                que tu día fluya a tu manera.
              </p>
            </div>
          </motion.div>

          <Column index={0}>
            <PhotoCard src="/images/lobby.jpg" alt="Lobby y zonas sociales de NODO" />
            <ListCard
              className="bg-lilac"
              title="Espacios de comunidad"
              subtitle="Acceso libre, 24/7"
              items={[
                "Gimnasio equipado",
                "Cocina + barra de café",
                "Zonas de descanso",
                "Cabinas para llamadas",
              ]}
            />
          </Column>

          <Column index={1}>
            <ListCard
              className="bg-orange"
              title="Seguridad"
              subtitle="De día y de noche"
              items={[
                "CCTV 24/7",
                "Ronda nocturna 7/7",
                "Puerta con cerradura electrónica",
                "Control de acceso inteligente",
              ]}
            />
            <PhotoCard src="/images/office.jpg" alt="Oficina privada en NODO" />
          </Column>

          <Column index={2}>
            <PhotoCard src="/images/desk.jpg" alt="Puesto de trabajo con café" />
            <ListCard
              className="bg-yellow"
              title="Soporte"
              subtitle="Te cubrimos las espaldas"
              items={[
                "Equipo residente 24/7",
                "Onboarding desde el día uno",
                "Solicitudes resueltas rápido",
                "Mantenimiento express",
                "Mejora continua",
              ]}
            />
          </Column>

          <Column index={3}>
            <ListCard
              className="bg-green"
              title="Smart Working"
              subtitle="Diseñado para tu día a día"
              items={[
                "Llave digital en tu móvil",
                "Reserva de salas en la app",
                "Tickets de mantenimiento",
                "Impresión inteligente",
                "Intercom digital",
              ]}
            />
            <PhotoCard src="/images/phone.jpg" alt="App de NODO en el móvil" />
          </Column>
        </motion.div>
      </div>
    </section>
  );
}
