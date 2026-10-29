"use client";

import { useRef } from "react";
import { team } from "@/content/team";
import { Monogram } from "../Logo";
import { MaskLines, Reveal } from "../motion";
import { useBooking } from "../BookingProvider";
import { gsap, prefersReduced } from "@/lib/gsap";

function Card({ m, i }: { m: (typeof team)[number]; i: number }) {
  const { openBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const tilt = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || prefersReduced()) return;
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 12, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, duration: 0.5, transformPerspective: 900, ease: "power3.out" });
  };
  const reset = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  return (
    <Reveal delay={i * 0.1} className="text-center">
      <div ref={ref} onPointerMove={tilt} onPointerLeave={reset} className="arch mx-auto flex aspect-[3/4] w-full max-w-[19rem] items-center justify-center bg-gradient-to-b from-nude to-[#d8bfae]">
        {/* TODO foto real da profissional */}
        <Monogram className="h-24 w-auto text-rosegold/70" />
      </div>
      <h3 className="mt-6 font-display text-3xl">{m.name}</h3>
      <p className="eyebrow mt-1">{m.role}</p>
      <button className="btn btn-ghost mt-5" onClick={() => openBooking({ pro: m.id })}>Agendar com ela</button>
    </Reveal>
  );
}

export function Team() {
  return (
    <section id="equipe" className="section wrap">
      <p className="eyebrow mb-4">Equipe</p>
      <MaskLines className="h2 mb-16 max-w-3xl" lines={[<>Quem cuida</>, <>de você <em>de verdade</em></>]} />
      <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => <Card key={m.id} m={m} i={i} />)}
      </div>
    </section>
  );
}
