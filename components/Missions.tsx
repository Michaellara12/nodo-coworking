import { Reveal } from "./Reveal";
import SectionBanner from "./SectionBanner";
import { ArrowUpRight } from "./icons";
import { waLink } from "@/lib/site";

/*
 * Calendario de misiones del año: las cuatro misiones internacionales
 * anunciadas + las misiones en Colombia, con CTA directo a WhatsApp.
 */

const MISIONES = [
  {
    mes: "Mayo 2026",
    title: "¡China, descréstame!",
    destino: "Shenzhen · Shanghái",
    body: "Ocho días dentro del ecosistema que fabrica el futuro: plantas 4.0 que operan a oscuras, gigantes del e-commerce y hardware que pasa de idea a producto en semanas.",
    tags: ["Innovación", "Manufactura 4.0", "IA aplicada"],
    bg: "bg-red",
    cupos: "24 cupos",
  },
  {
    mes: "Junio 2026",
    title: "Sector Finanzas",
    destino: "Nueva York, EE. UU.",
    body: "El backstage de Wall Street y de las fintech que están reinventando el dinero: banca centenaria, neobancos y venture capital, cara a cara y sin libreto.",
    tags: ["Fintech", "Banca digital", "Venture capital"],
    bg: "bg-blue",
    cupos: "20 cupos",
  },
  {
    mes: "Agosto 2026",
    title: "Siendo sostenibles",
    destino: "Ámsterdam · Copenhague",
    body: "Economía circular en serio: ciudades rumbo a carbono neutral, industrias regenerativas y marcas que convirtieron la sostenibilidad en su mejor negocio.",
    tags: ["ESG", "Economía circular", "Energía"],
    bg: "bg-green",
    cupos: "22 cupos",
  },
  {
    mes: "Noviembre 2026",
    title: "Ciudades inteligentes",
    destino: "Singapur · Seúl",
    body: "Gobierno digital, movilidad autónoma y urbanismo guiado por datos: así se opera una ciudad que piensa, decide y aprende en tiempo real.",
    tags: ["Smart cities", "Movilidad", "GovTech"],
    bg: "bg-lilac",
    cupos: "20 cupos",
  },
];

function MissionCard({ m, index }: { m: (typeof MISIONES)[number]; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <article className={`flex h-full flex-col rounded-[28px] p-6 sm:p-8 ${m.bg}`}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border-[1.5px] border-ink px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em]">
            {m.mes}
          </span>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border-[1.8px] border-ink text-[13px] font-bold">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-6 text-3xl font-black leading-[1.02] tracking-[-0.02em] sm:text-[34px]">
          {m.title}
        </h3>
        <p className="mt-2 text-[15px] font-extrabold uppercase tracking-[0.06em]">{m.destino}</p>
        <p className="mt-4 flex-1 text-[15.5px] font-medium leading-relaxed">{m.body}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {m.tags.map((tag) => (
            <span key={tag} className="rounded-full border-[1.5px] border-ink/70 px-3.5 py-1.5 text-[12.5px] font-bold">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t-[1.5px] border-ink/50 pt-5">
          <span className="text-[13.5px] font-bold">{m.cupos} · Todo incluido</span>
          <a
            href={waLink(`¡Hola Natalia! Quiero más información sobre la misión "${m.title}" (${m.mes}).`)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-bold text-white transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Quiero saber más
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function Missions() {
  return (
    <section id="misiones" className="space-y-5">
      <SectionBanner title="Misiones internacionales 2026" className="bg-yellow" arrowClassName="text-red" />

      <div className="grid gap-5 lg:grid-cols-2">
        {MISIONES.map((m, i) => (
          <MissionCard key={m.title} m={m} index={i} />
        ))}
      </div>

      {/* misiones en Colombia: tarjeta ancha */}
      <Reveal>
        <article className="flex flex-col justify-between gap-8 rounded-[28px] bg-orange p-7 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="rounded-full border-[1.5px] border-ink px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em]">
              Todo el año
            </span>
            <h3 className="mt-5 text-3xl font-black leading-[1.02] tracking-[-0.02em] sm:text-[40px]">
              Misiones en Colombia
            </h3>
            <p className="mt-2 text-[15px] font-extrabold uppercase tracking-[0.06em]">
              Bogotá · Medellín · Eje Cafetero
            </p>
            <p className="mt-4 text-[15.5px] font-medium leading-relaxed">
              Innfíltrate en las plantas, laboratorios y culturas de las
              compañías que están moviendo el país. Misiones de 1 a 3 días,
              diseñadas a la medida de tu equipo y de lo que necesita aprender
              ahora.
            </p>
          </div>
          <a
            href={waLink("¡Hola Natalia! Quiero diseñar una misión a la medida en Colombia para mi equipo.")}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink px-7 py-4 text-base font-bold text-yellow transition-colors duration-300 hover:bg-cream hover:text-ink lg:self-center"
          >
            Solicita tu misión a la medida
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </article>
      </Reveal>
    </section>
  );
}
