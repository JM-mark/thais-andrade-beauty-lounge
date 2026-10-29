"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";

const words = ["Dia da Noiva", "Cabelos", "Maquiagem", "Sobrancelhas", "Estética", "Autocuidado"];

/** Faixa rolando devagar; muda de sentido conforme a direção do scroll. Discreta, para não competir com o manifesto. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = track.current!;
    const tween = gsap.to(el, { xPercent: -50, duration: 50, ease: "none", repeat: -1 });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        gsap.to(tween, { timeScale: self.direction === 1 ? 1 : -1, duration: 0.4, overwrite: true });
      },
    });
    return () => { st.kill(); tween.kill(); };
  }, []);

  const row = words.map((w) => (
    <span key={w} className="flex shrink-0 items-center gap-7 pr-7 font-display text-[clamp(2.5rem,4.4vw,3.5rem)] italic leading-none text-wine/80">
      {w}<span aria-hidden="true" className="text-[0.32em] not-italic text-rosegold/70">✦</span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-rosegold/40 py-5" role="img" aria-label={words.join(", ")}>
      <div ref={track} className="flex w-max" aria-hidden="true">{row}{row}{row}{row}</div>
    </div>
  );
}
