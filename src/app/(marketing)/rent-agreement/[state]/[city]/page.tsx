import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { STATES, getStateByCode } from "@/lib/constants"

/**
 * SEO Programmatic Pages
 * - Auto-generated for each state + city combo
 * - URL: /rent-agreement/maharashtra/pune
 * - Drives organic search traffic
 * - Responsive: mobile first
 */

// ── State slug to code mapping ───────────────────────────────
const STATE_SLUG_MAP: Record<string, string> = {
  "maharashtra":        "MH",
  "karnataka":          "KA",
  "delhi":              "DL",
  "tamil-nadu":         "TN",
  "uttar-pradesh":      "UP",
  "rajasthan":          "RJ",
  "kerala":             "KL",
  "telangana":          "TS",
  "gujarat":            "GJ",
  "west-bengal":        "WB",
  "andhra-pradesh":     "AP",
  "haryana":            "HR",
  "madhya-pradesh":     "MP",
  "punjab":             "PB",
  "bihar":              "BR",
  "odisha":             "OD",
  "assam":              "AS",
  "jharkhand":          "JH",
  "chhattisgarh":       "CG",
  "uttarakhand":        "UK",
  "himachal-pradesh":   "HP",
  "goa":                "GA",
}

// ── Generate all static paths ────────────────────────────────
export async function generateStaticParams() {
  const paths: { state: string; city: string }[] = []

  STATES.forEach((stateData) => {
    const stateSlug = stateData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    stateData.major_cities.forEach((city) => {
      const citySlug = city
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

      paths.push({ state: stateSlug, city: citySlug })
    })
  })

  return paths
}

// ── Generate SEO metadata ────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { state: string; city: string }
}): Promise<Metadata> {
  const stateCode = STATE_SLUG_MAP[params.state]
  const stateData = stateCode ? getStateByCode(stateCode) : null

  if (!stateData) {
    return { title: "Rental Agreement | Elvatrixa Legal" }
  }

  const cityName = params.city
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return {
    title: `Rental Agreement ${cityName} ${stateData.name} 2026 — Rs.199 | Elvatrixa Legal`,
    description: `Generate legally valid rental agreement in ${cityName}, ${stateData.name} online in 5 minutes. Rs.199 flat. eStamp included. Instant PDF. DPDP-compliant.`,
    keywords: [
      `rental agreement ${cityName}`,
      `rent agreement ${cityName}`,
      `rental agreement ${stateData.name}`,
      `rent agreement format ${cityName} 2026`,
      `stamp duty ${cityName}`,
    ],
  }
}

export default function RentAgreementCityPage({
  params,
}: {
  params: { state: string; city: string }
}) {
  // ── Get state data ─────────────────────────────────────────
  const stateCode = STATE_SLUG_MAP[params.state]
  const stateData = stateCode ? getStateByCode(stateCode) : null

  if (!stateData) notFound()

  // ── Format city name ───────────────────────────────────────
  const cityName = params.city
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  // ── Calculate estimated stamp duty ────────────────────────
  const exampleRent = 15000
  const exampleDuration = 11
  const exampleDeposit = 30000
  const exampleStampDuty = Math.max(
    Math.round(
      stateData.stamp_duty_formula.type === "percentage_annual_rent"
        ? (exampleRent * 12 * stateData.stamp_duty_formula.rate) / 100
        : ((exampleRent * exampleDuration + exampleDeposit) * stateData.stamp_duty_formula.rate) / 100
    ),
    stateData.stamp_duty_formula.min_amount
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">→</span>
        <span className="hover:text-blue-600 cursor-pointer">{stateData.name}</span>
        <span className="mx-2">→</span>
        <span className="text-gray-900">{cityName}</span>
      </nav>

      {/* ── Hero ── */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Rental Agreement in {cityName}, {stateData.name} 2026
        </h1>
        <p className="text-gray-600 mb-6">
          Generate a legally valid, state-specific rental agreement
          for {cityName} online in 5 minutes. Rs.199 flat.
          Based on {stateData.governing_act}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/login" className="btn-primary text-base px-8 py-3 text-center">
            Generate Agreement — Rs.199
          </Link>
          <Link href="/stamp-duty-calculator" className="btn-secondary text-base px-8 py-3 text-center">
            Calculate Stamp Duty
          </Link>
        </div>
      </div>

      {/* ── State specific rules ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Rental Rules in {stateData.name} — {cityName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Governing Law</p>
            <p className="font-medium text-gray-900">
              {stateData.governing_act}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Registration Required</p>
            <p className="font-medium text-gray-900">
              {stateData.registration_required === "all"
                ? "Yes — ALL agreements (unique to MH)"
                : "Only above 11 months"
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Stamp Duty Rate</p>
            <p className="font-medium text-gray-900">
              {stateData.stamp_duty_formula.rate}%
              {" "}({stateData.stamp_duty_formula.type.replace(/_/g, " ")})
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">eStamp Available</p>
            <p className={`font-medium ${stateData.estamp_available ? "text-green-700" : "text-red-600"}`}>
              {stateData.estamp_available
                ? "Yes — Online available"
                : "No — Manual stamp paper only"
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Police Verification</p>
            <p className={`font-medium ${stateData.police_verification_required ? "text-amber-700" : "text-green-700"}`}>
              {stateData.police_verification_required
                ? "Required in " + stateData.name
                : "Not mandatory"
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">MTA 2021 Deposit Cap</p>
            <p className={`font-medium ${stateData.mta_adopted ? "text-blue-700" : "text-gray-600"}`}>
              {stateData.mta_adopted
                ? `Yes — Max ${stateData.deposit_cap_months} months rent`
                : "Not adopted — No cap"
              }
            </p>
          </div>

        </div>
      </div>

      {/* ── Stamp duty example ── */}
      <div className="card bg-green-50 border-green-200 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">
          Example Stamp Duty — {cityName}
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          For a typical rental: Rs.{exampleRent.toLocaleString("en-IN")}/month,
          {exampleDuration} months, Rs.{exampleDeposit.toLocaleString("en-IN")} deposit
        </p>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-3xl font-bold text-green-700">
              Rs.{exampleStampDuty.toLocaleString("en-IN")}
            </p>
            <p className="text-green-600 text-xs mt-0.5">
              Estimated stamp duty
            </p>
          </div>
          <Link href="/stamp-duty-calculator"
            className="btn-secondary py-2 text-sm">
            Calculate Exact Amount
          </Link>
        </div>
      </div>

      {/* ── Process steps ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          How to Create Rental Agreement in {cityName}
        </h2>
        <ol className="space-y-3">
          {[
            `Fill in landlord, tenant, and property details for ${cityName}`,
            `We automatically apply ${stateData.name} rules and calculate stamp duty`,
            `Pay Rs.199 — instant agreement generated`,
            `Download PDF and print on stamp paper`,
            stateData.registration_required === "all"
              ? "Register at Sub-Registrar office (mandatory in Maharashtra)"
              : "Register at Sub-Registrar office if duration above 11 months",
            stateData.police_verification_required
              ? `Complete online police verification (mandatory in ${stateData.name})`
              : "Police verification optional in " + stateData.name,
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* ── Other cities in state ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">
          Other Cities in {stateData.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {stateData.major_cities
            .filter((c) => c !== cityName)
            .map((city) => {
              const citySlug = city
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
              return (
                <Link
                  key={city}
                  href={`/rent-agreement/${params.state}/${citySlug}`}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {city}
                </Link>
              )
            })}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="space-y-3 mb-8">
        <h2 className="font-semibold text-gray-900">
          FAQs — Rental Agreement {cityName}
        </h2>
        {[
          {
            q: `What is the stamp duty for rental agreement in ${cityName}?`,
            a: `Stamp duty in ${stateData.name} is ${stateData.stamp_duty_formula.rate}% of ${stateData.stamp_duty_formula.type.replace(/_/g, " ")}, with a minimum of Rs.${stateData.stamp_duty_formula.min_amount}. For a typical Rs.15,000/month agreement, stamp duty is approximately Rs.${exampleStampDuty.toLocaleString("en-IN")}.`,
          },
          {
            q: `Is registration mandatory for rental agreement in ${cityName}?`,
            a: stateData.registration_required === "all"
              ? `Yes — registration is mandatory for ALL rental agreements in Maharashtra, even 11-month agreements. This is unique to Maharashtra.`
              : `Registration is mandatory only for agreements above 11 months in ${stateData.name}. 11-month agreements do not need registration.`,
          },
          {
            q: `Is Aadhaar required for rental agreement in ${cityName}?`,
            a: `No — Aadhaar is NOT required. PAN Card, Voter ID, Passport, or Driving Licence are accepted. We follow DPDP Act 2025 guidelines — zero Aadhaar storage.`,
          },
          {
            q: `How much does it cost to create rental agreement in ${cityName}?`,
            a: `Our platform charges Rs.199 flat (+ 18% GST = Rs.235 total). This is 4-8x cheaper than going to a lawyer or document writer. Stamp paper cost (Rs.${exampleStampDuty}) is separate.`,
          },
        ].map((faq) => (
          <div key={faq.q} className="card">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              {faq.q}
            </h3>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="bg-blue-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
          Generate Rental Agreement for {cityName} Now
        </h2>
        <p className="text-blue-100 mb-6 text-sm">
          Rs.199 flat · Instant PDF · {stateData.name} specific clauses
        </p>
        <Link href="/login"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block">
          Get Started — Rs.199
        </Link>
      </div>

    </div>
  )
}