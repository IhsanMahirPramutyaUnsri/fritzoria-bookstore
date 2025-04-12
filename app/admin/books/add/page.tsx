import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import BookForm from "@/components/admin/book-form"

export const metadata = {
  title: "Add New Book | Admin Dashboard",
  description: "Add a new book to the Fritzoria bookstore",
}

export default async function AddBookPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login?redirect=admin/books/add")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
      <BookForm />
    </div>
  )
}
