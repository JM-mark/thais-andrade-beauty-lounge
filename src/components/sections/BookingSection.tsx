"use client";

import { BookingFlow } from "../BookingFlow";
import { MaskLines, Reveal } from "../motion";

export function BookingSection() {
  return (
    <section id="agendar" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Agendamento online</p>
          <MaskLines className="h2" lines={[<>Peça seu</>, <><em>horário</em></>]} />
          <Reveal className="mt-6 max-w-sm text-lg text-ink-soft">
            Escolha serviço, profissional e data. Ao final, abrimos o WhatsApp do salão com o pedido pronto. O salão confirma o horário com você.
          </Reveal>
        </div>
        <Reveal className="rounded-[2rem] border border-rosegold/50 bg-ivory p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:col-span-7">
          <BookingFlow />
        </Reveal>
      </div>
    </section>
  );
}
