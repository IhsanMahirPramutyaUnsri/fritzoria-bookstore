import { Suspense } from "react"
import Hero from "@/components/hero"
import NewReleases from "@/components/new-releases"
import Bestsellers from "@/components/bestsellers"
import Promotions from "@/components/promotions"
import Categories from "@/components/categories"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Categories />
      <Suspense fallback={<SectionSkeleton />}>
        <NewReleases />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Bestsellers />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Promotions />
      </Suspense>
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="my-8">
      <Skeleton className="h-10 w-48 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
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
    </div>
  )
}
