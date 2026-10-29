// TODO substituir pela logo oficial (public/brand/). Wordmark provisório: não redesenha a logo real.
type Props = { className?: string; stacked?: boolean; compact?: boolean };

export function Monogram({ className = "", draw = false, color = "currentColor" }: { className?: string; draw?: boolean; color?: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const dash = draw ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1, className: "ta-stroke" } : {};
  return (
    <svg viewBox="0 0 180 130" className={className} aria-hidden="true">
      <path d="M18 24 H86 M52 24 V108" {...common} {...dash} />
      <path d="M96 108 L128 24 L160 108 M107 80 H149" {...common} {...dash} />
      <path d="M134 10 C146 28 150 48 138 70" {...common} strokeWidth={2} {...dash} />
    </svg>
  );
}

export function Logo({ className = "", stacked = false, compact = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${stacked ? "flex-col text-center" : ""} ${className}`}>
      <Monogram className={stacked ? "h-14 w-auto text-marsala" : "h-9 w-auto text-marsala"} />
      <span className={`flex-col leading-none ${compact ? "hidden sm:flex" : "flex"}`}>
        <span className="font-display text-[1.05rem] tracking-[0.18em] uppercase">Thaís Andrade</span>
        <span className="mt-1 text-[0.58rem] tracking-[0.42em] uppercase">Beauty Lounge</span>
      </span>
    </span>
  );
}
