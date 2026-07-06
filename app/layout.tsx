import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "INNFILTRADOS — Tours de inmersión empresarial",
    template: "%s — Innfiltrados",
  },
  description:
    "El backstage de las empresas líderes, abierto para ti. Misiones de inmersión empresarial en Colombia y el mundo: aprende del conocimiento de otros y vuelve con un plan.",
  /* favicon: el ojo del espía — app/icon.svg y app/favicon.ico (convención de Next) */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* sin altura fija en <html>: Lenis observa su tamaño para recalcular el
     límite de scroll; con h-full el límite quedaba obsoleto al navegar y el
     scroll se trababa a mitad de página */
  return (
    <html lang="es" className={archivo.variable}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
