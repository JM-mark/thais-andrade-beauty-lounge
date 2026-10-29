"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Preset } from "./BookingFlow";

// O modal (e o framer-motion) só é baixado na primeira vez que alguém abre o agendamento.
const BookingModal = dynamic(() => import("./BookingModal").then((m) => m.BookingModal), { ssr: false });

const Ctx = createContext<{ openBooking: (p?: Preset) => void }>({ openBooking: () => {} });
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preset, setPreset] = useState<Preset | undefined>();
  const [nonce, setNonce] = useState(0);
  const last = useRef<HTMLElement | null>(null);

  const openBooking = useCallback((p?: Preset) => {
    last.current = document.activeElement as HTMLElement;
    setPreset(p); setNonce((n) => n + 1); setMounted(true); setOpen(true);
  }, []);
  const close = useCallback(() => { setOpen(false); last.current?.focus?.(); }, []);

  return (
    <Ctx.Provider value={{ openBooking }}>
      {children}
      {mounted && <BookingModal open={open} preset={preset} nonce={nonce} onClose={close} />}
    </Ctx.Provider>
  );
}
