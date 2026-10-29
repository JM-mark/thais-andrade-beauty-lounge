import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Noiva } from "@/components/sections/Noiva";
import { Team } from "@/components/sections/Team";
import { Space } from "@/components/sections/Space";
import { Proof } from "@/components/sections/Proof";
import { BookingSection } from "@/components/sections/BookingSection";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/sections/Footer";
import { FloatingBar } from "@/components/FloatingBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Noiva />
        <Team />
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
