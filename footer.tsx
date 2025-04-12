"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">Fritzoria</span>
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            Toko buku online terlengkap dengan koleksi terbaru dan terbaik untuk semua pembaca.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">{t("footer.about")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Tentang Fritzoria
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Karir
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                Berita & Acara
              </Link>
            </li>
            <li>
              <Link href="/partnership" className="text-muted-foreground hover:text-foreground transition-colors">
                Kerjasama
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Bantuan</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                Informasi Pengiriman
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                Pengembalian & Refund
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">{t("footer.contact")}</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">Jl. Buku Indah No. 123, Jakarta Selatan, Indonesia</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">+62 21 1234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">info@fritzoria.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t">
        <p className="text-center text-muted-foreground text-sm">{t("footer.copyright")}</p>
      </div>
    </footer>
  )
}
