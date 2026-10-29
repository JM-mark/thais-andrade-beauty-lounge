// Converte as fotos brutas (.raw/) em WebP com tratamento de cor único.
// Uso: node scripts/process-photos.mjs
import sharp from "sharp";
import { mkdirSync, readdirSync } from "node:fs";

const OUT = "public/fotos";
mkdirSync(OUT, { recursive: true });
mkdirSync("public/brand", { recursive: true });

// [arquivo bruto, nome final]
const jobs = [
  [".raw/fachada.img", "fachada"],
  [".raw/noiva-buque.img", "noiva-buque"],
  [".raw/salao-cadeiras.img", "salao-cadeiras"],
  [".raw/cafe.img", "cafe"],
  [".raw/sala-espera.img", "sala-espera"],
  [".raw/recepcao.img", "recepcao"],
  [".raw/estetica-maca.img", "estetica-maca"],
  [".raw/ig/ta-ig-cabelos-ondas.jpg", "ondas-1"],
  [".raw/ig/ta-ig-mechas-morena.jpg", "mechas-1"],
  [".raw/ig/ta-ig-maquiagem.jpg", "maquiagem-1"],
  [".raw/ig/ta-ig-sobrancelha.jpg", "sobrancelha-1"],
  [".raw/ig/ta-ig-noiva-gabby.jpg", "noiva-gabby"],
  [".raw/ig/ta-ig-grid-1-loiro.jpg", "ig-1"],
  [".raw/ig/ta-ig-grid-2-progressiva.jpg", "ig-2"],
  [".raw/ig/ta-ig-grid-3-ruivo.jpg", "ig-3"],
  [".raw/ig/ta-ig-grid-4-ondas.jpg", "ig-4"],
  [".raw/ig/ta-ig-grid-5-equipe.jpg", "ig-5"],
  [".raw/ig/ta-ig-grid-6-sala-noiva.jpg", "ig-6"],
];

// Tratamento leve e igual em todas: calor sutil, saturação 0.92, contraste +4%, fade nos pretos.
const grade = (img) => img.rotate().modulate({ saturation: 0.92 }).linear([1.055, 1.04, 1.025], [1, 1, 1]);

for (const [src, name] of jobs) {
  const meta = await sharp(src).rotate().metadata();
  await grade(sharp(src)).resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${OUT}/${name}.webp`);
  await grade(sharp(src)).resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${name}-800.webp`);
  console.log(name, meta.width + "x" + meta.height);
}

// Logo (foto de perfil do Instagram, 150px): só referência até o salão enviar a original.
await sharp(".raw/ig/ta-perfil-logo.jpg").toFile("public/brand/logo-perfil-instagram.png");

// Imagem de compartilhamento: recorte 1200x630 da noiva (tratamento aplicado)
await grade(sharp(".raw/noiva-buque.img")).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 86 }).toFile("public/og.jpg");
console.log("ok", readdirSync(OUT).length, "arquivos");
