"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookingFlow, type Preset } from "./BookingFlow";
import { getLenis } from "@/lib/gsap";

/** Modal de agendamento (carregado sob demanda: framer-motion só baixa quando alguém clica em "Agendar"). */
export function BookingModal({ open, preset, nonce, onClose }: { open: boolean; preset?: Preset; nonce: number; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button:not([disabled]),a[href],input,textarea,select");
        if (!f.length) return;
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); getLenis()?.start(); document.documentElement.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[110] flex items-end justify-center bg-wine/60 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Agendar horário" data-lenis-prevent
            className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-ivory p-6 shadow-[0_20px_60px_-30px_rgba(74,28,36,.6)] outline-none sm:rounded-[2rem] sm:p-10"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-6 flex items-start justify-between">
              <div><p className="eyebrow">Agendamento online</p><h2 className="font-display text-4xl sm:text-5xl">Agende seu <em>horário</em></h2></div>
              <button onClick={onClose} aria-label="Fechar" className="chip !px-3.5 !py-2">✕</button>
            </div>
            <BookingFlow key={nonce} preset={preset} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
