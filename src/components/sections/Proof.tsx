"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { Reveal, MaskLines } from "../motion";
import { gsap, prefersReduced } from "@/lib/gsap";
import { SITE } from "@/config";
import type { PhotoKey } from "@/content/photos";

// TODO inserir trechos reais das avaliações do Google, com autorização. Vazio por padrão.
type Review = { author: string; text: string };
const reviews: Review[] = [];

// TODO trocar pelos posts reais do Instagram do salão
const grid: PhotoKey[] = ["updo", "makeup", "blonde", "brideBack", "brow", "waves"];

export function Proof() {
  const num = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => n.toFixed(1).replace(".", ",");

  useEffect(() => {
    const el = num.current;
    if (!el) return;
    if (prefersReduced()) { el.textContent = fmt(SITE.rating.value); return; }
    const o = { v: 0 };
    const t = gsap.to(o, {
      v: SITE.rating.value, duration: 2, ease: "power2.out",
      onUpdate: () => { el.textContent = fmt(o.v); },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, []);

  return (
    <section id="avaliacoes" className="section wrap">
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">No Google</p>
          <div className="flex items-baseline gap-4">
            <span ref={num} className="font-display text-[clamp(7rem,24vw,18rem)] leading-[0.85] text-marsala">{fmt(SITE.rating.value)}</span>
            <span className="text-[clamp(2rem,6vw,4rem)] text-rosegold" aria-label="5 estrelas">★</span>
          </div>
        </div>
        <Reveal className="lg:col-span-5">
          <MaskLines as="p" className="font-display text-4xl" lines={[<>{SITE.rating.count} avaliações</>, <><em>no Google</em></>]} />
          <a className="btn btn-ghost mt-6" href={SITE.maps} target="_blank" rel="noopener noreferrer">Ler avaliações no Google</a>
        </Reveal>
      </div>

      {reviews.length > 0 && (
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.author} className="border-t border-rosegold/60 pt-6"><blockquote className="font-display text-2xl">{r.text}</blockquote><figcaption className="eyebrow mt-3">{r.author}</figcaption></figure>
          ))}
        </div>
      )}

      <hr className="hairline my-20" />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-4xl">No <em>Instagram</em></h3>
        <a className="btn btn-primary" href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {grid.map((p) => (
          <a key={p} href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ver no Instagram" className="group block overflow-hidden">
            <Photo name={p} width={800} className="aspect-square w-full" imgClassName="transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105" />
          </a>
        ))}
      </div>
    </section>
  );
}
