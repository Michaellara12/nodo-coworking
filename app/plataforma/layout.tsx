import type { Metadata } from "next";
import AuthProvider from "@/components/plataforma/AuthProvider";
import PlatformShell from "@/components/plataforma/PlatformShell";

export const metadata: Metadata = {
  title: {
    default: "Plataforma",
    template: "%s — Plataforma Innfiltrados",
  },
  description:
    "Plataforma interna de Innfiltrados: inscríbete a las misiones, gestiona tus pagos y administra el calendario de inmersiones.",
  robots: { index: false },
};

export default function PlataformaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <PlatformShell>{children}</PlatformShell>
    </AuthProvider>
  );
}
