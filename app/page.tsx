import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import AllInclusive from "@/components/AllInclusive";
import Spaces from "@/components/Spaces";
import Community from "@/components/Community";
import Defines from "@/components/Defines";
import WayRibbon from "@/components/WayRibbon";
import InstaFeed from "@/components/InstaFeed";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

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
      <SmoothScroll />
      <Sidebar />
      <main className="space-y-5 p-4 pt-24 sm:p-5 sm:pt-24 lg:pt-5 lg:pl-[224px]">
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
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
