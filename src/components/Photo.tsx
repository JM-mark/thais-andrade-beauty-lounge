"use client";

import { useEffect, useRef, useState } from "react";
import { photos, type PhotoEntry, type PhotoKey } from "@/content/photos";
import { asset, srcSetOf } from "@/lib/images";

type Props = {
  name?: PhotoKey;
  entry?: PhotoEntry; // foto avulsa (ex.: capas do Instagram)
  className?: string;
  imgClassName?: string;
  priority?: boolean; // eager + fetchPriority alto
  sizes?: string;
  objectPosition?: string;
};

/**
 * Foto real com placeholder LQIP (blur), srcset e fade-in só depois de decode().
 * Sem foto ou com erro, mostra só o placeholder nude (nunca foto de banco).
 */
export function Photo({ name, entry, className = "", imgClassName = "", priority = false, sizes = "100vw", objectPosition }: Props) {
  const p = entry ?? (name ? photos[name] : undefined);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  const markReady = () => {
    const el = img.current;
    if (!el) return;
    (el.decode ? el.decode() : Promise.resolve()).catch(() => {}).then(() => setReady(true));
  };
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) markReady();
  }, []);

  const missing = !p || failed;
  return (
    <div
      className={`relative overflow-hidden bg-nude ${className}`}
      style={p?.lqip ? { backgroundImage: `url(${p.lqip})`, backgroundSize: "cover", backgroundPosition: objectPosition ?? "center" } : undefined}
      role={missing ? "img" : undefined}
      aria-label={missing ? p?.alt : undefined}
    >
      {!missing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={asset(p.srcMd)}
          srcSet={srcSetOf(p)}
          sizes={sizes}
          width={p.w}
          height={p.h}
          alt={p.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={markReady}
          onError={() => setFailed(true)}
          style={priority ? { objectPosition } : { objectPosition, opacity: ready ? 1 : 0, transition: "opacity .6s var(--ease-lux)" }}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
