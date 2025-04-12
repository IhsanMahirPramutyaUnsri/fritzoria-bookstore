import { getRelatedBooks } from "@/lib/books"
import BookCard from "@/components/book-card"

interface RelatedBooksProps {
  bookId: string
  categories: string[]
}

export default async function RelatedBooks({ bookId, categories }: RelatedBooksProps) {
  const relatedBooks = await getRelatedBooks(bookId, categories)

  if (relatedBooks.length === 0) {
    return null
  }

  return (
    <section className="py-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Buku Terkait</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {relatedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
