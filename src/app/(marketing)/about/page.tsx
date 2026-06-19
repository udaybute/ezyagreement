/**
 * About Page
 * - Company story, founder info
 * - Mission and values
 * - Responsive: mobile first
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Elvatrixa Legal",
  description:
    "Learn about Elvatrixa Legal — India's first privacy-first legal document platform. Founded by Uday Bute.",
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          About Elvatrixa Legal
        </h1>
        <p className="text-gray-600">
          India's first privacy-first, vernacular, instant-delivery
          legal document platform
        </p>
      </div>

      {/* ── Mission ── */}
      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Our Mission</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          To make legally valid rental agreements accessible to every Indian —
          regardless of their location, language, or budget. We believe no one
          should pay Rs.2,000–5,000 to a lawyer for a simple rental agreement
          that can be generated in 5 minutes for Rs.199.
        </p>
      </div>

      {/* ── Story ── */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Our Story</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            Elvatrixa Legal was born from a simple observation: India has
            250 million+ renters, 80 million rental agreements signed every
            year, and yet no clean, affordable, privacy-first solution to
            generate them digitally.
          </p>
          <p>
            Existing platforms charge Rs.800–1,500 total, take 1–3 days
            for physical delivery, are English-only, and store Aadhaar
            numbers without proper safeguards — violating the DPDP Act 2025.
          </p>
          <p>
            We built Elvatrixa Legal to fix all of this: Rs.199 flat,
            instant PDF, Hindi/Marathi/Tamil output, zero Aadhaar storage,
            and full DPDP Act 2025 compliance from Day 1.
          </p>
        </div>
      </div>

      {/* ── Founder ── */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Founder</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            UB
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Uday Bute</h3>
            <p className="text-blue-700 text-sm">
              Founder & Director, Elvatrixa Pvt. Ltd.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Full-stack developer and digital entrepreneur based in
              Pune, India. Founder of Elvatrixa — a web development and
              digital agency. Built Elvatrixa Legal to solve a real problem
              faced by millions of Indians every year.
            </p>
            <div className="flex gap-3 mt-3">
              <a href="mailto:uday@elvatrixa.com"
                className="text-blue-600 text-sm hover:underline">
                uday@elvatrixa.com
              </a>
              <a href="https://elvatrixa.com" target="_blank"
                className="text-blue-600 text-sm hover:underline">
                elvatrixa.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "🔒",
              title: "Privacy First",
              desc: "DPDP Act 2025 compliant. Zero Aadhaar storage. Data deleted after 30 days. We never sell your data.",
            },
            {
              icon: "💰",
              title: "Affordable",
              desc: "Rs.199 flat — 4-8x cheaper than lawyers. No hidden charges. GST invoice included.",
            },
            {
              icon: "🇮🇳",
              title: "Made for India",
              desc: "28 states, correct stamp duty, vernacular output. Built for every Indian, not just metro cities.",
            },
            {
              icon: "⚡",
              title: "Instant",
              desc: "5 minutes from start to signed PDF. No wait, no physical paper, no office visits.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {v.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { value: "28", label: "States covered" },
          { value: "Rs.199", label: "Flat pricing" },
          { value: "5 min", label: "Agreement ready" },
          { value: "0", label: "Aadhaar stored" },
        ].map((stat) => (
          <div key={stat.label} className="card text-center">
            <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="bg-blue-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">
          Ready to generate your agreement?
        </h2>
        <p className="text-blue-100 text-sm mb-6">
          Join thousands of landlords, tenants, and brokers across India
        </p>
        <Link href="/login"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
          Get Started — Rs.199
        </Link>
      </div>

    </div>
  )
}