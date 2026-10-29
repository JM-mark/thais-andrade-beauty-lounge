"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { asset } from "@/lib/images";

const LOGO = "/brand/web/logo-thais-andrade-completo.png";

const done = () => {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
};


/**
 * Abertura (≤ 1,2 s, só na primeira visita da sessão): a logo oficial aparece, um brilho metálico
 * percorre a marca (900 ms) e a cortina sobe. A foto do hero é pré-carregada em paralelo (page.tsx).
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; } catch {}
    // O overlay já vem pintado no HTML da primeira visita (assim a logo é o 1º conteúdo, sem depender do JavaScript).
    // Só roda se for a primeira visita da sessão e a página carregou rápido; senão some na hora.
    if (seen || prefersReduced() || performance.now() > 2500) {
      try { sessionStorage.setItem("intro", "1"); } catch {}
      el.style.display = "none";
      done();
      return;
    }
    try { sessionStorage.setItem("intro", "1"); } catch {}
    el.style.animation = "none"; // o JS assumiu: cancela a saída de segurança em CSS
    document.documentElement.style.overflow = "hidden";
    const finish = () => { document.documentElement.style.overflow = ""; el.style.display = "none"; };
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(el.querySelector(".intro-shine"), { backgroundPosition: "160% 0" }, { backgroundPosition: "-60% 0", duration: 0.9, ease: "power1.inOut" }, 0.1)
      .to(el, { yPercent: -100, duration: 0.35, ease: "power3.inOut", onStart: done }, 0.85);
    return () => { tl.kill(); document.documentElement.style.overflow = ""; };
  }, []);

  const mask = `url(${asset(LOGO)})`;
  return (
    <div ref={ref} aria-hidden="true" className="intro fixed inset-0 z-[150] flex items-center justify-center bg-ivory">
      <div className="intro-logo relative w-[min(34vw,140px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(LOGO)} width={640} height={459} alt="" className="block h-auto w-full" />
        <div
          className="intro-shine absolute inset-0"
          style={{
            WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: "contain", maskSize: "contain",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center",
            backgroundImage: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,.95) 50%, transparent 65%)",
            backgroundSize: "250% 100%", backgroundPosition: "160% 0",
          }}
        />
      </div>
    </div>
  );
}
