import {access, mkdir, writeFile} from "node:fs/promises";
import {spawnSync} from "node:child_process";

const days = [
  [1,"pencere-huzuru"],[2,"kapiya-yanlis-model"],[3,"balkon-yanlis-kullanim"],[4,"olcu-hatasi"],[5,"tek-hareket-plise"],[6,"reklam-hava-girsin"],[7,"profil-tek-basina-yetmez"],[8,"cift-acilim-surme"],[9,"usta-olcu-kontrolu"],[10,"eski-pvc-yenileme"],
  [11,"reklam-olcunu-gir"],[12,"katlanir-mi-surme-mi"],[13,"cam-balkon-birlesim"],[14,"gorunmeyen-detay"],[15,"reklam-balkon-bos-kalmasin"],[16,"kedi-standart-tul"],[17,"genis-aciklik-tek-kanat"],[18,"profil-rengi"],[19,"istanbul-proje-gunlugu"],[20,"reklam-pvc-evi-korusun"],
  [21,"golgeyi-yonetin"],[22,"kis-bahcesi-yazin"],[23,"manzara-ruzgar"],[24,"reklam-teras-yaz-degil"],[25,"guvenlik-manzara"],[26,"tavani-toparlamak"],[27,"kupeste-baglanti"],[28,"reklam-alani-goster"],[29,"montajdan-once"],[30,"en-cok-sorulanlar"],
];

const onlyDay = process.argv[2] ? Number(process.argv[2]) : null;
const paidDays = new Set([6,11,15,20,24,28]);

for (const [day, slug] of days) {
  if (onlyDay && day !== onlyDay) continue;
  const dayLabel = String(day).padStart(2,"0");
  const directory = `output/30-gun/Gun-${dayLabel}-${slug}`;
  await mkdir(directory,{recursive:true});
  const output = `${directory}/video.mp4`;
  try {
    await access(output);
    console.log(`Gün ${dayLabel} hazır, atlanıyor.`);
    continue;
  } catch {}
  const composition = day === 16 ? "CY-Kedi-Sinekligi" : `CY-${dayLabel}-${slug}${paidDays.has(day) ? "-A" : ""}`;
  const result = spawnSync("npx",["remotion","render","remotion/index.ts",composition,output,"--concurrency=1","--log=error"],{stdio:"inherit"});
  if (result.status !== 0) process.exit(result.status ?? 1);
  await writeFile(`${directory}/README.txt`,`Gün ${dayLabel}\nKompozisyon: ${composition}\nDosya: video.mp4\n`,"utf8");
}
