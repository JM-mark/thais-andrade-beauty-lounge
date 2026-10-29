// Converte as fotos brutas (.raw/) em WebP com tratamento de cor único, gera LQIP/medidas,
// versões leves da logo, favicons e a imagem de compartilhamento.
// Uso: node scripts/process-photos.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";

const OUT = "public/fotos";
mkdirSync(OUT, { recursive: true });
mkdirSync("public/brand/web", { recursive: true });

// [arquivo bruto, nome final]
const jobs = [
  [".raw/noiva-buque.img", "noiva-buque"],
  [".raw/salao-cadeiras.img", "salao-cadeiras"],
  [".raw/cafe.img", "cafe"],
  [".raw/sala-espera.img", "sala-espera"],
  [".raw/recepcao.img", "recepcao"],
  [".raw/estetica-maca.img", "estetica-maca"],
  [".raw/ig/ta-ig-cabelos-ondas.jpg", "ondas-1"],
  [".raw/ig/ta-ig-mechas-morena.jpg", "mechas-1"],
  [".raw/ig/ta-ig-maquiagem.jpg", "maquiagem-1"],
  [".raw/ig/ta-ig-sobrancelha2.jpg", "sobrancelha-1"],
  [".raw/ig/ta-ig-grid-1-loiro.jpg", "ig-1"],
  [".raw/ig/ta-ig-grid-2-progressiva.jpg", "ig-2"],
  [".raw/ig/ta-ig-grid-3-ruivo.jpg", "ig-3"],
  [".raw/ig/ta-ig-grid-4-ondas.jpg", "ig-4"],
  [".raw/ig/ta-ig-grid-5-equipe.jpg", "ig-5"],
  [".raw/ig/ta-ig-grid-6-sala-noiva.jpg", "ig-6"],
  ...(process.env.EXTRA_JOBS ? JSON.parse(process.env.EXTRA_JOBS) : []),
];

// Tratamento leve e igual em todas: calor sutil, saturação 0.92, contraste +4%, fade nos pretos.
const grade = (img) => img.rotate().modulate({ saturation: 0.92 }).linear([1.055, 1.04, 1.025], [1, 1, 1]);

const manifest = {};
for (const [src, name] of jobs) {
  const full = await grade(sharp(src)).resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${OUT}/${name}.webp`);
  await grade(sharp(src)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`${OUT}/${name}-md.webp`);
  await grade(sharp(src)).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${OUT}/${name}-sm.webp`);
  const smMeta = await sharp(`${OUT}/${name}-sm.webp`).metadata();
  const lq = await grade(sharp(src)).resize({ width: 24 }).blur(2).webp({ quality: 50 }).toBuffer();
  const small = await sharp(`${OUT}/${name}-md.webp`).metadata();
  manifest[name] = { w: full.width, h: full.height, wMd: small.width, wSm: smMeta.width, lqip: `data:image/webp;base64,${lq.toString("base64")}` };
  console.log(name, full.width + "x" + full.height);
}
writeFileSync("src/content/photos.generated.json", JSON.stringify(manifest));

// Logos oficiais: versões leves para a web (os originais ficam em public/brand/).
const logos = [
  ["logo-horizontal", 720], ["logo-horizontal-claro", 720],
  ["logo-ta-monograma", 160], ["logo-ta-monograma-claro", 160],
  ["logo-thais-andrade-completo", 640], ["logo-thais-andrade-claro", 640],
  ["logo-texto", 640], ["logo-texto-claro", 640],
];
for (const [n, w] of logos) await sharp(`public/brand/${n}.png`).resize({ width: w }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`public/brand/web/${n}.png`);

// Favicons a partir de icon-512.png
for (const [n, s] of [["icon-32.png", 32], ["icon-192.png", 192], ["apple-touch-icon.png", 180]]) await sharp("public/brand/icon-512.png").resize(s, s).png().toFile(`public/${n}`);
copyFileSync("public/brand/icon-512.png", "public/icon-512.png");

// og.jpg 1200x630: logo completa sobre marfim + foto real à direita
const photo = await grade(sharp(".raw/noiva-buque.img")).resize(540, 630, { fit: "cover", position: "top" }).toBuffer();
const logo = await sharp("public/brand/logo-thais-andrade-completo.png").resize({ width: 480, height: 440, fit: "inside" }).toBuffer();
const lm = await sharp(logo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F7F2EC" } })
  .composite([{ input: photo, left: 660, top: 0 }, { input: logo, left: Math.round((660 - lm.width) / 2), top: Math.round((630 - lm.height) / 2) }])
  .jpeg({ quality: 86 }).toFile("public/og.jpg");
console.log("ok");
