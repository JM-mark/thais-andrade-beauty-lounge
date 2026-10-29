import type { PhotoKey } from "./photos";

export type Service = {
  id: string;
  name: [string, string]; // [linha 1, linha 2 em itálico]
  short: string;
  desc: string;
  photo: PhotoKey;
  confirmed: boolean; // TODO confirmar com o salão quando false
  noiva?: boolean;
};

export const services: Service[] = [
  { id: "dia-da-noiva", name: ["Dia da", "Noiva"], short: "Dia da Noiva", noiva: true, confirmed: true, photo: "heroBride",
    desc: "Penteado, maquiagem e preparação com atenção a cada detalhe. Cuidamos também da mãe e das madrinhas." },
  { id: "cabelos", name: ["Corte &", "escova"], short: "Cabelos", confirmed: true, photo: "waves",
    desc: "Corte, escova, tratamentos e nutrição capilar para o cabelo que você quer ter." },
  { id: "coloracao", name: ["Coloração", "& mechas"], short: "Coloração & Mechas", confirmed: true, photo: "blonde",
    desc: "Mechas, morena iluminada e coloração com cuidado para manter o cabelo saudável." },
  { id: "maquiagem", name: ["Maquiagem", "social"], short: "Maquiagem", confirmed: true, photo: "makeup",
    desc: "Para festas, eventos e noivas. Acabamento leve, feito para durar a noite toda." },
  { id: "sobrancelhas", name: ["Design de", "sobrancelhas"], short: "Sobrancelhas", confirmed: true, photo: "brow",
    desc: "Design pensado para o formato do seu rosto. Um dos serviços mais elogiados nas avaliações." },
  { id: "estetica", name: ["Estética &", "drenagem"], short: "Estética & Drenagem", confirmed: false, photo: "mask",
    desc: "Drenagem linfática e tratamentos corporais. Protocolos faciais e de autocuidado sob avaliação." }, // TODO confirmar protocolos
];

// Opções extras no agendamento
export const extraServices = [
  { id: "unhas", short: "Unhas", confirmed: false }, // TODO não confirmado
  { id: "avaliacao", short: "Avaliação / orçamento", confirmed: true },
];
