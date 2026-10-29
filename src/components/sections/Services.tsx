"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { services } from "@/content/services";
import { Photo } from "../Photo";
import { Reveal, MaskLines } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap } from "@/lib/gsap";
import { useDesktop } from "@/lib/useDesktop";

const pad = (n: number) => String(n).padStart(2, "0");

function Cards() {
  const { openBooking } = useBooking();
  return (
    <div className="wrap grid gap-14 sm:grid-cols-2">
      {services.map((s, i) => (
        <Reveal key={s.id} className={i % 2 ? "sm:mt-20" : ""}>
          <Photo name={s.photo} className="arch aspect-[4/5] w-full" />
          <p className="eyebrow mt-5">{pad(i + 1)}</p>
          <h3 className="font-display text-4xl leading-none">{s.name[0]} <em>{s.name[1]}</em></h3>
          <p className="mt-3 max-w-sm text-ink-soft">{s.desc}</p>
          <button className="mt-4 text-sm uppercase tracking-[0.18em] text-marsala underline underline-offset-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button>
        </Reveal>
      ))}
    </div>
  );
}

function Pinned() {
  const root = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const n = services.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${n * 90}%`, pin: true, scrub: 0.6 },
      });
      gsap.set(".sv-text", { autoAlpha: 0, y: 40 });
      gsap.set(".sv-text-0", { autoAlpha: 1, y: 0 });
      gsap.set(".sv-photo:not(.sv-photo-0)", { clipPath: "inset(100% 0% 0% 0%)" });
      for (let i = 1; i < n; i++) {
        const at = i - 1;
        tl.to(`.sv-text-${i - 1}`, { autoAlpha: 0, y: -40, duration: 0.35 }, at + 0.65)
          .to(`.sv-text-${i}`, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.7)
          .to(`.sv-photo-${i}`, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, at + 0.55);
      }
      tl.to(".sv-bar", { scaleY: 1, duration: n - 1, ease: "none" }, 0);
      tl.to({}, { duration: 0.4 });
    }, root);
    return () => ctx.revert();
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
              <p className="mt-6 max-w-md text-lg text-ink-soft">{s.desc}</p>
              <div><button className="btn btn-ghost mt-8" onClick={() => openBooking({ service: s.id })}>Agendar este serviço</button></div>
            </div>
          ))}
        </div>
        <div className="relative col-span-5 h-[72%]">
          {services.map((s, i) => (
            <div key={s.id} className={`sv-photo sv-photo-${i} absolute inset-0`} style={{ zIndex: i }}>
              <Photo name={s.photo} className="arch h-full w-full" />
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
      <div className="wrap pt-[var(--section)] pb-16">
        <p className="eyebrow mb-4">Serviços</p>
        <MaskLines className="h2 max-w-3xl" lines={[<>Cuidado completo,</>, <><em>do cabelo à pele</em></>]} />
      </div>
      {desktop && !reduce ? <Pinned /> : <Cards />}
      <div className="pb-[var(--section)]" />
    </section>
  );
}
