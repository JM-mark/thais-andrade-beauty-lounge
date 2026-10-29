import { SITE, wa } from "@/config";

export type Booking = {
  services: string[];
  date: string; // yyyy-mm-dd
  time: string;
  name: string;
  phone: string;
  notes: string;
  weddingDate?: string;
  people?: string;
};

const WD = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function prettyDate(iso: string) {
  const d = parseDate(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${WD[d.getDay()]}, ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function maskPhone(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return n ? `(${n}` : "";
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 3)} ${n.slice(3, 7)}-${n.slice(7)}`;
}

export function buildMessage(b: Booking) {
  const lines = [
    "Olá! Gostaria de agendar pelo site 💐",
    `*Serviço:* ${b.services.join(" + ")}`,
    `*Data:* ${prettyDate(b.date)} às ${b.time}`,
  ];
  if (b.weddingDate) lines.push(`*Data do casamento:* ${prettyDate(b.weddingDate)}`);
  if (b.people) lines.push(`*Pessoas se arrumando:* ${b.people}`);
  lines.push(`*Nome:* ${b.name}`, `*WhatsApp:* ${b.phone}`);
  if (b.notes.trim()) lines.push(`*Obs.:* ${b.notes.trim()}`);
  lines.push("(Pedido de agendamento: aguardo a confirmação do horário.)");
  return lines.join("\n");
}

export function whatsappUrl(b: Booking) {
  // Todos os pedidos vão para um único número (SITE.WHATSAPP_NUMBER). Sem número, abre o Linktree do salão.
  if (SITE.WHATSAPP_NUMBER) return wa(buildMessage(b));
  return SITE.linktree;
}

export function buildIcs(b: Booking) {
  const [h, mi] = b.time.split(":").map(Number);
  const d = parseDate(b.date);
  const f = (dt: Date) =>
    `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, "0")}${String(dt.getDate()).padStart(2, "0")}T${String(dt.getHours()).padStart(2, "0")}${String(dt.getMinutes()).padStart(2, "0")}00`;
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi);
  const end = new Date(start.getTime() + 90 * 60000);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Thais Andrade Beauty Lounge//PT-BR", "BEGIN:VEVENT",
    `UID:${Date.now()}@thaisandrade`, `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${b.services.join(" + ")} (pedido) - ${SITE.name}`,
    `LOCATION:${SITE.address}`,
    "DESCRIPTION:Pedido de agendamento. Aguardando confirmação pelo WhatsApp.",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export function sendWebhook(b: Booking) {
  if (!SITE.bookingWebhook) return;
  try {
    fetch(SITE.bookingWebhook, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...b, source: "site", createdAt: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
