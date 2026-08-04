import fs from "node:fs";
import path from "node:path";

const sampleRate = 44100;
const duration = 12;
const samples = sampleRate * duration;
const data = Buffer.alloc(samples * 2);

for (let i = 0; i < samples; i++) {
  const t = i / sampleRate;
  const beatPhase = t % 0.5;
  const kick = Math.sin(2 * Math.PI * (72 - beatPhase * 38) * beatPhase) * Math.exp(-beatPhase * 22);
  const pulse = Math.sin(2 * Math.PI * 144 * t) * (0.035 + 0.02 * Math.sin(2 * Math.PI * 0.25 * t));
  const transition = [3, 6, 9].reduce((sum, point) => {
    const d = Math.abs(t - point);
    return sum + (d < 0.16 ? Math.sin(2 * Math.PI * 520 * t) * (1 - d / 0.16) : 0);
  }, 0);
  const value = Math.max(-1, Math.min(1, kick * 0.32 + pulse + transition * 0.08));
  data.writeInt16LE(Math.round(value * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

const outDir = path.join(process.cwd(), "public/remotion/audio");
fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, "meta-bed.wav"), Buffer.concat([header, data]));
