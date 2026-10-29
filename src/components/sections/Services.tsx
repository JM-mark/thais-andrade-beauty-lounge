"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { services, type Service } from "@/content/services";
import { has, photos } from "@/content/photos";
import { Photo } from "../Photo";
import { Reveal } from "../motion";
import { SectionHead } from "../SectionHead";
import { useBooking } from "../BookingProvider";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap";
import { usePreloadNear, asset } from "@/lib/images";
import { useDesktop } from "@/lib/useDesktop";

const pad = (n: number) => String(n).padStart(2, "0");

/** Foto real do serviço; se ainda faltar foto boa, painel com número e um detalhe fino. */
function Visual({ s, i, sizes, priority = false }: { s: Service; i: number; sizes: string; priority?: boolean }) {
  if (has(s.photo)) return <Photo name={s.photo} sizes={sizes} priority={priority} className="h-full w-full" />;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-nude to-[#d8bfae]" role="img" aria-label={s.short}>
      <svg viewBox="0 0 60 60" className="mb-4 h-10 w-10 text-rosegold" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="30" cy="30" r="22" /><path d="M30 12 V48 M12 30 H48" />
      </svg>
      <span className="font-display text-[clamp(6rem,16vw,9rem)] italic leading-none text-marsala/80">{pad(i + 1)}</span>
    </div>
  );
}

function Cards() {
  const { openBooking } = useBooking();
  return (
    <div className="wrap grid gap-14 sm:grid-cols-2 sm:gap-x-8">
      {services.map((s, i) => (
        <Reveal key={s.id} className={i % 2 ? "sm:mt-16" : ""}>
          <div className="card-rect aspect-[4/5] w-full"><Visual s={s} i={i} sizes="(min-width: 640px) 45vw, 65vw" /></div>
          <p className="eyebrow mt-5">{pad(i + 1)}</p>
          <h3 className="font-display text-4xl leading-none">{s.name[0]} <em>{s.name[1]}</em></h3>
          <p className="mt-3 max-w-sm text-[1.0625rem] text-ink-soft">{s.desc}</p>
          <button className="mt-3 inline-flex min-h-11 items-center text-[13px] font-medium uppercase tracking-[0.14em] text-marsala underline underline-offset-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button>
        </Reveal>
      ))}
    </div>
  );
}

function Pinned() {
  const root = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  // Pré-carrega as próximas fotos do palco quando a seção está a ~1 tela de distância.
  usePreloadNear(root, services.slice(1).flatMap((s) => (s.photo && photos[s.photo] ? [asset(photos[s.photo]!.srcMd)] : [])));

  useLayoutEffect(() => {
    const n = services.length;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const lenis = getLenis() as unknown as { on: (e: string, cb: () => void) => () => void; scrollTo: (y: number, o?: object) => void } | undefined;

    const ctx = gsap.context(() => {
      // Cada transição ocupa 1 unidade da timeline, em fases que NÃO se sobrepõem:
      // 0.00-0.20 título atual sai | 0.20-0.65 cortina da foto | 0.65-0.90 título novo entra | resto: pausa.
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      gsap.set(".sv-text", { autoAlpha: 0, y: 40 });
      gsap.set(".sv-text-0", { autoAlpha: 1, y: 0 });
      gsap.set(".sv-photo:not(.sv-photo-0)", { clipPath: "inset(100% 0% 0% 0%)" });
      for (let i = 1; i < n; i++) {
        const t = i - 1;
        tl.to(`.sv-text-${i - 1}`, { autoAlpha: 0, y: -40, duration: 0.2 }, t)
          .to(`.sv-photo-${i}`, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45 }, t + 0.2)
          .to(`.sv-text-${i}`, { autoAlpha: 1, y: 0, duration: 0.25 }, t + 0.65);
      }
      tl.to(".sv-bar", { scaleY: 1, duration: n - 1 }, 0);
      tl.to({}, { duration: 0 }, n - 1);

      const setActive = (k: number) => document.querySelectorAll<HTMLElement>(".sv-idx").forEach((el, i) => { el.dataset.active = String(i === k); });
      setActive(0);
      const st = ScrollTrigger.create({
        trigger: root.current, start: "top top", end: `+=${(n - 1) * 85}%`, pin: true, scrub: 0.3, animation: tl,
        onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
      });

      // Snap por serviço, compatível com Lenis: ao parar de rolar, o próprio Lenis leva ao serviço mais próximo.
      const settle = () => {
        if (!lenis || st.progress <= 0.005 || st.progress >= 0.995) return;
        const k = Math.round(st.progress * (n - 1));
        const y = st.start + (k / (n - 1)) * (st.end - st.start);
        if (Math.abs(window.scrollY - y) > 2) lenis.scrollTo(y, { duration: 0.45 });
      };
      const off = lenis?.on("scroll", () => {
        clearTimeout(idle);
        if (st.isActive) idle = setTimeout(settle, 140);
      });
      return () => { off?.(); };
    }, root);

    return () => { clearTimeout(idle); ctx.revert(); };
  }, []);

  return (
    <div ref={root} className="relative h-[100svh] overflow-hidden">
      <div className="wrap grid12 h-full items-center pt-16">
        {/* Índice: número + nome do serviço, ativo em marsala */}
        <div className="col-span-3 flex h-[55%] gap-5">
          <div className="relative w-px bg-ink/15"><div className="sv-bar absolute inset-0 origin-top scale-y-0 bg-rosegold" style={{ width: 3, left: -1 }} /></div>
          <ol className="flex flex-col justify-between">
            {services.map((s, i) => (
              <li key={s.id} data-active="false" className="sv-idx flex items-baseline gap-3 text-[13px] text-ink-soft transition-colors duration-300 data-[active=true]:text-marsala data-[active=true]:font-medium">
                <span className="font-display text-base">{pad(i + 1)}</span><span>{s.short}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative col-span-5 h-[60%]">
          {services.map((s, i) => (
            <div key={s.id} className={`sv-text sv-text-${i} absolute inset-0 flex flex-col justify-center`}>
              <h3 className="h2">{s.name[0]}<br /><em>{s.name[1]}</em></h3>
              <p className="mt-6 max-w-md text-[1.0625rem] text-ink-soft">{s.desc}</p>
              <div><button className="btn btn-ghost mt-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button></div>
            </div>
          ))}
        </div>
        {/* Palco da foto: ~340px de largura, para as fotos de 640px ficarem nítidas */}
        <div className="card-rect relative col-span-4 h-[min(72%,460px)] w-[340px] justify-self-end">
          {services.map((s, i) => (
            <div key={s.id} className={`sv-photo sv-photo-${i} absolute inset-0`} style={{ zIndex: i }}>
              <Visual s={s} i={i} sizes="340px" priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  return (
    <section id="servicos" className="bg-section-nude relative">
      <div className="wrap pt-[var(--section)] pb-12">
        <SectionHead label="Serviços" title={[<>Cuidado completo,</>, <><em>do cabelo à pele</em></>]} />
      </div>
      {desktop && !reduce ? <Pinned /> : <Cards />}
      <div className="pb-[var(--section)]" />
    </section>
  );
}
