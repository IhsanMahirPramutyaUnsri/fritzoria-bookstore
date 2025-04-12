"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  book: {
    id: string
    title: string
    author: string
    price: number
    coverImage: string
  }
  className?: string
}

export default function AddToCartButton({ book, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(book)

    // Reset animation after a delay
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button onClick={handleAddToCart} className={cn("gap-2", className)} disabled={isAdding}>
      <ShoppingCart className="h-5 w-5" />
      <span>{isAdding ? "Ditambahkan!" : "Tambah ke Keranjang"}</span>
    </Button>
  )
}
