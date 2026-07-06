import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroll />
      <Sidebar />
      <main className="space-y-5 p-4 pt-24 sm:p-5 sm:pt-24 lg:pt-5 lg:pl-[224px]">
        {children}
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
