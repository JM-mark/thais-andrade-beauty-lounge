---
name: Thaís Andrade Beauty Lounge
style: S08 Editorial Luxo (aquecido)
colors:
  ivory: "#F7F2EC"
  nude: "#E9DCD0"
  marsala: "#7A2E3A"
  wine: "#4A1C24"
  rosegold: "#C79A86"
  ink: "#1E1517"
  ink-soft: "#5A4A4C"
typography:
  display: { family: "Cormorant Garamond", weight: 400, style: "serif de alto contraste", size: "clamp(2.75rem, 9vw, 8.75rem)", lineHeight: 0.95 }
  body: { family: "Jost", weight: 300-400, size: "1rem", lineHeight: 1.65 }
  script: { family: "Pinyon Script", use: "uma palavra por seção" }
  eyebrow: { family: "Jost", size: "0.72rem", tracking: "0.28em", case: upper }
spacing: { section: "clamp(5rem, 12vw, 10rem)", gutter: "clamp(1.25rem, 5vw, 4rem)" }
rounded: { arch: "999px 999px 0 0", pill: "999px", card: "1.5rem" }
motion: { ease: "cubic-bezier(.22,1,.36,1)", reveal: "0.9s", stagger: "0.08s" }
---

## Overview
Revista de noivas: muito respiro, serifa grande, fotos de tela cheia, hairlines rose gold. Acolhedor e feminino, nunca frio.

## Colors
Fundo marfim, texto tinta. Marsala para CTAs e destaques (contraste 8,6:1 sobre marfim). Vinho escuro para a seção Dia da Noiva (texto marfim, 14:1). Rose gold só decorativo (linhas, traços, brilho), nunca texto pequeno.

## Typography
Display Cormorant Garamond com itálico para a segunda metade dos títulos. Jost fina para corpo. Pinyon Script no máximo uma vez por seção. Eyebrows em versal espaçada.

## Layout
Gutter fluido, seções com respiro grande, grid de 12 colunas no desktop. Celular primeiro (390px). Sem rolagem horizontal da página.

## Elevation & Depth
Sem sombras pesadas. Profundidade por sobreposição de fotos, parallax e hairlines. Sombra única: `0 20px 60px -30px rgba(74,28,36,.35)`.

## Shapes
Arcos (topo arredondado) para fotos e cards de equipe; pílulas para botões; hairlines de 1px.

## Components
Botão primário marsala preenchido, secundário contorno. Pílula de menu. Cards de serviço com foto em arco. Stepper com barra rose gold.

## Motion
Reveal por máscara linha a linha, Ken Burns lento no hero, marquee reativo ao scroll, pin nas cenas de serviços e timeline. Lenis para scroll. Tudo desligado com `prefers-reduced-motion`.

## Do's and Don'ts
- Faça: fotos grandes, frases curtas, TODO visível no código para o que depende do salão.
- Não faça: inventar depoimentos/números/preços, gradiente roxo, emojis como ícones, promessas de resultado em estética.

## Fotografia
Somente fotos reais do salão (Google Maps "Pelo proprietário" e Instagram). Tratamento único aplicado em `scripts/process-photos.mjs`: calor sutil, saturação 0,92, contraste +4% e leve fade nos pretos, para parecer um ensaio só sem esconder que é o salão real. Até 14 fotos no site, sem repetição entre seções. Sem foto de qualidade, a seção usa tipografia (número grande, monograma ou cartões de texto), nunca foto de banco. Equipe em cards tipográficos.
