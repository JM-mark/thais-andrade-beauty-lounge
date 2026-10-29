# Automação do agendamento

Hoje o fluxo termina no WhatsApp (sem backend). Para registrar cada pedido também na agenda, configure um webhook.

## Webhook opcional

Defina `NEXT_PUBLIC_BOOKING_WEBHOOK_URL` (n8n, Make ou similar). O site faz um `POST` com `fetch` (`keepalive`) **sem bloquear** a abertura do WhatsApp, e ignora falhas.

Corpo JSON:

```json
{
  "services": ["Cabelo", "Maquiagem"],
  "pro": "Tati",
  "date": "2026-11-14",
  "time": "10:00",
  "name": "Maria Silva",
  "phone": "(19) 9 9999-9999",
  "notes": "",
  "weddingDate": "2027-03-20",
  "people": "4",
  "source": "site",
  "createdAt": "2026-10-29T18:00:00.000Z"
}
```

## Sugestão de fluxo (n8n/Make)

1. Webhook recebe o pedido.
2. Cria evento **provisório** no Google Agenda (título "PEDIDO: serviço, nome").
3. Notifica o salão (WhatsApp Business API ou e-mail).
4. Quando o salão confirmar, remove "PEDIDO" do título.

O webhook roda no navegador, então a URL fica pública. Use um endpoint que só aceite esse formato e limite abusos.

## Disponibilidade real

`src/lib/availability.ts` é um mock. Troque `slotsFor` por uma consulta à agenda (por exemplo, uma função que lê horários livres do Google Agenda via o mesmo n8n/Make).
