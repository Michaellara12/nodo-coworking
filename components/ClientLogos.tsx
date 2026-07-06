import Image from "next/image";
import { Reveal } from "./Reveal";

/* Marquee de logos: las compañías donde Innfiltrados ya abrió puertas. */

const LOGOS = [
  { src: "/images/clientes/bancolombia.png", alt: "Bancolombia" },
  { src: "/images/clientes/3m.png", alt: "3M" },
  { src: "/images/clientes/mercado-libre.png", alt: "Mercado Libre" },
  { src: "/images/clientes/bayer.png", alt: "Bayer" },
  { src: "/images/clientes/juan-valdez.png", alt: "Juan Valdez Café" },
  { src: "/images/clientes/davivienda.webp", alt: "Davivienda" },
  { src: "/images/clientes/alpina.png", alt: "Alpina" },
  { src: "/images/clientes/hilton.png", alt: "Hilton" },
  { src: "/images/clientes/el-tiempo.png", alt: "El Tiempo" },
  { src: "/images/clientes/totto.png", alt: "Totto" },
  { src: "/images/clientes/natura.png", alt: "Natura" },
  { src: "/images/clientes/bbva.png", alt: "BBVA" },
  { src: "/images/clientes/bavaria.png", alt: "Bavaria" },
  { src: "/images/clientes/claro.png", alt: "Claro" },
  { src: "/images/clientes/grupo-bolivar.png", alt: "Grupo Bolívar" },
  { src: "/images/clientes/schneider.png", alt: "Schneider Electric" },
  { src: "/images/clientes/ramo.png", alt: "Ramo" },
  { src: "/images/clientes/casa-luker.png", alt: "Casa Luker" },
  { src: "/images/clientes/credibanco.png", alt: "Credibanco" },
  { src: "/images/clientes/mercado-pago.png", alt: "Mercado Pago" },
  { src: "/images/clientes/adl.png", alt: "ADL" },
  { src: "/images/clientes/muverang.png", alt: "Muverang" },
  { src: "/images/clientes/takami.png", alt: "Takami" },
  { src: "/images/clientes/logyca.png", alt: "Logyca" },
];

export default function ClientLogos() {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-14 pr-14">
      {LOGOS.map((logo) => (
        <Image
          key={logo.src + ariaHidden}
          src={logo.src}
          alt={ariaHidden ? "" : logo.alt}
          width={160}
          height={64}
          className="h-9 w-auto max-w-[140px] object-contain sm:h-11"
        />
      ))}
    </div>
  );

  return (
    <section>
      <Reveal>
        <div className="rounded-[28px] border-[1.5px] border-ink/70 bg-white px-4 pb-8 pt-9 sm:px-6">
          <h2 className="text-center text-2xl font-black tracking-[-0.01em] sm:text-3xl">
            Nos hemos innfiltrado en…
          </h2>
          <p className="mt-2 text-center text-[15px] font-medium text-ink/70">
            Ya hemos abierto puertas en compañías pioneras de innovación en el
            mundo entero.
          </p>

          <div className="mt-8 overflow-hidden">
            <div
              className="flex w-max animate-marquee items-center"
              style={{ "--marquee-duration": "58s" } as React.CSSProperties}
            >
              {row(false)}
              {row(true)}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
