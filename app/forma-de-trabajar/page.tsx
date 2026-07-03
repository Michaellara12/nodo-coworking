import type { Metadata } from "next";
import CinematicHero from "@/components/CinematicHero";
import MeaningPinned from "@/components/MeaningPinned";
import DefinesYellow from "@/components/DefinesYellow";
import WhyDifferentStack from "@/components/WhyDifferentStack";

export const metadata: Metadata = {
  title: "Nuestra forma de trabajar",
  description:
    "Un nuevo enfoque del trabajo: espacios pensados alrededor de las personas, el día a día y un sentido real de pertenencia.",
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
