import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"

/**
 * Blog Post Detail Page
 * - Dynamic route: /blog/[slug]
 * - Full article content
 * - SEO optimized
 * - Responsive: mobile first
 */

// ── Blog posts content ───────────────────────────────────────
const BLOG_POSTS: Record<string, {
  title: string
  category: string
  readTime: string
  date: string
  icon: string
  content: { heading: string; text: string }[]
}> = {
  "rental-agreement-format-maharashtra": {
    title: "Rental Agreement Format for Maharashtra 2026 — Complete Guide",
    category: "State Guide",
    readTime: "8 min read",
    date: "2026-01-15",
    icon: "📄",
    content: [
      {
        heading: "Maharashtra Rent Control Act 1999",
        text: "Maharashtra follows the Maharashtra Rent Control Act 1999, along with the concept of 'Leave and Licence' agreements rather than traditional rental agreements. This is a key difference from most other states.",
      },
      {
        heading: "Registration is Mandatory — Even for 11 Months",
        text: "Unlike most states where registration is only required for agreements above 11 months, Maharashtra requires registration for ALL Leave and Licence agreements, regardless of duration. This is unique to Maharashtra.",
      },
      {
        heading: "Online Registration Available",
        text: "Maharashtra is the only state offering complete online registration of rental agreements through the GRAS (Government Receipt Accounting System) portal. This makes the process significantly faster than other states.",
      },
      {
        heading: "Stamp Duty Calculation",
        text: "Stamp duty in Maharashtra is calculated at 0.25% of the total consideration (rent + deposit) for residential properties, with a minimum of Rs.100. This is among the lowest rates in India.",
      },
      {
        heading: "Police Verification Required",
        text: "Police verification of tenants is mandatory in Maharashtra. This can be completed online through the Maharashtra Police tenant verification portal at tenant.mahapolice.gov.in.",
      },
      {
        heading: "Required Documents",
        text: "For both landlord and tenant: PAN Card, Voter ID, Passport, or Driving Licence (Aadhaar is optional). Two passport-size photographs. Proof of property ownership for landlord.",
      },
    ],
  },
  "stamp-duty-all-states-2026": {
    title: "Stamp Duty Rates for Rental Agreements — All 22 States (2026)",
    category: "Stamp Duty",
    readTime: "12 min read",
    date: "2026-01-10",
    icon: "🧮",
    content: [
      {
        heading: "Why Stamp Duty Matters",
        text: "Stamp duty is a tax paid to the state government on legal documents, including rental agreements. Paying the correct stamp duty makes your agreement admissible as evidence in court.",
      },
      {
        heading: "How Stamp Duty is Calculated",
        text: "Different states use different formulas: percentage of annual rent, percentage of total consideration (rent + deposit), or area-based calculations. Use our free stamp duty calculator to get exact figures.",
      },
      {
        heading: "States with Lowest Stamp Duty",
        text: "Maharashtra (0.25% of total rent), Kerala (0.25%), and Tamil Nadu (1%) have among the lowest stamp duty rates for residential rental agreements in India.",
      },
      {
        heading: "States with Higher Rates",
        text: "Madhya Pradesh (8%), Assam (8.25%), and Rajasthan (6%) have comparatively higher stamp duty rates, calculated as a percentage of annual rent.",
      },
      {
        heading: "eStamp Availability",
        text: "Most states now offer eStamp (digital stamp paper) through SHCIL. Bihar is currently the only major state without eStamp facility, requiring traditional stamp paper.",
      },
      {
        heading: "Use Our Free Calculator",
        text: "Don't guess — use our free stamp duty calculator to get the exact amount for your state, rent, and duration. It takes the formula and minimum amounts into account automatically.",
      },
    ],
  },
  "hra-rent-receipt-guide": {
    title: "HRA Rent Receipt — Complete Guide for Income Tax Filing 2026",
    category: "Tax Guide",
    readTime: "6 min read",
    date: "2026-01-05",
    icon: "🧾",
    content: [
      {
        heading: "What is HRA Exemption?",
        text: "House Rent Allowance (HRA) is a component of salary that can be partially or fully exempt from income tax under Section 10(13A) of the Income Tax Act, if you live in rented accommodation.",
      },
      {
        heading: "Old Tax Regime Only",
        text: "This is critical: HRA exemption is available ONLY if you have opted for the Old Tax Regime. If you have chosen the New Tax Regime, HRA exemption is NOT available — regardless of how much rent you pay.",
      },
      {
        heading: "PAN Requirement",
        text: "If your monthly rent exceeds Rs.3,000, you must provide your landlord's PAN card details. Without this, your employer may reject the HRA claim, or the Income Tax department may disallow it during assessment.",
      },
      {
        heading: "Form 10BA Requirement",
        text: "If your annual rent exceeds Rs.1,00,000 (Rs.8,333/month), you must submit Form 10BA — a declaration that you do not own any residential property in the city where you are claiming HRA.",
      },
      {
        heading: "What Should a Valid Rent Receipt Include?",
        text: "Tenant name, landlord name, landlord PAN (if rent > Rs.3,000), property address, rent amount, month, payment mode, and landlord's signature. Our free generator includes all these fields automatically.",
      },
      {
        heading: "Common Mistakes to Avoid",
        text: "Missing landlord signature, missing PAN when required, inconsistent rent amounts across months, and not keeping receipts for the full financial year are the most common reasons for HRA claim rejection.",
      },
    ],
  },
  "police-verification-guide": {
    title: "Tenant Police Verification — Which States Require It?",
    category: "Legal Guide",
    readTime: "5 min read",
    date: "2025-12-28",
    icon: "🚔",
    content: [
      {
        heading: "Not a Nationwide Requirement",
        text: "Contrary to popular belief, tenant police verification is NOT mandatory across India. It is a state/city-specific requirement, and only 5 locations currently mandate it.",
      },
      {
        heading: "Where It's Mandatory",
        text: "Police verification is mandatory in: Delhi, Maharashtra, Karnataka (Bengaluru and other cities), Hyderabad (Telangana), and Kolkata (West Bengal).",
      },
      {
        heading: "Online Process Available",
        text: "All 5 locations now offer online verification portals. Delhi Police, Maharashtra Police, Karnataka KSAPS, Hyderabad City Police, and Kolkata Police all have dedicated tenant verification websites.",
      },
      {
        heading: "Who is Responsible?",
        text: "In most cases, the landlord is responsible for completing tenant verification, though some portals allow tenants to self-register their information.",
      },
      {
        heading: "Documents Required",
        text: "Typically: tenant's photo ID (PAN, Voter ID, Passport, or Driving Licence), passport-size photograph, and the rental agreement copy.",
      },
      {
        heading: "What Happens If Skipped?",
        text: "In states where it's mandatory, failing to complete police verification can result in fines for the landlord and complications during disputes. It's a simple online process that takes a few minutes.",
      },
    ],
  },
  "mta-2021-fact-check": {
    title: "Model Tenancy Act 2021 — Fact Check: Is It Nationwide?",
    category: "Fact Check",
    readTime: "7 min read",
    date: "2025-12-20",
    icon: "⚖️",
    content: [
      {
        heading: "The Viral Claim",
        text: "Social media posts frequently claim 'New Rent Rules 2026 - 2 Month Deposit Cap Nationwide'. This claim is misleading and factually incorrect for most of India.",
      },
      {
        heading: "What is the Model Tenancy Act 2021?",
        text: "The Model Tenancy Act (MTA) 2021 was approved by the Union Cabinet as a MODEL law — meaning individual states need to adopt it through their own legislation. It is NOT automatically applicable nationwide.",
      },
      {
        heading: "States That Adopted MTA 2021",
        text: "As of 2026, only Uttar Pradesh, Rajasthan, and Kerala have adopted versions of the Model Tenancy Act. These are the ONLY states where the 2-month security deposit cap legally applies.",
      },
      {
        heading: "States Still Using Old Laws",
        text: "Maharashtra, Karnataka, Delhi, Tamil Nadu, Gujarat, West Bengal, and most other states continue to operate under their existing Rent Control Acts, which often have NO deposit cap.",
      },
      {
        heading: "Why This Matters",
        text: "If you're in Mumbai, Bengaluru, Delhi, or Chennai, asking your landlord to follow the '2-month cap' has no legal basis. Security deposits in these cities commonly range from 6-12 months rent based on local market practice.",
      },
      {
        heading: "Always Verify Your State's Law",
        text: "Before signing any agreement, check your state's specific Rent Control Act. Our platform automatically applies the correct rules based on your selected state — no guesswork needed.",
      },
    ],
  },
}

// ── Generate metadata for SEO ────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = BLOG_POSTS[params.slug]
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | Elvatrixa Legal`,
    description: post.content[0]?.text.slice(0, 160),
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = BLOG_POSTS[params.slug]
  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* ── Back link ── */}
      <Link href="/blog" className="text-blue-600 text-sm mb-6 block">
        ← Back to Blog
      </Link>

      {/* ── Header ── */}
      <div className="mb-8">
        <span className="badge-blue text-xs mb-3 inline-block">
          {post.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>{new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric"
          })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* ── Featured icon ── */}
      <div className="text-6xl text-center mb-8">{post.icon}</div>

      {/* ── Content ── */}
      <div className="space-y-6">
        {post.content.map((section, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {section.heading}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {section.text}
            </p>
          </section>
        ))}
      </div>

      {/* ── Disclaimer ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-8">
        <p className="text-amber-800 text-xs leading-relaxed">
          <strong>Disclaimer:</strong> This article is for informational
          purposes only and does not constitute legal advice. Laws may
          change — always verify current rules with official sources or
          a qualified advocate.
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="card bg-blue-50 border-blue-200 text-center mt-8">
        <h3 className="font-semibold text-gray-900 mb-2">
          Ready to generate your agreement?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          State-specific rental agreement — Rs.199 flat
        </p>
        <Link href="/login" className="btn-primary inline-block px-8">
          Get Started — Rs.199
        </Link>
      </div>

      {/* ── More posts ── */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <Link href="/blog" className="btn-secondary inline-block">
          ← View All Posts
        </Link>
      </div>

    </div>
  )
}