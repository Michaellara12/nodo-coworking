import { Reveal } from "./Reveal";
import MapIllustration from "./MapIllustration";

export default function Locations() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Reveal className="h-full">
        <div className="flex h-full min-h-[520px] flex-col justify-between rounded-[28px] bg-yellow p-7 sm:p-10">
          <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
            Misiones a la medida
          </span>

          <div className="my-10">
            <h2 className="max-w-lg text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl xl:text-[54px]">
              Innfíltrate en el conocimiento de otros
            </h2>
            <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed">
              Cada organización tiene retos únicos. Por eso diseñamos misiones
              personalizadas, enfocadas en lo que tu empresa necesita aprender
              y ejecutar ahora. Tú pones el reto; nosotros abrimos las puertas
              del backstage.
            </p>
          </div>

          <div>
            <p className="text-lg font-extrabold">Explora los formatos</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[15px] font-bold">
                Misiones propias
              </span>
              <span className="text-[15px] font-semibold">y</span>
              <span className="rounded-full bg-red px-5 py-2.5 text-[15px] font-bold text-white">
                Misiones a la medida
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="h-full">
        <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
          <MapIllustration />
        </div>
      </Reveal>
    </section>
  );
}
