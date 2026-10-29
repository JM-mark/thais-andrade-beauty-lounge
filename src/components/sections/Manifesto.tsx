"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { Monogram } from "../Logo";

const words: { t: string; em?: boolean }[] = [
  ..."Cada detalhe pensado para que você se sinta".split(" ").map((t) => ({ t })),
  ..."você mesma,".split(" ").map((t) => ({ t, em: true })),
  ..."só que no seu melhor dia.".split(" ").map((t) => ({ t })),
];

/** Só texto: a frase acende palavra por palavra e o traço do monograma se desenha ao rolar. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".mw", { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".manifesto-text", start: "top 80%", end: "bottom 55%", scrub: true },
      });
      gsap.to(".ta-stroke", {
        strokeDashoffset: 0, ease: "none", stagger: 0.2,
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="wrap relative py-[clamp(4rem,9vw,7rem)]">
      <p className="eyebrow mb-8">Nosso jeito</p>
      <p className="manifesto-text max-w-[22ch] font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.05] sm:max-w-5xl">
        {words.map((w, i) => (
          <span key={i} className={`mw inline-block pr-[0.25em] ${w.em ? "italic text-marsala" : ""}`}>{w.t}</span>
        ))}
      </p>
      <Monogram draw color="#C79A86" className="mt-10 h-16 w-auto" />
    </section>
  );
}
