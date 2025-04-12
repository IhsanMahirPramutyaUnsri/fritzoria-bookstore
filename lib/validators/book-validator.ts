import type { Book } from "@/lib/models/book"

export function validateBook(data: Partial<Book>, isUpdate = false): { success: boolean; errors?: string[] } {
  const errors: string[] = []

  // Required fields check (only for creation, not update)
  if (!isUpdate) {
    if (!data.title || data.title.trim() === "") {
      errors.push("Title is required")
    }

    if (!data.author || data.author.trim() === "") {
      errors.push("Author is required")
    }

    if (data.price === undefined || data.price <= 0) {
      errors.push("Price must be a positive number")
    }
  }

  // Validation for optional fields if they are provided
  if (data.title !== undefined && data.title.trim() === "") {
    errors.push("Title cannot be empty")
  }

  if (data.author !== undefined && data.author.trim() === "") {
    errors.push("Author cannot be empty")
  }

  if (data.price !== undefined && data.price <= 0) {
    errors.push("Price must be a positive number")
  }

  if (data.originalPrice !== undefined && data.originalPrice <= 0) {
    errors.push("Original price must be a positive number")
  }

  if (data.publishYear !== undefined && (data.publishYear < 1000 || data.publishYear > new Date().getFullYear() + 1)) {
    errors.push(`Publish year must be between 1000 and ${new Date().getFullYear() + 1}`)
  }

  if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
    errors.push("Rating must be between 0 and 5")
  }

  if (data.stock !== undefined && data.stock < 0) {
    errors.push("Stock cannot be negative")
  }

  if (data.pageCount !== undefined && data.pageCount <= 0) {
    errors.push("Page count must be a positive number")
  }

  if (data.weight !== undefined && data.weight <= 0) {
    errors.push("Weight must be a positive number")
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  }
}
