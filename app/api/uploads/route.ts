import { NextResponse } from "next/server";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "local";
}

function limited(ip: string) {
  const now = Date.now();
  const existing = attempts.get(ip);
  const entry = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + 3_600_000 } : existing;
  entry.count += 1;
  attempts.set(ip, entry);
  if (attempts.size > 2_000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }
  return { blocked: entry.count > 24, resetAt: entry.resetAt };
}

function matchesSignature(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  if (type === "image/webp") {
    return bytes.length >= 12
      && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF"
      && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return false;
}

export async function POST(request: Request) {
  const rate = limited(clientIp(request));
  if (rate.blocked) {
    return NextResponse.json(
      { error: "Çok fazla dosya yüklediniz. Lütfen daha sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } },
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    if (!allowed.has(file.type) || file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "JPEG, PNG veya WebP dosyası en fazla 5 MB olabilir." }, { status: 400 });
    }

    const source = Buffer.from(await file.arrayBuffer());
    const signature = new Uint8Array(source.subarray(0, 16));
    if (!matchesSignature(file.type, signature)) {
      return NextResponse.json({ error: "Dosya içeriği bildirilen görsel türüyle eşleşmiyor." }, { status: 400 });
    }

    let sanitized: Buffer;
    try {
      sanitized = await sharp(source, { limitInputPixels: 24_000_000, failOn: "warning" })
        .rotate()
        .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
    } catch {
      return NextResponse.json({ error: "Görsel güvenli biçimde işlenemedi." }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "quote-photos";
    if (!url || !key) {
      if (process.env.NODE_ENV === "production") {
        console.error("[upload] Supabase Storage production ortamında yapılandırılmamış.");
        return NextResponse.json({ error: "Dosya yükleme geçici olarak kullanılamıyor." }, { status: 503 });
      }
      return NextResponse.json({ path: `local-preview/${crypto.randomUUID()}`, persisted: false });
    }

    const path = `drafts/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.webp`;
    const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "image/webp", "x-upsert": "false", "Cache-Control": "31536000" },
      body: new Uint8Array(sanitized),
    });
    if (!response.ok) throw new Error(`Fotoğraf deposu: ${response.status}`);
    return NextResponse.json({ path, persisted: true });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: "Fotoğraf yüklenemedi." }, { status: 500 });
  }
}
