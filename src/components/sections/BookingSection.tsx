"use client";

import dynamic from "next/dynamic";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../motion";
import { useBooking } from "../BookingProvider";
import { team } from "@/content/team";

// O stepper (e o framer-motion) carrega sob demanda, depois da hidratação.
const BookingFlow = dynamic(() => import("../BookingFlow").then((m) => m.BookingFlow), {
  ssr: false,
  loading: () => <div className="min-h-[26rem]" aria-busy="true" />,
});

/** Faixa "Quem cuida de você" (a antiga seção Equipe) + o agendamento. */
export function BookingSection() {
  const { openBooking } = useBooking();
  return (
    <section id="agendar" className="section">
      <div className="wrap">
        <div id="equipe" className="mb-[calc(var(--section)*0.6)]">
          <h2 className="label mb-8">Quem cuida de você</h2>
          <div className="grid gap-x-8 gap-y-10 border-t border-rosegold/60 pt-8 sm:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} className="flex flex-col items-start gap-5">
                <h3 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[0.95]">{m.name}</h3>
                <p className="eyebrow -mt-2 min-h-[1.2em]">{m.role}</p>
                <button className="btn btn-ghost" onClick={() => openBooking({ pro: m.id })}>Agendar com ela</button>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead label="Agendamento online" title={[<>Peça seu</>, <><em>horário</em></>]}
              lead="Escolha serviço, profissional e data. Ao final, abrimos o WhatsApp do salão com o pedido pronto. O salão confirma o horário com você." />
          </div>
          <Reveal className="col-span-12 rounded-[2rem] border border-rosegold/50 bg-ivory p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
            <BookingFlow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
