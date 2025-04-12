import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/db-setup"

export async function POST(request: Request) {
  try {
    // Check for authorization (in a real app, you'd use a more secure method)
    const { searchParams } = new URL(request.url)
    const key = searchParams.get("key")

    if (key !== process.env.DB_INIT_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await setupDatabase()

    return NextResponse.json({ message: "Database initialized successfully" })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
