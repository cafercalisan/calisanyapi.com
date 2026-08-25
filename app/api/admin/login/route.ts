import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin";
import { z } from "zod";

const schema = z.object({ email: z.string().trim().toLowerCase().email().max(254), password: z.string().min(8).max(200) }).strict();
const attempts = new Map<string, { count: number; resetAt: number }>();
function clientIp(request: Request) { return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"; }
function limited(ip: string) { const now=Date.now();const old=attempts.get(ip);const entry=!old||old.resetAt<=now?{count:0,resetAt:now+15*60*1000}:old;entry.count+=1;attempts.set(ip,entry);return entry.count>8; }

export async function POST(request: Request) {
  if(limited(clientIp(request)))return NextResponse.json({error:"Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin."},{status:429,headers:{"Retry-After":"900","Cache-Control":"no-store"}});
  const parsed=schema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({error:"Giriş bilgileri hatalı."},{status:401,headers:{"Cache-Control":"no-store"}});
  const { email, password } = parsed.data;
  if (process.env.DEMO_ADMIN_ENABLED === "true") {
    const validEmail = String(email).toLowerCase() === String(process.env.DEMO_ADMIN_EMAIL).toLowerCase();
    const validPassword = password === process.env.DEMO_ADMIN_PASSWORD;
    if (!validEmail || !validPassword) return NextResponse.json({ error: "Demo giriş bilgileri hatalı." }, { status: 401, headers: { "Cache-Control":"no-store" } });
    const result = NextResponse.json({ success: true, demo: true });
    result.cookies.set(ADMIN_COOKIE, "demo-local-session", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 });
    return result;
  }
  if (email !== String(process.env.ADMIN_EMAIL).toLowerCase()) return NextResponse.json({ error: "Giriş bilgileri hatalı." }, { status: 401, headers: { "Cache-Control":"no-store" } });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return NextResponse.json({ error: "Supabase Auth yapılandırılmadı." }, { status: 503 });
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: anon, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!response.ok) return NextResponse.json({ error: "Giriş bilgileri hatalı." }, { status: 401, headers: { "Cache-Control":"no-store" } });
  const session = await response.json(); const result = NextResponse.json({ success: true });
  result.cookies.set(ADMIN_COOKIE, session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: session.expires_in }); return result;
}
