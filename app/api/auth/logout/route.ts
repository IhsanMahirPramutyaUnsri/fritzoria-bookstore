import { NextResponse } from "next/server"

export async function POST() {
  // In a real app, this would invalidate the session
  return NextResponse.json({ success: true })
}
