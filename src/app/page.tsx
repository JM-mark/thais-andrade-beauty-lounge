import { preload } from "react-dom";
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
import { photos, HERO_PHOTO } from "@/content/photos";
import { SITE } from "@/config";

export default function Home() {
  // A foto do hero começa a baixar já no HTML, em paralelo com a intro (a intro não atrasa a imagem).
  const p = photos[HERO_PHOTO];
  if (p) {
    preload(`${SITE.basePath}${p.srcMd}`, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: `${SITE.basePath}${p.srcSm} ${p.wSm}w, ${SITE.basePath}${p.srcMd} ${p.wMd}w, ${SITE.basePath}${p.src} ${p.w}w`,
      imageSizes: "(min-width: 1024px) 450px, 70vw",
    });
  }
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
