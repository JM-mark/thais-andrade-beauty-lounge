"use client";

import { useState } from "react";
import { photos, type PhotoKey } from "@/content/photos";
import { SITE } from "@/config";

type Props = {
  name?: PhotoKey;
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  small?: boolean; // usa a versão de 800px quando existir
  objectPosition?: string;
};

const withBase = (u: string) => (u.startsWith("/") ? `${SITE.basePath}${u}` : u);

/** Foto real com fallback: se faltar ou falhar, mostra um placeholder nude (nunca foto de banco). */
export function Photo({ name, src, alt, className = "", imgClassName = "", priority = false, small = false, objectPosition }: Props) {
  const [failed, setFailed] = useState(false);
  const p = name ? photos[name] : undefined;
  const raw = src ?? (small ? p?.src800 : undefined) ?? p?.src ?? "";
  const url = raw ? withBase(raw) : "";
  const label = alt ?? p?.alt ?? "";
  const missing = !url || failed;
  return (
    <div
      className={`relative overflow-hidden bg-nude ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg,#efe3d8,#e0cdbf 55%,#d8bfae)" }}
      role={missing ? "img" : undefined}
      aria-label={missing ? label : undefined}
    >
      {!missing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          style={objectPosition ? { objectPosition } : undefined}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
