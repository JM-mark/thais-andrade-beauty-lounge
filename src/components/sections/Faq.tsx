"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faq } from "@/content/faq";
import { MaskLines } from "../motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section wrap grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow mb-4">Dúvidas</p>
        <MaskLines className="h2" lines={[<>Perguntas</>, <><em>frequentes</em></>]} />
      </div>
      <div className="lg:col-span-7">
        {faq.map((f, i) => {
          const o = open === i;
          return (
            <div key={f.q} className="border-t border-rosegold/60 last:border-b">
              <h3>
                <button aria-expanded={o} aria-controls={`faq-${i}`} onClick={() => setOpen(o ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl sm:text-3xl">
                  {f.q}
                  <span aria-hidden="true" className={`text-3xl text-marsala transition-transform duration-500 ${o ? "rotate-45" : ""}`}>+</span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {o && (
                  <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-ink-soft">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
