"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/db/client"

function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") ?? ""

  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resent, setResent] = useState(false)

  const supabase = createClient()

  async function handleVerify() {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/onboarding")
  }

  async function handleResend() {
    setError("")
    const { error } = await supabase.auth.resend({ type: "signup", email })
    if (error) {
      setError(error.message)
      return
    }
    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-500 mt-1 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700">{email || "your email"}</span>
          </p>
        </div>

        <div>
          <label className="label">Verification Code</label>
          <input
            className="input text-center text-lg tracking-widest"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          {resent && (
            <p className="text-green-600 text-sm mt-2">Code resent successfully.</p>
          )}

          <button
            className="btn-primary w-full mt-6"
            onClick={handleVerify}
            disabled={loading || !email || code.length !== 6}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <button
            className="btn-secondary w-full mt-3"
            onClick={handleResend}
            disabled={!email}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyForm />
    </Suspense>
  )
}
