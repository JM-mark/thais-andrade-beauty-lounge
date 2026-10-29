"use client";

import { useEffect, useRef } from "react";
import { MaskLines, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, prefersReduced } from "@/lib/gsap";
import { SITE, wa } from "@/config";


/**
 * Hero editorial: título à esquerda e a foto real da noiva em arco à direita (no celular: título, botões e depois a foto).
 * A foto é pré-carregada no HTML (page.tsx) em paralelo com a intro, e a revelação (máscara + zoom 1.08 → 1)
 * é 100% CSS, com atraso de 1 s só na primeira visita da sessão (para esperar a intro). Isso mantém o LCP baixo.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.to(media.current, {
        yPercent: -4, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const badge = (cls: string) => (
    <p className={`hero-fade items-center gap-2 rounded-full border border-rosegold/70 px-4 py-2 text-sm ${cls}`}>
      <span className="tracking-[0.2em] text-marsala" aria-hidden="true">★★★★★</span> Avaliado com 5 estrelas no Google
    </p>
  );

  return (
    <section id="topo" ref={root} className="relative overflow-hidden pt-[5.5rem] pb-12 lg:flex lg:min-h-[100svh] lg:items-center">
      <div className="wrap grid12 items-center gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <MaskLines as="h1" afterIntro className="display" lines={[<>Sua nova fase</>, <><em>começa</em> <span className="script text-[1.15em]">aqui</span>.</>]} />
          <p className="hero-fade mt-5 max-w-md text-[1.0625rem] text-ink">Dia da Noiva, cabelo, maquiagem e estética em Hortolândia.</p>
          <div className="hero-fade mt-7 flex flex-wrap gap-3">
            <Magnetic><button className="btn btn-primary" onClick={() => openBooking()}>Agendar horário</button></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={wa("Olá! Vim pelo site e gostaria de falar com o salão.")} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></Magnetic>
          </div>
          {badge("mt-7 hidden w-fit lg:inline-flex")}
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div ref={media} className="mx-auto h-[42svh] max-h-[460px] w-[70%] lg:h-[74svh] lg:max-h-none lg:w-full lg:max-w-[28rem]">
            <div className="hero-media h-full w-full">
              <div className="hero-zoom h-full w-full">
                <div className="h-full w-full bg-nude" />
              </div>
            </div>
          </div>
          {badge("mx-auto mt-6 flex w-fit lg:hidden")}
        </div>
      </div>
    </section>
  );
}
