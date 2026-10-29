"use client";

import { useEffect, type RefObject } from "react";
import { asset } from "@/config";
import type { PhotoEntry } from "@/content/photos";

export { asset };

/** srcset com 480 px, 900 px e a original (larguras reais, sem upscale). */
export const srcSetOf = (p: PhotoEntry) =>
  [p.wSm < p.wMd ? `${asset(p.srcSm)} ${p.wSm}w` : "", p.wMd < p.w ? `${asset(p.srcMd)} ${p.wMd}w` : "", `${asset(p.src)} ${p.w}w`].filter(Boolean).join(", ");

/** Baixa e decodifica as imagens; resolve mesmo se alguma falhar (nunca trava uma animação). */
export function decodeImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (u) =>
        new Promise<void>((res) => {
          const im = new Image();
          im.src = u;
          (im.decode ? im.decode() : Promise.resolve()).then(() => res(), () => res());
        }),
    ),
  ).then(() => undefined);
}

/** Pré-carrega as imagens quando a seção está a ~1 tela de distância. */
export function usePreloadNear(ref: RefObject<Element | null>, urls: string[]) {
  const key = urls.join("|");
  useEffect(() => {
    const el = ref.current;
    if (!el || !urls.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          decodeImages(urls);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ref]);
}
