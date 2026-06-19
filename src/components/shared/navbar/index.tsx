"use client"

/**
 * Main Navbar Component
 * - Responsive: hamburger menu on mobile, full nav on desktop
 * - Shows different links for logged-in vs logged-out users
 * - Used in both (marketing) and (app) layouts
 */

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/db/client"
import { useRouter } from "next/navigation"

interface NavbarProps {
  /** Pass user object if logged in, null if not */
  isLoggedIn?: boolean
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // ── Handle logout ──────────────────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="font-bold text-blue-700 text-lg">
            Elvatrixa Legal
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/stamp-duty-calculator"
              className="text-gray-600 hover:text-gray-900 text-sm">
              Stamp Duty
            </Link>
            <Link href="/hra-receipt"
              className="text-gray-600 hover:text-gray-900 text-sm">
              Free HRA Receipt
            </Link>
            <Link href="/pricing"
              className="text-gray-600 hover:text-gray-900 text-sm">
              Pricing
            </Link>

            {isLoggedIn ? (
              // Logged-in links
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="btn-secondary py-1.5 text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 text-sm">
                  Logout
                </button>
              </div>
            ) : (
              // Logged-out links
              <Link href="/login" className="btn-primary py-1.5 text-sm">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // Close icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <Link href="/stamp-duty-calculator"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setMenuOpen(false)}>
              Stamp Duty Calculator
            </Link>
            <Link href="/hra-receipt"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setMenuOpen(false)}>
              Free HRA Receipt
            </Link>
            <Link href="/pricing"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard"
                  className="block px-3 py-2 text-blue-700 font-medium hover:bg-blue-50 rounded-lg text-sm"
                  onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login"
                className="block px-3 py-2 text-blue-700 font-medium hover:bg-blue-50 rounded-lg text-sm"
                onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}