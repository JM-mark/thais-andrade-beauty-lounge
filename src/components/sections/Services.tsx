"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { services, type Service } from "@/content/services";
import { has } from "@/content/photos";
import { Photo } from "../Photo";
import { Reveal, MaskLines } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap";
import { useDesktop } from "@/lib/useDesktop";

const pad = (n: number) => String(n).padStart(2, "0");

/** Foto real do serviço; sem foto, número grande e um detalhe fino da marca. */
function Visual({ s, i, className = "" }: { s: Service; i: number; className?: string }) {
  if (has(s.photo)) return <Photo name={s.photo} small className={`arch h-full w-full ${className}`} />;
  return (
    <div className={`arch relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-nude to-[#d8bfae] ${className}`} role="img" aria-label={s.short}>
      <svg viewBox="0 0 60 60" className="mb-4 h-10 w-10 text-rosegold" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="30" cy="30" r="22" /><path d="M30 12 V48 M12 30 H48" />
      </svg>
      <span className="font-display text-[clamp(6rem,16vw,11rem)] italic leading-none text-marsala/80">{pad(i + 1)}</span>
    </div>
  );
}

function Cards() {
  const { openBooking } = useBooking();
  return (
    <div className="wrap grid gap-14 sm:grid-cols-2">
      {services.map((s, i) => (
        <Reveal key={s.id} className={i % 2 ? "sm:mt-20" : ""}>
          <div className="aspect-[4/5] w-full"><Visual s={s} i={i} /></div>
          <p className="eyebrow mt-5">{pad(i + 1)}</p>
          <h3 className="font-display text-4xl leading-none">{s.name[0]} <em>{s.name[1]}</em></h3>
          <p className="mt-3 max-w-sm text-[1.0625rem] text-ink-soft">{s.desc}</p>
          <button className="mt-3 inline-flex min-h-11 items-center text-sm uppercase tracking-[0.18em] text-marsala underline underline-offset-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button>
        </Reveal>
      ))}
    </div>
  );
}

function Pinned() {
  const root = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
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
      tl.to({}, { duration: 0 }, n - 1); // fecha a timeline em n-1 unidades

      const st = ScrollTrigger.create({
        trigger: root.current, start: "top top", end: `+=${(n - 1) * 85}%`, pin: true, scrub: 0.3, animation: tl,
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
      <div className="wrap grid h-full grid-cols-12 items-center gap-8 pt-16">
        <div className="col-span-2 flex h-[55%] gap-5">
          <div className="relative w-px bg-ink/15"><div className="sv-bar absolute inset-0 origin-top scale-y-0 bg-rosegold" style={{ width: 3, left: -1 }} /></div>
          <div className="flex flex-col justify-between font-display text-lg text-ink-soft">
            {services.map((s, i) => <span key={s.id}>{pad(i + 1)}</span>)}
          </div>
        </div>
        <div className="relative col-span-5 h-[60%]">
          {services.map((s, i) => (
            <div key={s.id} className={`sv-text sv-text-${i} absolute inset-0 flex flex-col justify-center`}>
              <p className="eyebrow mb-4">{pad(i + 1)} — {pad(services.length)}</p>
              <h3 className="h2">{s.name[0]}<br /><em>{s.name[1]}</em></h3>
              <p className="mt-6 max-w-md text-[1.0625rem] text-ink-soft">{s.desc}</p>
              <div><button className="btn btn-ghost mt-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button></div>
            </div>
          ))}
        </div>
        <div className="relative col-span-5 h-[72%]">
          {services.map((s, i) => (
            <div key={s.id} className={`sv-photo sv-photo-${i} absolute inset-0`} style={{ zIndex: i }}>
              <Visual s={s} i={i} />
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
    <section id="servicos" className="relative">
      <div className="wrap pt-[var(--section)] pb-12">
        <p className="eyebrow mb-4">Serviços</p>
        <MaskLines className="h2 max-w-3xl" lines={[<>Cuidado completo,</>, <><em>do cabelo à pele</em></>]} />
      </div>
      {desktop && !reduce ? <Pinned /> : <Cards />}
      <div className="pb-[var(--section)]" />
    </section>
  );
}
