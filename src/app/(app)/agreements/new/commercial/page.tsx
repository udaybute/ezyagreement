"use client"

/**
 * Commercial Lease Agreement Generator
 * - Shop, office, godown, warehouse
 * - State-specific clauses
 * - Responsive: mobile first
 * - DPDP: no Aadhaar storage
 */

import { useState } from "react"
import Link from "next/link"
import { STATES, calculateTotal } from "@/lib/constants"
import { calculateStampDuty } from "@/lib/utils"
import PaymentButton from "@/components/ui/payment-button"

// ── Types ────────────────────────────────────────────────────
interface CommercialFormData {
  // Step 1 - Property
  state: string
  city: string
  property_address: string
  property_type: "shop" | "office" | "godown" | "warehouse" | "showroom"
  carpet_area: number
  floor: string
  // Step 2 - Landlord
  landlord_name: string
  landlord_phone: string
  landlord_address: string
  landlord_id_type: "pan" | "voter_id" | "passport" | "driving_licence"
  landlord_id_number: string
  landlord_gstin?: string
  // Step 3 - Tenant
  tenant_name: string
  tenant_phone: string
  tenant_address: string
  tenant_id_type: "pan" | "voter_id" | "passport" | "driving_licence"
  tenant_id_number: string
  tenant_gstin?: string
  business_name: string
  business_type: string
  // Step 4 - Terms
  monthly_rent: number
  security_deposit: number
  start_date: string
  duration_months: number
  lock_in_months: number
  notice_period_days: number
  cam_charges: number
  electricity_payer: "tenant" | "landlord"
  maintenance_payer: "tenant" | "landlord"
  special_conditions: string
}

const initialForm: CommercialFormData = {
  state: "",
  city: "",
  property_address: "",
  property_type: "office",
  carpet_area: 0,
  floor: "",
  landlord_name: "",
  landlord_phone: "",
  landlord_address: "",
  landlord_id_type: "pan",
  landlord_id_number: "",
  landlord_gstin: "",
  tenant_name: "",
  tenant_phone: "",
  tenant_address: "",
  tenant_id_type: "pan",
  tenant_id_number: "",
  tenant_gstin: "",
  business_name: "",
  business_type: "",
  monthly_rent: 0,
  security_deposit: 0,
  start_date: "",
  duration_months: 12,
  lock_in_months: 6,
  notice_period_days: 60,
  cam_charges: 0,
  electricity_payer: "tenant",
  maintenance_payer: "tenant",
  special_conditions: "",
}

const STEPS = [
  { number: 1, title: "Property" },
  { number: 2, title: "Landlord" },
  { number: 3, title: "Tenant" },
  { number: 4, title: "Terms" },
  { number: 5, title: "Review" },
]

export default function CommercialLeasePage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<CommercialFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [agreementText, setAgreementText] = useState("")
  const [docId, setDocId] = useState("")

  // ── Update form ──────────────────────────────────────────
  function update(field: keyof CommercialFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const selectedState = STATES.find((s) => s.code === form.state)
  const cities = selectedState?.major_cities ?? []

  const stampDuty = form.state
    ? calculateStampDuty(
        form.state,
        form.monthly_rent,
        form.duration_months,
        form.security_deposit
      )
    : 0

  const { base, gst, total } = calculateTotal(499)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <Link href="/agreements/new"
        className="text-blue-600 text-sm mb-6 block">
        ← Back
      </Link>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Commercial Lease Agreement
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Shop, Office, Godown, Warehouse — Rs.499
      </p>

      {/* ── Step indicator ── */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                text-sm font-medium
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
            {i < STEPS.length - 1 && (
              <div className={`
                h-0.5 w-8 md:w-16 mx-1
                ${step > s.number ? "bg-green-500" : "bg-gray-200"}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Property ── */}
      {step === 1 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Property Details
          </h2>
          <div className="space-y-4">

            <div>
              <label className="label">State *</label>
              <select className="input" value={form.state}
                onChange={(e) => {
                  update("state", e.target.value)
                  update("city", "")
                }}>
                <option value="">Select state</option>
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">City *</label>
              <select className="input" value={form.city}
                onChange={(e) => update("city", e.target.value)}
                disabled={!form.state}>
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="label">Property Type *</label>
              <div className="grid grid-cols-3 gap-2">
                {(["shop", "office", "godown", "warehouse", "showroom"] as const).map((type) => (
                  <button key={type}
                    onClick={() => update("property_type", type)}
                    className={`
                      py-2 px-3 rounded-lg border text-sm font-medium capitalize
                      transition-colors
                      ${form.property_type === type
                        ? "border-blue-700 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Property Address *</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Full address of commercial property"
                value={form.property_address}
                onChange={(e) => update("property_address", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Carpet Area (sq ft)</label>
                <input className="input" type="number"
                  placeholder="e.g. 500"
                  value={form.carpet_area || ""}
                  onChange={(e) => update("carpet_area", Number(e.target.value))} />
              </div>
              <div>
                <label className="label">Floor</label>
                <input className="input" type="text"
                  placeholder="e.g. Ground, 2nd Floor"
                  value={form.floor}
                  onChange={(e) => update("floor", e.target.value)} />
              </div>
            </div>

            {/* State info */}
            {selectedState && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs font-medium mb-1">
                  {selectedState.name} — Commercial Rules
                </p>
                <ul className="text-blue-700 text-xs space-y-0.5">
                  <li>• Stamp duty: {selectedState.stamp_duty_formula.rate}%</li>
                  <li>• eStamp: {selectedState.estamp_available ? "Available" : "Manual only"}</li>
                  <li>• Registration required for agreements above 11 months</li>
                </ul>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Step 2: Landlord ── */}
      {step === 2 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Landlord Details
          </h2>
          <div className="space-y-4">

            <div>
              <label className="label">Full Name *</label>
              <input className="input" type="text"
                placeholder="As per ID proof"
                value={form.landlord_name}
                onChange={(e) => update("landlord_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Phone *</label>
              <input className="input" type="tel"
                placeholder="10-digit mobile"
                maxLength={10}
                value={form.landlord_phone}
                onChange={(e) => update("landlord_phone", e.target.value)} />
            </div>

            <div>
              <label className="label">Address *</label>
              <textarea className="input min-h-[70px] resize-none"
                placeholder="Landlord permanent address"
                value={form.landlord_address}
                onChange={(e) => update("landlord_address", e.target.value)} />
            </div>

            <div>
              <label className="label">ID Type *</label>
              <select className="input" value={form.landlord_id_type}
                onChange={(e) => update("landlord_id_type", e.target.value)}>
                <option value="pan">PAN Card (Recommended)</option>
                <option value="voter_id">Voter ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">Driving Licence</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                ℹ️ Aadhaar not required — DPDP Act 2025 compliant
              </p>
            </div>

            <div>
              <label className="label">ID Number *</label>
              <input className="input" type="text"
                placeholder="Enter ID number"
                value={form.landlord_id_number}
                onChange={(e) => update("landlord_id_number", e.target.value)} />
            </div>

            <div>
              <label className="label">GSTIN (Optional)</label>
              <input className="input" type="text"
                placeholder="15-digit GST number"
                maxLength={15}
                value={form.landlord_gstin}
                onChange={(e) => update("landlord_gstin", e.target.value.toUpperCase())} />
            </div>

          </div>
        </div>
      )}

      {/* ── Step 3: Tenant ── */}
      {step === 3 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Tenant / Business Details
          </h2>
          <div className="space-y-4">

            <div>
              <label className="label">Tenant / Proprietor Name *</label>
              <input className="input" type="text"
                placeholder="As per ID proof"
                value={form.tenant_name}
                onChange={(e) => update("tenant_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Business Name *</label>
              <input className="input" type="text"
                placeholder="Registered business name"
                value={form.business_name}
                onChange={(e) => update("business_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Business Type *</label>
              <input className="input" type="text"
                placeholder="e.g. Retail Shop, IT Office, Warehouse"
                value={form.business_type}
                onChange={(e) => update("business_type", e.target.value)} />
            </div>

            <div>
              <label className="label">Phone *</label>
              <input className="input" type="tel"
                placeholder="10-digit mobile"
                maxLength={10}
                value={form.tenant_phone}
                onChange={(e) => update("tenant_phone", e.target.value)} />
            </div>

            <div>
              <label className="label">Address *</label>
              <textarea className="input min-h-[70px] resize-none"
                placeholder="Tenant permanent address"
                value={form.tenant_address}
                onChange={(e) => update("tenant_address", e.target.value)} />
            </div>

            <div>
              <label className="label">ID Type *</label>
              <select className="input" value={form.tenant_id_type}
                onChange={(e) => update("tenant_id_type", e.target.value)}>
                <option value="pan">PAN Card (Recommended)</option>
                <option value="voter_id">Voter ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">Driving Licence</option>
              </select>
            </div>

            <div>
              <label className="label">ID Number *</label>
              <input className="input" type="text"
                placeholder="Enter ID number"
                value={form.tenant_id_number}
                onChange={(e) => update("tenant_id_number", e.target.value)} />
            </div>

            <div>
              <label className="label">GSTIN (Optional)</label>
              <input className="input" type="text"
                placeholder="15-digit GST number"
                maxLength={15}
                value={form.tenant_gstin}
                onChange={(e) => update("tenant_gstin", e.target.value.toUpperCase())} />
            </div>

          </div>
        </div>
      )}

      {/* ── Step 4: Terms ── */}
      {step === 4 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Lease Terms
          </h2>
          <div className="space-y-4">

            <div>
              <label className="label">Monthly Rent (Rs.) *</label>
              <input className="input" type="number"
                placeholder="e.g. 50000"
                value={form.monthly_rent || ""}
                onChange={(e) => update("monthly_rent", Number(e.target.value))} />
            </div>

            <div>
              <label className="label">Security Deposit (Rs.) *</label>
              <input className="input" type="number"
                placeholder="e.g. 300000"
                value={form.security_deposit || ""}
                onChange={(e) => update("security_deposit", Number(e.target.value))} />
            </div>

            <div>
              <label className="label">CAM Charges / Maintenance (Rs./month)</label>
              <input className="input" type="number"
                placeholder="Common Area Maintenance charges"
                value={form.cam_charges || ""}
                onChange={(e) => update("cam_charges", Number(e.target.value))} />
              <p className="text-xs text-gray-400 mt-1">
                Common area maintenance, parking, etc.
              </p>
            </div>

            <div>
              <label className="label">Start Date *</label>
              <input className="input" type="date"
                value={form.start_date}
                onChange={(e) => update("start_date", e.target.value)} />
            </div>

            <div>
              <label className="label">Duration (Months) *</label>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 60].map((m) => (
                  <button key={m}
                    onClick={() => update("duration_months", m)}
                    className={`
                      py-2 rounded-lg border text-sm font-medium transition-colors
                      ${form.duration_months === m
                        ? "border-blue-700 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}>
                    {m}mo
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Lock-in Period (Months)</label>
                <select className="input" value={form.lock_in_months}
                  onChange={(e) => update("lock_in_months", Number(e.target.value))}>
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>
              <div>
                <label className="label">Notice Period (Days)</label>
                <select className="input" value={form.notice_period_days}
                  onChange={(e) => update("notice_period_days", Number(e.target.value))}>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>
            </div>

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
                <label className="label">Maintenance Paid By</label>
                <select className="input" value={form.maintenance_payer}
                  onChange={(e) => update("maintenance_payer", e.target.value)}>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Special Conditions (Optional)</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Fit-out period, parking, signage rights, etc."
                value={form.special_conditions}
                onChange={(e) => update("special_conditions", e.target.value)} />
            </div>

            {/* Stamp duty preview */}
            {stampDuty > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-xs font-medium">
                  Estimated Stamp Duty — {selectedState?.name}
                </p>
                <p className="text-green-700 text-lg font-bold mt-1">
                  Rs. {stampDuty.toLocaleString("en-IN")}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Step 5: Review & Pay ── */}
      {step === 5 && (
        <div className="space-y-4">

          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">
              Review Your Details
            </h2>
            <div className="space-y-2 text-sm">
              {[
                ["Property Type", form.property_type],
                ["State / City", `${selectedState?.name} / ${form.city}`],
                ["Property Address", form.property_address],
                ["Landlord", form.landlord_name],
                ["Tenant / Business", `${form.tenant_name} (${form.business_name})`],
                ["Monthly Rent", `Rs. ${form.monthly_rent.toLocaleString("en-IN")}`],
                ["Security Deposit", `Rs. ${form.security_deposit.toLocaleString("en-IN")}`],
                ["CAM Charges", form.cam_charges > 0 ? `Rs. ${form.cam_charges.toLocaleString("en-IN")}/month` : "None"],
                ["Duration", `${form.duration_months} months`],
                ["Lock-in", `${form.lock_in_months} months`],
                ["Stamp Duty", `Rs. ${stampDuty.toLocaleString("en-IN")}`],
              ].map(([label, value]) => (
                <div key={label}
                  className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-gray-900 text-right max-w-[200px] capitalize">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">
              Payment Summary
            </h2>
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
              <strong>Disclaimer:</strong> Commercial lease laws vary by state.
              This is a drafting tool, not legal advice. Consult an advocate
              for high-value commercial transactions.
            </p>
          </div>

          {/* Pay button */}
          <PaymentButton
            amount={499}
            planType="retail"
            label="Pay & Generate Commercial Lease"
            onSuccess={async (paymentId) => {
              try {
                setLoading(true)
                const res = await fetch("/api/agreements/generate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    formData: { ...form, document_type: "commercial_lease" },
                    paymentId,
                  }),
                })
                const data = await res.json()
                if (data.success) {
                  setAgreementText(data.agreement_text)
                  setDocId(data.document_id)
                  setStep(6)
                }
              } catch (error) {
                console.error(error)
                alert("Generation failed. Contact support.")
              } finally {
                setLoading(false)
              }
            }}
          />

        </div>
      )}

      {/* ── Step 6: Success ── */}
      {step === 6 && (
        <div className="space-y-4">

          <div className="card text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Commercial Lease Generated!
            </h2>
            <p className="text-gray-500 text-sm">Ref: {docId}</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Preview</h3>
              <button
                onClick={() => {
                  const blob = new Blob([agreementText], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `commercial-lease-${docId}.txt`
                  a.click()
                }}
                className="btn-secondary py-1.5 text-sm">
                Download
              </button>
            </div>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono leading-relaxed">
              {agreementText}
            </pre>
          </div>

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

      {/* ── Navigation ── */}
      {step < 6 && (
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button className="btn-secondary"
              onClick={() => setStep(step - 1)}>
              ← Previous
            </button>
          ) : <div />}
          {step < 5 && (
            <button className="btn-primary"
              onClick={() => setStep(step + 1)}>
              Next →
            </button>
          )}
        </div>
      )}

    </div>
  )
}