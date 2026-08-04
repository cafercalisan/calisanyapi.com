import { cookies } from "next/headers";

export const ADMIN_COOKIE = "cy_admin_token";
export async function verifyAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (process.env.DEMO_ADMIN_ENABLED === "true" && token === "demo-local-session") return true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !anon) return false;
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) return false; const user = await response.json(); return String(user.email).toLowerCase() === String(process.env.ADMIN_EMAIL).toLowerCase();
}
