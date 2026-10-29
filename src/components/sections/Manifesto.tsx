"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { gsap, prefersReduced } from "@/lib/gsap";

const words: { t: string; em?: boolean }[] = [
  ..."Cada detalhe pensado para que você se sinta".split(" ").map((t) => ({ t })),
  ..."você mesma,".split(" ").map((t) => ({ t, em: true })),
  ..."só que no seu melhor dia.".split(" ").map((t) => ({ t })),
];

/** Frase que acende palavra por palavra ao rolar, com foto em parallax. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".mw", { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".manifesto-text", start: "top 80%", end: "bottom 55%", scrub: true },
      });
      gsap.fromTo(".manifesto-photo", { yPercent: 12 }, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section wrap relative grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="eyebrow mb-8">Nosso jeito</p>
        <p className="manifesto-text font-display text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.08]">
          {words.map((w, i) => (
            <span key={i} className={`mw inline-block pr-[0.25em] ${w.em ? "italic text-marsala" : ""}`}>{w.t}</span>
          ))}
        </p>
      </div>
      <div className="lg:col-span-4">
        <div className="manifesto-photo mx-auto aspect-[3/4] w-3/4 max-w-xs lg:w-full">
          <Photo name="pearl" className="arch h-full w-full" />
        </div>
      </div>
    </section>
  );
}
