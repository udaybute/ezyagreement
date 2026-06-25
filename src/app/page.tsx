import Link from "next/link"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

/**
 * Homepage — Root page
 * - Public page — no login required
 * - Includes Navbar + Footer directly
 * - Responsive: mobile first
 */

export default function HomePage() {
  return (
    <>
      <Navbar isLoggedIn={false} />

      <main>

        {/* ── Hero Section ── */}
        <section className="bg-white py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              DPDP Act 2025 Compliant &middot; Zero Aadhaar Storage
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Rental Agreement in
              <br className="hidden md:block" />
              {" "}5 Minutes &mdash; Rs.199 Flat
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              India&apos;s first privacy-first legal document platform.
              State-specific agreements, instant PDF, WhatsApp delivery.
              22 states covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="btn-primary text-base px-8 py-3">
                Generate Agreement &mdash; Rs.199
              </Link>
              <Link href="/hra-receipt" className="btn-secondary text-base px-8 py-3">
                Free HRA Receipt
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              No Aadhaar required &middot; Data deleted after 30 days &middot; 100% online
            </p>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white py-12 md:py-16 px-4 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Fill Details", desc: "Enter landlord, tenant, and property details. Takes less than 5 minutes." },
                { step: "2", title: "Pay Rs.199", desc: "Secure payment via Razorpay. UPI, card, net banking accepted." },
                { step: "3", title: "Get PDF", desc: "Instant PDF download + WhatsApp delivery. Print and sign." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Elvatrixa Legal ── */}
        <section className="bg-gray-50 py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              Why Elvatrixa Legal?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Instant PDF",
                  desc: "Agreement ready in 5 minutes. No wait, no physical paper needed.",
                },
                {
                  icon: "💰",
                  title: "Rs.199 Flat",
                  desc: "4-8x cheaper than lawyers. No hidden charges. GST invoice included.",
                },
                {
                  icon: "🗺️",
                  title: "22 States",
                  desc: "State-specific clauses, correct stamp duty, registration rules.",
                },
                {
                  icon: "🔒",
                  title: "Privacy First",
                  desc: "DPDP Act 2025 compliant. Zero Aadhaar storage. Data deleted in 30 days.",
                },
                {
                  icon: "📱",
                  title: "WhatsApp Delivery",
                  desc: "Signed PDF delivered directly on WhatsApp. Works on any phone.",
                },
                {
                  icon: "🇮🇳",
                  title: "Hindi, Marathi, Tamil",
                  desc: "Vernacular output for 600M+ users. English, Hindi, Marathi, Tamil.",
                },
              ].map((f) => (
                <div key={f.title} className="card">
                  <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Document Types ── */}
        <section className="bg-white py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
              Documents We Generate
            </h2>
            <p className="text-gray-600 text-center mb-10">
              All documents are state-specific and legally valid
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "📄", title: "Rental Agreement", price: "Rs.199", desc: "11-month residential Leave and Licence", href: "/login" },
                { icon: "🏢", title: "Commercial Lease", price: "Rs.499", desc: "Shop, office, godown, warehouse", href: "/login" },
                { icon: "📋", title: "NOC", price: "Rs.199", desc: "No Objection Certificate — 5 types", href: "/login" },
                { icon: "⚖️", title: "Affidavit", price: "Rs.199", desc: "General, name change, address proof", href: "/login" },
                { icon: "🧾", title: "HRA Receipt", price: "FREE", desc: "HRA-compliant rent receipt for tax filing", href: "/hra-receipt" },
                { icon: "🧮", title: "Stamp Duty Calculator", price: "FREE", desc: "Calculate stamp duty for all 22 states", href: "/stamp-duty-calculator" },
              ].map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="card hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-2xl" aria-hidden="true">{doc.icon}</div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      doc.price === "FREE"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {doc.price}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-gray-500 text-xs">{doc.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Preview ── */}
        <section className="bg-gray-50 py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
              Simple Pricing
            </h2>
            <p className="text-gray-600 text-center mb-10">
              No hidden charges. GST invoice included.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: "Pay Per Doc",
                  price: "Rs.199",
                  per: "per document",
                  highlight: true,
                  features: ["Instant PDF", "WhatsApp delivery", "eStamp included", "30-day storage"],
                },
                {
                  name: "Broker Plan",
                  price: "Rs.1,499",
                  per: "per month",
                  highlight: false,
                  features: ["20 docs/month", "Client dashboard", "White-label WhatsApp", "Analytics"],
                },
                {
                  name: "CA Reseller",
                  price: "Rs.2,999",
                  per: "per month",
                  highlight: false,
                  features: ["Unlimited docs", "White-label PDF", "Client portal", "GST invoice"],
                },
              ].map((plan) => (
                <div key={plan.name}
                  className={`card ${plan.highlight ? "border-2 border-blue-700" : ""}`}>
                  {plan.highlight && (
                    <span className="badge-blue text-xs mb-2 inline-block">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900">{plan.name}</h3>
                  <div className="my-3">
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-xs ml-1">{plan.per}</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-gray-600 mb-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-green-500">&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing"
                    className={plan.highlight ? "btn-primary w-full block text-center text-sm py-2" : "btn-secondary w-full block text-center text-sm py-2"}>
                    View Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── States Coverage ── */}
        <section className="bg-white py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              22 States Covered
            </h2>
            <p className="text-gray-600 mb-8">
              State-specific rental laws, correct stamp duty, and registration rules
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Maharashtra", "Karnataka", "Delhi", "Tamil Nadu",
                "Uttar Pradesh", "Rajasthan", "Kerala", "Telangana",
                "Gujarat", "West Bengal", "Andhra Pradesh", "Haryana",
                "Madhya Pradesh", "Punjab", "Bihar", "Odisha",
                "Assam", "Jharkhand", "Chhattisgarh", "Uttarakhand",
                "Himachal Pradesh", "Goa",
              ].map((state) => (
                <span key={state}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default">
                  {state}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── DPDP Compliance ── */}
        <section className="bg-green-50 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl" aria-hidden="true">🔒</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  DPDP Act 2025 Compliant — Privacy First
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {[
                    "Zero Aadhaar storage — completely optional",
                    "All data encrypted with AES-256",
                    "Auto-delete after 30 days",
                    "India-only data storage (Mumbai region)",
                    "Self-serve data download and deletion",
                    "We never sell your data",
                  ].map((item) => (
                    <div key={item} className="flex gap-2">
                      <span className="text-green-600">&#10003;</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is the generated agreement legally valid?",
                  a: "Yes — our agreements are state-specific, use correct governing acts, and include all required clauses. However, this is a drafting tool. For complex cases, consult a qualified advocate.",
                },
                {
                  q: "Is Aadhaar required?",
                  a: "No. Aadhaar is completely optional. We accept PAN Card, Voter ID, Passport, or Driving Licence. We follow DPDP Act 2025 — zero Aadhaar storage.",
                },
                {
                  q: "What is the 2-month deposit cap?",
                  a: "The 2-month deposit cap applies ONLY in states that adopted MTA 2021 — UP, Rajasthan, and Kerala. Most states including Maharashtra, Karnataka, and Delhi have NO deposit cap.",
                },
                {
                  q: "Do I need to register the agreement?",
                  a: "Maharashtra requires registration for ALL agreements. Other states require registration only for agreements above 11 months. Our platform shows you exactly what applies to your state.",
                },
              ].map((faq) => (
                <div key={faq.q} className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/blog" className="text-blue-600 text-sm hover:underline">
                Read more guides on our blog &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-blue-700 py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to generate your agreement?
            </h2>
            <p className="text-blue-100 mb-8">
              Join thousands of landlords, tenants, and brokers across India
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
                Get Started &mdash; Rs.199
              </Link>
              <Link
                href="/hra-receipt"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block">
                Free HRA Receipt
              </Link>
            </div>
            <p className="text-blue-200 text-xs mt-4">
              No Aadhaar required &middot; DPDP Act 2025 Compliant &middot; 22 States
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}