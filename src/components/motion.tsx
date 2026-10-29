"use client";

import { useEffect, useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

/** Título revelado linha a linha por máscara. */
export function MaskLines({
  lines, as: Tag = "h2", className = "", afterIntro = false, delay = 0,
}: { lines: ReactNode[]; as?: ElementType; className?: string; afterIntro?: boolean; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || afterIntro || prefersReduced()) return; // afterIntro: animação 100% CSS (.mask-hero)
    const targets = el.querySelectorAll(".mask-line");
    gsap.set(targets, { yPercent: 115 });
    let tween: gsap.core.Tween | undefined;
    const run = () => {
      tween = gsap.to(targets, {
        yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    };
    run();
    return () => { tween?.scrollTrigger?.kill(); tween?.kill(); gsap.set(targets, { clearProps: "all" }); };
  }, [afterIntro, delay]);
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden px-[0.06em] pb-[0.1em] -mx-[0.06em]">
          <span className={`mask-line block will-change-transform ${afterIntro ? "mask-hero" : ""}`} style={afterIntro ? { animationDelay: `calc(var(--hero-delay, 0s) + ${i * 0.12}s)` } : undefined}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Aparece suavemente ao entrar na tela. */
export function Reveal({
  children, className = "", delay = 0, y = 36, as: Tag = "div", style,
}: { children: ReactNode; className?: string; delay?: number; y?: number; as?: ElementType; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const t = gsap.from(el, {
      y, opacity: 0, duration: 1, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); gsap.set(el, { clearProps: "all" }); };
  }, [y, delay]);
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}

/** Efeito magnético sutil (somente mouse). */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`inline-block ${className}`}>{children}</span>;
}
