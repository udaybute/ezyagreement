"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/db/client"

interface Profile {
  full_name: string
  role: string
  documents_count: number
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  const [newPassword, setNewPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setEmail(user.email ?? "")
    setEmailVerified(!!user.email_confirmed_at)

    const { data } = await supabase
      .from("profiles")
      .select("full_name, role, documents_count, created_at")
      .eq("id", user.id)
      .single()

    if (data) setProfile(data)
    setLoading(false)
  }

  async function handleChangePassword() {
    setSavingPassword(true)
    setPasswordError("")

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setPasswordError(error.message)
    } else {
      setPasswordSaved(true)
      setNewPassword("")
      setTimeout(() => setPasswordSaved(false), 3000)
    }
    setSavingPassword(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      <Link href="/dashboard" className="text-blue-600 text-sm mb-4 block">
        ← Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your account identity and security
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Identity ── */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Identity</h2>
            <Link href="/settings/account" className="text-blue-600 text-sm">
              Edit details
            </Link>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Full Name</span>
              <span className="text-gray-900 font-medium">{profile.full_name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 flex items-center gap-2">
                {email}
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${emailVerified ? "badge-green" : "badge-amber"}`}>
                  {emailVerified ? "Verified" : "Unverified"}
                </span>
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Role</span>
              <span className="text-gray-900 capitalize">{profile.role}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Member Since</span>
              <span className="text-gray-900">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Activity</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{profile.documents_count}</p>
            <p className="text-gray-500 text-sm mt-1">Documents Created</p>
          </div>
        </div>

        {/* ── Change password ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Change Password</h2>
          <div className="space-y-3">
            <input
              className="input"
              type="password"
              placeholder="New password (min. 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="flex items-center gap-3">
              <button
                className="btn-primary py-2 text-sm"
                onClick={handleChangePassword}
                disabled={savingPassword || newPassword.length < 8}
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
              {passwordSaved && (
                <span className="text-green-600 text-sm font-medium">
                  ✓ Password updated!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Sign out ── */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Sign Out</p>
              <p className="text-gray-500 text-sm mt-0.5">
                End your session on this device
              </p>
            </div>
            <button onClick={handleSignOut} className="btn-secondary py-2 text-sm">
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
