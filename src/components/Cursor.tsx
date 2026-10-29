"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

/** Cursor personalizado (desktop com mouse). Cresce em links/imagens e mostra "Arraste". */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    document.body.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX); yTo(e.clientY);
      const t = e.target as HTMLElement;
      const drag = t.closest("[data-cursor='drag']");
      const hot = t.closest("a,button,[role='button'],input,textarea,select,summary,[data-cursor]");
      setLabel(drag ? "Arraste" : "");
      gsap.to(el, { scale: drag ? 3.2 : hot ? 2.2 : 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-5 w-5 items-center justify-center rounded-full border border-marsala bg-marsala/10 text-[0.28rem] uppercase tracking-widest text-marsala mix-blend-multiply [@media(pointer:fine)]:flex"
    >
      {label}
    </div>
  );
}
