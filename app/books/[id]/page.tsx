import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getBookById } from "@/lib/books"
import AddToCartButton from "@/components/add-to-cart-button"
import BookReviews from "@/components/book-reviews"
import RelatedBooks from "@/components/related-books"
import { Star, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BookPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await getBookById(params.id)

  if (!book) {
    return {
      title: "Buku tidak ditemukan | Fritzoria",
    }
  }

  return {
    title: `${book.title} | Fritzoria`,
    description: book.synopsis.substring(0, 160),
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center md:justify-start">
          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg border bg-muted">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">
              oleh <span className="text-foreground">{book.author}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < book.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                  />
                ))}
            </div>
            <span className="text-muted-foreground">({book.reviewCount} ulasan)</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">Rp {book.price.toLocaleString("id-ID")}</span>
            {book.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                Rp {book.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
            {book.originalPrice && (
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="space-y-4 py-4 border-t border-b">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Penerbit</p>
                <p>{book.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tahun Terbit</p>
                <p>{book.publishYear}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jumlah Halaman</p>
                <p>{book.pageCount} halaman</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bahasa</p>
                <p>{book.language}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck className="h-5 w-5" />
              <span>Tersedia {book.stock} stok</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Pengiriman 1-3 hari kerja</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton book={book} className="flex-1" />
            <Button variant="outline" className="flex-1">
              Tambah ke Wishlist
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="synopsis" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="synopsis"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Sinopsis
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Detail Buku
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Ulasan ({book.reviewCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="synopsis" className="pt-6">
          <div className="prose max-w-none">
            <p>{book.synopsis}</p>
          </div>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Informasi Dasar</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Judul</span>
                    <span>{book.title}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Penulis</span>
                    <span>{book.author}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Penerbit</span>
                    <span>{book.publisher}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Tahun Terbit</span>
                    <span>{book.publishYear}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Bahasa</span>
                    <span>{book.language}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Spesifikasi</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Jumlah Halaman</span>
                    <span>{book.pageCount} halaman</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Dimensi</span>
                    <span>{book.dimensions}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">ISBN</span>
                    <span>{book.isbn}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Berat</span>
                    <span>{book.weight} gram</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Kategori</span>
                    <span>{book.categories.join(", ")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <BookReviews bookId={book.id} />
        </TabsContent>
      </Tabs>

      <RelatedBooks bookId={book.id} categories={book.categories} />
    </div>
  )
}
