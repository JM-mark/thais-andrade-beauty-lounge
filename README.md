# Thaís Andrade Beauty Lounge: site prévia

Site institucional com agendamento online que termina no WhatsApp do salão.
Next.js (App Router) + TypeScript + Tailwind v4, export estático. Animações com GSAP/ScrollTrigger, Lenis e Framer Motion.

Direção de arte: `DESIGN.md` (tokens) e `docs/design-direction.md` (escolha S08 Editorial Luxo e pontuação).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera ./out
npm run lint
```

## Onde trocar cada coisa

| O quê | Onde |
|---|---|
| WhatsApp, endereço, horário, nota do Google, links | `src/config.ts` |
| Serviços e textos | `src/content/services.ts` |
| Equipe e links de agendamento | `src/content/team.ts` |
| Fotos (Unsplash na prévia) | `src/content/photos.ts` |
| FAQ | `src/content/faq.ts` |
| Dias e horários do agendamento (mock) | `src/lib/availability.ts` |
| Mensagem do WhatsApp e arquivo `.ics` | `src/lib/booking.ts` |
| Cores, fontes, espaçamentos | `src/app/globals.css` e `DESIGN.md` |
| Logo | `public/brand/` e `src/components/Logo.tsx` (wordmark provisório) |

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Vazio por padrão. No GitHub Pages: `/thais-andrade-beauty-lounge` |
| `NEXT_PUBLIC_SITE_URL` | Origem usada em metadados (OG, JSON-LD) |
| `NEXT_PUBLIC_BOOKING_WEBHOOK_URL` | Opcional. Veja `docs/automacao.md` |

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` faz o build com o basePath do repositório e publica em Pages a cada push na `main`. Em *Settings → Pages*, escolha **Source: GitHub Actions**.

## Deploy no Cloudflare Pages

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npm run build`
- Output directory: `out`
- `NEXT_PUBLIC_BASE_PATH`: deixar **vazio**
- `public/_headers` já define cache longo para `/_next/static/*`

## Como o agendamento funciona

Stepper em 4 etapas (serviço, profissional, data/horário, dados) que roda 100% no navegador. Ao confirmar, abre `wa.me/<número>?text=...` com a mensagem pronta. A interface sempre diz que é um **pedido**; o salão confirma pelo WhatsApp. Há botão "Adicionar à agenda" (`.ics`). Se `WHATSAPP_NUMBER` ficar vazio, o site copia a mensagem e abre o link do Linktree da profissional.

## Lista de TODOs que dependem do salão

- Logo em alta resolução (substituir o wordmark provisório e a imagem `public/og.jpg`, que é um cartão de texto provisório)
- Fotos reais do espaço, da equipe e dos trabalhos (hoje são do Unsplash)
- Confirmar que (19) 98717-2370 é o WhatsApp principal
- Horário de funcionamento e dias de atendimento (hoje: domingo fechado, horários mock)
- Especialidade de cada profissional; confirmar se Franciele faz parte da equipe
- Serviços marcados como não confirmados: estética facial/protocolos, unhas
- Etapas reais do Dia da Noiva (prova, planejamento etc.)
- Formas de pagamento, estacionamento, política de cancelamento e antecedência para noivas (FAQ)
- Trechos reais das avaliações do Google, com autorização (componente `Proof` pronto e vazio)
- Atualizar nota e número de avaliações do Google antes de publicar
- Revisar a política de privacidade (`/privacidade`) com assessoria jurídica
- Comparações de antes e depois só com casos reais autorizados
