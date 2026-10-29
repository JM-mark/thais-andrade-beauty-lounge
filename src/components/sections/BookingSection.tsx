"use client";

import dynamic from "next/dynamic";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../motion";

// O stepper (e o framer-motion) carrega sob demanda, depois da hidratação.
const BookingFlow = dynamic(() => import("../BookingFlow").then((m) => m.BookingFlow), {
  ssr: false,
  loading: () => <div className="min-h-[20rem]" aria-busy="true" />,
});

/** Agendamento: o pedido chega no WhatsApp único do salão, sem escolher profissional. */
export function BookingSection() {
  return (
    <section id="agendar" className="section">
      <div className="wrap grid12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead label="Agendamento online" title={[<>Peça seu</>, <><em>horário</em></>]}
            lead="Escolha o serviço e a data. Ao final, abrimos o WhatsApp do salão com o pedido pronto. O salão confirma o horário com você." />
        </div>
        <Reveal className="col-span-12 rounded-[2rem] border border-rosegold/50 bg-ivory p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
          <BookingFlow />
        </Reveal>
      </div>
    </section>
  );
}
