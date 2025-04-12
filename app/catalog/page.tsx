import { Suspense } from "react"
import type { Metadata } from "next"
import CatalogFilters from "@/components/catalog-filters"
import BookGrid from "@/components/book-grid"
import CategoryDropdown from "@/components/category-dropdown"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Katalog Buku | Fritzoria",
  description: "Jelajahi koleksi buku terlengkap di Fritzoria",
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    category?: string
    author?: string
    minPrice?: string
    maxPrice?: string
    rating?: string
    sort?: string
    page?: string
  }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Katalog Buku</h1>

      {/* Category Dropdown - Prominently displayed at the top */}
      <div className="mb-6">
        <CategoryDropdown selectedCategory={searchParams.category} />
      </div>

      <div className="space-y-6">
        {/* Additional filters */}
        <CatalogFilters />

        <div>
          <Suspense fallback={<BookGridSkeleton />}>
            <BookGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function BookGridSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-8">
        <Skeleton className="h-10 w-80" />
      </div>
    </div>
  )
}
