"use client";

import { useState } from "react";
import { photos, type PhotoKey } from "@/content/photos";

type Props = {
  name?: PhotoKey;
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  width?: number;
};

/** Foto com fallback: se a imagem falhar, fica um placeholder nude com grão. */
export function Photo({ name, src, alt, className = "", imgClassName = "", priority = false, width }: Props) {
  const [failed, setFailed] = useState(false);
  const p = name ? photos[name] : undefined;
  let url = src ?? p?.src ?? "";
  if (width) url = url.replace(/w=\d+/, `w=${width}`);
  const label = alt ?? p?.alt ?? "";
  return (
    <div
      className={`relative overflow-hidden bg-nude ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg,#efe3d8,#e0cdbf 55%,#d8bfae)" }}
      role={failed ? "img" : undefined}
      aria-label={failed ? label : undefined}
    >
      {!failed && url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
