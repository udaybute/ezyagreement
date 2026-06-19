/**
 * Refund Policy Page
 * - Clear refund terms
 * - Responsive: mobile first
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Refund Policy | Elvatrixa Legal",
  description: "Refund policy for Elvatrixa Legal. Learn about our refund terms for document generation and subscription plans.",
}

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Refund Policy
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: June 1, 2026
        </p>
      </div>

      {/* ── Summary box ── */}
      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">Quick Summary</h2>
        <div className="space-y-2 text-sm">
          {[
            { icon: "✅", text: "Full refund if document not generated due to our technical error" },
            { icon: "✅", text: "Full refund if payment deducted but order not created" },
            { icon: "❌", text: "No refund if document was successfully generated" },
            { icon: "❌", text: "No refund for current subscription period after cancellation" },
            { icon: "⏱️", text: "Refunds processed within 5-7 business days" },
          ].map((item) => (
            <div key={item.text} className="flex gap-2">
              <span>{item.icon}</span>
              <span className="text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="space-y-8 text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            1. Pay Per Doc — Refund Policy
          </h2>
          <div className="space-y-3 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="font-medium text-green-900 mb-1">
                ✅ You ARE eligible for a refund if:
              </p>
              <ul className="space-y-1 text-green-800">
                <li>• Payment was deducted but document was not generated</li>
                <li>• Technical error on our side prevented document delivery</li>
                <li>• Duplicate payment was charged</li>
                <li>• Wrong amount was charged</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="font-medium text-red-900 mb-1">
                ❌ You are NOT eligible for a refund if:
              </p>
              <ul className="space-y-1 text-red-800">
                <li>• Document was successfully generated and downloaded</li>
                <li>• You entered incorrect information in the form</li>
                <li>• You changed your mind after generation</li>
                <li>• The agreement does not meet your specific requirements</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            2. Subscription Plans — Refund Policy
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Broker Plan, CA Reseller, Enterprise:</strong> Monthly
              subscriptions can be cancelled at any time. Once cancelled, your
              access continues until the end of the current billing period.
              No refund is issued for the remaining days of the current period.
            </p>
            <p>
              <strong>Exception:</strong> If you were charged after cancellation
              due to a billing error, we will issue a full refund within 48 hours.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            3. How to Request a Refund
          </h2>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Email us within 48 hours",
                desc: "Send an email to support@elvatrixa.com with subject 'Refund Request'",
              },
              {
                step: "2",
                title: "Include these details",
                desc: "Your registered email, Razorpay payment ID, reason for refund request",
              },
              {
                step: "3",
                title: "We review within 24 hours",
                desc: "Our team will review your request and respond within 24 hours",
              },
              {
                step: "4",
                title: "Refund processed in 5-7 days",
                desc: "Approved refunds are credited back to your original payment method within 5-7 business days",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 items-start">
                <div className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{s.title}</p>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            4. Contact for Refunds
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p><strong>Email:</strong> support@elvatrixa.com</p>
            <p><strong>Subject:</strong> Refund Request — [Your Payment ID]</p>
            <p><strong>Response time:</strong> Within 24 hours</p>
            <p><strong>Refund processing:</strong> 5-7 business days</p>
          </div>
        </section>

      </div>

      {/* ── Links ── */}
      <div className="flex flex-wrap gap-3 mt-8">
        <Link href="/legal/privacy" className="btn-secondary py-2 text-sm">
          Privacy Policy
        </Link>
        <Link href="/legal/terms" className="btn-secondary py-2 text-sm">
          Terms of Service
        </Link>
        <Link href="/contact" className="btn-secondary py-2 text-sm">
          Contact Us
        </Link>
      </div>

    </div>
  )
}