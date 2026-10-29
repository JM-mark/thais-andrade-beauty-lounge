"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { Reveal, MaskLines } from "../motion";
import { gsap, prefersReduced } from "@/lib/gsap";
import { SITE } from "@/config";
import { instagramPosts } from "@/content/photos";

// TODO inserir trechos reais das avaliações do Google, com autorização. Vazio por padrão (sem depoimentos inventados).

/** Avaliações + Instagram em uma seção compacta: nota à esquerda, grid 3×2 de posts reais à direita. */
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
      <div className="grid12 items-start gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="label">No Google</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span ref={num} className="font-display text-[clamp(5rem,10vw,7.5rem)] leading-[0.9] text-marsala">{fmt(SITE.rating.value)}</span>
            <span className="text-[clamp(1.5rem,3vw,2.25rem)] text-rosegold" role="img" aria-label="5 estrelas">★</span>
          </div>
          <MaskLines as="h2" className="mt-4 font-display text-3xl" lines={[<>{SITE.rating.count} avaliações <em>no Google</em></>]} />
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-ghost" href={SITE.maps} target="_blank" rel="noopener noreferrer">Ler avaliações no Google</a>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-3xl">No <em>Instagram</em></h3>
            <a className="text-[13px] font-medium uppercase tracking-[0.14em] text-marsala underline underline-offset-8" href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {instagramPosts.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver no Instagram: ${p.photo.alt}`} className="group block overflow-hidden rounded-2xl">
                <Photo entry={p.photo} sizes="(min-width: 1024px) 200px, 30vw" className="aspect-[4/5] w-full" imgClassName="transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
