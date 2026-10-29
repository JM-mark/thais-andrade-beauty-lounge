import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config";

export const metadata: Metadata = { title: "Política de Privacidade | Thaís Andrade Beauty Lounge", robots: { index: false } };

// TODO revisar com assessoria jurídica. Texto modelo (LGPD).
export default function Privacidade() {
  return (
    <main id="conteudo" className="wrap mx-auto max-w-3xl py-32">
      <Link href="/" className="eyebrow underline underline-offset-4">← Voltar ao site</Link>
      <h1 className="display mt-8 !text-[clamp(2.75rem,8vw,5rem)]">Política de <em>privacidade</em></h1>
      <div className="mt-10 space-y-6 text-lg text-ink-soft">
        <p>Esta página explica como o {SITE.name} trata os dados informados no formulário de agendamento, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
        <h2 className="font-display text-3xl text-ink">Quais dados coletamos</h2>
        <p>Nome, número de WhatsApp, serviço desejado, data e horário preferidos e observações que você escrever. No Dia da Noiva, também a data do casamento e o número de pessoas.</p>
        <h2 className="font-display text-3xl text-ink">Para que usamos</h2>
        <p>Apenas para receber seu pedido, confirmar o horário e atender você. Não vendemos nem compartilhamos seus dados com terceiros para publicidade.</p>
        <h2 className="font-display text-3xl text-ink">Como os dados chegam ao salão</h2>
        <p>Ao enviar o pedido, o site abre o WhatsApp com a mensagem pronta. A mensagem só é enviada quando você a envia. Este site não guarda seus dados em servidor próprio.</p>
        <h2 className="font-display text-3xl text-ink">Seus direitos</h2>
        <p>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo WhatsApp {SITE.phoneDisplay}.</p>
      </div>
    </main>
  );
}
