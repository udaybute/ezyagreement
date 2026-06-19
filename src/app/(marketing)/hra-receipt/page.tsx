/**
 * Public HRA Receipt Generator
 * - No login required — free for everyone
 * - SEO optimized for "free rent receipt generator HRA"
 * - Drives upsell to paid rental agreement
 * - Responsive: mobile first
 */

import Link from "next/link"
import type { Metadata } from "next"

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Free HRA Rent Receipt Generator 2026 | Instant Download",
  description:
    "Generate HRA-compliant rent receipts instantly for free. PAN check included. Valid for income tax HRA exemption. No signup required.",
  keywords: [
    "free rent receipt generator",
    "hra rent receipt",
    "rent receipt for income tax",
    "rent receipt format india",
  ],
}

export default function PublicHRAReceiptPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            100% FREE — No Signup Required
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free HRA Rent Receipt Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Generate HRA-compliant rent receipts instantly.
            Valid for income tax exemption under Section 10(13A).
            PAN check included.
          </p>
          <Link href="/login"
            className="btn-primary text-base px-8 py-3 inline-block">
            Generate Free Receipt
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            No credit card · No signup · Instant download
          </p>
        </div>
      </section>

      {/* ── HRA Rules ── */}
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            HRA Tax Rules 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "📋",
                title: "Old Tax Regime Only",
                desc: "HRA exemption available ONLY if you have chosen the Old Tax Regime. Not applicable under New Tax Regime.",
              },
              {
                icon: "🪪",
                title: "PAN Required",
                desc: "If monthly rent exceeds Rs.3,000 — PAN of landlord is mandatory. Without PAN, HRA claim may be rejected.",
              },
              {
                icon: "📝",
                title: "Form 10BA",
                desc: "If annual rent exceeds Rs.1,00,000 — you must submit Form 10BA declaration to your employer.",
              },
              {
                icon: "✍️",
                title: "Signature Mandatory",
                desc: "Landlord signature on rent receipt is mandatory for HRA claim. Our receipt includes a signature field.",
              },
            ].map((rule) => (
              <div key={rule.title} className="card">
                <div className="text-2xl mb-2">{rule.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{rule.title}</h3>
                <p className="text-gray-500 text-sm">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Fill Details", desc: "Enter tenant, landlord, rent amount and month" },
              { step: "2", title: "Generate", desc: "Instant receipt with all HRA-required fields" },
              { step: "3", title: "Download", desc: "Download and get landlord signature" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/login"
              className="btn-primary text-base px-8 py-3 inline-block">
              Generate Free Receipt Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Upsell — Rental Agreement ── */}
      <section className="bg-blue-700 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Also need a Rental Agreement?
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            Generate a legally valid, state-specific rental agreement for just Rs.199.
            Instant PDF, eStamp included, WhatsApp delivery.
          </p>
          <Link href="/login"
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
            Generate Agreement — Rs.199
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this rent receipt valid for HRA claim?",
                a: "Yes — our receipt includes all required fields: tenant name, landlord name, PAN (if applicable), property address, amount, month, and signature space. Valid under Section 10(13A).",
              },
              {
                q: "Is PAN mandatory on rent receipt?",
                a: "PAN of landlord is mandatory if monthly rent exceeds Rs.3,000. Our tool automatically shows PAN fields when needed.",
              },
              {
                q: "Can I generate receipts for multiple months?",
                a: "Yes — generate one receipt per month. Each receipt has a unique receipt number for your records.",
              },
              {
                q: "Is my data stored anywhere?",
                a: "No — receipts are generated in your browser and downloaded directly. We do not store any of your data. Fully DPDP Act 2025 compliant.",
              },
            ].map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}