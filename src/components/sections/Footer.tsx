import Link from "next/link";
import { Logo } from "../Logo";
import { SITE } from "@/config";

export function Footer() {
  return (
    <footer className="on-dark bg-wine pb-28 pt-20 text-ivory lg:pb-12">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-ivory [&_svg]:text-rosegold" />
            <p className="mt-6 font-display text-5xl italic">{SITE.slogan}</p>
          </div>
          <nav aria-label="Rodapé" className="grid gap-2 lg:col-span-3">
            {[["Serviços", "/#servicos"], ["Dia da Noiva", "/#noiva"], ["Equipe", "/#equipe"], ["Agendar", "/#agendar"], ["Privacidade", "/privacidade/"]].map(([l, h]) => (
              <Link key={h} href={h} className="w-fit hover:text-rosegold">{l}</Link>
            ))}
          </nav>
          <div className="space-y-2 text-nude lg:col-span-4">
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
