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

## Revisão 2: logo, grid e ritmo
- **Logo oficial** (monograma "TA" com mecha de cabelo, marsala metálico): `public/brand/` (originais) e `public/brand/web/` (leves). Header desktop: horizontal 44 px; celular: só o monograma (40 px). Fundos vinho (Noiva, footer) usam as versões `-claro`. Não redesenhar nem vetorizar. Extraída de um print do WhatsApp: pedir o original à cliente.
- **Container e grid:** um único container de 1240 px, gutters 24/48 px, grid de 12 colunas (`.wrap`, `.grid12`). Espaço entre seções `clamp(88px, 12vw, 160px)`. Cabeçalho de seção único (`SectionHead`): rótulo com traço + título serif + apoio, à esquerda.
- **Ritmo de fundos:** Hero marfim → Marquee marfim → Manifesto marfim → Serviços nude → Noiva vinho (única seção escura) → Espaço nude → Avaliações + Instagram marfim → Agendamento marfim → FAQ marfim → Localização marfim → Footer vinho.
- **Formas:** arco só no hero e na galeria do espaço; vitrine, Instagram e fachada em retângulos de 24/16 px.
- **Botão único:** pílula, Jost 500, 13 px, caixa alta, tracking 0,14em, 52 px de altura.
- **Intro:** logo completa com brilho metálico (900 ms), cortina sobe; ≤ 1,2 s, só na primeira visita da sessão e só se a página carregou rápido. O hero é pré-carregado em paralelo e a revelação dele é CSS.

## Revisão 3: motion e regras novas
- **Hero:** vídeo de fundo em tela cheia (cabelo sendo escovado, sem rosto), loop sem emenda, véu marfim da esquerda (opaco) para a direita (transparente) com contraste AA, grão leve. Pausa fora da tela e com a aba oculta; reduced-motion/saveData: só o poster. Ao rolar: zoom 1 → 1.08 e leve escurecimento.
- **Marquee:** Jost 500 13px, caixa alta, tracking 0,3em, tinta a 70%, losango rose gold de 5px, hairlines, ~64px, 45s por ciclo constante, pausa no hover, fades de 80px; parado e centralizado com reduced-motion. Só CSS.
- **Espaço:** bento alinhado ao container (foto de maior resolução grande, 5/12 em 2 linhas), cantos de 20px, gap de 16px, legenda dentro da foto; celular: carrossel com snap e pontinhos. Sem arcos (arcos só no hero antigo; hoje não há).
- **Cursor:** 1 elemento fixed, translate3d em rAF (lerp 0,18), sem setState no movimento; ponto 8px, anel 44px em links/botões, disco 72px "Arraste"; cursor nativo em campos, calendário, agendamento e modal; desligado sem hover, com reduced-motion e abaixo de 1024px.
- **Avaliação:** nunca citar o número de avaliações; só "5 estrelas".
- **Agendamento:** sem escolha de profissional; os nomes ficam na faixa "Quem cuida de você" (sem botões). Pedido sempre para o WhatsApp único.
- **Intro:** só na primeira visita da sessão; logo oficial pequena (para não virar o LCP) com brilho metálico e cortina.
