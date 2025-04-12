"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { User, ShoppingBag, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react"

export default function AccountMenu() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    { href: "/account", label: "Profil", icon: User },
    { href: "/account/orders", label: "Pesanan Saya", icon: ShoppingBag },
    { href: "/account/wishlist", label: "Wishlist", icon: Heart },
    { href: "/account/addresses", label: "Alamat", icon: MapPin },
    { href: "/account/payment", label: "Metode Pembayaran", icon: CreditCard },
    { href: "/account/settings", label: "Pengaturan", icon: Settings },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </div>

      <Button
        variant="outline"
        className="w-full justify-start text-destructive hover:text-destructive"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Keluar
      </Button>
    </div>
  )
}
