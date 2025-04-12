"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const shippingMethods = [
  { id: "regular", name: "Reguler (2-3 hari)", price: 15000 },
  { id: "express", name: "Express (1 hari)", price: 30000 },
  { id: "same-day", name: "Same Day (hari ini)", price: 50000 },
]

const paymentMethods = [
  { id: "bank-transfer", name: "Transfer Bank", description: "BCA, Mandiri, BNI, BRI" },
  { id: "e-wallet", name: "E-Wallet", description: "GoPay, OVO, DANA, LinkAja" },
  { id: "credit-card", name: "Kartu Kredit", description: "Visa, Mastercard, JCB" },
  { id: "cod", name: "Bayar di Tempat (COD)", description: "Bayar saat barang diterima" },
]

export default function CheckoutForm() {
  const { clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const [shippingMethod, setShippingMethod] = useState("regular")
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const requiredFields = ["name", "email", "phone", "address", "city", "postalCode"]
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (emptyFields.length > 0) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")

      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pengiriman</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon *</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat Lengkap *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Kota *</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Kode Pos *</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (opsional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              placeholder="Instruksi khusus untuk pengiriman"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metode Pengiriman</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem value={method.id} id={`shipping-${method.id}`} />
                <Label htmlFor={`shipping-${method.id}`} className="flex flex-1 justify-between cursor-pointer">
                  <span>{method.name}</span>
                  <span>Rp {method.price.toLocaleString("id-ID")}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metode Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bank-transfer" onValueChange={setPaymentMethod}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="bank-transfer">Bank</TabsTrigger>
              <TabsTrigger value="e-wallet">E-Wallet</TabsTrigger>
              <TabsTrigger value="credit-card">Kartu Kredit</TabsTrigger>
              <TabsTrigger value="cod">COD</TabsTrigger>
            </TabsList>

            <TabsContent value="bank-transfer" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pembayaran melalui transfer bank. Instruksi pembayaran akan dikirimkan ke email Anda.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">BCA</div>
                  <div className="border rounded-lg p-4 text-center">Mandiri</div>
                  <div className="border rounded-lg p-4 text-center">BNI</div>
                  <div className="border rounded-lg p-4 text-center">BRI</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="e-wallet" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pembayaran melalui e-wallet. Anda akan diarahkan ke aplikasi atau halaman pembayaran.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">GoPay</div>
                  <div className="border rounded-lg p-4 text-center">OVO</div>
                  <div className="border rounded-lg p-4 text-center">DANA</div>
                  <div className="border rounded-lg p-4 text-center">LinkAja</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="credit-card" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pembayaran melalui kartu kredit. Transaksi aman dengan enkripsi SSL.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Nomor Kartu</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Tanggal Kadaluarsa</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cod" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Bayar saat barang diterima. Pastikan Anda atau perwakilan Anda tersedia untuk menerima paket dan
                melakukan pembayaran.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Memproses..." : "Selesaikan Pesanan"}
      </Button>
    </form>
  )
}
