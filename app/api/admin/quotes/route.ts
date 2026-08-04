import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { dbRequest } from "@/lib/supabase";
const statuses = new Set(["new", "contacted", "verified", "approved", "rejected", "cancelled"]);
export async function PATCH(request: Request) { if (!(await verifyAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 }); const { id, status } = await request.json(); if (!id || !statuses.has(status)) return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 }); if (process.env.DEMO_ADMIN_ENABLED === "true") return NextResponse.json({ success: true, demo: true }); await dbRequest(`quotes?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) }); return NextResponse.json({ success: true }); }
