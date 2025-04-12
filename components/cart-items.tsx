"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, ShoppingBag } from "lucide-react"

export default function CartItems() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const { t } = useLanguage()
  const [quantities, setQuantities] = useState<Record<string, string>>({})

  const handleQuantityChange = (id: string, value: string) => {
    setQuantities({ ...quantities, [id]: value })

    const quantity = Number.parseInt(value)
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">{t("cart.empty")}</h2>
        <p className="text-muted-foreground mb-6">Tambahkan buku ke keranjang untuk mulai berbelanja</p>
        <Button asChild>
          <Link href="/catalog">{t("cart.continue")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
          <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded bg-muted">
            <Image src={item.coverImage || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">
                  <Link href={`/books/${item.id}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{item.author}</p>
              </div>
              <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                  Quantity
                </label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={quantities[item.id] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 h-8"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
