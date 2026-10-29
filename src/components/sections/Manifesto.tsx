"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { asset } from "@/lib/images";

const words: { t: string; em?: boolean }[] = [
  ..."Cada detalhe pensado para que você se sinta".split(" ").map((t) => ({ t })),
  ..."você mesma,".split(" ").map((t) => ({ t, em: true })),
  ..."só que no seu melhor dia.".split(" ").map((t) => ({ t })),
];

/** Só texto: a frase acende palavra por palavra ao rolar. O monograma oficial é um detalhe discreto. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".mw:not(.mw-em)", { color: "#766a6c" }, {
        color: "#1e1517", stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".manifesto-text", start: "top 80%", end: "bottom 55%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section wrap">
      <div className="grid12">
        <div className="col-span-12 lg:col-span-10">
          <p className="label mb-8">Nosso jeito</p>
          <p className="manifesto-text font-display text-[clamp(2rem,4.8vw,4.25rem)] leading-[1.08]">
            {words.map((w, i) => (
              <span key={i} className={`mw inline-block pr-[0.25em] ${w.em ? "mw-em italic text-marsala" : "text-[#766a6c]"}`}>{w.t}</span>
            ))}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/web/logo-ta-monograma.png")} width={32} height={48} alt="Thaís Andrade Beauty Lounge" loading="lazy" className="mt-10 h-12 w-auto opacity-60" />
        </div>
      </div>
    </section>
  );
}
