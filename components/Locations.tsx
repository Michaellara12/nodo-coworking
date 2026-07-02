import { Reveal } from "./Reveal";
import MapIllustration from "./MapIllustration";

export default function Locations() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Reveal className="h-full">
        <div className="flex h-full min-h-[520px] flex-col justify-between rounded-[28px] bg-yellow p-7 sm:p-10">
          <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
            Sedes
          </span>

          <div className="my-10">
            <h2 className="max-w-lg text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl xl:text-[54px]">
              Donde tu día a día simplemente fluye
            </h2>
            <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed">
              Sales del metro y en dos cuadras ya estás creando. Cafés, clientes,
              after-office: todo queda cerca. Porque en NODO la ubicación no es
              azar — está elegida para acompañar tu ritmo y hacer que la vida
              funcione mejor.
            </p>
          </div>

          <div>
            <p className="text-lg font-extrabold">Explora qué hay</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[15px] font-bold">
                Próximamente
              </span>
              <span className="text-[15px] font-semibold">y</span>
              <span className="rounded-full bg-red px-5 py-2.5 text-[15px] font-bold text-white">
                ¡Listo para estrenar!
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
