"use client";

import { useSyncExternalStore } from "react";

const Q = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Substitui o hook do framer-motion para não carregar essa biblioteca no bundle inicial. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(Q).matches, () => false);
}
