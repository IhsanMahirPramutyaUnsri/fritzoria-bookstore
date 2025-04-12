import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminDashboard from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | Fritzoria",
  description: "Admin dashboard for Fritzoria bookstore",
}

export default async function AdminPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login?redirect=admin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}
