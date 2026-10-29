"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Photo } from "../Photo";
import { MaskLines, Reveal, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap } from "@/lib/gsap";
import { useDesktop } from "@/lib/useDesktop";
import type { PhotoKey } from "@/content/photos";

// TODO confirmar as etapas com o salão
const steps = [
  ["Prova e teste", "Conversamos sobre o seu sonho e testamos penteado e maquiagem antes do grande dia."],
  ["Planejamento do look", "Definimos horários, a equipe e o que cada pessoa vai precisar na manhã do casamento."],
  ["Dia da noiva no salão", "Você chega, respira e se deixa cuidar. Mãe e madrinhas também são bem-vindas."],
  ["Retoque e acompanhamento", "Fechamos os detalhes e deixamos tudo pronto para você seguir tranquila para a cerimônia."],
];

const mosaic: { p: PhotoKey; cls: string; speed: number }[] = [
  { p: "brideBack", cls: "col-span-6 md:col-span-4 aspect-[3/4]", speed: -40 },
  { p: "lace", cls: "col-span-6 md:col-span-3 aspect-[3/4] md:mt-24", speed: 30 },
  { p: "updo", cls: "col-span-6 md:col-span-3 aspect-[4/5]", speed: -70 },
  { p: "pearl", cls: "col-span-6 md:col-span-2 aspect-square md:mt-40", speed: 20 },
];

function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current!.scrollWidth - window.innerWidth + 80);
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist() + 200}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="flex h-[100svh] items-center overflow-hidden">
      <div ref={track} className="flex w-max items-stretch gap-0 pl-[var(--gutter)] pr-[10vw]">
        <div className="flex w-[34vw] shrink-0 flex-col justify-center pr-16">
          <p className="eyebrow mb-4">Como funciona</p>
          <h3 className="h2">Do primeiro teste ao <em>sim</em></h3>
        </div>
        {steps.map(([t, d], i) => (
          <div key={t} className="relative flex w-[28vw] shrink-0 flex-col justify-center border-l border-rosegold/60 px-10">
            <span className="font-display text-7xl italic text-rosegold">0{i + 1}</span>
            <h4 className="mt-4 font-display text-4xl">{t}</h4>
            <p className="mt-3 max-w-xs text-nude">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <ol className="wrap space-y-10">
      {steps.map(([t, d], i) => (
        <Reveal as="li" key={t} className="border-t border-rosegold/60 pt-6">
          <span className="font-display text-5xl italic text-rosegold">0{i + 1}</span>
          <h4 className="mt-2 font-display text-3xl">{t}</h4>
          <p className="mt-2 max-w-md text-nude">{d}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Noiva() {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  const gal = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mosaic-item").forEach((el) => {
        gsap.fromTo(el, { y: -Number(el.dataset.speed) }, {
          y: Number(el.dataset.speed), ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, gal);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="noiva" className="on-dark relative bg-wine text-ivory">
      <div className="wrap pt-[var(--section)] pb-16">
        <p className="eyebrow mb-4">Dia da Noiva</p>
        <MaskLines className="h2 max-w-4xl" lines={[<>O grande dia merece</>, <>uma produção <em>à altura</em></>]} />
        <Reveal className="mt-8 max-w-xl text-lg text-nude">
          Beleza, cuidado e atenção aos detalhes, do penteado à maquiagem, com espaço para a mãe e as madrinhas se arrumarem junto com você.
        </Reveal>
      </div>

      {desktop && !reduce ? <Timeline /> : <Stacked />}

      <div ref={gal} className="wrap grid grid-cols-6 gap-4 pt-24 md:grid-cols-12 md:gap-6">
        {mosaic.map((m) => (
          <div key={m.p} data-speed={m.speed} className={`mosaic-item ${m.cls}`}>
            <Photo name={m.p} className="arch h-full w-full" />
          </div>
        ))}
      </div>

      <div className="wrap flex justify-center py-[var(--section)]">
        <Magnetic><button className="btn btn-primary" onClick={() => openBooking({ service: "dia-da-noiva" })}>Quero agendar meu teste</button></Magnetic>
      </div>
    </section>
  );
}
