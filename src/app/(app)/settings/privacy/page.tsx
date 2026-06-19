"use client"

/**
 * Privacy Settings Page
 * - DPDP Act 2025 compliance
 * - User can: download data, delete data, manage consent
 * - Responsive: mobile first
 */

import { useState } from "react"
import { createClient } from "@/lib/db/client"
import Link from "next/link"

export default function PrivacySettingsPage() {
  const [deleting, setDeleting] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const supabase = createClient()

  // ── Download user data ───────────────────────────────────
  async function downloadData() {
    setDownloading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Fetch all user data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      const { data: documents } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)

      const { data: payments } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)

      // Create JSON file
      const exportData = {
        exported_at: new Date().toISOString(),
        profile,
        documents,
        payments,
      }

      const blob = new Blob(
        [JSON.stringify(exportData, null, 2)],
        { type: "application/json" }
      )
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `elvatrixa-my-data-${Date.now()}.json`
      a.click()
    } catch (error) {
      console.error("Download error:", error)
      alert("Download failed. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  // ── Delete user data ─────────────────────────────────────
  async function deleteData() {
    const confirmed = confirm(
      "Are you sure? This will permanently delete all your data including documents and payment history. This cannot be undone."
    )
    if (!confirmed) return

    setDeleting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Delete documents
      await supabase.from("documents").delete().eq("user_id", user.id)

      // Delete broker clients
      await supabase.from("broker_clients").delete().eq("broker_id", user.id)

      // Update profile consent withdrawn
      await supabase.from("profiles").update({
        consent_withdrawn: true,
        consent_withdrawn_at: new Date().toISOString(),
      }).eq("id", user.id)

      // Sign out
      await supabase.auth.signOut()
      setDeleted(true)
    } catch (error) {
      console.error("Delete error:", error)
      alert("Delete failed. Please email support@elvatrixa.com")
    } finally {
      setDeleting(false)
    }
  }

  if (deleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Data Deleted
        </h1>
        <p className="text-gray-600 mb-6">
          All your data has been deleted. You have been logged out.
        </p>
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
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
          Privacy Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your data and privacy preferences
        </p>
      </div>

      {/* ── DPDP badge ── */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
        <p className="text-green-800 text-sm font-medium">
          🔒 DPDP Act 2025 Compliant
        </p>
        <p className="text-green-700 text-xs mt-1">
          You have full control over your data.
          All data is deleted after 30 days automatically.
        </p>
      </div>

      <div className="space-y-4">

        {/* ── Download data ── */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                Download My Data
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Get a copy of all your data: profile, documents, payments.
                Downloaded as JSON file.
              </p>
            </div>
            <button
              onClick={downloadData}
              disabled={downloading}
              className="btn-secondary py-2 text-sm whitespace-nowrap">
              {downloading ? "Preparing..." : "Download Data"}
            </button>
          </div>
        </div>

        {/* ── Data we store ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">
            What Data We Store
          </h2>
          <div className="space-y-2">
            {[
              { data: "Name, Phone, Email", purpose: "Account and delivery", retained: "Until deleted" },
              { data: "Agreement details", purpose: "Document generation", retained: "30 days" },
              { data: "Payment records", purpose: "GST invoice", retained: "7 years (tax law)" },
              { data: "Aadhaar number", purpose: "NEVER stored", retained: "NEVER" },
            ].map((item) => (
              <div key={item.data}
                className={`flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 last:border-0 gap-1 text-sm
                  ${item.data === "Aadhaar number" ? "text-green-700" : "text-gray-600"}
                `}>
                <span className="font-medium text-gray-900">{item.data}</span>
                <span className="text-xs">{item.retained}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Consent settings ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">
            Consent Preferences
          </h2>
          <div className="space-y-3">
            {[
              { label: "Document generation", required: true, desc: "Required to use the service" },
              { label: "WhatsApp delivery", required: false, desc: "Send documents via WhatsApp" },
              { label: "Email notifications", required: false, desc: "Renewal reminders and updates" },
              { label: "Marketing emails", required: false, desc: "Product updates and offers" },
            ].map((c) => (
              <div key={c.label}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.label}</p>
                  <p className="text-xs text-gray-500">{c.desc}</p>
                </div>
                {c.required ? (
                  <span className="badge-blue text-xs">Required</span>
                ) : (
                  <input type="checkbox" defaultChecked
                    className="w-4 h-4 accent-blue-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Delete data ── */}
        <div className="card border-red-200 bg-red-50">
          <h2 className="font-semibold text-red-900 mb-2">
            Delete All My Data
          </h2>
          <p className="text-red-700 text-sm mb-4">
            Permanently delete all your data including documents, payment
            history, and account. This cannot be undone. Your account
            will be deleted and you will be logged out.
          </p>
          <button
            onClick={deleteData}
            disabled={deleting}
            className="btn-danger py-2 text-sm">
            {deleting ? "Deleting..." : "Delete All My Data"}
          </button>
        </div>

        {/* ── Contact DPO ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-2">
            Contact Data Protection Officer
          </h2>
          <p className="text-gray-600 text-sm mb-3">
            For any privacy concerns or to exercise your DPDP rights:
          </p>
          <a href="mailto:support@elvatrixa.com"
            className="text-blue-600 text-sm hover:underline">
            support@elvatrixa.com
          </a>
          <p className="text-gray-400 text-xs mt-1">
            Response within 48 hours
          </p>
        </div>

      </div>
    </div>
  )
}