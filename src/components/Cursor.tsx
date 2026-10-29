"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor personalizado, feito para não competir com Lenis/ScrollTrigger:
 * - um único elemento fixed movido só com transform: translate3d dentro de um requestAnimationFrame (lerp 0,18);
 * - nenhum setState do React no movimento: os estados são atributos data-* escritos direto no DOM;
 * - pointermove passivo no window; estados por delegação (pointerover), sem listeners por elemento;
 * - o loop de rAF só roda enquanto o cursor ainda está chegando ao alvo.
 * Desligado em telas sem hover, com prefers-reduced-motion e abaixo de 1024px.
 */
const MEDIA = "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const NATIVE = "input, textarea, select, iframe, [data-native-cursor], [role='dialog']";
const LINK = "a, button, [role='button'], [role='radio'], label, summary, [data-cursor='link']";

function start(c: HTMLDivElement) {
  const root = document.documentElement;
  root.classList.add("has-cursor");
  const label = c.querySelector<HTMLElement>(".cursor-label")!;
  let tx = 0, ty = 0, x = 0, y = 0;
  let raf = 0, running = false, visible = false, placed = false, nativeZone = false;

  const paint = () => { c.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    paint();
    if (Math.abs(tx - x) > 0.15 || Math.abs(ty - y) > 0.15) raf = requestAnimationFrame(tick);
    else running = false;
  };
  const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
  const setVisible = (v: boolean) => { if (v !== visible) { visible = v; c.dataset.visible = v ? "1" : "0"; } };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    tx = e.clientX; ty = e.clientY;
    if (!placed) { x = tx; y = ty; paint(); placed = true; } // aparece já no lugar, sem "voar" do canto
    setVisible(!nativeZone);
    kick();
  };
  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null;
    if (!t || !t.closest) return;
    nativeZone = !!t.closest(NATIVE);
    if (nativeZone) { setVisible(false); return; }
    const state = t.closest("[data-cursor='drag']") ? "drag" : t.closest(LINK) ? "link" : "dot";
    if (c.dataset.state !== state) {
      c.dataset.state = state;
      label.textContent = state === "drag" ? "Arraste" : "";
    }
    if (placed) setVisible(true);
  };
  const hide = () => setVisible(false);
  const onOut = (e: PointerEvent) => { if (!e.relatedTarget) hide(); };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  document.documentElement.addEventListener("mouseleave", hide);
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", hide);

  return () => {
    cancelAnimationFrame(raf);
    root.classList.remove("has-cursor");
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerout", onOut);
    document.documentElement.removeEventListener("mouseleave", hide);
    window.removeEventListener("blur", hide);
    document.removeEventListener("visibilitychange", hide);
    setVisible(false);
  };
}

export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia(MEDIA);
    let stop: (() => void) | undefined;
    const apply = () => {
      stop?.(); stop = undefined;
      if (mq.matches && el.current) stop = start(el.current);
    };
    apply();
    mq.addEventListener("change", apply); // reavalia ao redimensionar / mudar preferências
    return () => { mq.removeEventListener("change", apply); stop?.(); };
  }, []);
  return (
    <div ref={el} className="cursor" data-state="dot" data-visible="0" aria-hidden="true">
      <span className="cursor-label" />
    </div>
  );
}
