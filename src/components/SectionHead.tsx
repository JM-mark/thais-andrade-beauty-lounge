import type { ReactNode } from "react";
import { MaskLines } from "./motion";

/** Cabeçalho padrão de seção: rótulo com traço + título serif + linha de apoio, sempre à esquerda. */
export function SectionHead({ label, title, lead, className = "" }: { label: string; title: ReactNode[]; lead?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="label">{label}</p>
      <MaskLines className="h2 mt-5 max-w-[16ch]" lines={title} />
      {lead && <p className="mt-6 max-w-md text-[1.0625rem] text-ink-soft">{lead}</p>}
    </div>
  );
}
