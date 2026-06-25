/**
 * Pricing Page
 * - Shows all plans: Pay Per Doc, Broker, Enterprise, CA Reseller
 * - FAQ section
 * - Responsive: mobile first
 */

import Link from "next/link"
import type { Metadata } from "next"

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Pricing — Rental Agreement Rs.199 | Elvatrixa Legal",
  description:
    "Simple pricing for rental agreements. Rs.199 per doc, Rs.1499/month for brokers. No hidden charges. GST invoice included.",
}

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-600">
          No hidden charges. GST invoice included. Cancel anytime.
        </p>
      </div>

      {/* ── Plans grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {/* Pay Per Doc */}
        <div className="card border-2 border-blue-700 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">For individuals</p>
          <h3 className="text-xl font-bold text-gray-900">Pay Per Doc</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-blue-700">Rs.199</span>
            <span className="text-gray-500 text-sm"> /doc</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Instant PDF
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> WhatsApp delivery
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> eStamp included
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 30-day storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Hindi/Marathi/Tamil output
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> GST invoice
            </li>
          </ul>
          <Link href="/login"
            className="btn-primary w-full block text-center">
            Get Started
          </Link>
        </div>

        {/* Broker Plan */}
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">For brokers</p>
          <h3 className="text-xl font-bold text-gray-900">Broker Plan</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-gray-900">Rs.1,499</span>
            <span className="text-gray-500 text-sm"> /month</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 20 docs/month
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Client dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> White-label WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Bulk generation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Analytics & reports
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Priority support
            </li>
          </ul>
          <Link href="/login"
            className="btn-secondary w-full block text-center">
            Get Started
          </Link>
        </div>

        {/* CA Reseller */}
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">For CAs & lawyers</p>
          <h3 className="text-xl font-bold text-gray-900">CA Reseller</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-gray-900">Rs.2,999</span>
            <span className="text-gray-500 text-sm"> /month</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Unlimited docs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> White-label PDF
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Client portal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> GST invoice auto-gen
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> CA dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Volume pricing
            </li>
          </ul>
          <Link href="/login"
            className="btn-secondary w-full block text-center">
            Get Started
          </Link>
        </div>

        {/* Enterprise */}
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">For co-living & PG</p>
          <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-gray-900">Rs.4,999</span>
            <span className="text-gray-500 text-sm"> /month</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Unlimited docs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> API access
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Custom clauses
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> SLA guarantee
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Dedicated support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Custom branding
            </li>
          </ul>
          <Link href="/contact"
            className="btn-secondary w-full block text-center">
            Contact Us
          </Link>
        </div>

      </div>

      {/* ── Free tools ── */}
      <div className="card bg-green-50 border-green-200 mb-10 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">
          Free Tools — No Signup Required
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Use these tools completely free — no login needed
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/hra-receipt"
            className="btn-secondary py-2 text-sm">
            🧾 Free HRA Receipt Generator
          </Link>
          <Link href="/stamp-duty-calculator"
            className="btn-secondary py-2 text-sm">
            🧮 Free Stamp Duty Calculator
          </Link>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is Rs.199 the total price — no hidden charges?",
              a: "Yes — Rs.199 is the document fee. GST of 18% (Rs.36) is added at checkout, making total Rs.235. No other charges. eStamp fees are separate and paid directly to SHCIL/state portal.",
            },
            {
              q: "Is the generated agreement legally valid?",
              a: "Yes — our agreements are state-specific, use correct governing acts, and include proper clauses. However, this is a drafting tool, not a law firm. For complex cases, consult a qualified advocate.",
            },
            {
              q: "Can I get a refund?",
              a: "If the agreement was not generated due to a technical error on our side, we will refund within 48 hours. If agreement was generated successfully, refunds are not applicable as the service was delivered.",
            },
            {
              q: "Do I need to store Aadhaar?",
              a: "No — Aadhaar is not required. We follow DPDP Act 2025 guidelines. PAN card, Voter ID, Passport, or Driving Licence are accepted. Aadhaar is completely optional.",
            },
            {
              q: "What languages are supported?",
              a: "English, Hindi, Marathi, and Tamil. More languages coming soon. You can select your preferred language during agreement generation.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-blue-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
          Ready to get started?
        </h2>
        <p className="text-blue-100 mb-6">
          Generate your first rental agreement in 5 minutes
        </p>
        <Link href="/login"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
          Get Started — Rs.199
        </Link>
      </div>

    </div>
  )
}