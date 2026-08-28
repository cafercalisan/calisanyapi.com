import { NextResponse } from "next/server";
import { z } from "zod";
import { dbRequest, supabaseConfigured } from "@/lib/supabase";
import { services } from "@/lib/site";

const optionalMeasurement = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (typeof value === "string") return Number(value.trim().replace(",", "."));
    return value;
  },
  z.number().finite().positive().max(100_000).optional(),
);

const attributionSchema = z.object({
  source: z.string().trim().max(100).optional(),
  medium: z.string().trim().max(100).optional(),
  campaign: z.string().trim().max(150).optional(),
  content: z.string().trim().max(150).optional(),
  term: z.string().trim().max(150).optional(),
  gclid: z.string().trim().max(250).optional(),
  fbclid: z.string().trim().max(250).optional(),
  landingPage: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
}).strict().optional();

const requestSchema = z.object({
  serviceSlug: z.string().refine((value) => services.some((service) => service.slug === value), "Geçersiz hizmet."),
  district: z.string().trim().min(2).max(80),
  width: optionalMeasurement,
  height: optionalMeasurement,
  depth: optionalMeasurement,
  unit: z.literal("cm"),
  description: z.string().trim().min(10).max(1000),
  photoPaths: z.array(z.string().trim().min(1).max(500)).max(4),
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().regex(/^(\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/),
    email: z.string().trim().toLowerCase().email().optional(),
  }),
  kvkkAccepted: z.literal(true),
  website: z.string().max(0).optional(),
  eventId: z.string().uuid().optional(),
  attribution: attributionSchema,
}).strict();

const attempts = new Map<string, { count: number; resetAt: number }>();
function limited(ip: string) {
  const now = Date.now();
  const existing = attempts.get(ip);
  const entry = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + 3_600_000 } : existing;
  entry.count += 1;
  attempts.set(ip, entry);
  if (attempts.size > 2_000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }
  return { blocked: entry.count > 8, resetAt: entry.resetAt };
}

function clientIp(request: Request) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "local";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]!);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && !supabaseConfigured) {
    console.error("[service-request] Supabase production ortamında yapılandırılmamış.");
    return NextResponse.json({ error: "Talep sistemi geçici olarak kullanılamıyor. Lütfen telefonla iletişime geçin." }, { status: 503 });
  }

  const rate = limited(clientIp(request));
  if (rate.blocked) {
    return NextResponse.json(
      { error: "Çok fazla talep gönderdiniz. Lütfen daha sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } },
    );
  }

  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Form bilgilerinde eksik veya hatalı alan var." }, { status: 400 });

    const input = parsed.data;
    const eventId = input.eventId ?? crypto.randomUUID();
    const reference = `CYK-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    const attribution = input.attribution ?? {};

    if (supabaseConfigured) {
      await dbRequest("service_requests", {
        method: "POST",
        body: JSON.stringify({
          reference,
          event_id: eventId,
          status: "new",
          service_slug: input.serviceSlug,
          district: input.district,
          width: input.width ?? null,
          height: input.height ?? null,
          depth: input.depth ?? null,
          unit: input.unit,
          description: input.description,
          photo_paths: input.photoPaths,
          customer_name: input.customer.name,
          customer_phone: input.customer.phone,
          customer_email: input.customer.email ?? null,
          utm_source: attribution.source ?? null,
          utm_medium: attribution.medium ?? null,
          utm_campaign: attribution.campaign ?? null,
          utm_content: attribution.content ?? null,
          utm_term: attribution.term ?? null,
          gclid: attribution.gclid ?? null,
          fbclid: attribution.fbclid ?? null,
          landing_page: attribution.landingPage ?? null,
          referrer: attribution.referrer ?? null,
        }),
      });
    }

    const serviceName = services.find((service) => service.slug === input.serviceSlug)?.name ?? input.serviceSlug;
    const key = process.env.RESEND_API_KEY;
    const to = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (key && to) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.FROM_EMAIL || "Çalışan Yapı <noreply@calisanyapi.com>",
            to: [to],
            subject: `${reference} · Yeni ${serviceName} talebi`,
            html: `<div style="font-family:sans-serif;max-width:640px"><h1>Yeni keşif talebi</h1><p><b>Referans:</b> ${reference}</p><p><b>Hizmet:</b> ${escapeHtml(serviceName)}<br><b>İlçe:</b> ${escapeHtml(input.district)}<br><b>Ölçü:</b> ${escapeHtml(String(input.width ?? "—"))} × ${escapeHtml(String(input.height ?? "—"))} × ${escapeHtml(String(input.depth ?? "—"))} cm</p><p><b>Müşteri:</b> ${escapeHtml(input.customer.name)} · ${escapeHtml(input.customer.phone)}</p><p>${escapeHtml(input.description)}</p><p>${input.photoPaths.length} fotoğraf yüklendi.</p></div>`,
          }),
        });
        if (!emailResponse.ok) console.error("[service-request] Bildirim e-postası gönderilemedi:", emailResponse.status);
      } catch (emailError) {
        console.error("[service-request] Bildirim e-postası hatası:", emailError);
      }
    }

    return NextResponse.json({ success: true, reference, eventId, persisted: supabaseConfigured });
  } catch (error) {
    console.error("[service-request]", error);
    return NextResponse.json({ error: "Talebiniz kaydedilemedi. Lütfen telefonla iletişime geçin." }, { status: 500 });
  }
}
