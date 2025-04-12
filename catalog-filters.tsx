"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, X, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

const popularAuthors = [
  { id: "tere-liye", name: "Tere Liye" },
  { id: "dee-lestari", name: "Dee Lestari" },
  { id: "andrea-hirata", name: "Andrea Hirata" },
  { id: "eka-kurniawan", name: "Eka Kurniawan" },
  { id: "raditya-dika", name: "Raditya Dika" },
  { id: "fiersa-besari", name: "Fiersa Besari" },
]

export default function CatalogFilters() {
  const { language, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 500000])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Initialize filters from URL params
  useEffect(() => {
    const author = searchParams.get("author")
    if (author && author !== selectedAuthors.join(",")) {
      setSelectedAuthors(author.split(","))
    }

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (
      minPrice &&
      maxPrice &&
      (Number.parseInt(minPrice) !== priceRange[0] || Number.parseInt(maxPrice) !== priceRange[1])
    ) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
    }

    const rating = searchParams.get("rating")
    if (rating && Number.parseInt(rating) !== selectedRating) {
      setSelectedRating(Number.parseInt(rating))
    }
  }, [searchParams, selectedAuthors, priceRange, selectedRating])

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

    // Update author filter
    if (selectedAuthors.length > 0) {
      const authorParam = selectedAuthors.join(",")
      if (params.get("author") !== authorParam) {
        params.set("author", authorParam)
        hasChanges = true
      }
    } else if (params.has("author")) {
      params.delete("author")
      hasChanges = true
    }

    // Update price range filter
    const minPriceStr = priceRange[0].toString()
    const maxPriceStr = priceRange[1].toString()
    if (params.get("minPrice") !== minPriceStr) {
      params.set("minPrice", minPriceStr)
      hasChanges = true
    }
    if (params.get("maxPrice") !== maxPriceStr) {
      params.set("maxPrice", maxPriceStr)
      hasChanges = true
    }

    // Update rating filter
    if (selectedRating) {
      const ratingStr = selectedRating.toString()
      if (params.get("rating") !== ratingStr) {
        params.set("rating", ratingStr)
        hasChanges = true
      }
    } else if (params.has("rating")) {
      params.delete("rating")
      hasChanges = true
    }

    // Reset to page 1 when filters change
    if (params.has("page")) {
      params.delete("page")
      hasChanges = true
    }

    // Only navigate if there are actual changes
    if (hasChanges) {
      router.push(`/catalog?${params.toString()}`)
    }

    // Close the sheet on mobile
    setIsOpen(false)
  }

  const resetFilters = () => {
    setSelectedAuthors([])
    setPriceRange([0, 500000])
    setSelectedRating(null)

    // Preserve the category parameter when resetting other filters
    const category = searchParams.get("category")
    if (category) {
      router.push(`/catalog?category=${category}`)
    } else {
      router.push("/catalog")
    }
  }

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors((prev) => (prev.includes(authorId) ? prev.filter((id) => id !== authorId) : [...prev, authorId]))
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating))
  }

  const isFiltered =
    selectedAuthors.length > 0 || priceRange[0] > 0 || priceRange[1] < 500000 || selectedRating !== null

  // Count active filters
  const activeFilterCount =
    (selectedAuthors.length > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0) +
    (selectedRating !== null ? 1 : 0)

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span>Filter</span>
              <div className="flex items-center">
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                    {activeFilterCount}
                  </span>
                )}
                <SlidersHorizontal className="h-4 w-4" />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Buku</SheetTitle>
              <SheetDescription>Sesuaikan pencarian buku Anda dengan filter berikut</SheetDescription>
            </SheetHeader>

            <div className="py-4 space-y-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Harga</Label>
                <Slider
                  value={priceRange}
                  min={0}
                  max={500000}
                  step={10000}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="min-price-mobile" className="text-xs text-muted-foreground">
                      Min
                    </Label>
                    <Input
                      id="min-price-mobile"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="h-8 w-24"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price-mobile" className="text-xs text-muted-foreground">
                      Max
                    </Label>
                    <Input
                      id="max-price-mobile"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="h-8 w-24"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Rating</Label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleRatingClick(rating)}
                    >
                      <div className={`p-1 rounded-md ${selectedRating === rating ? "bg-primary/10" : ""}`}>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <span className="text-sm">
                        {rating} {rating === 1 ? "bintang" : "bintang"} ke atas
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Penulis</Label>
                <div className="space-y-2">
                  {popularAuthors.map((author) => (
                    <div key={author.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`author-mobile-${author.id}`}
                        checked={selectedAuthors.includes(author.id)}
                        onCheckedChange={() => toggleAuthor(author.id)}
                      />
                      <Label htmlFor={`author-mobile-${author.id}`} className="text-sm font-normal cursor-pointer">
                        {author.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="flex-row gap-3 sm:justify-between">
              {isFiltered && (
                <Button variant="outline" size="sm" onClick={resetFilters} className="flex-1">
                  Reset <X className="ml-2 h-4 w-4" />
                </Button>
              )}
              <SheetClose asChild>
                <Button onClick={applyFilters} className="flex-1">
                  Terapkan Filter
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
