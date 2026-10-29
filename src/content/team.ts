export type Member = { id: string; name: string; role: string; link: string };

// `role` vazio não aparece no site. TODO confirmar a especialidade de cada profissional com o salão.
export const team: Member[] = [
  { id: "thais", name: "Thaís Andrade", role: "Fundadora", link: "https://wa.me/message/EAIOSJBENPKQC1" },
  { id: "tati", name: "Tati", role: "", link: "https://wa.me/message/V3VYAPQYRDIEE1" },
  { id: "cassiana", name: "Cassiana Melo", role: "", link: "https://wa.me/message/TI65XNTOG5SFL1" },
];
// TODO confirmar se Franciele (sobrancelhas) faz parte da equipe
