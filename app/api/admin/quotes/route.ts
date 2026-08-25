import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { dbRequest } from "@/lib/supabase";
import { z } from "zod";
const schema = z.object({ id: z.string().uuid(), status: z.enum(["new", "contacted", "verified", "approved", "rejected", "cancelled"]) }).strict();
export async function PATCH(request: Request) { if (!(await verifyAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 }); const parsed=schema.safeParse(await request.json()); if(!parsed.success)return NextResponse.json({error:"Geçersiz durum."},{status:400}); const {id,status}=parsed.data; if (process.env.DEMO_ADMIN_ENABLED === "true") return NextResponse.json({ success: true, demo: true }); await dbRequest(`quotes?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) }); return NextResponse.json({ success: true }); }
