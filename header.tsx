"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Book,
  Search,
  ShoppingCart,
  User,
  Menu,
  LogOut,
  Settings,
  Heart,
  Package,
  Globe,
  BookOpen,
  GraduationCap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BookText, BookMarked, Grid, ChevronDown } from "lucide-react"

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const categories = [
    { id: "manga", name: { id: "Manga", en: "Manga" } },
    { id: "light-novel", name: { id: "Light Novel", en: "Light Novel" } },
    { id: "fiction", name: { id: "Fiksi", en: "Fiction" } },
    { id: "non-fiction", name: { id: "Non-Fiksi", en: "Non-Fiction" } },
    { id: "education", name: { id: "Pendidikan", en: "Education" } },
    { id: "romance", name: { id: "Romansa", en: "Romance" } },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">Fritzoria</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {language === "id" ? "Beranda" : "Home"}
          </Link>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto text-sm font-medium text-muted-foreground hover:text-primary group flex items-center gap-1 transition-colors"
              >
                <span>{language === "id" ? "Kategori" : "Categories"}</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 p-2 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              sideOffset={8}
            >
              <DropdownMenuLabel className="flex items-center gap-2 text-primary">
                <BookOpen className="h-4 w-4" />
                {language === "id" ? "Kategori Buku" : "Book Categories"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => {
                // Define icons for each category
                let Icon = BookOpen
                if (category.id === "manga") Icon = BookText
                if (category.id === "light-novel") Icon = BookMarked
                if (category.id === "fiction") Icon = BookOpen
                if (category.id === "non-fiction") Icon = BookMarked
                if (category.id === "education") Icon = GraduationCap
                if (category.id === "romance") Icon = Heart

                return (
                  <DropdownMenuItem
                    key={category.id}
                    asChild
                    className="flex items-center gap-2 cursor-pointer transition-colors hover:bg-muted focus:bg-muted rounded-sm px-2 py-1.5 my-1"
                  >
                    <Link href={`/catalog?category=${category.id}`} className="flex items-center gap-2 w-full">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{category.name[language]}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="flex items-center gap-2 cursor-pointer transition-colors hover:bg-muted focus:bg-muted rounded-sm px-2 py-1.5 my-1"
              >
                <Link href="/catalog" className="flex items-center gap-2 w-full">
                  <Grid className="h-4 w-4 text-primary" />
                  <span>{language === "id" ? "Lihat Semua Kategori" : "View All Categories"}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-2">
          <form onSubmit={handleSearch} className="w-full max-w-sm lg:max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === "id" ? "Cari buku..." : "Search books..."}
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{language === "id" ? "Akun Saya" : "My Account"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">
                    <Package className="mr-2 h-4 w-4" />
                    <span>{language === "id" ? "Pesanan" : "Orders"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>{language === "id" ? "Wishlist" : "Wishlist"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{language === "id" ? "Keluar" : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                {language === "id" ? "Masuk" : "Login"}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto flex items-center">
          <Link href="/cart" className="mr-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Fritzoria</SheetTitle>
                <SheetDescription>{language === "id" ? "Toko Buku Online" : "Online Bookstore"}</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {language === "id" ? "Beranda" : "Home"}
                  </Button>
                </Link>
                <Link href="/catalog" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {language === "id" ? "Katalog" : "Catalog"}
                  </Button>
                </Link>

                <div className="space-y-2">
                  <p className="text-sm font-medium px-4">{language === "id" ? "Kategori" : "Categories"}</p>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalog?category=${category.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start pl-8 text-muted-foreground">
                        {category.name[language]}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4">
                  {user ? (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{language === "id" ? "Akun Saya" : "My Account"}</span>
                        </Button>
                      </Link>
                      <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          <span>{language === "id" ? "Pesanan" : "Orders"}</span>
                        </Button>
                      </Link>
                      <Link href="/account/wishlist" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>{language === "id" ? "Wishlist" : "Wishlist"}</span>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{language === "id" ? "Keluar" : "Logout"}</span>
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">{language === "id" ? "Masuk" : "Login"}</Button>
                    </Link>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    toggleLanguage()
                    setMobileMenuOpen(false)
                  }}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <span>{language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
