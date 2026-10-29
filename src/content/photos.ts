// Fotos REAIS do salão (Google Maps "Pelo proprietário" e Instagram do @thaisandradebeautylounge).
// Arquivos em public/fotos/ (gerados por scripts/process-photos.mjs). Nunca usar fotos de banco.
// Chave ausente = a seção mostra um estado sem foto (número grande / tipografia), nunca uma foto de banco.

export type PhotoEntry = {
  src: string; // caminho em /fotos/...
  src800?: string; // versão leve para cards
  alt: string;
  fonte: string; // "Google Maps (proprietário)" ou "Instagram"
  fonteUrl?: string;
};

export type PhotoKey =
  | "fachada" | "salaoCadeiras" | "salaEspera" | "paredeFlores" | "maquiagemEstante" | "esteticaMaca" | "cafe"
  | "noivaBuque" | "noiva2" | "noiva3"
  | "mechas1" | "ondas1" | "sobrancelha1" | "maquiagem1";

// TODO confirmar uso com a cliente de cada foto abaixo.
export const photos: Partial<Record<PhotoKey, PhotoEntry>> = {};

export const has = (k?: PhotoKey) => !!k && !!photos[k];

/** Galeria "O espaço": só fotos reais do ambiente, na ordem exibida. */
export const spaceGallery: { key: PhotoKey; caption: string }[] = [
  { key: "salaEspera", caption: "Recepção" },
  { key: "salaoCadeiras", caption: "Área de cabelo" },
  { key: "paredeFlores", caption: "Cantinho das flores" },
  { key: "maquiagemEstante", caption: "Maquiagem" },
  { key: "cafe", caption: "Cantinho do café" },
  { key: "esteticaMaca", caption: "Estética" },
];

/** Grid "Instagram": capas de posts reais, cada uma linkando para o post. */
export type IgPost = { src: string; alt: string; url: string };
export const instagramPosts: IgPost[] = [];
