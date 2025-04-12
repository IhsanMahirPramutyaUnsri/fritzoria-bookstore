import { NextResponse } from "next/server"
import { getAllBooks, createBook } from "@/lib/models/book"
import { validateBook } from "@/lib/validators/book-validator"

// GET all books
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const author = searchParams.get("author") || undefined
    const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
    const rating = searchParams.get("rating") ? Number.parseInt(searchParams.get("rating")!) : undefined
    const sort = searchParams.get("sort") || undefined
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : undefined
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const result = await getAllBooks({
      search,
      category,
      author,
      minPrice,
      maxPrice,
      rating,
      sort,
      page,
      limit,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

// POST a new book
export async function POST(request: Request) {
  try {
    const bookData = await request.json()

    // Validate book data
    const validationResult = validateBook(bookData)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.errors }, { status: 400 })
    }

    // Create book in database
    const newBook = await createBook(bookData)

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}
