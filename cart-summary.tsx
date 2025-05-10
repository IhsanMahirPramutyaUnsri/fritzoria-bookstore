"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CartSummary() {
  const { cartItems, totalPrice } = useCart()
  const { user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Kode promo kosong",
        description: "Silakan masukkan kode promo",
        variant: "destructive",
      })
      return
    }

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "DISKON10") {
        const discountAmount = totalPrice * 0.1
        setDiscount(discountAmount)
        toast({
          title: "Kode promo berhasil",
          description: "Diskon 10% telah diterapkan",
        })
      } else if (promoCode.toUpperCase() === "DISKON20") {
        const discountAmount = totalPrice * 0.2
        setDiscount(discountAmount)
        toast({
          title: "Kode promo berhasil",
          description: "Diskon 20% telah diterapkan",
        })
      } else {
        toast({
          title: "Kode promo tidak valid",
          description: "Silakan periksa kembali kode promo Anda",
          variant: "destructive",
        })
      }

      setIsApplyingPromo(false)
    }, 1000)
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk melanjutkan ke pembayaran",
        variant: "destructive",
      })
      router.push("/login?redirect=checkout")
      return
    }

    if (cartItems.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan buku ke keranjang untuk melanjutkan ke pembayaran",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  const finalTotal = totalPrice - discount

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("cart.total")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon</span>
              <span>-Rp {discount.toLocaleString("id-ID")}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Pengiriman</span>
            <span>Dihitung saat checkout</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium text-lg">
          <span>{t("cart.total")}</span>
          <span>Rp {finalTotal.toLocaleString("id-ID")}</span>
        </div>

        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Kode Promo</p>
          <div className="flex gap-2">
            <Input placeholder="Masukkan kode promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            <Button variant="outline" onClick={handleApplyPromo} disabled={isApplyingPromo}>
              {isApplyingPromo ? "..." : "Terapkan"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleCheckout} disabled={cartItems.length === 0}>
          {t("cart.checkout")}
        </Button>
      </CardFooter>
    </Card>
  )
}
