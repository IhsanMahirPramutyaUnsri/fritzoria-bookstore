import { NextResponse } from "next/server"

// Mock user data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ message: "Email dan password diperlukan" }), { status: 400 })
    }

    // Find user
    const user = users.find((user) => user.email === email)

    if (!user || user.password !== password) {
      return new NextResponse(JSON.stringify({ message: "Email atau password salah" }), { status: 401 })
    }

    // Return user data without password
    const { password: _, ...userData } = user

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Login error:", error)
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan saat login" }), { status: 500 })
  }
}
