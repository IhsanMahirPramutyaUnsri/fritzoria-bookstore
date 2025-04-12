"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "id" | "en"

type Translations = {
  [key: string]: {
    id: string
    en: string
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Common translations
const translations: Translations = {
  "nav.home": {
    id: "Beranda",
    en: "Home",
  },
  "nav.catalog": {
    id: "Katalog",
    en: "Catalog",
  },
  "nav.cart": {
    id: "Keranjang",
    en: "Cart",
  },
  "nav.account": {
    id: "Akun",
    en: "Account",
  },
  "nav.search": {
    id: "Cari buku...",
    en: "Search books...",
  },
  "home.newReleases": {
    id: "Buku Terbaru",
    en: "New Releases",
  },
  "home.bestsellers": {
    id: "Buku Terlaris",
    en: "Bestsellers",
  },
  "home.promotions": {
    id: "Promo Spesial",
    en: "Special Promotions",
  },
  "home.categories": {
    id: "Kategori",
    en: "Categories",
  },
  "book.addToCart": {
    id: "Tambah ke Keranjang",
    en: "Add to Cart",
  },
  "book.buyNow": {
    id: "Beli Sekarang",
    en: "Buy Now",
  },
  "book.author": {
    id: "Penulis",
    en: "Author",
  },
  "book.publisher": {
    id: "Penerbit",
    en: "Publisher",
  },
  "book.price": {
    id: "Harga",
    en: "Price",
  },
  "book.stock": {
    id: "Stok",
    en: "Stock",
  },
  "book.synopsis": {
    id: "Sinopsis",
    en: "Synopsis",
  },
  "book.reviews": {
    id: "Ulasan",
    en: "Reviews",
  },
  "cart.title": {
    id: "Keranjang Belanja",
    en: "Shopping Cart",
  },
  "cart.empty": {
    id: "Keranjang belanja Anda kosong",
    en: "Your shopping cart is empty",
  },
  "cart.continue": {
    id: "Lanjutkan Belanja",
    en: "Continue Shopping",
  },
  "cart.checkout": {
    id: "Lanjut ke Pembayaran",
    en: "Proceed to Checkout",
  },
  "cart.total": {
    id: "Total",
    en: "Total",
  },
  "footer.about": {
    id: "Tentang Kami",
    en: "About Us",
  },
  "footer.contact": {
    id: "Hubungi Kami",
    en: "Contact Us",
  },
  "footer.terms": {
    id: "Syarat & Ketentuan",
    en: "Terms & Conditions",
  },
  "footer.privacy": {
    id: "Kebijakan Privasi",
    en: "Privacy Policy",
  },
  "footer.copyright": {
    id: "© 2024 Fritzoria. Hak Cipta Dilindungi.",
    en: "© 2024 Fritzoria. All Rights Reserved.",
  },
  "auth.login": {
    id: "Masuk",
    en: "Login",
  },
  "auth.register": {
    id: "Daftar",
    en: "Register",
  },
  "auth.logout": {
    id: "Keluar",
    en: "Logout",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("id")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "id" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
