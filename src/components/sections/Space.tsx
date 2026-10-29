"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";
import { gsap, prefersReduced } from "@/lib/gsap";
import { has, spaceGallery, type PhotoKey } from "@/content/photos";

type Cell = { key: PhotoKey; caption: string; cls: string; sizes: string };

// Bento (desktop): a foto de MAIOR resolução (área de cabelo, 2000 px) é a grande, 5/12 em 2 linhas;
// as de 720 px ficam nos quadros menores.
const bento: Cell[] = [
  { key: "salaoCadeiras", caption: "Área de cabelo", cls: "col-span-5 row-span-2", sizes: "(min-width: 1280px) 500px, 40vw" },
  { key: "salaEspera", caption: "Sala de espera", cls: "col-span-7", sizes: "(min-width: 1280px) 700px, 55vw" },
  { key: "recepcao", caption: "Recepção", cls: "col-span-4", sizes: "(min-width: 1280px) 420px, 32vw" },
  { key: "cafe", caption: "Cantinho do café", cls: "col-span-3", sizes: "(min-width: 1280px) 300px, 24vw" },
];

const Caption = ({ children }: { children: string }) => (
  <>
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
    <span className="absolute bottom-3 left-4 text-[11px] font-normal uppercase tracking-[0.2em] text-ivory">{children}</span>
  </>
);

/** Galeria alinhada ao container: bento no desktop; carrossel com snap e pontinhos no celular. */
export function Space() {
  const grid = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = spaceGallery.filter((g) => has(g.key));
  const cells = bento.filter((c) => has(c.key));

  // Entrada com máscara em sequência (stagger de 80 ms)
  useEffect(() => {
    const el = grid.current;
    if (!el || prefersReduced()) return;
    const targets = el.querySelectorAll(".bento-cell");
    gsap.set(targets, { clipPath: "inset(100% 0% 0% 0%)" });
    const t = gsap.to(targets, {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power4.out", stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); gsap.set(targets, { clearProps: "all" }); };
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    if (!card) return;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  if (!items.length) return null;
  return (
    <section id="espaco" className="section overflow-hidden">
      <div className="wrap">
        <SectionHead label="O espaço" className="mb-12" title={[<>Um lugar para</>, <><em>desacelerar</em></>]} />

        {/* Desktop: bento */}
        <div ref={grid} className="hidden h-[640px] grid-cols-12 grid-rows-2 gap-4 lg:grid">
          {cells.map((c) => (
            <figure key={c.key} className={`bento-cell relative overflow-hidden rounded-[20px] ${c.cls}`}>
              <Photo name={c.key} sizes={c.sizes} className="h-full w-full" />
              <Caption>{c.caption}</Caption>
            </figure>
          ))}
        </div>

        {/* Celular: carrossel arrastável com snap */}
        <div className="lg:hidden">
          <div ref={track} onScroll={onScroll} tabIndex={0} role="region" aria-label="Galeria do espaço"
            className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((g) => (
              <figure key={g.key} className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-[20px] sm:w-[46%]">
                <Photo name={g.key} sizes="(min-width: 640px) 46vw, 78vw" className="h-full w-full" />
                <Caption>{g.caption}</Caption>
              </figure>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
            {items.map((g, i) => (
              <span key={g.key} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-marsala" : "w-1.5 bg-rosegold/60"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
