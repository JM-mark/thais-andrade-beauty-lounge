"use client";

import { useEffect, useRef } from "react";
import { MaskLines, Magnetic } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, prefersReduced } from "@/lib/gsap";
import { wa, asset } from "@/config";

export const HERO_POSTER = { desktop: "/hero/poster-d.jpg", mobile: "/hero/poster-m.jpg" };

type Conn = { saveData?: boolean; effectiveType?: string };

/**
 * Hero com fundo em vídeo (cabelo sendo escovado, em loop sem emenda, sem rosto).
 * - O poster (o quadro em que o loop começa) é pintado no HTML e pré-carregado: é ele o LCP, não o vídeo.
 * - O vídeo só é escolhido e baixado no cliente: WebM/MP4, 1080p no desktop e 720x1280 no celular.
 * - Pausa fora da tela (IntersectionObserver) e com a aba oculta. Com prefers-reduced-motion ou economia de dados,
 *   fica só o poster.
 * - Ao rolar: zoom 1 → 1.08 e leve escurecimento, para a transição até o marquee.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const v = video.current, section = root.current;
    if (!v || !section) return;
    const cleanups: Array<() => void> = [];

    // Vídeo (só se o visitante permite movimento e não está economizando dados)
    const conn = (navigator as unknown as { connection?: Conn }).connection;
    const slow = !!conn && (conn.saveData || conn.effectiveType === "2g" || conn.effectiveType === "slow-2g" || conn.effectiveType === "3g");
    if (!prefersReduced() && !slow) {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const webm = v.canPlayType('video/webm; codecs="vp9"') !== "";
      v.src = asset(`/hero/hero-${mobile ? "m" : "d"}.${webm ? "webm" : "mp4"}`);
      v.addEventListener("playing", () => v.classList.add("is-on"), { once: true });
      let inView = true;
      const sync = () => { if (inView && !document.hidden) v.play().catch(() => {}); else v.pause(); };
      const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { threshold: 0.05 });
      io.observe(section);
      document.addEventListener("visibilitychange", sync);
      sync();
      cleanups.push(() => { io.disconnect(); document.removeEventListener("visibilitychange", sync); v.pause(); });
    }

    // Rolagem: zoom leve e escurecimento
    let ctx: gsap.Context | undefined;
    if (!prefersReduced()) {
      ctx = gsap.context(() => {
        const st = { trigger: section, start: "top top", end: "bottom top", scrub: true };
        gsap.to(zoom.current, { scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(dark.current, { opacity: 0.3, ease: "none", scrollTrigger: st });
      }, section);
    }
    return () => { cleanups.forEach((f) => f()); ctx?.revert(); };
  }, []);

  return (
    <section id="topo" ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div ref={zoom} className="absolute inset-0 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={asset(HERO_POSTER.mobile)} />
          <img src={asset(HERO_POSTER.desktop)} width={1920} height={1080} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <video ref={video} className="hero-video absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
      </div>
      <div ref={dark} className="absolute inset-0 bg-ink opacity-0" aria-hidden="true" />
      <div className="hero-veil absolute inset-0" aria-hidden="true" />

      <div className="wrap relative z-10 flex h-full items-center pt-[4.5rem] max-md:items-end max-md:pb-10">
        <div className="max-w-[44rem]">
          <MaskLines as="h1" afterIntro className="display" lines={[<>Sua nova fase</>, <><em>começa</em> <span className="script text-[1.15em]">aqui</span>.</>]} />
          {/* Sem animação de entrada: é o primeiro conteúdo pintado (candidato a LCP), já no primeiro quadro */}
          <p className="mt-5 max-w-md text-[1.0625rem] text-ink">Dia da Noiva, cabelo, maquiagem e estética em Hortolândia.</p>
          <div className="hero-fade mt-7 flex flex-wrap gap-3 max-md:flex-col">
            <Magnetic><button className="btn btn-primary max-md:w-full" onClick={() => openBooking()}>Agendar horário</button></Magnetic>
            <Magnetic><a className="btn btn-ghost max-md:w-full" href={wa("Olá! Vim pelo site e gostaria de falar com o salão.")} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></Magnetic>
          </div>
          <p className="hero-fade mt-7 inline-flex items-center gap-2 rounded-full border border-rosegold/70 bg-ivory/55 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="tracking-[0.2em] text-marsala" aria-hidden="true">★★★★★</span> Avaliado com 5 estrelas no Google
          </p>
        </div>
      </div>
    </section>
  );
}
