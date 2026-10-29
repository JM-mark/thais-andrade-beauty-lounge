"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";

const words = ["Dia da Noiva", "Cabelos", "Maquiagem", "Sobrancelhas", "Estética", "Autocuidado"];

/** Faixa rolando devagar; muda de sentido conforme a direção do scroll. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = track.current!;
    const tween = gsap.to(el, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        gsap.to(tween, { timeScale: self.direction === 1 ? 1 : -1, duration: 0.4, overwrite: true });
      },
    });
    return () => { st.kill(); tween.kill(); };
  }, []);

  const row = words.map((w) => (
    <span key={w} className="flex shrink-0 items-center gap-8 pr-8 font-display text-[clamp(2.2rem,6vw,5rem)] italic leading-none text-wine">
      {w}<span aria-hidden="true" className="text-rosegold">✦</span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-rosegold/50 py-6" aria-label={words.join(", ")}>
      <div ref={track} className="flex w-max" aria-hidden="true">{row}{row}{row}{row}</div>
    </div>
  );
}
