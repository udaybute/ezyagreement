/**
 * Privacy Policy Page
 * - DPDP Act 2025 compliant
 * - Plain language - easy to understand
 * - Responsive: mobile first
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Elvatrixa Legal",
  description: "Privacy policy for Elvatrixa Legal. DPDP Act 2025 compliant. Zero Aadhaar storage. Data deleted after 30 days.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: June 1, 2026 · DPDP Act 2025 Compliant
        </p>
      </div>

      {/* ── DPDP badge ── */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <p className="text-green-800 font-medium text-sm mb-1">
          🔒 Privacy First — Our Commitment
        </p>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• We never store your Aadhaar number</li>
          <li>• All data deleted after 30 days</li>
          <li>• India-only data storage (Mumbai region)</li>
          <li>• We never sell your data to anyone</li>
          <li>• Fully compliant with DPDP Act 2025</li>
        </ul>
      </div>

      {/* ── Content ── */}
      <div className="space-y-8 text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            1. Who We Are
          </h2>
          <p className="text-sm leading-relaxed">
            Elvatrixa Pvt. Ltd. ("Elvatrixa Legal", "we", "us") operates the
            website elvatrixa.com and provides legal document generation services.
            We are a Data Fiduciary under India's Digital Personal Data Protection
            Act 2023 (DPDP Act).
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Contact: support@elvatrixa.com · Founder: Uday Bute
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            2. What Data We Collect
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Data</th>
                  <th className="text-left p-3 font-medium text-gray-700">Why</th>
                  <th className="text-left p-3 font-medium text-gray-700">Stored?</th>
                  <th className="text-left p-3 font-medium text-gray-700">Retained</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Name", "To generate agreement", "Yes (encrypted)", "30 days"],
                  ["Phone", "Login OTP + WhatsApp delivery", "Yes (encrypted)", "30 days"],
                  ["Address", "Agreement details", "Yes (encrypted)", "30 days"],
                  ["PAN (last 4)", "ID verification", "Masked only", "30 days"],
                  ["Aadhaar", "NOT COLLECTED", "NEVER", "NEVER"],
                  ["Payment info", "Razorpay handles this", "No", "N/A"],
                  ["IP Address", "Security + audit log", "Hashed only", "7 years"],
                ].map(([data, why, stored, retained]) => (
                  <tr key={data} className={data === "Aadhaar" ? "bg-green-50" : ""}>
                    <td className="p-3 font-medium">{data}</td>
                    <td className="p-3 text-gray-600">{why}</td>
                    <td className={`p-3 ${stored === "NEVER" ? "text-green-700 font-medium" : ""}`}>
                      {stored}
                    </td>
                    <td className="p-3 text-gray-600">{retained}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            3. Your Rights (DPDP Act 2025)
          </h2>
          <div className="space-y-3">
            {[
              { right: "Right to Access", desc: "You can request a copy of all data we have about you. Go to Settings → Privacy → Download My Data." },
              { right: "Right to Erasure", desc: "You can request deletion of all your data. Go to Settings → Privacy → Delete My Data. We will delete within 72 hours." },
              { right: "Right to Correction", desc: "You can update your personal information from your profile settings anytime." },
              { right: "Right to Withdraw Consent", desc: "You can withdraw consent at any time from Settings → Privacy. Withdrawal stops future processing but does not affect past processing." },
              { right: "Right to Grievance", desc: "If you have a complaint, email us at support@elvatrixa.com. We will respond within 48 hours." },
            ].map((r) => (
              <div key={r.right} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 text-sm">{r.right}</p>
                <p className="text-gray-600 text-sm mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            4. How We Protect Your Data
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              AES-256 encryption for all personal data at rest
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              TLS 1.3 encryption for all data in transit
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              India-only data storage — Mumbai region (AWS ap-south-1)
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              Row-level security — you can only access your own data
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              Immutable audit logs for all data access
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">✓</span>
              No third-party analytics that send data outside India
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            5. Third-Party Services
          </h2>
          <div className="space-y-2 text-sm">
            {[
              { name: "Supabase", purpose: "Database and authentication", location: "India (Mumbai)" },
              { name: "Razorpay", purpose: "Payment processing (PCI-DSS compliant)", location: "India" },
              { name: "Gupshup", purpose: "WhatsApp message delivery", location: "India" },
              { name: "Setu/eMudhra", purpose: "eSign processing (we never see biometric data)", location: "India" },
            ].map((vendor) => (
              <div key={vendor.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg p-3 gap-1">
                <div>
                  <span className="font-medium text-gray-900">{vendor.name}</span>
                  <span className="text-gray-600"> — {vendor.purpose}</span>
                </div>
                <span className="text-green-700 text-xs font-medium">
                  📍 {vendor.location}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            6. Data Retention
          </h2>
          <p className="text-sm leading-relaxed">
            All user data and generated documents are automatically deleted after
            30 days from creation, unless you explicitly save them to your account.
            Audit logs are retained for 7 years as required by the IT Act 2000.
            Payment records are retained as required by GST law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            7. Contact Us
          </h2>
          <p className="text-sm leading-relaxed">
            For any privacy-related queries or to exercise your rights:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3 text-sm">
            <p><strong>Data Protection Officer:</strong> Uday Bute</p>
            <p><strong>Email:</strong> support@elvatrixa.com</p>
            <p><strong>Company:</strong> Elvatrixa Pvt. Ltd.</p>
            <p><strong>Response time:</strong> Within 48 hours</p>
          </div>
        </section>

      </div>
    </div>
  )
}