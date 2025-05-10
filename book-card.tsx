"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export type Book = {
  id: string
  title: string
  author: string
  price: number
  originalPrice?: number
  coverImage: string
  rating: number
  isNew?: boolean
  isBestseller?: boolean
}

interface BookCardProps {
  book: Book
  className?: string
}

export default function BookCard({ book, className }: BookCardProps) {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
    })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  // Determine the image source - use the book's coverImage if it's a full URL
  // or fallback to a placeholder if there's an error or no image
  const imageSource =
    imageError || !book.coverImage
      ? `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(book.title)}`
      : book.coverImage

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md",
        className,
      )}
    >
      <Link href={`/books/${book.id}`} className="flex flex-col h-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted p-2">
          <Image
            src={imageSource || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/80 text-foreground hover:bg-white"
              onClick={toggleWishlist}
            >
              <Heart className={cn("h-4 w-4", isWishlisted ? "fill-red-500 text-red-500" : "")} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-end gap-1">
              <span className="font-medium">Rp {book.price.toLocaleString("id-ID")}</span>
              {book.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  Rp {book.originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">{t("book.addToCart")}</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}
