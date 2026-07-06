import type { Metadata } from "next";
import Image from "next/image";
import MapIllustration from "@/components/MapIllustration";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { SITE, WA_GENERAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Listo para innfiltrarte? Cuéntanos qué necesita aprender tu equipo y diseñamos la misión: en Colombia o en el mundo.",
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
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <InstagramIcon className="size-7" />
                  </a>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <LinkedinIcon className="size-7" />
                  </a>
                  <a
                    href={WA_GENERAL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <WhatsappIcon className="size-7" />
                  </a>
                </div>
              </div>

              <div className="flex min-w-[240px] flex-col justify-between gap-10 rounded-[24px] bg-cream p-6">
                <span className="flex items-center gap-2">
                  <Image
                    src="/images/innfiltrados/espia-v2.png"
                    alt=""
                    width={54}
                    height={47}
                    className="w-9"
                  />
                  <span className="text-2xl font-black leading-none tracking-[-0.045em]">
                    innfiltrados®
                  </span>
                </span>
                <div className="space-y-1.5">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="block text-lg font-extrabold underline-offset-4 hover:underline"
                  >
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="block text-lg font-extrabold underline-offset-4 hover:underline"
                  >
                    {SITE.phone}
                  </a>
                  <p className="text-[15px] font-semibold text-ink/70">{SITE.city}</p>
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
              ¿Listo para
              <br />
              innfiltrarte?
            </h1>
            <p className="mt-4 text-[16px] font-medium">
              Cuéntanos qué necesita aprender tu equipo y diseñamos la misión —
              en Colombia o en el mundo.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
