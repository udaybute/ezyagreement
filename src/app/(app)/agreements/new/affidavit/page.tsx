"use client"

/**
 * Affidavit Generator Page
 * - General purpose affidavit
 * - Multiple affidavit types
 * - Responsive: mobile first
 * - DPDP: no Aadhaar storage
 */

import { useState } from "react"
import Link from "next/link"
import { calculateTotal } from "@/lib/constants"
import PaymentButton from "@/components/ui/payment-button"

// ── Affidavit Types ──────────────────────────────────────────
const AFFIDAVIT_TYPES = [
  { value: "general",        label: "General Affidavit",         desc: "For general purposes" },
  { value: "name_change",    label: "Name Change Affidavit",     desc: "For name change declaration" },
  { value: "address_proof",  label: "Address Proof Affidavit",   desc: "For address verification" },
  { value: "income_proof",   label: "Income Proof Affidavit",    desc: "For income declaration" },
  { value: "loss_of_document", label: "Loss of Document",        desc: "For lost document declaration" },
  { value: "relationship",   label: "Relationship Affidavit",    desc: "For relationship declaration" },
]

interface AffidavitFormData {
  affidavit_type: string
  // Deponent (person making affidavit)
  deponent_name: string
  deponent_age: string
  deponent_address: string
  deponent_phone: string
  deponent_id_type: string
  deponent_id_number: string
  // Location
  city: string
  state: string
  // Content
  declaration: string
}

const initialForm: AffidavitFormData = {
  affidavit_type: "general",
  deponent_name: "",
  deponent_age: "",
  deponent_address: "",
  deponent_phone: "",
  deponent_id_type: "pan",
  deponent_id_number: "",
  city: "",
  state: "",
  declaration: "",
}

const STEPS = [
  { number: 1, title: "Type" },
  { number: 2, title: "Details" },
  { number: 3, title: "Declaration" },
  { number: 4, title: "Review" },
]

export default function AffidavitPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<AffidavitFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [affidavitText, setAffidavitText] = useState("")
  const [docId, setDocId] = useState("")

  function update(field: keyof AffidavitFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const selectedType = AFFIDAVIT_TYPES.find(
    (a) => a.value === form.affidavit_type
  )

  const { base, gst, total } = calculateTotal(199)

  // ── Generate affidavit text ──────────────────────────────
  function generateAffidavitText() {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    })
    const refNo = `AFF-${Date.now().toString().slice(-8)}`

    // Default declarations by type
    const defaultDeclarations: Record<string, string> = {
      general: form.declaration || "I hereby solemnly affirm and declare that the facts stated herein are true and correct to the best of my knowledge and belief.",
      name_change: `I hereby solemnly affirm that my name has been changed. My old name was [OLD NAME] and my new name is ${form.deponent_name}. Both names refer to the same person i.e. myself.`,
      address_proof: `I hereby solemnly affirm that I am residing at ${form.deponent_address}, ${form.city}, ${form.state}. The above mentioned address is my current residential address.`,
      income_proof: `I hereby solemnly affirm that my annual income from all sources is Rs. [AMOUNT] only. I am submitting this affidavit as proof of income.`,
      loss_of_document: `I hereby solemnly affirm that I have lost my [DOCUMENT NAME] bearing number [NUMBER]. I have searched for the same but have been unable to trace it. If found, I shall return the same.`,
      relationship: `I hereby solemnly affirm that [PERSON NAME] is my [RELATIONSHIP] and we are related to each other. This affidavit is being given for [PURPOSE].`,
    }

    const declaration = form.declaration ||
      defaultDeclarations[form.affidavit_type] ||
      defaultDeclarations.general

    return `
AFFIDAVIT
(${selectedType?.label})

Ref No : ${refNo}
Date   : ${today}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I, ${form.deponent_name}, aged ${form.deponent_age} years,
residing at ${form.deponent_address},
${form.city}, ${form.state},

do hereby solemnly affirm and declare as under:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DECLARATION

${declaration}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VERIFICATION

I, ${form.deponent_name}, do hereby verify that the
contents of the above affidavit are true and correct
to the best of my knowledge and belief. Nothing
material has been concealed therefrom.

Verified at ${form.city} on ${today}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEPONENT DETAILS

Name    : ${form.deponent_name}
Age     : ${form.deponent_age} years
Address : ${form.deponent_address}
Phone   : ${form.deponent_phone}
ID Type : ${form.deponent_id_type.toUpperCase()}
ID No   : ${form.deponent_id_number}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIGNATURE

___________________________
${form.deponent_name} (Deponent)
Date: ${today}
Place: ${form.city}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTE: This affidavit should be sworn before a
Notary Public or Magistrate/Executive Magistrate
on appropriate stamp paper.

Generated by Elvatrixa Legal — elvatrixa.com
Ref: ${refNo} | This is a drafting tool, not legal advice.
    `.trim()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <Link href="/agreements/new"
        className="text-blue-600 text-sm mb-6 block">
        ← Back
      </Link>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Affidavit Generator
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        General purpose affidavit — Rs.199
      </p>

      {/* ── Step indicator ── */}
      <div className="flex items-center justify-between mb-8">
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
                h-0.5 w-12 md:w-24 mx-1
                ${step > s.number ? "bg-green-500" : "bg-gray-200"}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Type ── */}
      {step === 1 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Select Affidavit Type
          </h2>
          <div className="space-y-3">
            {AFFIDAVIT_TYPES.map((type) => (
              <button key={type.value}
                onClick={() => update("affidavit_type", type.value)}
                className={`
                  w-full text-left p-4 rounded-lg border transition-colors
                  ${form.affidavit_type === type.value
                    ? "border-blue-700 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                  }
                `}>
                <p className={`font-medium text-sm
                  ${form.affidavit_type === type.value
                    ? "text-blue-700" : "text-gray-900"
                  }`}>
                  {type.label}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Deponent Details ── */}
      {step === 2 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-1">
            Deponent Details
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Person making this affidavit
          </p>
          <div className="space-y-4">

            <div>
              <label className="label">Full Name *</label>
              <input className="input" type="text"
                placeholder="As per ID proof"
                value={form.deponent_name}
                onChange={(e) => update("deponent_name", e.target.value)} />
            </div>

            <div>
              <label className="label">Age *</label>
              <input className="input" type="number"
                placeholder="Age in years"
                value={form.deponent_age}
                onChange={(e) => update("deponent_age", e.target.value)} />
            </div>

            <div>
              <label className="label">Address *</label>
              <textarea className="input min-h-[80px] resize-none"
                placeholder="Current residential address"
                value={form.deponent_address}
                onChange={(e) => update("deponent_address", e.target.value)} />
            </div>

            <div>
              <label className="label">Phone *</label>
              <input className="input" type="tel"
                placeholder="10-digit mobile"
                maxLength={10}
                value={form.deponent_phone}
                onChange={(e) => update("deponent_phone", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">City *</label>
                <input className="input" type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)} />
              </div>
              <div>
                <label className="label">State *</label>
                <input className="input" type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">ID Type *</label>
              <select className="input" value={form.deponent_id_type}
                onChange={(e) => update("deponent_id_type", e.target.value)}>
                <option value="pan">PAN Card</option>
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
                value={form.deponent_id_number}
                onChange={(e) => update("deponent_id_number", e.target.value)} />
            </div>

          </div>
        </div>
      )}

      {/* ── Step 3: Declaration ── */}
      {step === 3 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-1">
            Declaration Content
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Write what you want to declare. Leave blank to use
            default text for {selectedType?.label}.
          </p>

          {/* Default text hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-blue-800 text-xs font-medium mb-1">
              💡 Default text for {selectedType?.label}:
            </p>
            <p className="text-blue-700 text-xs leading-relaxed">
              {form.affidavit_type === "general" &&
                "I hereby solemnly affirm that the facts stated are true..."}
              {form.affidavit_type === "name_change" &&
                "My name has been changed from [OLD NAME] to [NEW NAME]..."}
              {form.affidavit_type === "address_proof" &&
                "I am residing at the above mentioned address..."}
              {form.affidavit_type === "income_proof" &&
                "My annual income from all sources is Rs. [AMOUNT]..."}
              {form.affidavit_type === "loss_of_document" &&
                "I have lost my [DOCUMENT] and unable to trace it..."}
              {form.affidavit_type === "relationship" &&
                "[PERSON] is my [RELATIONSHIP]..."}
            </p>
          </div>

          <div>
            <label className="label">
              Your Declaration (Optional — leave blank for default)
            </label>
            <textarea
              className="input min-h-[160px] resize-none"
              placeholder="Write your specific declaration here... or leave blank to use default text"
              value={form.declaration}
              onChange={(e) => update("declaration", e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              {form.declaration.length} characters
            </p>
          </div>

          {/* Important note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
            <p className="text-amber-800 text-xs leading-relaxed">
              ⚠️ <strong>Important:</strong> This affidavit must be
              signed before a Notary Public or Magistrate on appropriate
              stamp paper to be legally valid.
            </p>
          </div>
        </div>
      )}

      {/* ── Step 4: Review & Pay ── */}
      {step === 4 && (
        <div className="space-y-4">

          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">
              Review Details
            </h2>
            <div className="space-y-2 text-sm">
              {[
                ["Type",      selectedType?.label ?? ""],
                ["Deponent",  form.deponent_name],
                ["Age",       `${form.deponent_age} years`],
                ["City",      form.city],
                ["State",     form.state],
                ["ID Type",   form.deponent_id_type.toUpperCase()],
              ].map(([label, value]) => (
                <div key={label}
                  className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="card">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Document fee</span>
                <span>Rs. {base}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (18%)</span>
                <span>Rs. {gst}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-blue-700">Rs. {total}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Note:</strong> Affidavit must be signed before a
              Notary Public on stamp paper to be legally valid.
              This tool generates the draft only.
            </p>
          </div>

          <PaymentButton
            amount={199}
            planType="retail"
            label="Pay & Generate Affidavit"
            onSuccess={async (paymentId) => {
              try {
                setLoading(true)
                const text = generateAffidavitText()
                setAffidavitText(text)
                setDocId(`AFF-${Date.now()}`)
                setStep(5)
              } catch (error) {
                alert("Generation failed.")
              } finally {
                setLoading(false)
              }
            }}
          />

        </div>
      )}

      {/* ── Step 5: Success ── */}
      {step === 5 && (
        <div className="space-y-4">

          <div className="card text-center">
            <div className="text-5xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Affidavit Generated!
            </h2>
            <p className="text-gray-500 text-sm">
              Get it signed before a Notary Public
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Preview</h3>
              <button
                onClick={() => {
                  const blob = new Blob([affidavitText], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `affidavit-${docId}.txt`
                  a.click()
                }}
                className="btn-secondary py-1.5 text-sm">
                Download
              </button>
            </div>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono leading-relaxed">
              {affidavitText}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/dashboard"
              className="btn-primary text-center flex-1">
              Go to Dashboard
            </a>
            <a href="/agreements/new"
              className="btn-secondary text-center flex-1">
              Create Another
            </a>
          </div>

        </div>
      )}

      {/* ── Navigation ── */}
      {step < 5 && (
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button className="btn-secondary"
              onClick={() => setStep(step - 1)}>
              ← Previous
            </button>
          ) : <div />}
          {step < 4 && (
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