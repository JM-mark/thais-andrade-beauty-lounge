"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    const w = window as unknown as { __lenis?: Lenis };
    if (prefersReduced()) {
      // Sem smooth scroll; âncoras usam rolagem nativa.
      const click = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        const id = a?.getAttribute("href");
        if (!a || !id || id === "#") return;
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView(); }
      };
      document.addEventListener("click", click);
      return () => document.removeEventListener("click", click);
    }
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    w.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!a || !id || id === "#") return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); lenis.scrollTo(t as HTMLElement, { offset: -20, duration: 1.4 }); }
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete w.__lenis;
    };
  }, []);
  return null;
}
