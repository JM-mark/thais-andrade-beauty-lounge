"use client";

import { useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { Reveal, MaskLines } from "../motion";
import { gsap, prefersReduced } from "@/lib/gsap";
import { SITE } from "@/config";
import { instagramPosts } from "@/content/photos";

// Sem depoimentos inventados: trechos reais das avaliações do Google só entram com autorização.

const Star = () => (
  <svg viewBox="0 0 24 24" className="star h-9 w-9 text-rosegold sm:h-11 sm:w-11" fill="currentColor" aria-hidden="true">
    <path d="M12 2.4l2.95 6.2 6.75.85-4.95 4.7 1.25 6.7L12 17.5l-6 3.35 1.25-6.7-4.95-4.7 6.75-.85z" />
  </svg>
);

/** Avaliação + Instagram em uma seção compacta: 5 estrelas à esquerda, grid 3×2 de posts reais à direita. */
export function Proof() {
  const stars = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stars.current;
    if (!el || prefersReduced()) return;
    const t = gsap.from(el.querySelectorAll(".star"), {
      scale: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.7, stagger: 0.12, ease: "back.out(2)",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); gsap.set(el.querySelectorAll(".star"), { clearProps: "all" }); };
  }, []);

  return (
    <section id="avaliacoes" className="section wrap">
      <div className="grid12 items-start gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="label">No Google</p>
          <div ref={stars} className="mt-6 flex gap-1.5" role="img" aria-label="5 estrelas">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
          </div>
          <MaskLines as="h2" className="mt-6 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05]" lines={[<>Avaliado com <em>5 estrelas</em></>, <>no Google</>]} />
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-ghost" href={SITE.maps} target="_blank" rel="noopener noreferrer">Ler avaliações no Google</a>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-3xl">No <em>Instagram</em></h3>
            <a className="inline-flex min-h-11 items-center text-[13px] font-medium uppercase tracking-[0.14em] text-marsala underline underline-offset-8" href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>
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
