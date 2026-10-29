// Gera os vídeos do hero a partir do clipe bruto (.raw/video/pexels-8955484.mp4, Pexels, licença gratuita).
// Loop sem emenda: os últimos D segundos fazem fusão (xfade) com os D segundos ANTES do início, então o último
// quadro do arquivo é o quadro que vem logo antes do primeiro.
// Saída em public/hero/: desktop 1080p (9 s) e celular 540x960 (recorte vertical, 7 s), MP4 (H.264) + WebM (VP9) e posters.
// Uso: node scripts/process-video.mjs
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const SRC = ".raw/video/pexels-8955484.mp4";
const OUT = "public/hero";
const T0 = 31, D = 1.2; // início do loop e duração da fusão (a duração L é por variante)
mkdirSync(OUT, { recursive: true });

const loop = (post, L) =>
  `[0:v]split=3[s1][s2][s3];` +
  `[s1]trim=start=${T0}:end=${T0 + L - D},setpts=PTS-STARTPTS[a];` +
  `[s2]trim=start=${T0 + L - D}:end=${T0 + L},setpts=PTS-STARTPTS[b];` +
  `[s3]trim=start=${T0 - D}:end=${T0},setpts=PTS-STARTPTS[c];` +
  `[b][c]xfade=transition=fade:duration=${D}:offset=0[bc];` +
  `[a][bc]concat=n=2:v=1:a=0,${post}[v]`;

const run = (args) => {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error("ffmpeg falhou: " + args.join(" "));
};
const size = (f) => statSync(f).size;
const mb = (n) => (n / 1048576).toFixed(2) + " MB";

// [nome, filtro final, limite de bytes]
const variants = [
  // [nome, filtro, limite em bytes, duração do loop em s]
  ["hero-d", "scale=1920:1080,fps=24,format=yuv420p", 3 * 1048576, 9],
  // celular: recorte vertical 540x960 e loop de 7 s, para a primeira carga ficar abaixo de 2 MB
  ["hero-m", "crop=608:1080:800:0,scale=540:960,fps=24,format=yuv420p", 0.75 * 1048576, 7],
];

for (const [name, post, limit, L] of variants) {
  const fc = loop(post, L);
  // MP4 H.264: sobe o CRF até caber no limite
  for (const crf of [24, 26, 28, 30, 32, 34, 36, 38, 40, 42]) {
    run(["-i", SRC, "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-profile:v", "high", "-movflags", "+faststart", `${OUT}/${name}.mp4`]);
    if (size(`${OUT}/${name}.mp4`) <= limit) { console.log(name, "mp4 crf", crf, mb(size(`${OUT}/${name}.mp4`))); break; }
  }
  // WebM VP9
  for (const crf of [32, 34, 36, 38, 40, 42, 44, 46, 48]) {
    run(["-i", SRC, "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(crf), "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", `${OUT}/${name}.webm`]);
    if (size(`${OUT}/${name}.webm`) <= limit) { console.log(name, "webm crf", crf, mb(size(`${OUT}/${name}.webm`))); break; }
  }
}

// Posters: o quadro em que o loop começa (T0)
run(["-ss", String(T0), "-i", SRC, "-frames:v", "1", "-vf", "scale=1920:1080", "-q:v", "4", `${OUT}/poster-d.jpg`]);
run(["-ss", String(T0), "-i", SRC, "-frames:v", "1", "-vf", "crop=608:1080:800:0,scale=540:960", "-q:v", "4", `${OUT}/poster-m.jpg`]);
for (const f of ["poster-d.jpg", "poster-m.jpg"]) console.log(f, mb(size(`${OUT}/${f}`)));
