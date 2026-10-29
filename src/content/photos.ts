// Fotos REAIS do salão (Google Maps "Pelo proprietário" e Instagram do @thaisandradebeautylounge).
// Arquivos em public/fotos/ e medidas/LQIP em photos.generated.json, ambos gerados por scripts/process-photos.mjs
// a partir de .raw/. Nunca usar fotos de banco. Nenhuma foto aparece duas vezes no site.
// Chave ausente = a seção mostra um estado sem foto (painel com número), nunca uma foto de banco.
// TODO confirmar uso de cada foto com a cliente (principalmente as que mostram clientes).
import manifest from "./photos.generated.json";

export type PhotoEntry = {
  src: string; // versão grande (até 2000 px)
  srcMd: string; // versão de 900 px de largura
  srcSm: string; // versão de 480 px de largura (celular)
  w: number; // largura real de `src`
  h: number;
  wMd: number;
  wSm: number;
  lqip: string; // blur de 24 px em base64
  alt: string;
  fonte: string; // "Google Maps (proprietário)" ou "Instagram"
  fonteUrl?: string;
};

export type PhotoKey =
  | "recepcao" | "salaEspera" | "salaoCadeiras" | "cafe" | "esteticaMaca"
  | "noivaVitrine"
  | "mechas1" | "ondas1" | "sobrancelha1" | "maquiagem1";

type Meta = { w: number; h: number; wMd: number; wSm: number; lqip: string };
const meta = manifest as Record<string, Meta>;
const maps = "Google Maps (proprietário)";
const ig = (code: string, kind: "p" | "reel" = "p") => `https://www.instagram.com/${kind}/${code}/`;
const f = (name: string) => ({ src: `/fotos/${name}.webp`, srcMd: `/fotos/${name}-md.webp`, srcSm: `/fotos/${name}-sm.webp`, ...meta[name] });

export const photos: Partial<Record<PhotoKey, PhotoEntry>> = {
  // Google Maps (proprietário)
  salaoCadeiras: { ...f("salao-cadeiras"), alt: "Área de cabelo com espelhos em arco e cadeiras", fonte: maps },
  cafe: { ...f("cafe"), alt: "Cantinho do café com xícaras e bandeja de madeira", fonte: maps },
  salaEspera: { ...f("sala-espera"), alt: "Sala de espera com poltronas verdes e janela", fonte: maps },
  recepcao: { ...f("recepcao"), alt: "Recepção com balcão de mármore", fonte: maps },
  esteticaMaca: { ...f("estetica-maca"), alt: "Sala de estética com maca", fonte: maps },
  // Instagram
  ondas1: { ...f("ondas-1"), alt: "Cabelo loiro com ondas", fonte: "Instagram", fonteUrl: ig("DUDkHcajUAL") },
  mechas1: { ...f("mechas-1"), alt: "Cabelo moreno iluminado", fonte: "Instagram", fonteUrl: ig("DXIYs3Rjdsa") },
  maquiagem1: { ...f("maquiagem-1"), alt: "Maquiagem social em close", fonte: "Instagram", fonteUrl: ig("DXUEnYtDTre") },
  sobrancelha1: { ...f("sobrancelha-1"), alt: "Olho com a sobrancelha alinhada em close", fonte: "Instagram", fonteUrl: ig("DTlwX14DeVU", "reel") },
  noivaVitrine: { ...f("noiva-buque"), alt: "Noiva com buquê de lírios dentro do salão", fonte: maps }, // TODO confirmar uso com a cliente (aparece cliente)
};

export const has = (k?: PhotoKey) => !!k && !!photos[k];

/** Galeria "O espaço": só fotos reais do ambiente (a maca está em Estética), na ordem exibida. */
export const spaceGallery: { key: PhotoKey; caption: string }[] = [
  { key: "salaoCadeiras", caption: "Área de cabelo" },
  { key: "salaEspera", caption: "Sala de espera" },
  { key: "recepcao", caption: "Recepção" },
  { key: "cafe", caption: "Cantinho do café" },
];

/** Grid "Instagram": capas de posts reais, cada uma linkando para o post. */
export type IgPost = { photo: PhotoEntry; url: string };
const post = (n: number, alt: string, code: string, kind: "p" | "reel" = "p"): IgPost => ({
  photo: { ...f(`ig-${n}`), alt, fonte: "Instagram", fonteUrl: ig(code, kind) },
  url: ig(code, kind),
});
export const instagramPosts: IgPost[] = [
  post(1, "Antes e depois de coloração loira", "DerVy6AlqB-"),
  post(2, "Antes e depois de coloração escura com progressiva", "DerUUmOlsw4"),
  post(3, "Cabelo ruivo", "DUqAmvKjeNo"),
  post(4, "Ondas, leveza e elegância", "DTrJX7hjZ9K", "reel"),
  post(5, "A equipe do salão", "DTWW7FRDaGE"),
  post(6, "Sala da Noiva", "Da-Qa3dTZU1", "reel"),
];
