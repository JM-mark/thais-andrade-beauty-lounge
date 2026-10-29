// TODO substituir pelas fotos reais do salão (Instagram)
const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos = {
  heroBride: { src: u("photo-1536567307162-551e460b7fc2"), alt: "Noiva sorrindo ao lado de uma janela com luz suave" },
  brideBack: { src: u("photo-1643216583837-f6d664d48eac"), alt: "Noiva de costas em luz suave" },
  pearl: { src: u("photo-1672289444692-2bd3b48c5178"), alt: "Detalhe de brinco de pérola" },
  lace: { src: u("photo-1682226335318-f1911fdef7c1"), alt: "Costas com renda e cabelo preso em coque" },
  salon: { src: u("photo-1626383120723-2a941488860d"), alt: "Salão claro com espelhos em arco" },
  stylist: { src: u("photo-1695527081848-1e46c06e6458"), alt: "Cabeleireira atendendo uma cliente no salão" },
  counter: { src: u("photo-1759134155377-4207d89b39ec"), alt: "Bancada com produtos e espelho" },
  blonde: { src: u("photo-1554519934-e32b1629d9ee"), alt: "Cabelo loiro com mechas iluminadas" },
  waves: { src: u("photo-1638064432601-18b99cb31acb"), alt: "Cabeleireiro modelando ondas" },
  brunette: { src: u("photo-1554519880-ffe46861d570"), alt: "Cabelo moreno com ondas" },
  updo: { src: u("photo-1558265246-e84a824bcd83"), alt: "Penteado preso em coque" },
  curls: { src: u("photo-1629397685944-7073f5589754"), alt: "Modelagem de cachos com babyliss" },
  makeup: { src: u("photo-1602910344008-22f323cc1817"), alt: "Maquiadora trabalhando" },
  brush: { src: u("photo-1571332283201-99c82a8b3046"), alt: "Pincel de maquiagem em preto e branco" },
  mask: { src: u("photo-1570172619644-dfd03ed5d881"), alt: "Máscara facial" },
  facial: { src: u("photo-1761718210089-ba3bb5ccb54f"), alt: "Tratamento facial" },
  brow: { src: u("photo-1620531940052-d0d9aff03c32"), alt: "Sobrancelha em close" },
  eye: { src: u("photo-1613730317814-1cede28e0151"), alt: "Olho com delineado e sobrancelha" },
  browPencil: { src: u("photo-1709477542170-f11ee7d471a0"), alt: "Lápis de sobrancelha" },
};
export type PhotoKey = keyof typeof photos;
