"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import BookCard from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { getNewReleases } from "@/lib/books"

export default async function NewReleases() {
  const books = await getNewReleases()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewReleasesContent books={books} />
    </Suspense>
  )
}

function NewReleasesContent({ books }) {
  const { t } = useLanguage()

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t("home.newReleases")}</h2>
        <Button asChild variant="ghost" className="gap-1">
          <Link href="/catalog?filter=new">
            Lihat Semua <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
