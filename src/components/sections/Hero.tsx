"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { MaskLines, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, prefersReduced } from "@/lib/gsap";
import { SITE, wa } from "@/config";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const kb = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      // Ken Burns lento
      gsap.fromTo(kb.current, { scale: 1.12 }, { scale: 1, duration: 14, ease: "sine.out" });
      // Foto encolhe para um card em arco ao rolar
      gsap.fromTo(
        media.current,
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)" },
        {
          clipPath: "inset(7% 16% 0% 16% round 50vw 50vw 0px 0px)", ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".hero-fade", { opacity: 0, y: 24, duration: 1, delay: 0.9, stagger: 0.12, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="topo" ref={root} className="relative h-[100svh] min-h-[640px] w-full">
      <div ref={media} className="absolute inset-0 overflow-hidden">
        <div ref={kb} className="absolute inset-0 will-change-transform">
          <Photo name="heroBride" priority className="h-full w-full" imgClassName="object-[50%_25%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/70 via-30% to-transparent to-65%" />
      </div>

      <div className="hero-fade absolute right-[var(--gutter)] top-24 z-10 rounded-full border border-rosegold/70 bg-ivory/80 px-4 py-2 text-xs backdrop-blur sm:top-28">
        <span className="text-marsala">★</span> <strong className="font-medium">{SITE.rating.value.toFixed(1).replace(".", ",")}</strong> no Google · {SITE.rating.count} avaliações
      </div>

      <div className="wrap absolute inset-x-0 bottom-0 z-10 pb-10 sm:pb-14">
        <MaskLines as="h1" afterIntro className="display max-w-[16ch]"
          lines={[<>Sua nova fase</>, <><em>começa</em> <span className="script text-[1.15em]">aqui</span>.</>]} />
        <p className="hero-fade mt-5 max-w-md text-[1.05rem] text-ink">Dia da Noiva, cabelo, maquiagem e estética em Hortolândia.</p>
        <div className="hero-fade mt-7 flex flex-wrap gap-3">
          <Magnetic><button className="btn btn-primary" onClick={() => openBooking()}>Agendar horário</button></Magnetic>
          <Magnetic><a className="btn btn-ghost bg-ivory/60" href={wa("Olá! Vim pelo site e gostaria de falar com o salão.")} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></Magnetic>
        </div>
      </div>
    </section>
  );
}
