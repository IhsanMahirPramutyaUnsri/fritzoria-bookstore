"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden rounded-lg mb-12">
      <div className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground">
        <div className="container flex flex-col md:flex-row items-center py-12 md:py-24">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Temukan Dunia Baru Melalui Buku</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto md:mx-0">
              Koleksi buku terlengkap dengan harga terbaik. Nikmati pengalaman membaca yang menyenangkan bersama
              Fritzoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="font-medium">
                <Link href="/catalog">Jelajahi Katalog</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-medium"
              >
                <Link href="/promo">Lihat Promo</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/placeholder.svg?key=epctf"
                alt="Books collection"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
