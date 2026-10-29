"use client";

import { useEffect, useState } from "react";

/** true somente no cliente e em telas ≥ 1024px (evita criar cenas fixas no celular). */
export function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}
