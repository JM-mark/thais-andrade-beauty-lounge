// Mock de disponibilidade. Troque por consulta real (Google Agenda, n8n, etc.).
// TODO confirmar dias e horários de atendimento com o salão.
const SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export function isDayClosed(d: Date) {
  return d.getDay() === 0; // domingo fechado (TODO confirmar)
}

export function slotsFor(d: Date): string[] {
  if (isDayClosed(d)) return [];
  if (d.getDay() === 6) return SLOTS.slice(0, 3); // sábado reduzido (mock)
  return SLOTS;
}
