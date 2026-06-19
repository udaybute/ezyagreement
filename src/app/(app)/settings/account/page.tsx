"use client"

/**
 * Account Settings Page
 * - Update profile: name, phone, state, city
 * - Show current plan
 * - Responsive: mobile first
 */

import { useState, useEffect } from "react"
import { createClient } from "@/lib/db/client"
import Link from "next/link"

interface Profile {
  full_name: string
  phone: string
  state: string
  city: string
  role: string
  firm_name: string
  documents_count: number
}

export default function AccountSettingsPage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    state: "",
    city: "",
    role: "retail",
    firm_name: "",
    documents_count: 0,
  })
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createClient()

  // ── Fetch profile on load ────────────────────────────────
  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setEmail(user.email ?? "")

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (data) setProfile(data)
    setLoading(false)
  }

  // ── Save profile ─────────────────────────────────────────
  async function saveProfile() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        state: profile.state,
        city: profile.city,
        firm_name: profile.firm_name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert("Save failed. Please try again.")
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <Link href="/dashboard"
          className="text-blue-600 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Account Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Profile info ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Profile Information
          </h2>
          <div className="space-y-4">

            {/* Email - readonly */}
            <div>
              <label className="label">Email</label>
              <input className="input bg-gray-50 text-gray-500"
                type="email" value={email} disabled />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="label">Full Name *</label>
              <input className="input" type="text"
                placeholder="Your full name"
                value={profile.full_name}
                onChange={(e) => setProfile({
                  ...profile, full_name: e.target.value
                })} />
            </div>

            <div>
              <label className="label">Phone Number</label>
              <input className="input" type="tel"
                placeholder="10-digit mobile"
                maxLength={10}
                value={profile.phone}
                onChange={(e) => setProfile({
                  ...profile, phone: e.target.value
                })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">State</label>
                <input className="input" type="text"
                  placeholder="e.g. Maharashtra"
                  value={profile.state}
                  onChange={(e) => setProfile({
                    ...profile, state: e.target.value
                  })} />
              </div>
              <div>
                <label className="label">City</label>
                <input className="input" type="text"
                  placeholder="e.g. Pune"
                  value={profile.city}
                  onChange={(e) => setProfile({
                    ...profile, city: e.target.value
                  })} />
              </div>
            </div>

            {/* Firm name - for brokers/CAs */}
            {(profile.role === "broker" || profile.role === "ca") && (
              <div>
                <label className="label">Firm Name</label>
                <input className="input" type="text"
                  placeholder="Your firm or company name"
                  value={profile.firm_name}
                  onChange={(e) => setProfile({
                    ...profile, firm_name: e.target.value
                  })} />
              </div>
            )}

          </div>

          {/* Save button */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="btn-primary py-2">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saved && (
              <span className="text-green-600 text-sm font-medium">
                ✓ Saved successfully!
              </span>
            )}
          </div>
        </div>

        {/* ── Account stats ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Account Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {profile.documents_count}
              </p>
              <p className="text-gray-500 text-sm mt-1">Documents Created</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600 capitalize">
                {profile.role}
              </p>
              <p className="text-gray-500 text-sm mt-1">Current Plan</p>
            </div>
          </div>
        </div>

        {/* ── Plan upgrade ── */}
        {profile.role === "retail" && (
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">
                  Upgrade to Broker Plan
                </p>
                <p className="text-gray-600 text-sm mt-0.5">
                  20 docs/month · Client dashboard · Rs.1,499/month
                </p>
              </div>
              <Link href="/billing/plans"
                className="btn-primary py-2 text-sm whitespace-nowrap">
                Upgrade Plan
              </Link>
            </div>
          </div>
        )}

        {/* ── Privacy link ── */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Privacy & Data</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Download or delete your data
              </p>
            </div>
            <Link href="/settings/privacy"
              className="btn-secondary py-2 text-sm">
              Manage
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}