"use client"

/**
 * Rental Agreement Generator — Step-by-step wizard
 * Covers: Property details, Landlord, Tenant, Terms
 * Responsive: Mobile first design
 * DPDP: No Aadhaar storage, PAN preferred
 */

import { useState } from "react"
import Link from "next/link"
import { STATES, calculateTotal } from "@/lib/constants"
import { calculateStampDuty, isDepositExceedingCap } from "@/lib/utils"
import PaymentButton from "@/components/ui/payment-button" 



// ── Types ────────────────────────────────────────────────────
interface FormData {
  // Step 1 - Property
  state: string
  city: string
  property_address: string
  property_type: "residential" | "commercial" | "pg"
  furnished: "furnished" | "semi-furnished" | "unfurnished"
  // Step 2 - Landlord
  landlord_name: string
  landlord_phone: string
  landlord_address: string
  landlord_id_type: "pan" | "voter_id" | "passport" | "driving_licence"
  landlord_id_number: string
  // Step 3 - Tenant
  tenant_name: string
  tenant_phone: string
  tenant_address: string
  tenant_id_type: "pan" | "voter_id" | "passport" | "driving_licence"
  tenant_id_number: string
  // Step 4 - Terms
  monthly_rent: number
  security_deposit: number
  start_date: string
  duration_months: number
  notice_period_days: number
  electricity_payer: "tenant" | "landlord"
  water_payer: "tenant" | "landlord"
  special_conditions: string
}

// ── Initial form state ───────────────────────────────────────
const initialForm: FormData = {
  state: "",
  city: "",
  property_address: "",
  property_type: "residential",
  furnished: "unfurnished",
  landlord_name: "",
  landlord_phone: "",
  landlord_address: "",
  landlord_id_type: "pan",
  landlord_id_number: "",
  tenant_name: "",
  tenant_phone: "",
  tenant_address: "",
  tenant_id_type: "pan",
  tenant_id_number: "",
  monthly_rent: 0,
  security_deposit: 0,
  start_date: "",
  duration_months: 11,
  notice_period_days: 30,
  electricity_payer: "tenant",
  water_payer: "tenant",
  special_conditions: "",
}



// ── Step titles ──────────────────────────────────────────────
const STEPS = [
  { number: 1, title: "Property" },
  { number: 2, title: "Landlord" },
  { number: 3, title: "Tenant" },
  { number: 4, title: "Terms" },
  { number: 5, title: "Review" },
   { number: 6, title: "Done" },
]

export default function RentalAgreementPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)

  // Agreement text state — stores generated agreement
const [agreementText, setAgreementText] = useState("")
const [docId, setDocId] = useState("")
const [paymentDone, setPaymentDone] = useState(false)


  // ── Update form field ──────────────────────────────────────
  function update(field: keyof FormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // ── Get cities for selected state ──────────────────────────
  const selectedState = STATES.find((s) => s.code === form.state)
  const cities = selectedState?.major_cities ?? []

  // ── Calculate stamp duty ───────────────────────────────────
  const stampDuty = form.state
    ? calculateStampDuty(form.state, form.monthly_rent, form.duration_months, form.security_deposit)
    : 0

  // ── Check deposit cap warning (MTA states only) ────────────
  const depositWarning = isDepositExceedingCap(form.state, form.monthly_rent, form.security_deposit)

  // ── Calculate total amount ─────────────────────────────────
  const { base, gst, total } = calculateTotal(199)
  
  

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      {/* Back link */}
      <Link href="/agreements/new" className="text-blue-600 text-sm mb-6 block">
        ← Back
      </Link>

      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Rental Agreement
      </h1>

      {/* ── Step indicator ── */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.number} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step > s.number ? "bg-green-500 text-white" : ""}
                ${step === s.number ? "bg-blue-700 text-white" : ""}
                ${step < s.number ? "bg-gray-200 text-gray-500" : ""}
              `}>
                {step > s.number ? "✓" : s.number}
              </div>
              <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                {s.title}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className={`
                h-0.5 w-8 md:w-16 mx-1
                ${step > s.number ? "bg-green-500" : "bg-gray-200"}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Property Details ── */}
      {step === 1 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Property Details</h2>

          <div className="space-y-4">
            {/* State selector */}
            <div>
              <label className="label">State *</label>
              <select
                className="input"
                value={form.state}
                onChange={(e) => {
                  update("state", e.target.value)
                  update("city", "") // reset city on state change
                }}
              >
                <option value="">Select state</option>
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* City selector */}
            <div>
              <label className="label">City *</label>
              <select
                className="input"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                disabled={!form.state}
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            {/* Property address */}
            <div>
              <label className="label">Property Address *</label>
              <textarea
                className="input min-h-[80px] resize-none"
                placeholder="Full address of the rental property"
                value={form.property_address}
                onChange={(e) => update("property_address", e.target.value)}
              />
            </div>

            {/* Property type */}
            <div>
              <label className="label">Property Type *</label>
              <div className="grid grid-cols-3 gap-2">
                {(["residential", "commercial", "pg"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => update("property_type", type)}
                    className={`
                      py-2 px-3 rounded-lg border text-sm font-medium capitalize transition-colors
                      ${form.property_type === type
                        ? "border-blue-700 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnished status */}
            <div>
              <label className="label">Furnished Status *</label>
              <div className="grid grid-cols-3 gap-2">
                {(["furnished", "semi-furnished", "unfurnished"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => update("furnished", type)}
                    className={`
                      py-2 px-3 rounded-lg border text-sm font-medium transition-colors
                      ${form.furnished === type
                        ? "border-blue-700 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    {type === "semi-furnished" ? "Semi" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* State-specific info */}
            {selectedState && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs font-medium mb-1">
                  {selectedState.name} — Key Rules
                </p>
                <ul className="text-blue-700 text-xs space-y-0.5">
                  <li>• Registration: {selectedState.registration_required === "all" ? "Required for ALL agreements (even 11-month)" : "Required for agreements above 11 months"}</li>
                  <li>• eStamp: {selectedState.estamp_available ? "Available online" : "Manual stamp paper only (Bihar)"}</li>
                  {selectedState.police_verification_required && (
                    <li>• Police verification: Required in this state</li>
                  )}
                  {selectedState.mta_adopted && (
                    <li>• Deposit cap: Max {selectedState.deposit_cap_months} months rent (MTA 2021)</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Step 2: Landlord Details ── */}
      {step === 2 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Landlord Details</h2>

          <div className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input className="input" type="text" placeholder="As per ID proof"
                value={form.landlord_name} onChange={(e) => update("landlord_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Phone Number *</label>
              <input className="input" type="tel" placeholder="10-digit mobile number"
                maxLength={10} value={form.landlord_phone}
                onChange={(e) => update("landlord_phone", e.target.value)} />
            </div>

            <div>
              <label className="label">Permanent Address *</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Landlord permanent address"
                value={form.landlord_address}
                onChange={(e) => update("landlord_address", e.target.value)} />
            </div>

            {/* ID Type - No Aadhaar option (DPDP compliance) */}
            <div>
              <label className="label">ID Proof Type *</label>
              <select className="input" value={form.landlord_id_type}
                onChange={(e) => update("landlord_id_type", e.target.value)}>
                <option value="pan">PAN Card (Recommended)</option>
                <option value="voter_id">Voter ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">Driving Licence</option>
              </select>
              {/* DPDP notice */}
              <p className="text-xs text-gray-400 mt-1">
                ℹ️ Aadhaar not required — we follow DPDP Act 2025 privacy guidelines
              </p>
            </div>

            <div>
              <label className="label">ID Number *</label>
              <input className="input" type="text" placeholder="Enter ID number"
                value={form.landlord_id_number}
                onChange={(e) => update("landlord_id_number", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Tenant Details ── */}
      {step === 3 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Tenant Details</h2>

          <div className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input className="input" type="text" placeholder="As per ID proof"
                value={form.tenant_name} onChange={(e) => update("tenant_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Phone Number *</label>
              <input className="input" type="tel" placeholder="10-digit mobile number"
                maxLength={10} value={form.tenant_phone}
                onChange={(e) => update("tenant_phone", e.target.value)} />
            </div>

            <div>
              <label className="label">Permanent Address *</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Tenant permanent address"
                value={form.tenant_address}
                onChange={(e) => update("tenant_address", e.target.value)} />
            </div>

            <div>
              <label className="label">ID Proof Type *</label>
              <select className="input" value={form.tenant_id_type}
                onChange={(e) => update("tenant_id_type", e.target.value)}>
                <option value="pan">PAN Card (Recommended)</option>
                <option value="voter_id">Voter ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">Driving Licence</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                ℹ️ Aadhaar not required — we follow DPDP Act 2025 privacy guidelines
              </p>
            </div>

            <div>
              <label className="label">ID Number *</label>
              <input className="input" type="text" placeholder="Enter ID number"
                value={form.tenant_id_number}
                onChange={(e) => update("tenant_id_number", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Terms ── */}
      {step === 4 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Agreement Terms</h2>

          <div className="space-y-4">
            {/* Monthly rent */}
            <div>
              <label className="label">Monthly Rent (Rs.) *</label>
              <input className="input" type="number" placeholder="e.g. 15000"
                value={form.monthly_rent || ""}
                onChange={(e) => update("monthly_rent", Number(e.target.value))} />
            </div>

            {/* Security deposit */}
            <div>
              <label className="label">Security Deposit (Rs.) *</label>
              <input className="input" type="number" placeholder="e.g. 30000"
                value={form.security_deposit || ""}
                onChange={(e) => update("security_deposit", Number(e.target.value))} />
              {/* MTA deposit cap warning */}
              {depositWarning && (
                <p className="text-amber-600 text-xs mt-1">
                  ⚠️ Deposit exceeds 2-month cap in {selectedState?.name} (MTA 2021)
                </p>
              )}
            </div>

            {/* Start date */}
            <div>
              <label className="label">Start Date *</label>
              <input className="input" type="date"
                value={form.start_date}
                onChange={(e) => update("start_date", e.target.value)} />
            </div>

            {/* Duration */}
            <div>
              <label className="label">Duration (Months) *</label>
              <div className="grid grid-cols-3 gap-2">
                {[11, 12, 24].map((m) => (
                  <button key={m}
                    onClick={() => update("duration_months", m)}
                    className={`
                      py-2 rounded-lg border text-sm font-medium transition-colors
                      ${form.duration_months === m
                        ? "border-blue-700 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    {m} months
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                💡 11 months is most common — avoids mandatory registration in most states
              </p>
            </div>

            {/* Notice period */}
            <div>
              <label className="label">Notice Period (Days) *</label>
              <select className="input" value={form.notice_period_days}
                onChange={(e) => update("notice_period_days", Number(e.target.value))}>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>

            {/* Utility payers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Electricity Paid By</label>
                <select className="input" value={form.electricity_payer}
                  onChange={(e) => update("electricity_payer", e.target.value)}>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </div>
              <div>
                <label className="label">Water Paid By</label>
                <select className="input" value={form.water_payer}
                  onChange={(e) => update("water_payer", e.target.value)}>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </div>
            </div>

            {/* Special conditions */}
            <div>
              <label className="label">Special Conditions (Optional)</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Any additional terms or conditions"
                value={form.special_conditions}
                onChange={(e) => update("special_conditions", e.target.value)} />
            </div>

            {/* Stamp duty preview */}
            {stampDuty > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-xs font-medium mb-1">
                  Estimated Stamp Duty — {selectedState?.name}
                </p>
                <p className="text-green-700 text-sm font-bold">
                  Rs. {stampDuty.toLocaleString("en-IN")}
                </p>
                <p className="text-green-600 text-xs mt-0.5">
                  Based on {selectedState?.stamp_duty_formula.rate}% rate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Step 5: Review & Pay ── */}
      {step === 5 && (
        <div className="space-y-4">

          {/* Summary card */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Review Your Details</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Property</span>
                <span className="text-gray-900 text-right max-w-[200px]">{form.property_address}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">State / City</span>
                <span className="text-gray-900">{selectedState?.name} / {form.city}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Landlord</span>
                <span className="text-gray-900">{form.landlord_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Tenant</span>
                <span className="text-gray-900">{form.tenant_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Monthly Rent</span>
                <span className="text-gray-900 font-medium">Rs. {form.monthly_rent.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Security Deposit</span>
                <span className="text-gray-900">Rs. {form.security_deposit.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Duration</span>
                <span className="text-gray-900">{form.duration_months} months</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Stamp Duty</span>
                <span className="text-gray-900">Rs. {stampDuty.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* ── Step 6: Success + Download ── */}
{step === 6 && (
  <div className="space-y-4">

    {/* Success message */}
    <div className="card text-center">
      <div className="text-5xl mb-3">🎉</div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Agreement Generated!
      </h2>
      <p className="text-gray-500 text-sm">
        Ref: {docId}
      </p>
    </div>

    {/* Agreement preview */}
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Agreement Preview</h3>
        {/* Download button */}
        <button
          onClick={() => {
            // Create downloadable text file
            const blob = new Blob([agreementText], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `rental-agreement-${docId}.txt`
            a.click()
          }}
          className="btn-secondary py-1.5 text-sm"
        >
          Download
        </button>
      </div>
      {/* Agreement text preview */}
      <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono leading-relaxed">
        {agreementText}
      </pre>
    </div>

    {/* Next steps */}
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-start gap-2">
          <span className="text-blue-700 font-bold mt-0.5">1.</span>
          Download the agreement above
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-700 font-bold mt-0.5">2.</span>
          Get it printed on stamp paper (Rs. {
            Math.max(
              Math.round(
                form.monthly_rent * form.duration_months * 0.0025
              ),
              100
            ).toLocaleString("en-IN")
          } stamp duty)
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-700 font-bold mt-0.5">3.</span>
          Both parties sign the agreement
        </li>
        {STATES.find(s => s.code === form.state)?.police_verification_required && (
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold mt-0.5">4.</span>
            Police verification required in {STATES.find(s => s.code === form.state)?.name}
          </li>
        )}
      </ul>
    </div>

    {/* Action buttons */}
    <div className="flex flex-col sm:flex-row gap-3">
      <a href="/dashboard" className="btn-primary text-center flex-1">
        Go to Dashboard
      </a>
      <a href="/agreements/new" className="btn-secondary text-center flex-1">
        Create Another
      </a>
    </div>

  </div>
)}

          {/* Pricing card */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">Payment Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Document fee</span>
                <span>Rs. {base}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (18%)</span>
                <span>Rs. {gst}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2">
                <span>Total</span>
                <span className="text-blue-700">Rs. {total}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> This is a drafting tool, not legal advice.
              Laws vary by state. Verify with a local advocate for complex cases.
              Your data is deleted after 30 days (DPDP Act 2025).
            </p>
          </div>

          {/* Pay button — Razorpay integration */}
<PaymentButton
  amount={199}
  planType="retail"
  label="Pay & Generate Agreement"
 onSuccess={async (paymentId) => {
  try {
    setLoading(true)
    // ── Generate agreement after payment ──────────────
    const res = await fetch("/api/agreements/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData: form,
        paymentId,
      }),
    })
    const data = await res.json()
    if (data.success) {
      setAgreementText(data.agreement_text)
      setDocId(data.document_id)
      setPaymentDone(true)
      setStep(6) // Move to success step
    }
  } catch (error) {
    console.error("Generate error:", error)
    alert("Agreement generation failed. Contact support.")
  } finally {
    setLoading(false)
  }
}}
/>

        </div>
      )}

      {/* ── Navigation buttons ── */}
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button className="btn-secondary" onClick={() => setStep(step - 1)}>
            ← Previous
          </button>
        ) : (
          <div />
        )}

        {step < 5 && (
          <button
            className="btn-primary"
            onClick={() => setStep(step + 1)}
          >
            Next →
          </button>
        )}
      </div>

    </div>
  )
}