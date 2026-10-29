"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { services, extraServices } from "@/content/services";
import { slotsFor, isDayClosed } from "@/lib/availability";
import { SITE } from "@/config";
import {
  buildIcs, buildMessage, maskPhone, prettyDate, sendWebhook, whatsappUrl, type Booking,
} from "@/lib/booking";

export type Preset = { service?: string };

const STEPS = ["Serviço", "Data e horário", "Seus dados"];
const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function BookingFlow({ preset, onClose, dark = false }: { preset?: Preset; onClose?: () => void; dark?: boolean }) {
  const allServices = [...services.map((s) => ({ id: s.id, short: s.short })), ...extraServices.map((s) => ({ id: s.id, short: s.short }))];
  const initialSvc = preset?.service ? [preset.service] : [];

  const [step, setStep] = useState(initialSvc.length ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [svc, setSvc] = useState<string[]>(initialSvc);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [wedding, setWedding] = useState("");
  const [people, setPeople] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [lgpd, setLgpd] = useState(false);
  const [sent, setSent] = useState<Booking | null>(null);
  const [month, setMonth] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); });

  const today = useMemo(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }, []);
  const isNoiva = svc.includes("dia-da-noiva");
  const slots = date ? slotsFor(new Date(date + "T00:00:00")) : [];

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(first.getDay()).fill(null), ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))] as (Date | null)[];
  }, [month]);

  const valid = [
    svc.length > 0,
    !!date && !!time,
    name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10 && lgpd,
  ][step];

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const toggleSvc = (id: string) => setSvc((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const confirm = () => {
    const b: Booking = {
      services: svc.map((id) => allServices.find((s) => s.id === id)!.short),
      date, time, name: name.trim(), phone, notes,
      weddingDate: isNoiva && wedding ? wedding : undefined,
      people: isNoiva && people ? people : undefined,
    };
    if (!SITE.WHATSAPP_NUMBER) {
      // Linktree não aceita texto pré-preenchido: copia a mensagem e avisa.
      navigator.clipboard?.writeText(buildMessage(b)).catch(() => {});
    }
    sendWebhook(b);
    setSent(b);
    window.open(whatsappUrl(b), "_blank", "noopener");
  };

  const downloadIcs = () => {
    if (!sent) return;
    const blob = new Blob([buildIcs(sent)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pedido-thais-andrade-beauty-lounge.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);

  if (sent) {
    return (
      <div className="relative py-6 text-center" role="status">
        <Confetti />
        <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20 text-marsala" aria-hidden="true">
          <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#C79A86" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          <motion.path d="M24 41 L35 52 L57 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
        </svg>
        <h3 className="mt-6 font-display text-4xl sm:text-5xl">Pedido <em>enviado</em></h3>
        <p className="mx-auto mt-3 max-w-md opacity-80">O salão confirma o horário com você pelo WhatsApp. Se a conversa não abriu, use o botão abaixo.</p>
        <dl className="mx-auto mt-8 max-w-md space-y-2 border-y border-rosegold/60 py-5 text-left text-[0.95rem]">
          {[["Serviço", sent.services.join(" + ")], ["Data", `${prettyDate(sent.date)} às ${sent.time}`], ["Nome", sent.name]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6"><dt className="eyebrow pt-1">{k}</dt><dd className="text-right">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a className="btn btn-primary" href={whatsappUrl(sent)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>
          <button className="btn btn-ghost" onClick={downloadIcs}>Adicionar à agenda</button>
        </div>
        {onClose && <button className="mt-6 text-sm underline underline-offset-4 opacity-70" onClick={onClose}>Fechar</button>}
      </div>
    );
  }

  return (
    <div className={dark ? "on-dark" : ""}>
      <div className="mb-8" aria-label={`Etapa ${step + 1} de 3`}>
        <div className="flex justify-between">
          {STEPS.map((s, i) => (
            <span key={s} className={`eyebrow !text-[0.62rem] sm:!text-[0.72rem] ${i === step ? "!text-marsala font-medium" : ""} ${i > step ? "opacity-50" : ""}`}>
              <span className="mr-1">0{i + 1}</span><span className="hidden sm:inline">{s}</span>
            </span>
          ))}
        </div>
        <div className="mt-3 h-px bg-ink/15"><motion.div className="h-px bg-rosegold" animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} /></div>
        <p className="mt-4 font-display text-3xl sm:hidden">{STEPS[step]}</p>
      </div>

      <div className="min-h-[14rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step} custom={dir}
            initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div>
                <p className="mb-4 opacity-75">Escolha um ou mais serviços.</p>
                <div className="flex flex-wrap gap-2.5">
                  {allServices.map((s) => (
                    <button key={s.id} type="button" className="chip" aria-pressed={svc.includes(s.id)} onClick={() => toggleSvc(s.id)}>{s.short}</button>
                  ))}
                </div>
              </div>
            )}


            {step === 1 && (
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <button type="button" aria-label="Mês anterior" disabled={!canPrev} className="chip !px-3 disabled:opacity-30" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
                    <span className="font-display text-2xl capitalize">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
                    <button type="button" aria-label="Próximo mês" className="chip !px-3" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {WEEK.map((w, i) => <span key={i} className="eyebrow py-1 !text-[0.65rem]">{w}</span>)}
                    {days.map((d, i) => {
                      if (!d) return <span key={i} />;
                      const off = d < today || isDayClosed(d);
                      const sel = iso(d) === date;
                      return (
                        <button key={i} type="button" disabled={off} aria-pressed={sel} aria-label={prettyDate(iso(d))}
                          onClick={() => { setDate(iso(d)); setTime(""); }}
                          className={`aspect-square rounded-full text-[0.95rem] transition-colors disabled:cursor-not-allowed disabled:opacity-25 ${sel ? "bg-marsala text-ivory" : "hover:bg-nude"}`}>
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs opacity-60">Domingos indisponíveis. {/* TODO confirmar dias */}</p>
                </div>
                <div>
                  <p className="eyebrow mb-3">Horário</p>
                  {date ? (
                    <div className="flex flex-wrap gap-2.5">
                      {slots.map((t) => <button key={t} type="button" className="chip" aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>)}
                    </div>
                  ) : <p className="opacity-60">Escolha uma data primeiro.</p>}
                  {isNoiva && (
                    <div className="mt-8 space-y-5">
                      <label className="block"><span className="eyebrow">Data do casamento</span>
                        <input type="date" className="field" min={iso(today)} value={wedding} onChange={(e) => setWedding(e.target.value)} /></label>
                      <label className="block"><span className="eyebrow">Quantas pessoas vão se arrumar (madrinhas, mãe…)</span>
                        <input type="number" inputMode="numeric" min={1} max={30} className="field" value={people} onChange={(e) => setPeople(e.target.value)} /></label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <label className="block"><span className="eyebrow">Nome</span>
                  <input className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label>
                <label className="block"><span className="eyebrow">WhatsApp</span>
                  <input className="field" inputMode="tel" autoComplete="tel" placeholder="(19) 9 9999-9999" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} /></label>
                <label className="block"><span className="eyebrow">Observações (opcional)</span>
                  <textarea className="field resize-none" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[#7A2E3A]" checked={lgpd} onChange={(e) => setLgpd(e.target.checked)} />
                  <span>Concordo em compartilhar meus dados com o salão para agendamento, conforme a <Link href="/privacidade/" className="underline underline-offset-4" target="_blank">política de privacidade</Link>.</span>
                </label>
                <p className="text-sm opacity-70">Isto é um pedido. O salão confirma o horário com você pelo WhatsApp.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)} style={{ visibility: step === 0 ? "hidden" : "visible" }}>Voltar</button>
        {step < 2
          ? <button type="button" className="btn btn-primary disabled:opacity-40" disabled={!valid} onClick={() => go(step + 1)}>Continuar</button>
          : <button type="button" className="btn btn-primary disabled:opacity-40" disabled={!valid} onClick={confirm}>Enviar pelo WhatsApp</button>}
      </div>
    </div>
  );
}

function Confetti() {
  const dots = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 h-40" aria-hidden="true">
      {dots.map((i) => {
        const a = (i / dots.length) * Math.PI * 2;
        return (
          <motion.span key={i} className="absolute left-1/2 top-10 h-1.5 w-1.5 rounded-full"
            style={{ background: i % 3 ? "#C79A86" : "#7A2E3A" }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: Math.cos(a) * (70 + (i % 4) * 22), y: Math.sin(a) * (60 + (i % 3) * 18) + 20, opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }} />
        );
      })}
    </div>
  );
}
