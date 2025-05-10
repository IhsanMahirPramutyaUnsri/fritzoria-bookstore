import { getBooks } from "@/lib/books"
import BookCard from "@/components/book-card"
import BookSorter from "@/components/book-sorter"
import Pagination from "@/components/pagination"

interface BookGridProps {
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
}

export default async function BookGrid({ searchParams }: BookGridProps) {
  const { books, totalBooks, totalPages } = await getBooks({
    search: searchParams.search,
    category: searchParams.category,
    author: searchParams.author,
    minPrice: searchParams.minPrice ? Number.parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice) : undefined,
    rating: searchParams.rating ? Number.parseInt(searchParams.rating) : undefined,
    sort: searchParams.sort || "featured",
    page: searchParams.page ? Number.parseInt(searchParams.page) : 1,
  })

  const currentPage = searchParams.page ? Number.parseInt(searchParams.page) : 1

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-muted-foreground">
          Menampilkan <span className="font-medium text-foreground">{books.length}</span> dari{" "}
          <span className="font-medium text-foreground">{totalBooks}</span> buku
        </p>

        <BookSorter currentSort={searchParams.sort || "featured"} />
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg font-medium">Tidak ada buku yang ditemukan</p>
          <p className="text-muted-foreground mt-1">Coba ubah filter atau kata kunci pencarian Anda</p>
        </div>
      )}

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  )
}
