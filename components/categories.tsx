"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Bookmark, GraduationCap, Heart, Coffee, Lightbulb, Globe, Utensils, Baby } from "lucide-react"

const categories = [
  { id: "fiction", name: { id: "Fiksi", en: "Fiction" }, icon: BookOpen },
  { id: "non-fiction", name: { id: "Non-Fiksi", en: "Non-Fiction" }, icon: Bookmark },
  { id: "education", name: { id: "Pendidikan", en: "Education" }, icon: GraduationCap },
  { id: "romance", name: { id: "Romansa", en: "Romance" }, icon: Heart },
  { id: "lifestyle", name: { id: "Gaya Hidup", en: "Lifestyle" }, icon: Coffee },
  { id: "self-help", name: { id: "Pengembangan Diri", en: "Self-Help" }, icon: Lightbulb },
  { id: "international", name: { id: "Internasional", en: "International" }, icon: Globe },
  { id: "cooking", name: { id: "Memasak", en: "Cooking" }, icon: Utensils },
  { id: "children", name: { id: "Anak-anak", en: "Children" }, icon: Baby },
]

export default function Categories() {
  const { language, t } = useLanguage()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{t("home.categories")}</h2>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.id}
              href={`/catalog?category=${category.id}`}
              className="flex flex-col items-center justify-center p-4 rounded-lg border bg-background hover:border-primary hover:text-primary transition-colors text-center"
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm">{category.name[language]}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
