/**
 * Blog Listing Page
 * - SEO content for organic traffic
 * - Static blog posts about rental laws
 * - Responsive: mobile first
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog — Rental Laws, Stamp Duty & Tax Guides | Elvatrixa Legal",
  description:
    "Read guides on rental agreements, stamp duty rates, HRA tax rules, and police verification across India's 28 states.",
}

// ── Blog posts data ──────────────────────────────────────────
const BLOG_POSTS = [
  {
    slug: "rental-agreement-format-maharashtra",
    title: "Rental Agreement Format for Maharashtra 2026 — Complete Guide",
    excerpt: "Everything you need to know about creating a rental agreement in Maharashtra. Leave and Licence Act, registration rules, and stamp duty explained.",
    category: "State Guide",
    readTime: "8 min read",
    date: "2026-01-15",
    icon: "📄",
  },
  {
    slug: "stamp-duty-all-states-2026",
    title: "Stamp Duty Rates for Rental Agreements — All 28 States (2026)",
    excerpt: "Complete comparison of stamp duty rates across India. Find out exactly how much you need to pay for your rental agreement.",
    category: "Stamp Duty",
    readTime: "12 min read",
    date: "2026-01-10",
    icon: "🧮",
  },
  {
    slug: "hra-rent-receipt-guide",
    title: "HRA Rent Receipt — Complete Guide for Income Tax Filing 2026",
    excerpt: "Learn how to claim HRA exemption correctly. PAN requirements, Form 10BA, and old vs new tax regime explained.",
    category: "Tax Guide",
    readTime: "6 min read",
    date: "2026-01-05",
    icon: "🧾",
  },
  {
    slug: "police-verification-guide",
    title: "Tenant Police Verification — Which States Require It?",
    excerpt: "Police verification is NOT mandatory nationwide. Find out which 5 states/cities require it and how to complete it online.",
    category: "Legal Guide",
    readTime: "5 min read",
    date: "2025-12-28",
    icon: "🚔",
  },
  {
    slug: "mta-2021-fact-check",
    title: "Model Tenancy Act 2021 — Fact Check: Is It Nationwide?",
    excerpt: "Viral posts claim 'new rent rules nationwide'. We fact-check this claim and explain which states actually adopted MTA 2021.",
    category: "Fact Check",
    readTime: "7 min read",
    date: "2025-12-20",
    icon: "⚖️",
  },
]

const CATEGORIES = ["All", "State Guide", "Stamp Duty", "Tax Guide", "Legal Guide", "Fact Check"]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Elvatrixa Blog
        </h1>
        <p className="text-gray-600">
          Guides on rental laws, stamp duty, tax rules, and more — for all 28 states
        </p>
      </div>

      {/* ── Categories ── */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <span key={cat}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors
              ${cat === "All"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}>
            {cat}
          </span>
        ))}
      </div>

      {/* ── Featured post ── */}
      <Link href={`/blog/${BLOG_POSTS[0].slug}`}
        className="card mb-8 block hover:border-blue-300 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="text-5xl flex-shrink-0">{BLOG_POSTS[0].icon}</div>
          <div>
            <span className="badge-blue text-xs mb-2 inline-block">
              {BLOG_POSTS[0].category} · Featured
            </span>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              {BLOG_POSTS[0].excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{new Date(BLOG_POSTS[0].date).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric"
              })}</span>
              <span>·</span>
              <span>{BLOG_POSTS[0].readTime}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* ── All posts grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BLOG_POSTS.slice(1).map((post) => (
          <Link key={post.slug}
            href={`/blog/${post.slug}`}
            className="card hover:border-blue-300 transition-colors">
            <div className="text-3xl mb-3">{post.icon}</div>
            <span className="badge-blue text-xs mb-2 inline-block">
              {post.category}
            </span>
            <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="card bg-blue-50 border-blue-200 text-center mt-10">
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

    </div>
  )
}