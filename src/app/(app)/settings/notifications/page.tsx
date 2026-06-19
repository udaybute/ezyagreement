"use client"

/**
 * Notifications Settings Page
 * - WhatsApp, email, SMS notification preferences
 * - DPDP: consent-based notifications
 * - Responsive: mobile first
 */

import { useState, useEffect } from "react"
import { createClient } from "@/lib/db/client"
import Link from "next/link"

interface NotificationSettings {
  whatsapp_documents: boolean
  whatsapp_reminders: boolean
  whatsapp_marketing: boolean
  email_documents: boolean
  email_reminders: boolean
  email_marketing: boolean
}

const defaultSettings: NotificationSettings = {
  whatsapp_documents: true,
  whatsapp_reminders: true,
  whatsapp_marketing: false,
  email_documents: true,
  email_reminders: true,
  email_marketing: false,
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  // ── Load settings on mount ───────────────────────────────
  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from("profiles")
      .select("consent_whatsapp, consent_marketing")
      .eq("id", user.id)
      .single()

    if (profile) {
      setSettings((prev) => ({
        ...prev,
        whatsapp_documents: profile.consent_whatsapp ?? true,
        whatsapp_marketing: profile.consent_marketing ?? false,
        email_marketing: profile.consent_marketing ?? false,
      }))
    }
    setLoading(false)
  }

  // ── Toggle setting ───────────────────────────────────────
  function toggle(key: keyof NotificationSettings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── Save settings ────────────────────────────────────────
  async function saveSettings() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update({
        consent_whatsapp: settings.whatsapp_documents,
        consent_marketing: settings.whatsapp_marketing || settings.email_marketing,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
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
          Notification Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Control how and when we contact you
        </p>
      </div>

      {/* ── DPDP notice ── */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
        <p className="text-green-800 text-xs font-medium mb-1">
          🔒 DPDP Act 2025 — Consent Based
        </p>
        <p className="text-green-700 text-xs">
          We only send notifications you have consented to.
          You can change these preferences anytime.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── WhatsApp notifications ── */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💬</span>
            <h2 className="font-semibold text-gray-900">
              WhatsApp Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "whatsapp_documents" as const,
                label: "Document Delivery",
                desc: "Receive your generated agreements and receipts via WhatsApp",
                required: false,
              },
              {
                key: "whatsapp_reminders" as const,
                label: "Agreement Reminders",
                desc: "Reminder 30 days before your agreement expires",
                required: false,
              },
              {
                key: "whatsapp_marketing" as const,
                label: "Tips & Updates",
                desc: "Helpful tips about rental laws and product updates",
                required: false,
              },
            ].map((item) => (
              <div key={item.key}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                {/* Toggle switch */}
                <button
                  onClick={() => toggle(item.key)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 focus:outline-none flex-shrink-0
                    ${settings[item.key] ? "bg-blue-700" : "bg-gray-200"}
                  `}>
                  <span className={`
                    inline-block h-4 w-4 transform rounded-full
                    bg-white transition-transform duration-200 shadow
                    ${settings[item.key] ? "translate-x-6" : "translate-x-1"}
                  `} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Email notifications ── */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✉️</span>
            <h2 className="font-semibold text-gray-900">
              Email Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "email_documents" as const,
                label: "Document Confirmation",
                desc: "Email confirmation when a document is generated",
                required: false,
              },
              {
                key: "email_reminders" as const,
                label: "Agreement Renewal Reminders",
                desc: "Email reminder 30 days before your agreement expires",
                required: false,
              },
              {
                key: "email_marketing" as const,
                label: "Newsletter & Updates",
                desc: "Monthly newsletter with rental law updates",
                required: false,
              },
            ].map((item) => (
              <div key={item.key}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 focus:outline-none flex-shrink-0
                    ${settings[item.key] ? "bg-blue-700" : "bg-gray-200"}
                  `}>
                  <span className={`
                    inline-block h-4 w-4 transform rounded-full
                    bg-white transition-transform duration-200 shadow
                    ${settings[item.key] ? "translate-x-6" : "translate-x-1"}
                  `} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Save button ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="btn-primary py-2">
            {saving ? "Saving..." : "Save Preferences"}
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-medium">
              ✓ Saved successfully!
            </span>
          )}
        </div>

        {/* ── Unsubscribe note ── */}
        <div className="card bg-gray-50">
          <p className="text-gray-600 text-sm">
            <strong>Note:</strong> You can unsubscribe from all
            non-essential notifications at any time. Transactional
            notifications (document delivery, payment confirmation)
            cannot be disabled as they are essential for the service.
          </p>
        </div>

      </div>
    </div>
  )
}