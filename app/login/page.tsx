import type { Metadata } from "next"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login | Fritzoria",
  description: "Login ke akun Fritzoria Anda",
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <LoginForm redirectUrl={searchParams.redirect} />
      </div>
    </div>
  )
}
