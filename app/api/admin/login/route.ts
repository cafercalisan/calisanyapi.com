import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (process.env.DEMO_ADMIN_ENABLED === "true") {
    const validEmail = String(email).toLowerCase() === String(process.env.DEMO_ADMIN_EMAIL).toLowerCase();
    const validPassword = password === process.env.DEMO_ADMIN_PASSWORD;
    if (!validEmail || !validPassword) return NextResponse.json({ error: "Demo giriş bilgileri hatalı." }, { status: 401 });
    const result = NextResponse.json({ success: true, demo: true });
    result.cookies.set(ADMIN_COOKIE, "demo-local-session", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 });
    return result;
  }
  if (String(email).toLowerCase() !== String(process.env.ADMIN_EMAIL).toLowerCase()) return NextResponse.json({ error: "Giriş bilgileri hatalı." }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return NextResponse.json({ error: "Supabase Auth yapılandırılmadı." }, { status: 503 });
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: anon, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!response.ok) return NextResponse.json({ error: "Giriş bilgileri hatalı." }, { status: 401 });
  const session = await response.json(); const result = NextResponse.json({ success: true });
  result.cookies.set(ADMIN_COOKIE, session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: session.expires_in }); return result;
}
