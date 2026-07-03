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
  { icon: IconChair, label: "Puesto ergonómico" },
  { icon: IconTv, label: "Smart TV en salas" },
  { icon: IconMonitor, label: "Monitor 4K" },
  { icon: IconSnow, label: "Aire acondicionado" },
  { icon: IconUsers, label: "Salas de juntas" },
  { icon: IconWifi, label: "WiFi ultrarrápido" },
  { icon: IconBooth, label: "Cabinas acústicas" },
  { icon: IconSun, label: "Terraza" },
];

export default function Spaces() {
  return (
    <section id="espacios" className="grid gap-5 lg:grid-cols-2">
      <Reveal className="h-full">
        <div className="flex h-full flex-col rounded-[28px] border-[1.5px] border-ink/70 bg-cream p-7 sm:p-10">
          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl xl:text-[54px]">
            Coworking, redefinido.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed">
            Un nuevo concepto de espacio de trabajo: puestos y oficinas listos
            para entrar, diseñados para la comodidad y el foco. NODO es más que
            un lugar donde trabajar; es un lugar al que perteneces. Súmate a una
            comunidad vibrante y vive el trabajo como nunca antes.
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
              Conoce nuestros planes
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
