"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { Monogram } from "./Logo";

const done = () => {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
};

/** Loader ≤ 1,4 s, só na primeira visita da sessão: monograma se desenha e a cortina sobe. */
export function Intro() {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; } catch {}
    if (seen || prefersReduced()) { ref.current!.style.display = "none"; done(); return; }
    try { sessionStorage.setItem("intro", "1"); } catch {}
    const el = ref.current!;
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => { document.documentElement.style.overflow = ""; setShow(false); },
      // setShow roda em callback (não no corpo do effect)
    });
    tl.to(el.querySelectorAll(".ta-stroke"), { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.12 })
      .to(el.querySelector(".ta-name"), { opacity: 1, duration: 0.3 }, 0.5)
      .to(el, { yPercent: -100, duration: 0.6, ease: "power4.inOut", onStart: done }, 0.95);
    return () => { tl.kill(); document.documentElement.style.overflow = ""; };
  }, []);

  if (!show) return null;
  return (
    <div ref={ref} aria-hidden="true" className="intro fixed inset-0 z-[150] flex flex-col items-center justify-center bg-ivory text-rosegold">
      <Monogram draw className="h-28 w-auto" color="#C79A86" />
      <p className="ta-name mt-4 text-[0.65rem] uppercase tracking-[0.5em] text-marsala opacity-0">Beauty Lounge</p>
      <noscript><style>{".intro{display:none}"}</style></noscript>
    </div>
  );
}
