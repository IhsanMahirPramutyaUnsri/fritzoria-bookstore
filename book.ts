import { query } from "../db"
import { nanoid } from "nanoid"

export interface Book {
  id: string
  title: string
  author: string
  publisher?: string
  publishYear?: number
  price: number
  originalPrice?: number
  coverImage?: string
  rating?: number
  reviewCount?: number
  stock?: number
  isNew?: boolean
  isBestseller?: boolean
  language?: string
  pageCount?: number
  dimensions?: string
  isbn?: string
  weight?: number
  synopsis?: string
  categories?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export async function getAllBooks(
  options: {
    search?: string
    category?: string
    author?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    sort?: string
    page?: number
    limit?: number
  } = {},
) {
  const { search, category, author, minPrice, maxPrice, rating, sort = "featured", page = 1, limit = 12 } = options

  let sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    LEFT JOIN 
      book_categories bc ON b.id = bc.book_id
  `

  const whereConditions = []
  const queryParams: any[] = []

  // Add search condition
  if (search) {
    whereConditions.push("(b.title LIKE ? OR b.author LIKE ?)")
    queryParams.push(`%${search}%`, `%${search}%`)
  }

  // Add category condition
  if (category) {
    sql += `
      INNER JOIN book_categories bc2 ON b.id = bc2.book_id
      INNER JOIN categories c ON bc2.category_id = c.id
    `
    whereConditions.push("c.id = ?")
    queryParams.push(category)
  }

  // Add author condition
  if (author) {
    whereConditions.push("b.author = ?")
    queryParams.push(author)
  }

  // Add price range conditions
  if (minPrice !== undefined) {
    whereConditions.push("b.price >= ?")
    queryParams.push(minPrice)
  }

  if (maxPrice !== undefined) {
    whereConditions.push("b.price <= ?")
    queryParams.push(maxPrice)
  }

  // Add rating condition
  if (rating !== undefined) {
    whereConditions.push("b.rating >= ?")
    queryParams.push(rating)
  }

  // Add WHERE clause if there are conditions
  if (whereConditions.length > 0) {
    sql += " WHERE " + whereConditions.join(" AND ")
  }

  // Add GROUP BY to handle the GROUP_CONCAT
  sql += " GROUP BY b.id"

  // Add ORDER BY clause based on sort parameter
  switch (sort) {
    case "newest":
      sql += " ORDER BY b.publish_year DESC, b.created_at DESC"
      break
    case "price-asc":
      sql += " ORDER BY b.price ASC"
      break
    case "price-desc":
      sql += " ORDER BY b.price DESC"
      break
    case "rating":
      sql += " ORDER BY b.rating DESC"
      break
    case "featured":
    default:
      sql += " ORDER BY b.is_bestseller DESC, b.rating DESC"
      break
  }

  // Get total count for pagination
  const countSql = `
    SELECT COUNT(DISTINCT b.id) as total
    FROM books b
    ${category ? "INNER JOIN book_categories bc2 ON b.id = bc2.book_id INNER JOIN categories c ON bc2.category_id = c.id" : ""}
    ${whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : ""}
  `

  const countResult: any = await query(countSql, queryParams)
  const totalBooks = countResult[0].total
  const totalPages = Math.ceil(totalBooks / limit)

  // Add pagination
  const offset = (page - 1) * limit
  sql += " LIMIT ? OFFSET ?"
  queryParams.push(limit, offset)

  // Execute the query
  const results: any = await query(sql, queryParams)

  // Process the results to match the expected format
  const books = results.map((book: any) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }))

  return {
    books,
    totalBooks,
    totalPages,
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  const sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    LEFT JOIN 
      book_categories bc ON b.id = bc.book_id
    WHERE 
      b.id = ?
    GROUP BY 
      b.id
  `

  const results: any = await query(sql, [id])

  if (results.length === 0) {
    return null
  }

  const book = results[0]
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }
}

export async function getNewReleases(limit = 5): Promise<Book[]> {
  const sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    LEFT JOIN 
      book_categories bc ON b.id = bc.book_id
    WHERE 
      b.is_new = TRUE
    GROUP BY 
      b.id
    ORDER BY 
      b.publish_year DESC, b.created_at DESC
    LIMIT ?
  `

  const results: any = await query(sql, [limit])

  return results.map((book: any) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }))
}

export async function getBestsellers(limit = 5): Promise<Book[]> {
  const sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    LEFT JOIN 
      book_categories bc ON b.id = bc.book_id
    WHERE 
      b.is_bestseller = TRUE
    GROUP BY 
      b.id
    ORDER BY 
      b.rating DESC, b.review_count DESC
    LIMIT ?
  `

  const results: any = await query(sql, [limit])

  return results.map((book: any) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }))
}

export async function getPromotions(limit = 5): Promise<Book[]> {
  const sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    LEFT JOIN 
      book_categories bc ON b.id = bc.book_id
    WHERE 
      b.original_price IS NOT NULL AND b.original_price > b.price
    GROUP BY 
      b.id
    ORDER BY 
      (b.original_price - b.price) / b.original_price DESC
    LIMIT ?
  `

  const results: any = await query(sql, [limit])

  return results.map((book: any) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }))
}

export async function getRelatedBooks(bookId: string, categories: string[], limit = 5): Promise<Book[]> {
  if (!categories || categories.length === 0) {
    return []
  }

  const placeholders = categories.map(() => "?").join(",")

  const sql = `
    SELECT 
      b.*,
      GROUP_CONCAT(DISTINCT bc.category_id) AS categories
    FROM 
      books b
    INNER JOIN 
      book_categories bc ON b.id = bc.book_id
    WHERE 
      b.id != ? AND bc.category_id IN (${placeholders})
    GROUP BY 
      b.id
    ORDER BY 
      b.rating DESC
    LIMIT ?
  `

  const params = [bookId, ...categories, limit]
  const results: any = await query(sql, params)

  return results.map((book: any) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    publishYear: book.publish_year,
    price: Number.parseFloat(book.price),
    originalPrice: book.original_price ? Number.parseFloat(book.original_price) : undefined,
    coverImage: book.cover_image,
    rating: Number.parseFloat(book.rating),
    reviewCount: book.review_count,
    stock: book.stock,
    isNew: Boolean(book.is_new),
    isBestseller: Boolean(book.is_bestseller),
    language: book.language,
    pageCount: book.page_count,
    dimensions: book.dimensions,
    isbn: book.isbn,
    weight: book.weight,
    synopsis: book.synopsis,
    categories: book.categories ? book.categories.split(",") : [],
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  }))
}

export async function createBook(bookData: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book> {
  const id = bookData.id || `book-${nanoid(10)}`

  // Insert into books table
  const sql = `
    INSERT INTO books (
      id, title, author, publisher, publish_year, price, original_price,
      cover_image, rating, review_count, stock, is_new, is_bestseller,
      language, page_count, dimensions, isbn, weight, synopsis
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `

  const params = [
    id,
    bookData.title,
    bookData.author,
    bookData.publisher || null,
    bookData.publishYear || null,
    bookData.price,
    bookData.originalPrice || null,
    bookData.coverImage || null,
    bookData.rating || 0,
    bookData.reviewCount || 0,
    bookData.stock || 0,
    bookData.isNew || false,
    bookData.isBestseller || false,
    bookData.language || "Indonesia",
    bookData.pageCount || null,
    bookData.dimensions || null,
    bookData.isbn || null,
    bookData.weight || null,
    bookData.synopsis || null,
  ]

  await query(sql, params)

  // Insert categories if provided
  if (bookData.categories && bookData.categories.length > 0) {
    const categoryValues = bookData.categories.map((categoryId) => [id, categoryId])
    const placeholders = categoryValues.map(() => "(?, ?)").join(", ")

    const categorySql = `
      INSERT INTO book_categories (book_id, category_id)
      VALUES ${placeholders}
    `

    const categoryParams = categoryValues.flat()
    await query(categorySql, categoryParams)
  }

  // Return the created book
  return getBookById(id) as Promise<Book>
}

export async function updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
  // Check if book exists
  const existingBook = await getBookById(id)
  if (!existingBook) {
    return null
  }

  // Update books table
  const updateFields = []
  const updateParams = []

  if (bookData.title !== undefined) {
    updateFields.push("title = ?")
    updateParams.push(bookData.title)
  }

  if (bookData.author !== undefined) {
    updateFields.push("author = ?")
    updateParams.push(bookData.author)
  }

  if (bookData.publisher !== undefined) {
    updateFields.push("publisher = ?")
    updateParams.push(bookData.publisher)
  }

  if (bookData.publishYear !== undefined) {
    updateFields.push("publish_year = ?")
    updateParams.push(bookData.publishYear)
  }

  if (bookData.price !== undefined) {
    updateFields.push("price = ?")
    updateParams.push(bookData.price)
  }

  if (bookData.originalPrice !== undefined) {
    updateFields.push("original_price = ?")
    updateParams.push(bookData.originalPrice)
  }

  if (bookData.coverImage !== undefined) {
    updateFields.push("cover_image = ?")
    updateParams.push(bookData.coverImage)
  }

  if (bookData.rating !== undefined) {
    updateFields.push("rating = ?")
    updateParams.push(bookData.rating)
  }

  if (bookData.reviewCount !== undefined) {
    updateFields.push("review_count = ?")
    updateParams.push(bookData.reviewCount)
  }

  if (bookData.stock !== undefined) {
    updateFields.push("stock = ?")
    updateParams.push(bookData.stock)
  }

  if (bookData.isNew !== undefined) {
    updateFields.push("is_new = ?")
    updateParams.push(bookData.isNew)
  }

  if (bookData.isBestseller !== undefined) {
    updateFields.push("is_bestseller = ?")
    updateParams.push(bookData.isBestseller)
  }

  if (bookData.language !== undefined) {
    updateFields.push("language = ?")
    updateParams.push(bookData.language)
  }

  if (bookData.pageCount !== undefined) {
    updateFields.push("page_count = ?")
    updateParams.push(bookData.pageCount)
  }

  if (bookData.dimensions !== undefined) {
    updateFields.push("dimensions = ?")
    updateParams.push(bookData.dimensions)
  }

  if (bookData.isbn !== undefined) {
    updateFields.push("isbn = ?")
    updateParams.push(bookData.isbn)
  }

  if (bookData.weight !== undefined) {
    updateFields.push("weight = ?")
    updateParams.push(bookData.weight)
  }

  if (bookData.synopsis !== undefined) {
    updateFields.push("synopsis = ?")
    updateParams.push(bookData.synopsis)
  }

  if (updateFields.length > 0) {
    const sql = `
      UPDATE books
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `

    updateParams.push(id)
    await query(sql, updateParams)
  }

  // Update categories if provided
  if (bookData.categories !== undefined) {
    // Delete existing categories
    await query("DELETE FROM book_categories WHERE book_id = ?", [id])

    // Insert new categories
    if (bookData.categories.length > 0) {
      const categoryValues = bookData.categories.map((categoryId) => [id, categoryId])
      const placeholders = categoryValues.map(() => "(?, ?)").join(", ")

      const categorySql = `
        INSERT INTO book_categories (book_id, category_id)
        VALUES ${placeholders}
      `

      const categoryParams = categoryValues.flat()
      await query(categorySql, categoryParams)
    }
  }

  // Return the updated book
  return getBookById(id)
}

export async function deleteBook(id: string): Promise<boolean> {
  // Check if book exists
  const existingBook = await getBookById(id)
  if (!existingBook) {
    return false
  }

  // Delete the book (book_categories will be deleted via ON DELETE CASCADE)
  const sql = "DELETE FROM books WHERE id = ?"
  const result: any = await query(sql, [id])

  return result.affectedRows > 0
}
