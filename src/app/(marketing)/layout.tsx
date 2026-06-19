/**
 * Marketing Layout — wraps all public pages
 * Includes: Navbar (logged out), Footer
 */

import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Navbar — logged out state */}
      <Navbar isLoggedIn={false} />
      {/* Page content */}
      <main className="min-h-screen">{children}</main>
      {/* Footer */}
      <Footer />
    </>
  )
}