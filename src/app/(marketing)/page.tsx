/**
 * Homepage — Marketing page
 * Shown to logged-out users
 * Responsive: mobile first
 */

import Link from "next/link"

export default function HomePage() {
  return (
    <div>

      {/* ── Hero Section ── */}
      <section className="bg-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            DPDP Act 2025 Compliant · Zero Aadhaar Storage
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Rental Agreement in<br className="hidden md:block" /> 5 Minutes — Rs.199 Flat
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            India's first privacy-first legal document platform.
            State-specific agreements, instant PDF, WhatsApp delivery.
            28 states covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="btn-primary text-base px-8 py-3">
              Generate Agreement — Rs.199
            </Link>
            <Link href="/hra-receipt" className="btn-secondary text-base px-8 py-3">
              Free HRA Receipt
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            No Aadhaar required · Data deleted after 30 days · 100% online
          </p>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-gray-50 py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Why Elvatrixa Legal?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Instant PDF", desc: "Agreement ready in 5 minutes. No wait, no physical paper needed." },
              { icon: "💰", title: "Rs.199 Flat", desc: "4-8x cheaper than lawyers. No hidden charges. GST invoice included." },
              { icon: "🗺️", title: "28 States", desc: "State-specific clauses, correct stamp duty, registration rules." },
              { icon: "🔒", title: "Privacy First", desc: "DPDP Act 2025 compliant. Zero Aadhaar storage. Data deleted in 30 days." },
              { icon: "📱", title: "WhatsApp Delivery", desc: "Signed PDF delivered directly on WhatsApp. Works on any phone." },
              { icon: "🇮🇳", title: "Hindi + Marathi", desc: "Vernacular output for 600M+ users. English, Hindi, Marathi, Tamil." },
            ].map((f) => (
              <div key={f.title} className="card">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            Simple Pricing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card border-2 border-blue-700">
              <p className="text-blue-700 font-semibold text-sm mb-1">Most Popular</p>
              <h3 className="text-xl font-bold text-gray-900">Pay Per Doc</h3>
              <p className="text-3xl font-bold text-blue-700 my-3">Rs.199</p>
              <p className="text-gray-500 text-sm">per document</p>
              <ul className="text-sm text-gray-600 mt-4 space-y-2 text-left">
                <li>✓ Instant PDF</li>
                <li>✓ WhatsApp delivery</li>
                <li>✓ eStamp included</li>
                <li>✓ 30-day storage</li>
              </ul>
              <Link href="/login" className="btn-primary w-full mt-6 block text-center">
                Get Started
              </Link>
            </div>
            <div className="card">
              <p className="text-gray-500 text-sm mb-1">For Brokers</p>
              <h3 className="text-xl font-bold text-gray-900">Broker Plan</h3>
              <p className="text-3xl font-bold text-gray-900 my-3">Rs.1,499</p>
              <p className="text-gray-500 text-sm">per month</p>
              <ul className="text-sm text-gray-600 mt-4 space-y-2 text-left">
                <li>✓ 20 docs/month</li>
                <li>✓ Client dashboard</li>
                <li>✓ White-label WhatsApp</li>
                <li>✓ Analytics</li>
              </ul>
              <Link href="/login" className="btn-secondary w-full mt-6 block text-center">
                Get Started
              </Link>
            </div>
            <div className="card">
              <p className="text-gray-500 text-sm mb-1">For CAs</p>
              <h3 className="text-xl font-bold text-gray-900">CA Reseller</h3>
              <p className="text-3xl font-bold text-gray-900 my-3">Rs.2,999</p>
              <p className="text-gray-500 text-sm">per month</p>
              <ul className="text-sm text-gray-600 mt-4 space-y-2 text-left">
                <li>✓ Unlimited docs</li>
                <li>✓ White-label PDF</li>
                <li>✓ Client portal</li>
                <li>✓ GST invoice</li>
              </ul>
              <Link href="/login" className="btn-secondary w-full mt-6 block text-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-blue-700 py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to generate your agreement?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of landlords, tenants, and brokers across India
          </p>
          <Link href="/login" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
            Get Started — Rs.199
          </Link>
        </div>
      </section>

    </div>
  )
}