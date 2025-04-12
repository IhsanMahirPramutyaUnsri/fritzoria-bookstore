"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/admin/image-upload"
import type { Book } from "@/lib/models/book"

interface BookFormProps {
  book?: Partial<Book>
  isEditing?: boolean
}

export default function BookForm({ book, isEditing = false }: BookFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(book?.coverImage || null)

  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    publisher: book?.publisher || "",
    publishYear: book?.publishYear || new Date().getFullYear(),
    price: book?.price || 0,
    originalPrice: book?.originalPrice || 0,
    synopsis: book?.synopsis || "",
    categories: book?.categories || [],
    isNew: book?.isNew || false,
    isBestseller: book?.isBestseller || false,
    language: book?.language || "Indonesia",
    pageCount: book?.pageCount || 0,
    dimensions: book?.dimensions || "",
    isbn: book?.isbn || "",
    weight: book?.weight || 0,
    stock: book?.stock || 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "originalPrice" ||
        name === "publishYear" ||
        name === "pageCount" ||
        name === "weight" ||
        name === "stock"
          ? Number(value)
          : value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((cat) => cat !== category),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the book data
      const bookData = {
        ...formData,
        coverImage,
        id: book?.id || undefined,
      }

      // Send to API
      const response = await fetch(`/api/books${isEditing && book?.id ? `/${book.id}` : ""}`, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.join(", ") || "Failed to save book")
      }

      toast({
        title: isEditing ? "Book updated" : "Book added",
        description: isEditing ? "The book has been updated successfully" : "The book has been added to the catalog",
      })

      // Redirect to book list
      router.push("/admin/books")
      router.refresh()
    } catch (error) {
      console.error("Error saving book:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save book. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableCategories = [
    { id: "manga", label: "Manga" },
    { id: "light-novel", label: "Light Novel" },
    { id: "fiction", label: "Fiction" },
    { id: "non-fiction", label: "Non-Fiction" },
    { id: "education", label: "Education" },
    { id: "romance", label: "Romance" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "self-help", label: "Self-Help" },
    { id: "international", label: "International" },
    { id: "cooking", label: "Cooking" },
    { id: "children", label: "Children" },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Book" : "Add New Book"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
            {/* Image Upload */}
            <ImageUpload initialImage={book?.coverImage} onImageChange={(url) => setCoverImage(url)} />

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input id="publisher" name="publisher" value={formData.publisher} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishYear">Publish Year</Label>
                  <Input
                    id="publishYear"
                    name="publishYear"
                    type="number"
                    value={formData.publishYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rp) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (Rp)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice || ""}
                    onChange={handleInputChange}
                    placeholder="Leave empty if no discount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" name="language" value={formData.language} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageCount">Page Count</Label>
              <Input
                id="pageCount"
                name="pageCount"
                type="number"
                value={formData.pageCount}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (grams)</Label>
              <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} />
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-2">
            <Label htmlFor="synopsis">Synopsis</Label>
            <Textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleInputChange} rows={5} />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={formData.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <Label>Flags</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isNew"
                  checked={formData.isNew}
                  onCheckedChange={(checked) => handleCheckboxChange("isNew", checked as boolean)}
                />
                <Label htmlFor="isNew" className="text-sm font-normal cursor-pointer">
                  Mark as New Release
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isBestseller"
                  checked={formData.isBestseller}
                  onCheckedChange={(checked) => handleCheckboxChange("isBestseller", checked as boolean)}
                />
                <Label htmlFor="isBestseller" className="text-sm font-normal cursor-pointer">
                  Mark as Bestseller
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Book" : "Add Book"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
