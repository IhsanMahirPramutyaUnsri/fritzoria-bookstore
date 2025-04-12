import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AccountProfile from "@/components/account-profile"
import AccountMenu from "@/components/account-menu"

export const metadata: Metadata = {
  title: "Akun Saya | Fritzoria",
  description: "Kelola akun dan pesanan Anda di Fritzoria",
}

export default async function AccountPage() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?redirect=account")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Akun Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <AccountMenu />
        <AccountProfile />
      </div>
    </div>
  )
}
