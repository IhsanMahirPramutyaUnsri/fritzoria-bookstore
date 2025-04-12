import { createBook } from "../lib/models/book"
import { booksData } from "../lib/books"

async function main() {
  try {
    console.log("Starting book import...")

    let successCount = 0
    let errorCount = 0

    for (const book of booksData) {
      try {
        // Convert the book data to match our database schema
        const bookData = {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          publishYear: book.publishYear,
          price: book.price,
          originalPrice: book.originalPrice,
          coverImage: book.coverImage,
          rating: book.rating,
          reviewCount: book.reviewCount,
          stock: book.stock,
          isNew: book.isNew,
          isBestseller: book.isBestseller,
          language: book.language,
          pageCount: book.pageCount,
          dimensions: book.dimensions,
          isbn: book.isbn,
          weight: book.weight,
          synopsis: book.synopsis,
          categories: book.categories,
        }

        await createBook(bookData)
        successCount++
        console.log(`Imported: ${book.title}`)
      } catch (error) {
        console.error(`Error importing book "${book.title}":`, error)
        errorCount++
      }
    }

    console.log(`Book import completed. Success: ${successCount}, Errors: ${errorCount}`)
    process.exit(0)
  } catch (error) {
    console.error("Error during book import:", error)
    process.exit(1)
  }
}

main()
