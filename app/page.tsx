import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import AllInclusive from "@/components/AllInclusive";
import Spaces from "@/components/Spaces";
import Community from "@/components/Community";
import Defines from "@/components/Defines";
import WayRibbon from "@/components/WayRibbon";
import InstaFeed from "@/components/InstaFeed";

const SERVICIOS = [
  "Salas de reuniones",
  "Café de especialidad ilimitado",
  "Seguridad 24/7",
  "Fibra óptica simétrica",
  "Oficinas privadas",
];

const COMODIDADES = [
  "Acceso en ascensor",
  "WiFi ultrarrápido",
  "Cafetería 24/7",
  "Parqueadero de bicis",
  "Duchas y vestidores",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Locations />
      <Marquee items={SERVICIOS} className="bg-red text-lemon" />
      <AllInclusive />
      <Marquee items={COMODIDADES} className="bg-blue text-mint" duration={42} />
      <Spaces />
      <Community />
      <Defines />
      <WayRibbon />
      <InstaFeed />
    </>
  );
}
