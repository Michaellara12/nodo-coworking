"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * Eventos con scroll horizontal pineado (como el .living-track del original):
 * la sección se fija y las tarjetas se deslizan lateralmente con el scroll.
 * En móvil se apilan en vertical.
 */

const EVENTOS = [
  {
    title: "Salud y bienestar",
    lead: "Movimiento, pausa y momentos para resetear.",
    body: "Entrenamientos en grupo, yoga en la terraza y actividades que cuidan el cuerpo y la mente.",
    bg: "bg-blue",
  },
  {
    title: "Días y noches sociales",
    lead: "Encuentros fáciles y noches temáticas.",
    body: "De after-office casuales a fiestas y momentos compartidos. Siempre incluyente, siempre a tu ritmo.",
    bg: "bg-yellow",
  },
  {
    title: "Cultura y creatividad",
    lead: "Ideas, inspiración y experiencias nuevas.",
    body: "Talleres creativos, charlas, exploraciones urbanas y momentos culturales que juntan a la gente.",
    bg: "bg-lilac",
  },
  {
    title: "Carrera y desarrollo",
    lead: "Crecer más allá del escritorio.",
    body: "Charlas, talleres y sesiones sobre habilidades, ideas y oportunidades: práctico y aterrizado en la vida real.",
    bg: "bg-green",
  },
  {
    title: "Devolver a la ciudad",
    lead: "Conectados con lo que nos rodea.",
    body: "Iniciativas que le devuelven algo al barrio, al ambiente y a la comunidad más amplia.",
    bg: "bg-orange",
  },
];

export default function EventsTrack() {
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
    <section id="eventos" ref={sectionRef} className="lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-col gap-5 lg:h-[calc(100vh-2.5rem)] lg:flex-row lg:items-stretch"
        >
          {/* intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex shrink-0 flex-col justify-between rounded-[26px] border-[1.5px] border-ink/70 bg-cream p-6 sm:p-8 lg:w-[480px]"
          >
            <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
              Eventos
            </span>
            <div>
              <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl">
                Eventos en NODO
              </h2>
              <p className="mt-4 text-[16px] font-medium leading-relaxed">
                Una mezcla de experiencias que le da forma a tu día: del
                bienestar y la creatividad a las noches sociales y los momentos
                culturales.
              </p>
              <p className="mt-4 text-lg font-extrabold leading-snug">
                Tú eliges qué va contigo.
                <br />
                Nosotros lo hacemos pasar.
              </p>
            </div>
          </motion.div>

          {EVENTOS.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`${ev.bg} flex shrink-0 flex-col justify-between rounded-[26px] p-6 sm:p-8 lg:w-[420px]`}
            >
              <div>
                <h3 className="text-[26px] font-black leading-tight tracking-tight">{ev.title}</h3>
                <p className="mt-3 border-b-[1.5px] border-ink/70 pb-4 text-[16px] font-bold">
                  {ev.lead}
                </p>
                <p className="mt-4 text-[15.5px] font-medium leading-relaxed">{ev.body}</p>
              </div>
              <span className="grid size-11 place-items-center self-end rounded-full border-[1.8px] border-ink text-[14px] font-bold">
                0{i + 1}
              </span>
            </motion.div>
          ))}

          {/* foto de cierre del carril */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[260px] shrink-0 overflow-hidden rounded-[26px] lg:w-[460px]"
          >
            <Image
              src="/images/insta-1.jpg"
              alt="Una noche social en NODO"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
