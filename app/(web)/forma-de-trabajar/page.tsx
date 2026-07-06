import type { Metadata } from "next";
import CinematicHero from "@/components/CinematicHero";
import MeaningPinned from "@/components/MeaningPinned";
import DefinesYellow from "@/components/DefinesYellow";
import WhyDifferentStack from "@/components/WhyDifferentStack";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Así funciona una misión Innfiltrados: diagnóstico, acceso backstage a empresas líderes, síntesis diaria y un playbook para ejecutar al volver.",
};

export default function FormaDeTrabajar() {
  return (
    <>
      {/* lienzo amarillo para toda la página, como el original */}
      <div className="fixed inset-0 -z-10 bg-yellow" aria-hidden />

      <CinematicHero />
      <MeaningPinned />
      <DefinesYellow />
      <WhyDifferentStack />
    </>
  );
}
