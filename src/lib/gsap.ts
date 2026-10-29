import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

type LenisLike = { stop: () => void; start: () => void; scrollTo: (t: string | number | Element, o?: object) => void };
export const getLenis = (): LenisLike | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { __lenis?: LenisLike }).__lenis;

/** Executa o callback quando a intro terminar (ou já terminou). */
export function onIntroDone(cb: () => void) {
  const w = window as unknown as { __introDone?: boolean };
  if (w.__introDone) { cb(); return () => {}; }
  const h = () => cb();
  window.addEventListener("intro:done", h, { once: true });
  return () => window.removeEventListener("intro:done", h);
}
