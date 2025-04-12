import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import CheckoutForm from "@/components/checkout-form"
import CheckoutSummary from "@/components/checkout-summary"

export const metadata: Metadata = {
  title: "Checkout | Fritzoria",
  description: "Selesaikan pembelian Anda di Fritzoria",
}

export default async function CheckoutPage() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?redirect=checkout")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}
