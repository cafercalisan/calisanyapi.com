import {spawnSync} from "node:child_process";

const message = process.argv.slice(2).join(" ").trim() || `chore: publish ${new Date().toISOString().slice(0, 16).replace("T", " ")}`;

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {stdio: "inherit", ...options});
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const capture = (command, args) => spawnSync(command, args, {encoding: "utf8"});

const repository = capture("git", ["rev-parse", "--show-toplevel"]);
if (repository.status !== 0) {
  console.error("\nYayın durduruldu: Bu klasör bir Git deposu değil.");
  console.error("Önce doğru GitHub deposu bu klasöre bağlanmalı.\n");
  process.exit(1);
}

const remote = capture("git", ["remote", "get-url", "origin"]);
if (remote.status !== 0 || !remote.stdout.trim()) {
  console.error("\nYayın durduruldu: 'origin' adlı GitHub bağlantısı bulunamadı.\n");
  process.exit(1);
}

console.log("\n1/6 TypeScript kontrol ediliyor…");
run("npm", ["run", "typecheck"]);
console.log("\n2/6 Kod kalitesi kontrol ediliyor…");
run("npm", ["run", "lint"]);
console.log("\n3/6 Testler çalıştırılıyor…");
run("npm", ["test", "--", "--run"]);
console.log("\n4/6 Üretim paketi oluşturuluyor…");
run("npm", ["run", "build"]);
console.log("\n5/6 Değişiklikler kaydediliyor…");
run("git", ["add", "-A"]);

const staged = capture("git", ["diff", "--cached", "--quiet"]);
if (staged.status !== 0) run("git", ["commit", "-m", message]);
else console.log("Kaydedilecek yeni değişiklik yok.");

console.log("\n6/6 GitHub'a gönderiliyor…");
run("git", ["push"]);
console.log("\nTamamlandı. GitHub'a bağlı Vercel projesi yeni yayını otomatik başlatacak.\n");
