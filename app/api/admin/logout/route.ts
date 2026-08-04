import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin";
export async function POST(request: Request) { const response = NextResponse.redirect(new URL("/yonetim", request.url)); response.cookies.delete(ADMIN_COOKIE); return response; }
