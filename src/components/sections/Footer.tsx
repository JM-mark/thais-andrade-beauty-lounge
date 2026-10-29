import Link from "next/link";
import { SITE, asset } from "@/config";

export function Footer() {
  return (
    <footer className="on-dark curve-top relative bg-wine pb-28 pt-20 text-ivory lg:pb-12">
      <div className="wrap">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            {/* Logo oficial em marfim (versão -claro) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/web/logo-thais-andrade-claro.png")} width={200} height={143} alt="Thaís Andrade Beauty Lounge" loading="lazy" className="h-auto w-[200px]" />
            <p className="mt-6 font-display text-5xl italic">{SITE.slogan}</p>
          </div>
          <nav aria-label="Rodapé" className="col-span-12 grid gap-2 sm:col-span-6 lg:col-span-3">
            {[["Serviços", "/#servicos"], ["Dia da Noiva", "/#noiva"], ["Agendar", "/#agendar"], ["Privacidade", "/privacidade/"]].map(([l, h]) => (
              <Link key={h} href={h} className="inline-flex min-h-11 w-fit items-center hover:text-rosegold">{l}</Link>
            ))}
          </nav>
          <div className="col-span-12 space-y-2 text-nude sm:col-span-6 lg:col-span-4">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-rosegold">{SITE.instagramHandle}</a>
            <p>{SITE.address}</p>
            <p>{SITE.phoneDisplay}</p>
          </div>
        </div>
        <hr className="hairline mt-16" />
        <p className="mt-6 text-sm text-nude">© 2026 Thaís Andrade Beauty Lounge</p>
      </div>
    </footer>
  );
}
