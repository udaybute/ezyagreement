/**
 * Legal Disclaimer Page
 * - All 7 mandatory disclaimers
 * - DPDP compliance notice
 * - Responsive: mobile first
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Legal Disclaimer | Elvatrixa Legal",
  description:
    "Legal disclaimers for Elvatrixa Legal. State-specific laws, MTA 2021 facts, HRA tax rules, and DPDP compliance.",
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Legal Disclaimer
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: June 1, 2026
        </p>
      </div>

      {/* ── Important notice ── */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <p className="text-red-800 font-medium text-sm mb-1">
          ⚠️ Please Read Carefully
        </p>
        <p className="text-red-700 text-sm leading-relaxed">
          Elvatrixa Legal is a document drafting tool — NOT a law firm and
          NOT legal advice. All information on this platform is for general
          guidance only. Always verify with a qualified advocate before
          signing any legal document.
        </p>
      </div>

      {/* ── 7 Mandatory Disclaimers ── */}
      <div className="space-y-4 mb-10">
        <h2 className="text-lg font-bold text-gray-900">
          7 Important Facts You Must Know
        </h2>

        {[
          {
            number: "1",
            title: "Rental Laws Vary by State",
            content:
              "India does not have a single nationwide rental law. Each state has its own Rent Control Act. Maharashtra follows the Maharashtra Rent Control Act 1999. Karnataka follows the Karnataka Rent Act 1999. Delhi follows the Delhi Rent Control Act 1958. Our platform generates agreements based on YOUR state's current laws — always verify with a local advocate.",
            color: "blue",
          },
          {
            number: "2",
            title: "Model Tenancy Act 2021 — NOT Nationwide",
            content:
              "Viral social media posts claim 'new rent rules 2026 nationwide' — this is MISLEADING. The Model Tenancy Act 2021 has been adopted by ONLY 3 states: Uttar Pradesh, Rajasthan, and Kerala. Most states, including Karnataka, still follow their old rent control acts. The '2-month security deposit cap' applies ONLY in these MTA-adopting states.",
            color: "amber",
          },
          {
            number: "3",
            title: "Notarization is NOT Mandatory",
            content:
              "Notarization of rental agreements is OPTIONAL everywhere in India. It is NOT legally required for 11-month agreements. However, registration IS required for agreements above 11 months in most states. Maharashtra requires registration even for 11-month agreements.",
            color: "green",
          },
          {
            number: "4",
            title: "Police Verification — Not Nationwide",
            content:
              "Police verification for tenants is mandatory ONLY in: Delhi, Maharashtra, Karnataka, Hyderabad (Telangana), and Kolkata (West Bengal). It is NOT mandatory in other states. Our platform shows police verification guidance only for these 5 states/cities.",
            color: "purple",
          },
          {
            number: "5",
            title: "HRA Tax — Old Regime Only",
            content:
              "House Rent Allowance (HRA) exemption under Section 10(13A) is available ONLY if you have chosen the Old Tax Regime. If you have opted for the New Tax Regime, HRA exemption is NOT available — regardless of rent paid. PAN of landlord is mandatory if monthly rent exceeds Rs.3,000.",
            color: "blue",
          },
          {
            number: "6",
            title: "Not Legal Advice",
            content:
              "Elvatrixa Legal is a technology platform that automates document drafting. We are NOT a law firm. Nothing on this platform constitutes legal advice or creates an attorney-client relationship. For complex situations, disputes, or high-value transactions — always consult a qualified advocate registered with the Bar Council of India.",
            color: "red",
          },
          {
            number: "7",
            title: "DPDP Act 2025 Compliance",
            content:
              "We are fully compliant with India's Digital Personal Data Protection Act 2023 (Rules notified November 13, 2025). Aadhaar is OPTIONAL and deleted immediately after eSign — never stored. All data is encrypted, stored in India, and deleted after 30 days. You have the right to access, correct, and delete your data at any time.",
            color: "green",
          },
        ].map((d) => (
          <div key={d.number} className={`
            card border-l-4
            ${d.color === "blue" ? "border-l-blue-500" : ""}
            ${d.color === "amber" ? "border-l-amber-500" : ""}
            ${d.color === "green" ? "border-l-green-500" : ""}
            ${d.color === "purple" ? "border-l-purple-500" : ""}
            ${d.color === "red" ? "border-l-red-500" : ""}
          `}>
            <div className="flex items-start gap-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                text-white font-bold text-sm flex-shrink-0
                ${d.color === "blue" ? "bg-blue-600" : ""}
                ${d.color === "amber" ? "bg-amber-500" : ""}
                ${d.color === "green" ? "bg-green-600" : ""}
                ${d.color === "purple" ? "bg-purple-600" : ""}
                ${d.color === "red" ? "bg-red-600" : ""}
              `}>
                {d.number}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {d.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {d.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stamp duty note ── */}
      <div className="card bg-gray-50 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">
          Stamp Duty — Important Note
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Stamp duty rates shown on our platform are approximate and based
          on publicly available information. Rates may change without notice.
          Always verify the current stamp duty with your state's registration
          department or SHCIL portal before paying. We are not liable for
          any discrepancy in stamp duty amounts.
        </p>
      </div>

      {/* ── Where disclaimers appear ── */}
      <div className="card mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">
          Where These Disclaimers Appear
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Footer on all pages of this website
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Checkbox acknowledgment before payment
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Footer of all generated PDF documents
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            WhatsApp message footer on document delivery
          </li>
        </ul>
      </div>

      {/* ── Links ── */}
      <div className="flex flex-wrap gap-3">
        <Link href="/legal/privacy" className="btn-secondary py-2 text-sm">
          Privacy Policy
        </Link>
        <Link href="/legal/terms" className="btn-secondary py-2 text-sm">
          Terms of Service
        </Link>
        <Link href="/legal/refund" className="btn-secondary py-2 text-sm">
          Refund Policy
        </Link>
        <Link href="/contact" className="btn-secondary py-2 text-sm">
          Contact Us
        </Link>
      </div>

    </div>
  )
}