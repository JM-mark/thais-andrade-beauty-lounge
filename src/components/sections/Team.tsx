"use client";

import { team } from "@/content/team";
import { MaskLines, Reveal } from "../motion";
import { useBooking } from "../BookingProvider";

/** Cards tipográficos: sem fotos nem arcos vazios. A especialidade só aparece quando confirmada. */
function Card({ m, i }: { m: (typeof team)[number]; i: number }) {
  const { openBooking } = useBooking();
  return (
    <Reveal delay={i * 0.1} className="flex flex-col border-t border-rosegold/70 pt-6">
      <span className="eyebrow">0{i + 1}</span>
      <h3 className="mt-6 font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.95]">{m.name}</h3>
      {m.role && <p className="eyebrow mt-3">{m.role}</p>}
      <div className="mt-10"><button className="btn btn-ghost" onClick={() => openBooking({ pro: m.id })}>Agendar com ela</button></div>
    </Reveal>
  );
}

export function Team() {
  return (
    <section id="equipe" className="section wrap">
      <p className="eyebrow mb-4">Equipe</p>
      <MaskLines className="h2 mb-14 max-w-3xl" lines={[<>Quem cuida</>, <>de você <em>de verdade</em></>]} />
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => <Card key={m.id} m={m} i={i} />)}
      </div>
    </section>
  );
}
