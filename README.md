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
| Equipe (só nomes; todo pedido vai para o WhatsApp único de `src/config.ts`) | `src/content/team.ts` |
| Fotos reais (Maps/Instagram do salão) | `src/content/photos.ts`, arquivos em `public/fotos/`; reprocessar com `node scripts/process-photos.mjs` |
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

Stepper em 3 etapas (serviço, data/horário, dados) que roda 100% no navegador. Ao confirmar, abre `wa.me/<número>?text=...` com a mensagem pronta. A interface sempre diz que é um **pedido**; o salão confirma pelo WhatsApp. Há botão "Adicionar à agenda" (`.ics`). Se `WHATSAPP_NUMBER` ficar vazio, o site copia a mensagem e abre o Linktree do salão.

## Lista de TODOs que dependem do salão

- Logo em alta resolução (substituir o wordmark provisório; o `public/og.jpg` é um recorte da foto da noiva e pode ser refeito com o hero final)
- Fotos em resolução original do espaço, da equipe e dos trabalhos (hoje vêm do Google Maps e do Instagram do salão, em tamanho reduzido)
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

## Origem das fotos

Todas as fotos do site foram retiradas do Google Maps (aba "Pelo proprietário") e do Instagram do próprio salão. Não há fotos de banco. Cada foto está listada em `src/content/photos.ts` com `fonte` e link do post.

**Fotos de clientes retiradas do Instagram/Google do salão. Confirmar autorização antes da publicação oficial.**

Hero tipográfico: a melhor foto de noiva disponível tem 1200 px no lado menor (abaixo de 1400). Quando o salão enviar o original, defina `heroPhoto` em `src/components/sections/Hero.tsx`.
