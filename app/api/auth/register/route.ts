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
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ message: "Semua field diperlukan" }), { status: 400 })
    }

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email)

    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "Email sudah terdaftar" }), { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
    }

    // Add to users array (in a real app, this would be a database operation)
    users.push(newUser)

    // Return user data without password
    const { password: _, ...userData } = newUser

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Registration error:", error)
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan saat registrasi" }), { status: 500 })
  }
}
