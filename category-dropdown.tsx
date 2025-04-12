"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  BookText,
  GraduationCap,
  Heart,
  Coffee,
  Lightbulb,
  Globe,
  Utensils,
  Baby,
  Search,
  X,
  ChevronDown,
  CheckCircle2,
  BookMarked,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Category data with icons and estimated counts
const categories = [
  {
    id: "all",
    name: { id: "Semua Kategori", en: "All Categories" },
    icon: BookOpen,
    count: 1234,
    featured: false,
  },
  {
    id: "manga",
    name: { id: "Manga", en: "Manga" },
    icon: BookText,
    count: 650,
    featured: true,
  },
  {
    id: "light-novel",
    name: { id: "Light Novel", en: "Light Novel" },
    icon: BookMarked,
    count: 320,
    featured: true,
  },
  {
    id: "fiction",
    name: { id: "Fiksi", en: "Fiction" },
    icon: BookOpen,
    count: 450,
    featured: true,
  },
  {
    id: "non-fiction",
    name: { id: "Non-Fiksi", en: "Non-Fiction" },
    icon: BookMarked,
    count: 320,
    featured: false,
  },
  {
    id: "education",
    name: { id: "Pendidikan", en: "Education" },
    icon: GraduationCap,
    count: 215,
    featured: false,
  },
  {
    id: "romance",
    name: { id: "Romansa", en: "Romance" },
    icon: Heart,
    count: 180,
    featured: true,
  },
  {
    id: "lifestyle",
    name: { id: "Gaya Hidup", en: "Lifestyle" },
    icon: Coffee,
    count: 120,
    featured: false,
  },
  {
    id: "self-help",
    name: { id: "Pengembangan Diri", en: "Self-Help" },
    icon: Lightbulb,
    count: 95,
    featured: false,
  },
  {
    id: "international",
    name: { id: "Internasional", en: "International" },
    icon: Globe,
    count: 85,
    featured: false,
  },
  {
    id: "cooking",
    name: { id: "Memasak", en: "Cooking" },
    icon: Utensils,
    count: 75,
    featured: false,
  },
  {
    id: "children",
    name: { id: "Anak-anak", en: "Children" },
    icon: Baby,
    count: 65,
    featured: false,
  },
]

export default function CategoryDropdown({ selectedCategory }: { selectedCategory?: string }) {
  const { language } = useLanguage()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get the selected category object
  const selectedCategoryObj = categories.find((cat) => cat.id === (selectedCategory || "all"))

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Split categories into featured and regular
  const featuredCategories = filteredCategories.filter((cat) => cat.featured)
  const regularCategories = filteredCategories.filter((cat) => !cat.featured)

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    // Get current URL and params
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)

    // Update or remove category parameter
    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    // Reset to page 1 when changing category
    params.delete("page")

    // Navigate to the new URL
    router.push(`/catalog?${params.toString()}`)

    // Close the dropdown
    setIsOpen(false)
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative w-full" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Dropdown Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select category"
        className={cn(
          "w-full md:w-[300px] h-12 text-base justify-between font-medium",
          isOpen && "border-primary",
          selectedCategory && selectedCategory !== "all" && "border-primary bg-primary/5",
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedCategoryObj && (
            <>
              <span className="text-primary">
                <selectedCategoryObj.icon className="h-5 w-5" />
              </span>
              <span className="truncate">{selectedCategoryObj.name[language]}</span>
            </>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full md:w-[350px] rounded-md border bg-card shadow-lg animate-in fade-in-0 zoom-in-95"
          role="listbox"
        >
          {/* Search Input */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder={language === "id" ? "Cari kategori..." : "Search categories..."}
                className="w-full pl-8 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Dropdown Content */}
          <ScrollArea className="max-h-[300px] overflow-auto">
            {/* Featured Categories Section */}
            {featuredCategories.length > 0 && searchQuery === "" && (
              <div className="px-1 py-2">
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground flex items-center">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  {language === "id" ? "Kategori Populer" : "Popular Categories"}
                </div>
                {featuredCategories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    language={language}
                    isSelected={category.id === (selectedCategory || "all")}
                    onClick={() => handleCategoryChange(category.id)}
                  />
                ))}
              </div>
            )}

            {/* All Categories Section */}
            <div className="px-1 py-2">
              {searchQuery === "" && regularCategories.length > 0 && (
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  {language === "id" ? "Semua Kategori" : "All Categories"}
                </div>
              )}

              {filteredCategories.length > 0 ? (
                <>
                  {searchQuery !== ""
                    ? // Show all filtered categories when searching
                      filteredCategories.map((category) => (
                        <CategoryItem
                          key={category.id}
                          category={category}
                          language={language}
                          isSelected={category.id === (selectedCategory || "all")}
                          onClick={() => handleCategoryChange(category.id)}
                          highlight={searchQuery}
                        />
                      ))
                    : // Show regular categories when not searching
                      regularCategories.map((category) => (
                        <CategoryItem
                          key={category.id}
                          category={category}
                          language={language}
                          isSelected={category.id === (selectedCategory || "all")}
                          onClick={() => handleCategoryChange(category.id)}
                        />
                      ))}
                </>
              ) : (
                // No results message
                <div className="px-3 py-6 text-center text-muted-foreground">
                  {language === "id" ? "Tidak ada kategori ditemukan" : "No categories found"}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

// Helper component for category items
function CategoryItem({
  category,
  language,
  isSelected,
  onClick,
  highlight = "",
}: {
  category: (typeof categories)[0]
  language: "id" | "en"
  isSelected: boolean
  onClick: () => void
  highlight?: string
}) {
  // Highlight matching text if search is active
  const categoryName = category.name[language]
  let nameContent = categoryName

  if (highlight) {
    const lowerName = categoryName.toLowerCase()
    const lowerHighlight = highlight.toLowerCase()
    const index = lowerName.indexOf(lowerHighlight)

    if (index !== -1) {
      const before = categoryName.substring(0, index)
      const match = categoryName.substring(index, index + highlight.length)
      const after = categoryName.substring(index + highlight.length)

      nameContent = (
        <>
          {before}
          <span className="bg-yellow-200 dark:bg-yellow-800 rounded-sm">{match}</span>
          {after}
        </>
      )
    }
  }

  const Icon = category.icon

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-3 py-2 cursor-pointer rounded-sm text-sm",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      )}
      tabIndex={0}
    >
      <div className="flex items-center gap-2.5">
        <span className={isSelected ? "text-primary-foreground" : "text-primary"}>
          <Icon className="h-4 w-4" />
        </span>
        <span>{nameContent}</span>
        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 ml-1 text-primary-foreground" />}
      </div>
      <Badge
        variant={isSelected ? "outline" : "secondary"}
        className={cn("ml-auto text-xs", isSelected && "border-primary-foreground/50 text-primary-foreground")}
      >
        {category.count.toLocaleString()}
      </Badge>
    </div>
  )
}
