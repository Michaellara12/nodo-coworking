import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NODO — Espacios de coworking únicos",
  description:
    "Coworking todo incluido: puestos flexibles, oficinas privadas y una comunidad que hace que trabajar se sienta increíble.",
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
