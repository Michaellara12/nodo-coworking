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
  icons: {
    icon: "/images/innfiltrados/espia-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
