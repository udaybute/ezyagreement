/**
 * App Layout — wraps all authenticated pages
 * Includes: Navbar, main content area
 */

import Navbar from "@/components/shared/navbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Navbar — logged in state */}
      <Navbar isLoggedIn={true} />
      {/* Page content */}
      <main>{children}</main>
    </>
  )
}