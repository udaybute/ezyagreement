"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/db/client"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const supabase = createClient()

  async function handleRegister() {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(`/verify?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Elvatrixa Legal</h1>
          <p className="text-gray-500 mt-1 text-sm">Create your account</p>
        </div>

        <div>
          <label className="label">Full Name</label>
          <input
            className="input mb-4"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            className="input mb-4"
            type="email"
            placeholder="uday@elvatrixa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Phone Number</label>
          <input
            className="input mb-4"
            type="tel"
            placeholder="10-digit mobile"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            className="btn-primary w-full mt-6"
            onClick={handleRegister}
            disabled={loading || !fullName || !email || !password || password.length < 8}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
