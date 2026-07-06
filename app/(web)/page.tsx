import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import AllInclusive from "@/components/AllInclusive";
import Missions from "@/components/Missions";
import Spaces from "@/components/Spaces";
import Community from "@/components/Community";
import Defines from "@/components/Defines";
import WayRibbon from "@/components/WayRibbon";
import InstaFeed from "@/components/InstaFeed";

const TEMATICAS = [
  "Gestión de la innovación",
  "Eficiencia operacional",
  "Inteligencia artificial aplicada",
  "Agilismo y nuevas formas de trabajo",
  "Experiencia del cliente (CX)",
];

const MAS_TEMATICAS = [
  "Sostenibilidad y ESG",
  "Talento humano y cultura",
  "Ciberseguridad y riesgos digitales",
  "Economía circular",
  "Innovación abierta con startups",
];

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Locations />
      <Marquee items={TEMATICAS} className="bg-red text-lemon" />
      <AllInclusive />
      <Marquee items={MAS_TEMATICAS} className="bg-blue text-mint" duration={42} />
      <Missions />
      <Spaces />
      <Community />
      <Defines />
      <WayRibbon />
      <InstaFeed />
    </>
  );
}
