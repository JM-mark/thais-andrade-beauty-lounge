import { preload } from "react-dom";
import { asset } from "@/config";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Noiva } from "@/components/sections/Noiva";
import { Space } from "@/components/sections/Space";
import { Proof } from "@/components/sections/Proof";
import { BookingSection } from "@/components/sections/BookingSection";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/sections/Footer";
import { FloatingBar } from "@/components/FloatingBar";

export default function Home() {
  // O poster do hero (LCP) começa a baixar já no HTML, em paralelo com a intro; o vídeo vem depois, no cliente.
  preload(asset("/hero/poster-d.jpg"), { as: "image", fetchPriority: "high", media: "(min-width: 768px)" });
  preload(asset("/hero/poster-m.jpg"), { as: "image", fetchPriority: "high", media: "(max-width: 767px)" });
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Noiva />
        <Space />
        <Proof />
        <BookingSection />
        <Faq />
        <Location />
      </main>
      <Footer />
      <FloatingBar />
    </>
  );
}
