import Link from "next/link"
import { getBooks } from "@/lib/books"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdminBookList from "@/components/admin/book-list"

export const metadata = {
  title: "Manage Books | Admin Dashboard",
  description: "Manage books in the Fritzoria bookstore",
}

export default async function AdminBooksPage() {
  const { books } = await getBooks({})

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Books</h1>
        <Button asChild>
          <Link href="/admin/books/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Book
          </Link>
        </Button>
      </div>

      <AdminBookList books={books} />
    </div>
  )
}
