"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Photo } from "../Photo";
import { MaskLines, Reveal, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap } from "@/lib/gsap";
import { useDesktop } from "@/lib/useDesktop";
import { has, type PhotoKey } from "@/content/photos";

// TODO confirmar etapas com o salão. Em tom de convite; não prometem serviço específico.
const steps = [
  ["Prova e teste", "Conversamos sobre o seu sonho e, se fizer sentido para você, testamos o visual antes do grande dia."],
  ["Planejamento do look", "Combinamos juntas o penteado e a maquiagem que combinam com o seu vestido e com você."],
  ["O grande dia", "Você chega, respira e se deixa cuidar. Mãe e madrinhas também podem se arrumar com a gente."],
  ["Fale com a gente", "Reserve a sua data pelo WhatsApp e tire todas as dúvidas com o salão."],
];

// Até 2 fotos reais de noivas do salão (sem repetir as do hero e da vitrine). Sem foto, a galeria some.
const gallery: PhotoKey[] = ["noiva3"];

function Intro() {
  return (
    <>
      <p className="eyebrow mb-4">Dia da Noiva</p>
      <h2 className="h2 max-w-[14ch]">O grande dia merece <em>uma produção à altura</em></h2>
      <p className="mt-6 max-w-md text-[1.0625rem] text-nude">
        Beleza, cuidado e atenção aos detalhes. Mãe e madrinhas também podem se arrumar com a gente. Consulte pelo WhatsApp.
      </p>
    </>
  );
}

function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  // Título e linha do tempo na mesma tela; o trilho começa alinhado ao container e termina com respiro.
  return (
    <div ref={root} className="flex h-[100svh] items-center overflow-hidden pt-16">
      <div ref={track} className="flex w-max items-stretch pl-[max(var(--gutter),calc((100vw-1600px)/2+var(--gutter)))] pr-[12vw]">
        <div className="flex w-[min(34rem,40vw)] shrink-0 flex-col justify-center pr-16"><Intro /></div>
        {steps.map(([t, d], i) => (
          <div key={t} className="flex w-[22rem] shrink-0 flex-col justify-center border-l border-rosegold/60 px-8">
            <span className="font-display text-7xl italic text-rosegold">0{i + 1}</span>
            <h4 className="mt-4 font-display text-4xl">{t}</h4>
            <p className="mt-3 max-w-xs text-[1.0625rem] text-nude">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="wrap py-[var(--section)]">
      <Intro />
      <ol className="mt-14 space-y-10">
        {steps.map(([t, d], i) => (
          <Reveal as="li" key={t} className="border-t border-rosegold/60 pt-6">
            <span className="font-display text-5xl italic text-rosegold">0{i + 1}</span>
            <h4 className="mt-2 font-display text-3xl">{t}</h4>
            <p className="mt-2 max-w-md text-[1.0625rem] text-nude">{d}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Noiva() {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  const gal = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const shown = gallery.filter(has);

  useEffect(() => {
    if (reduce || !shown.length) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mosaic-item").forEach((el) => {
        gsap.fromTo(el, { y: -Number(el.dataset.speed) }, {
          y: Number(el.dataset.speed), ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, gal);
    return () => ctx.revert();
  }, [reduce, shown.length]);

  return (
    <section id="noiva" className="on-dark relative bg-wine text-ivory">
      {desktop && !reduce ? <Timeline /> : <Stacked />}

      {shown.length > 0 && (
        <div ref={gal} className="wrap flex justify-center gap-6 pb-16 pt-20">
          {shown.map((k, i) => (
            <div key={k} data-speed={i % 2 ? 30 : -30} className="mosaic-item aspect-[3/4] w-full max-w-sm">
              <Photo name={k} small className="arch h-full w-full" />
            </div>
          ))}
        </div>
      )}

      <div className="wrap flex flex-col items-center gap-6 pb-[var(--section)] pt-16 text-center">
        <MaskLines as="p" className="font-display text-4xl sm:text-5xl" lines={[<>Vamos conversar sobre <em>o seu dia?</em></>]} />
        <Magnetic><button className="btn btn-primary" onClick={() => openBooking({ service: "dia-da-noiva" })}>Quero agendar meu teste</button></Magnetic>
      </div>
    </section>
  );
}
