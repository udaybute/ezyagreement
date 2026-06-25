/**
 * Terms of Service Page
 * - Clear and simple language
 * - Covers: usage, payments, refunds, disclaimers
 * - Responsive: mobile first
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Elvatrixa Legal",
  description: "Terms of service for Elvatrixa Legal. Read our terms before using our legal document generation service.",
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: June 1, 2026
        </p>
      </div>

      {/* ── Important notice ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <p className="text-amber-800 font-medium text-sm mb-1">
          ⚠️ Important
        </p>
        <p className="text-amber-700 text-sm">
          Elvatrixa Legal is a document drafting tool — NOT a law firm.
          We do not provide legal advice. Always consult a qualified advocate
          for complex legal matters.
        </p>
      </div>

      {/* ── Content ── */}
      <div className="space-y-8 text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm leading-relaxed">
            By using Elvatrixa Legal ("Service"), you agree to these Terms of
            Service. If you do not agree, please do not use our Service.
            These terms apply to all users including individuals, brokers,
            CAs, and enterprises.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            2. What We Provide
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              "State-specific rental agreement and legal document generation",
              "HRA-compliant rent receipt generation (free)",
              "Stamp duty calculator (free)",
              "eStamp and eSign integration",
              "WhatsApp delivery of generated documents",
              "Broker and CA dashboard for bulk document management",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-700">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            3. What We Do NOT Provide
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              "Legal advice or legal representation",
              "Guarantee that agreements will be accepted by all courts",
              "Legal assistance in case of disputes between landlord and tenant",
              "Registration services (we guide you, but registration is done at your state office)",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-red-500">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            4. Payments and Refunds
          </h2>
          <div className="space-y-3 text-sm">
            <p className="leading-relaxed">
              <strong>Payment:</strong> All payments are processed securely via
              Razorpay. We accept UPI, credit/debit cards, and net banking.
              GST of 18% is applicable on all paid services.
            </p>
            <p className="leading-relaxed">
              <strong>Refund Policy:</strong> If your document was not generated
              due to a technical error on our side, we will issue a full refund
              within 48 hours. If the document was successfully generated,
              refunds are not applicable as the service has been delivered.
            </p>
            <p className="leading-relaxed">
              <strong>Subscriptions:</strong> Monthly subscriptions (Broker,
              CA Reseller, Enterprise) can be cancelled anytime. No refund for
              the current billing period. Access continues until end of period.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            5. User Responsibilities
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              "Provide accurate and truthful information when generating documents",
              "Verify all details in the generated document before signing",
              "Comply with your state's specific rental laws and registration requirements",
              "Not use our service for fraudulent or illegal purposes",
              "Keep your account credentials secure and not share them",
              "Consult a qualified advocate for complex legal situations",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-700">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            6. Legal Disclaimers
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "State Laws Vary",
                desc: "Rental laws differ across all 22 states. Our templates are based on each state's governing act but may not cover all edge cases. Always verify with a local advocate.",
              },
              {
                title: "MTA 2021",
                desc: "The Model Tenancy Act 2021 has been adopted by only UP, Rajasthan, and Kerala. The 2-month deposit cap does NOT apply in other states.",
              },
              {
                title: "Not Legal Advice",
                desc: "Nothing on this platform constitutes legal advice. We are a technology company providing document automation tools.",
              },
              {
                title: "Accuracy",
                desc: "While we strive for accuracy, stamp duty rates and legal requirements may change. Always verify current rates with your state's registration department.",
              },
            ].map((d) => (
              <div key={d.title} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 text-sm">{d.title}</p>
                <p className="text-gray-600 text-sm mt-0.5">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            7. Intellectual Property
          </h2>
          <p className="text-sm leading-relaxed">
            All content, templates, code, and design on Elvatrixa Legal are
            owned by Elvatrixa Pvt. Ltd. You may not copy, reproduce, or
            distribute our templates without written permission.
            Generated documents belong to you — we only retain copies
            for the agreed storage period.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            8. Governing Law
          </h2>
          <p className="text-sm leading-relaxed">
            These terms are governed by the laws of India. Any disputes
            shall be subject to the exclusive jurisdiction of courts in
            Pune, Maharashtra, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            9. Contact
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p><strong>Company:</strong> Elvatrixa Pvt. Ltd.</p>
            <p><strong>Email:</strong> support@elvatrixa.com</p>
            <p><strong>Founder:</strong> Uday Bute</p>
          </div>
        </section>

      </div>
    </div>
  )
}