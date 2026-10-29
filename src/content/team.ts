export type Member = { id: string; name: string; role: string };

// Todos os pedidos de agendamento vão para um único WhatsApp (src/config.ts); não há link por profissional.
// `role` vazio não aparece no site. TODO confirmar a especialidade de cada profissional com o salão.
export const team: Member[] = [
  { id: "thais", name: "Thaís Andrade", role: "Fundadora" },
  { id: "tati", name: "Tati", role: "" },
  { id: "cassiana", name: "Cassiana Melo", role: "" },
];
// TODO confirmar se Franciele (sobrancelhas) faz parte da equipe
