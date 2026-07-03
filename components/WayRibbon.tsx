import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function WayRibbon() {
  return (
    <Reveal>
      <a href="/forma-de-trabajar" className="group relative block">
        <div
          className="absolute inset-x-1 top-2.5 h-full rotate-[0.5deg] rounded-full bg-ink transition-transform duration-300 group-hover:rotate-[0.9deg]"
          aria-hidden
        />
        <div className="relative flex items-center justify-center gap-2.5 rounded-full bg-yellow px-6 py-5 text-lg font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-xl">
          Nuestra forma de trabajar
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </a>
    </Reveal>
  );
}
