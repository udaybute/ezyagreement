/**
 * Footer Component
 * - Responsive: stacked on mobile, grid on desktop
 * - Includes: links, disclaimers, DPDP notice
 * - Shown on all public (marketing) pages
 */

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-lg mb-2">
              Elvatrixa Legal
            </p>
            <p className="text-sm leading-relaxed">
              India's first privacy-first legal document platform.
              Rs.199 flat. Instant PDF. 22 states covered.
            </p>
          </div>

          {/* Documents */}
          <div>
            <p className="text-white font-medium text-sm mb-3">Documents</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agreements/new/rental" className="hover:text-white transition-colors">Rental Agreement</Link></li>
              <li><Link href="/agreements/new/commercial" className="hover:text-white transition-colors">Commercial Lease</Link></li>
              <li><Link href="/agreements/new/noc" className="hover:text-white transition-colors">NOC</Link></li>
              <li><Link href="/receipts/new" className="hover:text-white transition-colors">HRA Receipt (Free)</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="text-white font-medium text-sm mb-3">Free Tools</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stamp-duty-calculator" className="hover:text-white transition-colors">Stamp Duty Calculator</Link></li>
              <li><Link href="/hra-receipt" className="hover:text-white transition-colors">HRA Receipt Generator</Link></li>
              <li><Link href="/police-verification" className="hover:text-white transition-colors">Police Verification Guide</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-medium text-sm mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">

          {/* Legal links */}
          <div className="flex flex-wrap gap-4 text-xs mb-4">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs leading-relaxed mb-3">
            <strong className="text-gray-300">Disclaimer:</strong> Elvatrixa Legal is a document drafting tool,
            not a law firm. Content is not legal advice. Rental laws vary by state — always verify with
            a qualified advocate. The 2-month deposit cap applies ONLY in UP, Rajasthan, and Kerala (MTA 2021).
            Police verification is mandatory only in Delhi, Maharashtra, Karnataka, Hyderabad, and Kolkata.
          </p>

          {/* DPDP + Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <p>
              🔒 DPDP Act 2025 Compliant · Zero Aadhaar Storage · India Data Residency
            </p>
            <p>
              © {new Date().getFullYear()} Elvatrixa Pvt. Ltd. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}