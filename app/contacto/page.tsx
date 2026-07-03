import type { Metadata } from "next";
import MapIllustration from "@/components/MapIllustration";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Preguntas? Estamos para responder. Escríbenos y el equipo de NODO te contacta muy pronto.",
};

export default function Contacto() {
  return (
    <section className="rounded-[28px] bg-green p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        {/* columna izquierda: mapa + conectemos */}
        <div className="flex flex-col gap-5">
          <Reveal className="flex-1">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-[24px]">
              <MapIllustration />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-6 p-3 sm:flex-row sm:items-stretch sm:justify-between">
              <div className="flex flex-col justify-between gap-8">
                <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.02em] sm:text-5xl">
                  ¡Vamos a<br />
                  conectar!
                </h2>
                <div className="flex items-center gap-5">
                  <a href="#" aria-label="Instagram" className="transition-transform hover:-translate-y-1">
                    <InstagramIcon className="size-7" />
                  </a>
                  <a href="#" aria-label="Facebook" className="transition-transform hover:-translate-y-1">
                    <FacebookIcon className="size-7" />
                  </a>
                  <a href="#" aria-label="TikTok" className="transition-transform hover:-translate-y-1">
                    <TiktokIcon className="size-7" />
                  </a>
                </div>
              </div>

              <div className="flex min-w-[240px] flex-col justify-between gap-10 rounded-[24px] bg-cream p-6">
                <span className="text-4xl font-black leading-none tracking-[-0.045em]">nodo.</span>
                <div className="space-y-1.5">
                  <a href="mailto:hola@nodo.work" className="block text-lg font-extrabold underline-offset-4 hover:underline">
                    hola@nodo.work
                  </a>
                  <a href="tel:+573001234567" className="block text-lg font-extrabold underline-offset-4 hover:underline">
                    +57 300 123 4567
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* columna derecha: formulario */}
        <Reveal delay={0.18} className="h-full">
          <div className="h-full rounded-[24px] bg-cream p-7 sm:p-10">
            <span className="inline-block rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
              Contacto
            </span>
            <h1 className="mt-10 text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              ¿Preguntas?
              <br />
              ¡Estamos para responder!
            </h1>
            <p className="mt-4 text-[16px] font-medium">
              Completa el formulario y nuestro equipo te contacta muy pronto.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
