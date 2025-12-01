/**
 * NextAuth route handler - DISABLED
 * We're now using backend JWT authentication instead
 * This route is kept for backward compatibility but returns 404
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "NextAuth is disabled. Use /login for authentication." },
    { status: 404 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "NextAuth is disabled. Use /login for authentication." },
    { status: 404 }
  );
}
