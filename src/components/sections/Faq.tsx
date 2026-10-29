"use client";

import { useState } from "react";
import { faq } from "@/content/faq";
import { SectionHead } from "../SectionHead";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section wrap grid12 gap-y-12">
      <div className="col-span-12 lg:col-span-5">
        <SectionHead label="Dúvidas" title={[<>Perguntas</>, <><em>frequentes</em></>]} />
      </div>
      <div className="col-span-12 lg:col-span-7">
        {faq.map((f, i) => {
          const o = open === i;
          return (
            <div key={f.q} className="border-t border-rosegold/60 last:border-b">
              <h3>
                <button aria-expanded={o} aria-controls={`faq-${i}`} onClick={() => setOpen(o ? null : i)}
                  className="flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl sm:text-3xl">
                  {f.q}
                  <span aria-hidden="true" className={`text-3xl text-marsala transition-transform duration-500 ${o ? "rotate-45" : ""}`}>+</span>
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-hidden={!o} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-lux)] ${o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden"><p className="max-w-xl pb-6 text-[1.0625rem] text-ink-soft">{f.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
