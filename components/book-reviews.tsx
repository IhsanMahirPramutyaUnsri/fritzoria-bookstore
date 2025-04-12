"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "Budi Santoso",
    rating: 5,
    comment:
      "Buku ini sangat menarik dan inspiratif. Saya sangat menikmati setiap halaman dan ceritanya sangat mengalir. Penulis berhasil menggambarkan karakter dengan sangat baik.",
    date: "2023-12-15",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Siti Rahayu",
    rating: 4,
    comment:
      "Ceritanya bagus, tapi ada beberapa bagian yang menurut saya terlalu bertele-tele. Secara keseluruhan, buku ini layak dibaca.",
    date: "2023-11-20",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Ahmad Hidayat",
    rating: 5,
    comment: "Salah satu buku terbaik yang pernah saya baca tahun ini! Sangat direkomendasikan untuk semua orang.",
    date: "2023-10-05",
  },
]

interface BookReviewsProps {
  bookId: string
}

export default function BookReviews({ bookId }: BookReviewsProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reviews, setReviews] = useState(mockReviews)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }

  const handleRatingHover = (rating: number) => {
    setHoverRating(rating)
  }

  const handleRatingLeave = () => {
    setHoverRating(0)
  }

  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk memberikan ulasan",
        variant: "destructive",
      })
      return
    }

    if (userRating === 0) {
      toast({
        title: "Rating diperlukan",
        description: "Silakan berikan rating untuk buku ini",
        variant: "destructive",
      })
      return
    }

    if (reviewText.trim() === "") {
      toast({
        title: "Ulasan diperlukan",
        description: "Silakan tulis ulasan Anda tentang buku ini",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: `review-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        rating: userRating,
        comment: reviewText,
        date: new Date().toISOString().split("T")[0],
      }

      setReviews([newReview, ...reviews])
      setUserRating(0)
      setReviewText("")
      setIsSubmitting(false)

      toast({
        title: "Ulasan berhasil dikirim",
        description: "Terima kasih atas ulasan Anda",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8">
      {user ? (
        <div className="space-y-4 p-6 border rounded-lg">
          <h3 className="text-lg font-medium">Tulis Ulasan</h3>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Rating</p>
            <div className="flex gap-1" onMouseLeave={handleRatingLeave}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  onMouseEnter={() => handleRatingHover(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      (hoverRating || userRating) >= rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Ulasan</p>
            <Textarea
              placeholder="Bagikan pendapat Anda tentang buku ini..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleSubmitReview} disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
          </Button>
        </div>
      ) : (
        <div className="p-6 border rounded-lg text-center">
          <p className="mb-4">Silakan login untuk memberikan ulasan</p>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Ulasan Pembaca</h3>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <h4 className="font-medium">{review.userName}</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          {new Date(review.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Belum ada ulasan untuk buku ini</p>
        )}
      </div>
    </div>
  )
}
