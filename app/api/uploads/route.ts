import { NextResponse } from "next/server";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
export async function POST(request: Request) {
  try {
    const form = await request.formData(); const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    if (!allowed.has(file.type) || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "JPEG, PNG veya WebP dosyası en fazla 5 MB olabilir." }, { status: 400 });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY; const bucket = process.env.SUPABASE_STORAGE_BUCKET || "quote-photos";
    if (!url || !key) return NextResponse.json({ path: `local-preview/${crypto.randomUUID()}`, persisted: false });
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg"; const path = `drafts/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type, "x-upsert": "false" }, body: file });
    if (!response.ok) throw new Error(`Fotoğraf deposu: ${response.status}`);
    return NextResponse.json({ path, persisted: true });
  } catch (error) { console.error("[upload]", error); return NextResponse.json({ error: "Fotoğraf yüklenemedi." }, { status: 500 }); }
}
