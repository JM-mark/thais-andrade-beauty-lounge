"use client";

import dynamic from "next/dynamic";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../motion";
import { team } from "@/content/team";

// O stepper (e o framer-motion) carrega sob demanda, depois da hidratação.
const BookingFlow = dynamic(() => import("../BookingFlow").then((m) => m.BookingFlow), {
  ssr: false,
  loading: () => <div className="min-h-[20rem]" aria-busy="true" />,
});

/** Faixa "Quem cuida de você" (só os nomes) + agendamento. O pedido chega no WhatsApp único do salão. */
export function BookingSection() {
  return (
    <section id="agendar" className="section">
      <div className="wrap">
        <div id="equipe" className="mb-[calc(var(--section)*0.6)]">
          <h2 className="label mb-8">Quem cuida de você</h2>
          <ul className="grid gap-x-8 gap-y-6 border-t border-rosegold/60 pt-8 sm:grid-cols-3">
            {team.map((name, i) => (
              <Reveal as="li" key={name} delay={i * 0.08}>
                <span className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[0.95]">{name}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="grid12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead label="Agendamento online" title={[<>Peça seu</>, <><em>horário</em></>]}
              lead="Escolha o serviço e a data. Ao final, abrimos o WhatsApp do salão com o pedido pronto. O salão confirma o horário com você." />
          </div>
          <Reveal className="col-span-12 rounded-[2rem] border border-rosegold/50 bg-ivory p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
            <div data-native-cursor>
              <BookingFlow />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
