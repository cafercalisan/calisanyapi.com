import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { dbRequest } from "@/lib/supabase";
import { z } from "zod";
const schema = z.object({ id: z.string().uuid(), basePrice: z.number().min(0), pricePerM2: z.number().min(0), active: z.boolean() });
export async function PATCH(request: Request) { if (!(await verifyAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 }); const payload=await request.json(); if (process.env.DEMO_ADMIN_ENABLED === "true") return NextResponse.json({success:true,demo:true}); const parsed=schema.safeParse(payload); if(!parsed.success)return NextResponse.json({error:"Geçersiz ürün bilgisi."},{status:400}); const p=parsed.data; await dbRequest(`products?id=eq.${p.id}`,{method:"PATCH",body:JSON.stringify({base_price:p.basePrice,price_per_m2:p.pricePerM2,active:p.active})}); return NextResponse.json({success:true}); }
