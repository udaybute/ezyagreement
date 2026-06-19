/**
 * Police Verification Guide Page
 * - State-wise police verification info
 * - Official portal links
 * - SEO: "tenant police verification Delhi online"
 * - Responsive: mobile first
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tenant Police Verification Guide 2026 | Delhi, Maharashtra, Karnataka",
  description:
    "Complete guide for tenant police verification in India. Mandatory in Delhi, Maharashtra, Karnataka, Hyderabad, Kolkata. Official portal links included.",
  keywords: [
    "tenant police verification",
    "police verification Delhi online",
    "tenant verification Maharashtra",
    "police verification for rent",
  ],
}

// ── States requiring police verification ────────────────────
const VERIFICATION_STATES = [
  {
    state: "Delhi",
    mandatory: true,
    portal: "https://delhipolice.gov.in/tenant-verification",
    portal_name: "Delhi Police Online Portal",
    process: [
      "Visit Delhi Police website",
      "Click 'Tenant Verification'",
      "Fill tenant details + upload Aadhaar/ID",
      "Submit — acknowledgment received instantly",
      "Police may visit for physical verification",
    ],
    fee: "Free",
    time: "1-3 days",
    notes: "Mandatory for all rental properties in Delhi. Landlord is responsible.",
  },
  {
    state: "Maharashtra",
    mandatory: true,
    portal: "https://tenant.mahapolice.gov.in",
    portal_name: "Maharashtra Police Tenant Portal",
    process: [
      "Visit tenant.mahapolice.gov.in",
      "Register with your mobile number",
      "Enter tenant and property details",
      "Upload tenant ID proof",
      "Submit and download acknowledgment",
    ],
    fee: "Free",
    time: "2-5 days",
    notes: "Mandatory in Maharashtra. Online portal available. Landlord must submit.",
  },
  {
    state: "Karnataka",
    mandatory: true,
    portal: "https://ksaps.karnataka.gov.in",
    portal_name: "Karnataka Police KSAPS Portal",
    process: [
      "Visit KSAPS Karnataka Police portal",
      "Select 'Tenant Verification'",
      "Enter landlord and tenant details",
      "Upload required documents",
      "Submit — receive acknowledgment",
    ],
    fee: "Free",
    time: "3-7 days",
    notes: "Mandatory in Bengaluru and major Karnataka cities.",
  },
  {
    state: "Hyderabad (Telangana)",
    mandatory: true,
    portal: "https://hyderabadpolice.gov.in",
    portal_name: "Hyderabad City Police Portal",
    process: [
      "Visit Hyderabad Police website",
      "Navigate to 'Tenant Verification'",
      "Fill in all tenant details",
      "Submit with ID proof copy",
      "Receive digital acknowledgment",
    ],
    fee: "Free",
    time: "2-4 days",
    notes: "Mandatory in Hyderabad city limits. Required before tenant moves in.",
  },
  {
    state: "Kolkata (West Bengal)",
    mandatory: true,
    portal: "https://kolkatapolice.gov.in",
    portal_name: "Kolkata Police Official Portal",
    process: [
      "Visit Kolkata Police website",
      "Find 'Tenant Verification' section",
      "Fill landlord and tenant details",
      "Submit required documents",
      "Local police station will confirm",
    ],
    fee: "Free",
    time: "3-7 days",
    notes: "Mandatory in Kolkata. May require in-person visit to local police station.",
  },
]

export default function PoliceVerificationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Tenant Police Verification Guide 2026
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete guide for tenant police verification in India.
          Mandatory only in 5 states/cities — NOT nationwide.
        </p>
      </div>

      {/* ── Important notice ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <p className="text-amber-800 font-medium text-sm mb-2">
          ⚠️ Important Fact — Not Nationwide
        </p>
        <p className="text-amber-700 text-sm leading-relaxed">
          Police verification for tenants is <strong>NOT mandatory nationwide</strong>.
          It is required ONLY in: Delhi, Maharashtra, Karnataka, Hyderabad, and Kolkata.
          In all other states, it is optional but recommended for security.
        </p>
      </div>

      {/* ── Quick comparison ── */}
      <div className="card mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">
          State-wise Requirement Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">State / City</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Mandatory?</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Fee</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {VERIFICATION_STATES.map((s) => (
                <tr key={s.state}
                  className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium text-gray-900">
                    {s.state}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="badge-red">Yes — Mandatory</span>
                  </td>
                  <td className="py-2.5 px-3 text-green-700 font-medium">
                    {s.fee}
                  </td>
                  <td className="py-2.5 px-3 text-gray-600">{s.time}</td>
                </tr>
              ))}
              <tr className="bg-green-50">
                <td className="py-2.5 px-3 font-medium text-gray-900">
                  All Other States
                </td>
                <td className="py-2.5 px-3">
                  <span className="badge-green">Optional</span>
                </td>
                <td className="py-2.5 px-3 text-gray-600">Varies</td>
                <td className="py-2.5 px-3 text-gray-600">Varies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── State-wise guides ── */}
      <div className="space-y-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900">
          Step-by-Step Guide — Each State
        </h2>

        {VERIFICATION_STATES.map((s) => (
          <div key={s.state} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{s.state}</h3>
                <p className="text-red-600 text-sm font-medium">
                  Mandatory ⚠️
                </p>
              </div>
              <a href={s.portal} target="_blank"
                className="btn-primary py-2 text-sm text-center">
                Open Official Portal ↗
              </a>
            </div>

            {/* Process steps */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Process:</p>
              <ol className="space-y-1">
                {s.process.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-blue-700 font-bold flex-shrink-0">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Fee</p>
                <p className="text-sm font-medium text-green-700">{s.fee}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium text-gray-900">{s.time}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Portal</p>
                <p className="text-sm font-medium text-blue-700">Online</p>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-amber-800 text-xs">{s.notes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Documents needed ── */}
      <div className="card mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">
          Documents Required for Police Verification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Tenant must provide:
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex gap-2"><span>•</span> Photo ID (Aadhaar/PAN/Passport)</li>
              <li className="flex gap-2"><span>•</span> Passport size photo</li>
              <li className="flex gap-2"><span>•</span> Permanent address proof</li>
              <li className="flex gap-2"><span>•</span> Employment/income proof (optional)</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Landlord must provide:
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex gap-2"><span>•</span> Property ownership proof</li>
              <li className="flex gap-2"><span>•</span> Copy of rental agreement</li>
              <li className="flex gap-2"><span>•</span> Own ID proof</li>
              <li className="flex gap-2"><span>•</span> Contact details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="card bg-blue-50 border-blue-200 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">
          Need a Rental Agreement First?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Generate a state-specific rental agreement before police verification
        </p>
        <Link href="/login"
          className="btn-primary inline-block px-8">
          Generate Agreement — Rs.199
        </Link>
      </div>

    </div>
  )
}