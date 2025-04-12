import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "Pesanan Berhasil | Fritzoria",
  description: "Pesanan Anda telah berhasil diproses",
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Pesanan Berhasil!</h1>

        <p className="text-muted-foreground mb-8">
          Terima kasih atas pesanan Anda. Kami telah mengirimkan email konfirmasi dengan detail pesanan ke alamat email
          Anda.
        </p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="font-medium mb-2">Nomor Pesanan: #FR12345678</h2>
          <p className="text-sm text-muted-foreground">Simpan nomor pesanan ini untuk referensi di masa mendatang.</p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/account/orders">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Lihat Pesanan Saya
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
