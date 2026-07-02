import Image from "next/image";
import { Reveal } from "./Reveal";
import { InstagramIcon } from "./icons";

const POSTS = [
  { src: "/images/insta-1.jpg", alt: "Sunset session con DJ en la terraza de NODO" },
  { src: "/images/insta-2.jpg", alt: "Café de especialidad en la barra de NODO" },
  { src: "/images/insta-3.jpg", alt: "Miembros de NODO trabajando en equipo" },
  { src: "/images/insta-4.jpg", alt: "Zonas verdes y lounge de NODO" },
];

export default function InstaFeed() {
  return (
    <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Reveal className="h-full">
        <div className="flex h-full min-h-[340px] flex-col justify-between rounded-[28px] bg-purple p-7">
          <span className="w-fit rounded-full border-[1.5px] border-ink px-5 py-2 text-[15px] font-bold">
            Instagram
          </span>
          <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[40px]">
            Sigue
            <br />
            conectado
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scrollbar-hide">
          {POSTS.map((post, i) => (
            <a
              key={post.src}
              href="#"
              aria-label={`Ver publicación de Instagram: ${post.alt}`}
              className="group relative aspect-square w-[260px] shrink-0 snap-start overflow-hidden rounded-[24px] sm:w-[300px]"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 text-white drop-shadow-md">
                <InstagramIcon className="size-6" />
              </span>
              {i === POSTS.length - 1 && (
                <span className="absolute inset-0 bg-gradient-to-l from-cream/0 to-transparent" aria-hidden />
              )}
            </a>
          ))}

          {/* tile promo */}
          <div className="relative flex aspect-square w-[260px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] bg-blue p-6 sm:w-[300px]">
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <pattern id="igrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M30 0H0v30" fill="none" stroke="#141414" strokeOpacity="0.35" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#igrid)" />
              <rect x="60" y="150" width="30" height="30" fill="#ffb200" />
              <rect x="210" y="60" width="30" height="30" fill="#1be349" />
              <rect x="150" y="210" width="30" height="30" fill="#e6313a" />
            </svg>
            <span className="relative text-white">
              <InstagramIcon className="size-6" />
            </span>
            <p className="relative text-2xl font-black leading-tight text-white">
              Encuentra
              <br />
              tu spot ideal
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
