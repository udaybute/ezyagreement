"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/db/client"

type Role = "retail" | "broker" | "ca"

export default function OnboardingPage() {
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState<Role>("retail")
  const [firmName, setFirmName] = useState("")
  const [consentDocGeneration, setConsentDocGeneration] = useState(false)
  const [consentEsign, setConsentEsign] = useState(false)
  const [consentWhatsapp, setConsentWhatsapp] = useState(false)
  const [consentMarketing, setConsentMarketing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const supabase = createClient()

  const requiredConsentsGiven = consentDocGeneration && consentEsign && consentWhatsapp

  async function handleSubmit() {
    setLoading(true)
    setError("")

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError("Session expired. Please log in again.")
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        phone,
        state,
        city,
        role,
        firm_name: firmName || null,
        consent_doc_generation: consentDocGeneration,
        consent_esign: consentEsign,
        consent_whatsapp: consentWhatsapp,
        consent_marketing: consentMarketing,
        consent_given_at: new Date().toISOString(),
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      setError("Could not save your details. Please try again.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tell Us About You</h1>
          <p className="text-gray-500 mt-1 text-sm">
            A few quick details to set up your account
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <label className="label">Phone Number</label>
            <input className="input" type="tel"
              placeholder="10-digit mobile"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">State</label>
              <input className="input" type="text"
                placeholder="e.g. Maharashtra"
                value={state}
                onChange={(e) => setState(e.target.value)} />
            </div>
            <div>
              <label className="label">City</label>
              <input className="input" type="text"
                placeholder="e.g. Pune"
                value={city}
                onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">I am a</label>
            <select className="input" value={role}
              onChange={(e) => setRole(e.target.value as Role)}>
              <option value="retail">Individual / Retail User</option>
              <option value="broker">Broker / Agent</option>
              <option value="ca">CA / Reseller</option>
            </select>
          </div>

          {(role === "broker" || role === "ca") && (
            <div>
              <label className="label">Firm Name</label>
              <input className="input" type="text"
                placeholder="Your firm or company name"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)} />
            </div>
          )}

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">Consent (DPDP Act 2025)</p>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5"
                checked={consentDocGeneration}
                onChange={(e) => setConsentDocGeneration(e.target.checked)} />
              I consent to processing my data for document generation
            </label>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5"
                checked={consentEsign}
                onChange={(e) => setConsentEsign(e.target.checked)} />
              I consent to e-sign related data processing
            </label>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5"
                checked={consentWhatsapp}
                onChange={(e) => setConsentWhatsapp(e.target.checked)} />
              I consent to receiving updates via WhatsApp
            </label>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)} />
              I'd like to receive marketing updates (optional)
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            className="btn-primary w-full mt-2"
            onClick={handleSubmit}
            disabled={loading || !phone || !state || !city || !requiredConsentsGiven}
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </button>
        </div>
      </div>
    </div>
  )
}
