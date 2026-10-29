// Fotos REAIS do salão (Google Maps "Pelo proprietário" e Instagram do @thaisandradebeautylounge).
// Arquivos em public/fotos/ (gerados por scripts/process-photos.mjs a partir de .raw/). Nunca usar fotos de banco.
// Chave ausente = a seção mostra um estado sem foto (número grande / tipografia), nunca uma foto de banco.
// TODO confirmar uso de cada foto com a cliente (principalmente as que mostram clientes).

export type PhotoEntry = {
  src: string; // caminho em /fotos/...
  src800?: string; // versão leve para cards
  alt: string;
  fonte: string; // "Google Maps (proprietário)" ou "Instagram"
  fonteUrl?: string;
};

export type PhotoKey =
  | "fachada" | "recepcao" | "salaEspera" | "salaoCadeiras" | "cafe" | "esteticaMaca"
  | "noivaBuque" | "noiva3"
  | "mechas1" | "ondas1" | "sobrancelha1" | "maquiagem1";

const maps = "Google Maps (proprietário)";
const ig = (code: string, kind: "p" | "reel" = "p") => `https://www.instagram.com/${kind}/${code}/`;
const f = (name: string) => ({ src: `/fotos/${name}.webp`, src800: `/fotos/${name}-800.webp` });

export const photos: Partial<Record<PhotoKey, PhotoEntry>> = {
  // Google Maps (proprietário)
  fachada: { ...f("fachada"), alt: "Fachada do salão, com a placa Thaís Andrade Beauty Lounge e o portão branco", fonte: maps },
  noivaBuque: { ...f("noiva-buque"), alt: "Noiva com buquê de lírios dentro do salão", fonte: maps },
  salaoCadeiras: { ...f("salao-cadeiras"), alt: "Área de cabelo com espelhos em arco e cadeiras", fonte: maps },
  cafe: { ...f("cafe"), alt: "Cantinho do café com xícaras e bandeja de madeira", fonte: maps },
  salaEspera: { ...f("sala-espera"), alt: "Sala de espera com poltronas verdes e janela", fonte: maps },
  recepcao: { ...f("recepcao"), alt: "Recepção com balcão de mármore", fonte: maps },
  esteticaMaca: { ...f("estetica-maca"), alt: "Sala de estética com maca", fonte: maps },
  // Instagram
  ondas1: { ...f("ondas-1"), alt: "Cabelo loiro com ondas", fonte: "Instagram", fonteUrl: ig("DUDkHcajUAL") },
  mechas1: { ...f("mechas-1"), alt: "Cabelo moreno iluminado", fonte: "Instagram", fonteUrl: ig("DXIYs3Rjdsa") },
  maquiagem1: { ...f("maquiagem-1"), alt: "Maquiagem social em close", fonte: "Instagram", fonteUrl: ig("DXUEnYtDTre") },
  sobrancelha1: { ...f("sobrancelha-1"), alt: "Design de sobrancelhas", fonte: "Instagram", fonteUrl: ig("DUDxyMLDcpx") },
  noiva3: { ...f("noiva-gabby"), alt: "Noiva Gabby no salão, com o cachorro", fonte: "Instagram", fonteUrl: ig("DaTcDGMJFP-", "reel") },
};

export const has = (k?: PhotoKey) => !!k && !!photos[k];

/** Galeria "O espaço": só fotos reais do ambiente, na ordem exibida. */
export const spaceGallery: { key: PhotoKey; caption: string }[] = [
  { key: "recepcao", caption: "Recepção" },
  { key: "salaEspera", caption: "Sala de espera" },
  { key: "salaoCadeiras", caption: "Área de cabelo" },
  { key: "cafe", caption: "Cantinho do café" },
  { key: "esteticaMaca", caption: "Estética" },
];

/** Grid "Instagram": capas de posts reais, cada uma linkando para o post. */
export type IgPost = { src: string; alt: string; url: string };
const post = (n: number, alt: string, code: string, kind: "p" | "reel" = "p"): IgPost => ({ src: `/fotos/ig-${n}-800.webp`, alt, url: ig(code, kind) });
export const instagramPosts: IgPost[] = [
  post(1, "Antes e depois de coloração loira", "DerVy6AlqB-"),
  post(2, "Antes e depois de coloração escura com progressiva", "DerUUmOlsw4"),
  post(3, "Cabelo ruivo", "DUqAmvKjeNo"),
  post(4, "Ondas, leveza e elegância", "DTrJX7hjZ9K", "reel"),
  post(5, "A equipe do salão", "DTWW7FRDaGE"),
  post(6, "Sala da Noiva", "Da-Qa3dTZU1", "reel"),
];
