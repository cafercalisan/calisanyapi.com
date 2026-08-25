import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public/social-media/campaign-ready");
const logoSource = "/Users/cafer/Desktop/ChatGPT Image 3 Ağu 2026 01_55_53.png";

const items = [
  {
    file: "01-hava-girebilir-sinek-giremez.png",
    source: "antrasit-kapi.png",
    first: "HAVA",
    second: "GİREBİLİR.",
    accentFirst: "SİNEK",
    accentSecond: "GİREMEZ.",
    cta: "HEMEN TEKLİF AL",
  },
  {
    file: "02-olcunu-gir-teklifini-al.png",
    source: "beyaz-kapi.png",
    first: "ÖLÇÜNÜ GİR.",
    second: "",
    accentFirst: "TEKLİFİNİ",
    accentSecond: "HEMEN AL.",
    cta: "ŞİMDİ BAŞLA",
  },
  {
    file: "03-yaz-iceri-sinek-disari.png",
    source: "altin-mese-kapi.png",
    first: "YAZ İÇERİ.",
    second: "",
    accentFirst: "SİNEK",
    accentSecond: "DIŞARI.",
    cta: "TEKLİFİNİ AL",
  },
  {
    file: "04-genis-aciklik-zarif-cozum.png",
    source: "antrasit-genis.png",
    first: "GENİŞ",
    second: "AÇIKLIK.",
    accentFirst: "ZARİF",
    accentSecond: "ÇÖZÜM.",
    cta: "HEMEN ARA",
  },
  {
    file: "05-evine-ozel-tam-uyum.png",
    source: "gri-detay.png",
    first: "EVİNE ÖZEL.",
    second: "",
    accentFirst: "TAM",
    accentSecond: "UYUM.",
    cta: "HEMEN TEKLİF AL",
  },
];

const esc = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function headlineLine(text, y, className) {
  return text ? `<text x="70" y="${y}" class="${className}">${esc(text)}</text>` : "";
}

function typography(item) {
  const secondDarkY = item.second ? 338 : 0;
  const dividerY = item.second ? 392 : 318;
  const firstCyanY = item.second ? 492 : 418;
  const secondCyanY = item.accentSecond ? firstCyanY + 76 : 0;

  return Buffer.from(`
    <svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
      <style>
        .dark { font: 800 67px Helvetica, Arial, sans-serif; letter-spacing: -2px; fill: #252b2d; }
        .cyan { font: 800 67px Helvetica, Arial, sans-serif; letter-spacing: -2px; fill: #10acb7; }
        .cta { font: 700 18px Helvetica, Arial, sans-serif; letter-spacing: 1.4px; fill: #ffffff; }
        .url { font: 700 23px Helvetica, Arial, sans-serif; letter-spacing: .4px; fill: #252b2d; }
        .services { font: 500 16px Helvetica, Arial, sans-serif; letter-spacing: .6px; fill: #394043; }
      </style>
      ${headlineLine(item.first, 260, "dark")}
      ${headlineLine(item.second, secondDarkY, "dark")}
      <rect x="72" y="${dividerY}" width="76" height="7" fill="#10acb7"/>
      ${headlineLine(item.accentFirst, firstCyanY, "cyan")}
      ${headlineLine(item.accentSecond, secondCyanY, "cyan")}
      <rect x="70" y="760" width="230" height="58" rx="4" fill="#10acb7"/>
      <text x="185" y="797" text-anchor="middle" class="cta">${esc(item.cta)}</text>
      <text x="70" y="858" class="url">umayapi.com</text>
      <line x1="70" y1="882" x2="270" y2="882" stroke="#10acb7" stroke-width="3"/>
      <text x="70" y="1284" class="services">SİNEKLİK</text>
      <rect x="176" y="1265" width="3" height="24" fill="#10acb7"/>
      <text x="198" y="1284" class="services">PVC PENCERE</text>
      <rect x="333" y="1265" width="3" height="24" fill="#10acb7"/>
      <text x="355" y="1284" class="services">PVC KAPI</text>
      <rect x="458" y="1265" width="3" height="24" fill="#10acb7"/>
      <text x="480" y="1284" class="services">CAM BALKON</text>
    </svg>
  `);
}

await fs.mkdir(outDir, { recursive: true });

const logo = await sharp(logoSource)
  .extract({ left: 78, top: 816, width: 470, height: 142 })
  .resize({ width: 330 })
  .png()
  .toBuffer();

for (const item of items) {
  const source = path.join(root, "public/social-media/source-clean", item.source);
  await sharp(source)
    .resize(1080, 1350, { fit: "cover", position: "centre" })
    .composite([
      { input: typography(item), top: 0, left: 0 },
      { input: logo, top: 1055, left: 64 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, item.file));
}

console.log(`Created ${items.length} clean creatives in ${outDir}`);
