// src/app/api/auth/session/route.ts
import { verifySession } from "@/_lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ fname: null });
    }
    return NextResponse.json({
      fname: session.fname,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ fname: null }, { status: 500 });
  }
}
