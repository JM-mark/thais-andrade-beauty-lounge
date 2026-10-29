"use client";

import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./motion";
import { useBooking } from "./BookingProvider";
import { getLenis } from "@/lib/gsap";
import { asset } from "@/lib/images";
import { has, spaceGallery } from "@/content/photos";

const links = [
  ["Serviços", "#servicos"],
  ["Dia da Noiva", "#noiva"],
  ...(spaceGallery.some((g) => has(g.key)) ? ([["O espaço", "#espaco"]] as const) : []),
  ["Avaliações", "#avaliacoes"],
  ["Agendar", "#agendar"],
  ["Onde estamos", "#local"],
] as const;

const ALT = "Thaís Andrade Beauty Lounge";

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

  const light = menu ? "-claro" : "";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${solid && !menu ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(199,154,134,.5)]" : ""}`}>
        <div className="wrap flex h-[4.5rem] items-center justify-between">
          <a href="#topo" aria-label={`${ALT}, início`} className="flex h-11 items-center">
            {/* Logo oficial: horizontal no desktop, só o monograma no celular */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(`/brand/web/logo-horizontal${light}.png`)} width={182} height={44} alt={ALT} fetchPriority="high" className="hidden h-11 w-auto sm:block" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(`/brand/web/logo-ta-monograma${light}.png`)} width={27} height={40} alt={ALT} fetchPriority="high" className="h-10 w-auto sm:hidden" />
          </a>
          <div className="flex items-center gap-2.5">
            <button ref={btn} onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="menu-overlay"
              className={`btn !h-11 !px-5 ${menu ? "btn-ghost !border-ivory !text-ivory" : "btn-ghost"} ${!solid && !menu ? "!bg-ivory/55 backdrop-blur" : ""}`}>
              {menu ? "Fechar" : "Menu"}
            </button>
            <Magnetic><button className="btn btn-primary !h-11 !px-5" onClick={() => openBooking()}>Agendar</button></Magnetic>
          </div>
        </div>
      </header>

      {/* Menu em tela cheia: só CSS (sem framer-motion no bundle inicial) */}
      <nav id="menu-overlay" aria-label="Menu principal" aria-hidden={!menu} inert={!menu} data-lenis-prevent
        className={`on-dark fixed inset-0 z-[75] flex flex-col justify-center bg-wine px-[var(--gutter)] pt-20 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${menu ? "visible [clip-path:inset(0_0_0%_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"}`}>
        <ul className="space-y-1">
          {links.map(([label, href], i) => (
            <li key={href} className="overflow-hidden">
              <a href={href} onClick={() => setMenu(false)}
                style={{ transitionDelay: menu ? `${250 + i * 70}ms` : "0ms" }}
                className={`block font-display text-[clamp(2.4rem,9vw,5rem)] leading-[1.1] text-ivory transition-[transform,color] duration-700 ease-[var(--ease-lux)] hover:text-rosegold ${menu ? "translate-y-0" : "translate-y-[110%]"}`}>
                <span className="mr-4 align-middle text-xs tracking-[0.3em] text-rosegold">0{i + 1}</span>{label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
