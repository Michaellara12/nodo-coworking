import { Reveal } from "./Reveal";
import Tunnel from "./Tunnel";
import {
  ArrowUpRight,
  IconBooth,
  IconChair,
  IconMonitor,
  IconSnow,
  IconSun,
  IconTv,
  IconUsers,
  IconWifi,
} from "./icons";

const FEATURES = [
  { icon: IconUsers, label: "Grupos de máximo 24 innfiltrados" },
  { icon: IconMonitor, label: "Casos y cifras reales" },
  { icon: IconTv, label: "Sesiones con C-levels y fundadores" },
  { icon: IconBooth, label: "Q&A sin libreto" },
  { icon: IconSun, label: "Experiencias culturales en destino" },
  { icon: IconWifi, label: "Red de contactos global" },
  { icon: IconChair, label: "Logística resuelta de punta a punta" },
  { icon: IconSnow, label: "Agenda balanceada, cero desgaste" },
];

export default function Spaces() {
  return (
    <section id="espacios" className="grid gap-5 lg:grid-cols-2">
      <Reveal className="h-full">
        <div className="flex h-full flex-col rounded-[28px] border-[1.5px] border-ink/70 bg-cream p-7 sm:p-10">
          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl xl:text-[54px]">
            Aprender, redefinido.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed">
            Nada de salones ni diapositivas. Innfiltrados te mete dentro de las
            empresas que ya resolvieron lo que tu equipo intenta resolver:
            caminas sus operaciones, preguntas sin filtro y te llevas el cómo,
            contado por sus protagonistas. Es más que un viaje de negocios; es
            una inmersión con método.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3.5">
                <Icon className="size-6 shrink-0" />
                <span className="text-[15px] font-semibold">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="/forma-de-trabajar"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-blue"
            >
              Descubre cómo funciona
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="h-full">
        <Tunnel />
      </Reveal>
    </section>
  );
}
