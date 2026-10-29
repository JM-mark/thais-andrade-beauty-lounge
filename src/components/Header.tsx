"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Magnetic } from "./motion";
import { useBooking } from "./BookingProvider";
import { getLenis } from "@/lib/gsap";
import { has, spaceGallery } from "@/content/photos";

const links = [
  ["Serviços", "#servicos"],
  ["Dia da Noiva", "#noiva"],
  ["Equipe", "#equipe"],
  ...(spaceGallery.some((g) => has(g.key)) ? ([["O espaço", "#espaco"]] as const) : []),
  ["Avaliações", "#avaliacoes"],
  ["Agendar", "#agendar"],
  ["Onde estamos", "#local"],
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openBooking } = useBooking();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    getLenis()?.stop();
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); btn.current?.focus(); } };
    document.addEventListener("keydown", esc);
    return () => { getLenis()?.start(); document.removeEventListener("keydown", esc); };
  }, [menu]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${solid && !menu ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(199,154,134,.5)]" : ""}`}>
        <div className="wrap flex h-[4.5rem] items-center justify-between">
          <a href="#topo" aria-label="Thaís Andrade Beauty Lounge, início" className={menu ? "text-ivory" : "text-ink"}><Logo compact /></a>
          <div className="flex items-center gap-2.5">
            <button ref={btn} onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="menu-overlay"
              className={`btn !min-h-[2.6rem] !px-5 ${menu ? "btn-ghost !border-ivory !text-ivory" : "btn-ghost"} ${!solid && !menu ? "!bg-ivory/55 backdrop-blur" : ""}`}>
              {menu ? "Fechar" : "Menu"}
            </button>
            <Magnetic><button className="btn btn-primary !min-h-[2.6rem] !px-5" onClick={() => openBooking()}>Agendar</button></Magnetic>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.nav id="menu-overlay" aria-label="Menu principal" data-lenis-prevent
            className="on-dark fixed inset-0 z-[75] flex flex-col justify-center bg-wine px-[var(--gutter)] pt-20"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <ul className="space-y-1">
              {links.map(([label, href], i) => (
                <li key={href} className="overflow-hidden">
                  <motion.a href={href} onClick={() => setMenu(false)}
                    className="block font-display text-[clamp(2.4rem,9vw,5rem)] leading-[1.1] text-ivory transition-colors hover:text-rosegold"
                    initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                    <span className="mr-4 align-middle text-xs tracking-[0.3em] text-rosegold">0{i + 1}</span>{label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
