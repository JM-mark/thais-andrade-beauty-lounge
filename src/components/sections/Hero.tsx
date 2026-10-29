"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { Monogram } from "../Logo";
import { MaskLines, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, prefersReduced, onIntroDone } from "@/lib/gsap";
import { has, type PhotoKey } from "@/content/photos";
import { SITE, wa } from "@/config";

/**
 * Hero editorial: título à esquerda e uma foto real em arco à direita.
 * Se a foto real da noiva não tiver qualidade (veja photos.ts), vira hero tipográfico com o monograma "TA".
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  // A melhor noiva disponível tem 1200px no lado menor (< 1400): hero tipográfico. Para usar foto, troque por uma chave de photos.ts.
  const heroPhoto: PhotoKey | undefined = undefined;
  const photo = has(heroPhoto);

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", { opacity: 0, y: 24, duration: 1, delay: 0.9, stagger: 0.12, ease: "power3.out" });
      gsap.fromTo(media.current, { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" }, {
        clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)", duration: 1.4, delay: 0.6, ease: "power4.out",
      });
      gsap.to(media.current, {
        yPercent: -5, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      const off = onIntroDone(() => gsap.to(".hero-ta .ta-stroke", { strokeDashoffset: 0, duration: 1.6, stagger: 0.2, ease: "power2.inOut" }));
      return () => off();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="topo" ref={root} className="relative overflow-hidden pt-[5.5rem] pb-12 lg:min-h-[100svh]">
      <div className="wrap grid items-center gap-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <MaskLines as="h1" afterIntro className="display"
            lines={[<>Sua nova fase</>, <><em>começa</em> <span className="script text-[1.15em]">aqui</span>.</>]} />
          <p className="hero-fade mt-5 max-w-md text-[1.0625rem] text-ink">Dia da Noiva, cabelo, maquiagem e estética em Hortolândia.</p>
          <div className="hero-fade mt-7 flex flex-wrap gap-3">
            <Magnetic><button className="btn btn-primary" onClick={() => openBooking()}>Agendar horário</button></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={wa("Olá! Vim pelo site e gostaria de falar com o salão.")} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></Magnetic>
          </div>
          <p className="hero-fade mt-7 inline-flex items-center gap-2 rounded-full border border-rosegold/70 px-4 py-2 text-sm">
            <span className="text-marsala">★</span> <strong className="font-medium">{SITE.rating.value.toFixed(1).replace(".", ",")}</strong> no Google · {SITE.rating.count} avaliações
          </p>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <div ref={media} className="ml-auto h-[32svh] w-[min(52vw,14rem)] lg:mx-auto lg:h-[74svh] lg:w-full lg:max-w-[28rem]">
            {photo ? (
              <Photo name={heroPhoto} priority objectPosition="50% 20%" className="arch h-full w-full" />
            ) : (
              <div className="hero-ta arch flex h-full w-full items-center justify-center bg-gradient-to-b from-nude to-[#d8bfae]" aria-hidden="true">
                <Monogram draw color="#7A2E3A" className="h-1/3 w-auto lg:h-1/4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
