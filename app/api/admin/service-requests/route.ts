import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { dbRequest } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({ id: z.string().uuid(), status: z.enum(["new", "contacted", "quoted", "won", "lost"]) }).strict();

export async function PATCH(request: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
  const { id, status } = parsed.data;
  await dbRequest(`service_requests?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  });
  return NextResponse.json({ success: true });
}
