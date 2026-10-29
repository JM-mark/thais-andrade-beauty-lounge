"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MaskLines, Reveal, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap } from "@/lib/gsap";
import { asset } from "@/lib/images";
import { useDesktop } from "@/lib/useDesktop";

// TODO confirmar etapas com o salão. Em tom de convite; não prometem serviço específico.
const steps = [
  ["Prova e teste", "Conversamos sobre o seu sonho e, se fizer sentido para você, testamos o visual antes do grande dia."],
  ["Planejamento do look", "Combinamos juntas o penteado e a maquiagem que combinam com o seu vestido e com você."],
  ["O grande dia", "Você chega, respira e se deixa cuidar. Mãe e madrinhas também podem se arrumar com a gente."],
  ["Fale com a gente", "Reserve a sua data pelo WhatsApp e tire todas as dúvidas com o salão."],
];

// Sem galeria: não há outra foto real de noiva com qualidade (a do buquê está no hero).

function Intro() {
  return (
    <>
      <p className="label mb-5">Dia da Noiva</p>
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
  useLayoutEffect(() => {
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
      <div ref={track} className="flex w-max items-stretch pl-[max(var(--gutter),calc((100vw-1240px)/2+var(--gutter)))] pr-[12vw]">
        <div className="flex w-[min(34rem,40vw)] shrink-0 flex-col justify-center pr-16"><Intro /></div>
        {steps.map(([t, d], i) => (
          <div key={t} className="flex w-[22rem] shrink-0 flex-col justify-center border-l border-rosegold/60 px-8">
            <span className="font-display text-7xl italic text-rosegold">0{i + 1}</span>
            <h3 className="mt-4 font-display text-4xl">{t}</h3>
            <p className="mt-3 max-w-xs text-[1.0625rem] text-nude">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="wrap pt-[var(--section)]">
      <Intro />
      <ol className="mt-14 space-y-10">
        {steps.map(([t, d], i) => (
          <Reveal as="li" key={t} className="border-t border-rosegold/60 pt-6">
            <span className="font-display text-5xl italic text-rosegold">0{i + 1}</span>
            <h3 className="mt-2 font-display text-3xl">{t}</h3>
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
  const { openBooking } = useBooking();

  return (
    <section id="noiva" className="on-dark curve-both relative bg-wine text-ivory">
      {desktop && !reduce ? <Timeline /> : <Stacked />}

      <div className="wrap flex flex-col items-center gap-6 pb-[var(--section)] pt-16 text-center">
        {/* Logo oficial em marfim (versão -claro) para o fundo vinho */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/brand/web/logo-ta-monograma-claro.png")} width={32} height={48} alt="" loading="lazy" className="h-12 w-auto opacity-80" />
        <MaskLines as="p" className="font-display text-4xl sm:text-5xl" lines={[<>Vamos conversar sobre <em>o seu dia?</em></>]} />
        <Magnetic><button className="btn btn-primary" onClick={() => openBooking({ service: "dia-da-noiva" })}>Quero agendar meu teste</button></Magnetic>
      </div>
    </section>
  );
}
