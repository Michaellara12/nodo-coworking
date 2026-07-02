# nodo. — Coworking (marca imaginaria)

Landing page de coworking construida con **Next.js 16 + Tailwind CSS v4 + Framer Motion + Lenis**.
Diseño inspirado en la estructura y el estilo neo-brutalista colorido de units.gr, adaptado
de residencias estudiantiles a coworking, con código, textos e ilustraciones propios.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000  (o -p 3001)
```

## Estructura

| Sección | Componente |
| --- | --- |
| Sidebar fijo (tarjetas 01–04, CTA, idioma, social) | `components/Sidebar.tsx` |
| Hero full-bleed con título animado | `components/Hero.tsx` |
| Sedes + mapa ilustrado SVG | `components/Locations.tsx`, `MapIllustration.tsx` |
| Cintas marquee (roja y azul) | `components/Marquee.tsx` |
| Bento "Todo incluido" con scroll horizontal anclado | `components/AllInclusive.tsx` |
| "Coworking, redefinido" + túnel 3D interactivo | `components/Spaces.tsx`, `Tunnel.tsx` |
| Comunidad (foto — tarjeta roja — foto) | `components/Community.tsx` |
| "Lo que nos define" + pixel-art animado | `components/Defines.tsx`, `PixelArt.tsx` |
| Ribbon amarillo con sombra ondulada | `components/WayRibbon.tsx` |
| Feed de Instagram | `components/InstaFeed.tsx` |
| Newsletter (píldoras rojo/amarillo) | `components/Newsletter.tsx` |
| Footer con wordmark gigante sobre cuadrícula | `components/Footer.tsx` |

## Personalizar la marca

- **Imágenes** — reemplaza los archivos de `public/images/` manteniendo los nombres
  (`hero.jpg`, `lobby.jpg`, `meeting.jpg`, `office.jpg`, `desk.jpg`, `phone.jpg`,
  `exterior.jpg`, `terrace.jpg`, `insta-1..4.jpg`). Las actuales son placeholders
  libres de Unsplash/Pexels — cámbialas por las fotos de tu marca.
- **Colores** — tokens en `app/globals.css` dentro de `@theme` (`--color-blue`,
  `--color-yellow`, etc.).
- **Nombre de marca** — el wordmark vive en `components/Sidebar.tsx` (función
  `Wordmark`) y en `components/Footer.tsx`; los textos están dentro de cada
  componente de sección.
- **Fuente** — `Archivo` (Google Fonts) configurada en `app/layout.tsx`.

## Animaciones

- Scroll suave con **Lenis** (`SmoothScroll.tsx`).
- Reveals al hacer scroll con Framer Motion (`Reveal.tsx`).
- Scroll horizontal anclado en la sección bento (`useScroll` + `useTransform`).
- Marquees infinitos por CSS (`--animate-marquee` en `globals.css`).
- Túnel con celdas que cambian de color solas (y con el botón *Press to Start*).
