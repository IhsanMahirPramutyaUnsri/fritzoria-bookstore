"use client"

import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSummary() {
  const { cartItems, totalPrice } = useCart()

  // Calculate shipping cost based on default shipping method
  const shippingCost = 15000

  // Calculate final total
  const finalTotal = totalPrice + shippingCost

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-muted">
                <Image src={item.coverImage || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium leading-none">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.quantity} x Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="text-sm font-medium">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Pengiriman</span>
            <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>Rp {finalTotal.toLocaleString("id-ID")}</span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
      </CardFooter>
    </Card>
  )
}
