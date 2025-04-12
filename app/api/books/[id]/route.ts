import { NextResponse } from "next/server"
import { getBookById, updateBook, deleteBook } from "@/lib/models/book"
import { validateBook } from "@/lib/validators/book-validator"

// GET a specific book
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const book = await getBookById(params.id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

// PUT (update) a book
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookData = await request.json()

    // Validate book data
    const validationResult = validateBook(bookData, true)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.errors }, { status: 400 })
    }

    // Update book in database
    const updatedBook = await updateBook(params.id, bookData)

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

// DELETE a book
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deleteBook(params.id)

    if (!success) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}
