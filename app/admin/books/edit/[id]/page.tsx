import { redirect, notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getBookById } from "@/lib/books"
import BookForm from "@/components/admin/book-form"

export const metadata = {
  title: "Edit Book | Admin Dashboard",
  description: "Edit a book in the Fritzoria bookstore",
}

export default async function EditBookPage({ params }: { params: { id: string } }) {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login?redirect=admin/books/edit/" + params.id)
  }

  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Book</h1>
      <BookForm book={book} isEditing />
    </div>
  )
}
