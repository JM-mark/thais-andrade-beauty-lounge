import type { PhotoKey } from "./photos";

export type Service = {
  id: string;
  name: [string, string]; // [linha 1, linha 2 em itálico]
  short: string;
  desc: string;
  photo?: PhotoKey; // sem foto real disponível: o painel mostra o número grande
  confirmed: boolean; // TODO confirmar com o salão quando false
  noiva?: boolean;
};

// Textos em tom de convite; nada de promessa que o salão não confirmou.
export const services: Service[] = [
  { id: "dia-da-noiva", name: ["Dia da", "Noiva"], short: "Dia da Noiva", noiva: true, confirmed: true, photo: "noiva2",
    desc: "Penteado e maquiagem para o seu grande dia. Mãe e madrinhas também podem se arrumar com a gente. Consulte pelo WhatsApp." },
  { id: "cabelos", name: ["Corte &", "escova"], short: "Cabelos", confirmed: true, photo: "ondas1",
    desc: "Corte, escova e cuidados para o cabelo que você quer ter." },
  { id: "coloracao", name: ["Coloração", "& mechas"], short: "Coloração & Mechas", confirmed: true, photo: "mechas1",
    desc: "Mechas, morena iluminada e coloração. Fale com a gente para combinar o resultado ideal." },
  { id: "maquiagem", name: ["Maquiagem", "social"], short: "Maquiagem", confirmed: true, photo: "maquiagem1",
    desc: "Maquiagem para festas, eventos e noivas." },
  { id: "sobrancelhas", name: ["Design de", "sobrancelhas"], short: "Sobrancelhas", confirmed: true, photo: "sobrancelha1",
    desc: "Design de sobrancelhas, um dos serviços mais citados nas avaliações do salão." },
  { id: "estetica", name: ["Estética &", "drenagem"], short: "Estética & Drenagem", confirmed: false, photo: "esteticaMaca",
    desc: "Drenagem linfática e tratamentos corporais. Pergunte pelo WhatsApp quais protocolos estão disponíveis." }, // TODO confirmar protocolos
];

// Opções extras no agendamento
export const extraServices = [
  { id: "unhas", short: "Unhas", confirmed: false }, // TODO não confirmado
  { id: "avaliacao", short: "Avaliação / orçamento", confirmed: true },
];
