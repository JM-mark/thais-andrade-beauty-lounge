"use client";

import { useRef } from "react";
import { Photo } from "../Photo";
import { MaskLines } from "../motion";
import { has, spaceGallery } from "@/content/photos";

/** Galeria arrastável com snap, só com fotos reais do ambiente. Toque usa a rolagem nativa; mouse arrasta. */
export function Space() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0 });
  const items = spaceGallery.filter((g) => has(g.key));

  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { on: true, x: e.clientX, left: ref.current!.scrollLeft };
    ref.current!.style.scrollSnapType = "none";
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    ref.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const up = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    ref.current!.style.scrollSnapType = "";
  };

  if (!items.length) return null;
  return (
    <section id="espaco" className="section overflow-hidden">
      <div className="wrap">
        <p className="eyebrow mb-4">O espaço</p>
        <MaskLines className="h2 mb-12 max-w-3xl" lines={[<>Um lugar para</>, <><em>desacelerar</em></>]} />
      </div>
      <div
        ref={ref} data-cursor="drag" data-lenis-prevent-wheel tabIndex={0} role="region" aria-label="Galeria do espaço, use as setas para navegar"
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onDragStart={(e) => e.preventDefault()}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((g, i) => (
          <figure key={g.key} className={`snap-center shrink-0 select-none ${i % 2 ? "mt-12" : ""}`}>
            <Photo name={g.key} small className="arch aspect-[3/4] w-[72vw] sm:w-[22rem]" imgClassName="pointer-events-none" />
            <figcaption className="eyebrow mt-3">{g.caption}</figcaption>
          </figure>
        ))}
        <div className="w-[var(--gutter)] shrink-0" />
      </div>
    </section>
  );
}
