import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "NODO — Espacios de coworking únicos",
    template: "%s — NODO Coworking",
  },
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
      <body className="min-h-full">
        <SmoothScroll />
        <Sidebar />
        <main className="space-y-5 p-4 pt-24 sm:p-5 sm:pt-24 lg:pt-5 lg:pl-[224px]">
          {children}
          <Newsletter />
          <Footer />
        </main>
      </body>
    </html>
  );
}
