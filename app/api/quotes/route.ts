import { NextResponse } from "next/server";
import { calculateQuote } from "@/lib/pricing";
import { getCatalog, saveQuote } from "@/lib/data";
import { quoteSchema } from "@/lib/validation";

const attempts = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(); const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  recent.push(now); attempts.set(ip, recent); return recent.length > 10;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
  try {
    const parsed = quoteSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Form bilgilerinde eksik veya hatalı alan var.", issues: parsed.error.flatten() }, { status: 400 });
    const input = parsed.data;
    const catalog = await getCatalog();
    const pricing = calculateQuote(input.items, input.fulfilment.type, catalog);
    const saved = await saveQuote(input, pricing);
    void notify(input.customer.email || undefined, input.customer.name, saved.reference, pricing.total);
    return NextResponse.json({ success: true, reference: saved.reference, pricing, persisted: saved.persisted });
  } catch (error) {
    console.error("[quotes]", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Teklif kaydedilemedi." }, { status: 500 });
  }
}

async function notify(customerEmail: string | undefined, name: string, reference: string, total: number) {
  const key = process.env.RESEND_API_KEY; if (!key) return;
  const recipients = [process.env.ADMIN_NOTIFICATION_EMAIL, customerEmail].filter(Boolean) as string[]; if (!recipients.length) return;
  await Promise.allSettled(recipients.map((to) => fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.FROM_EMAIL || "Çalışan Yapı <noreply@calisanyapi.com>", to: [to], subject: `${reference} numaralı teklif alındı`, html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px"><h1>Çalışan Yapı</h1><p>Merhaba ${escapeHtml(name)},</p><p>${reference} numaralı teklifiniz kaydedildi. Hesaplanan toplam: <strong>${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total)}</strong>.</p><p>Ölçü ve ürün uygunluğu doğrulandıktan sonra ekibimiz sizinle iletişime geçecektir.</p></div>` }) })));
}
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]!); }
