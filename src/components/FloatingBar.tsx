"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./BookingProvider";
import { wa } from "@/config";

/** Celular: barra fixa inferior só depois do hero. Desktop: botão flutuante de WhatsApp. */
export function FloatingBar() {
  const [show, setShow] = useState(false);
  const { openBooking } = useBooking();
  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;
    // Aparece quando o hero saiu da tela (e continua visível rolando para baixo).
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  const icon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z" /></svg>
  );
  return (
    <>
      <div className={`fixed inset-x-0 bottom-0 z-[70] flex gap-2 border-t border-rosegold/50 bg-ivory/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-500 lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
        <button className="btn btn-primary flex-1" onClick={() => openBooking()}>Agendar</button>
        <a className="btn btn-ghost flex-1" href={wa()} target="_blank" rel="noopener noreferrer">{icon} WhatsApp</a>
      </div>
      <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
        className={`fixed bottom-6 right-6 z-[70] hidden h-14 w-14 items-center justify-center rounded-full bg-marsala text-ivory shadow-[var(--shadow-soft)] transition-all duration-500 hover:bg-wine lg:flex ${show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}>
        {icon}
      </a>
    </>
  );
}
