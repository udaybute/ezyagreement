import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Elvatrixa Legal - Rental Agreement Rs.199 | Instant PDF",
    template: "%s | Elvatrixa Legal",
  },
  description: "Generate state-specific rental agreements in 5 minutes. Rs.199 flat. Instant PDF + WhatsApp delivery. Hindi/Marathi output. DPDP-compliant. Zero Aadhaar storage.",
  keywords: ["rental agreement", "rent agreement online", "rent agreement Maharashtra", "rental agreement format"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: { type: "website", locale: "en_IN", siteName: "Elvatrixa Legal" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Razorpay CDN — required for payment modal */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}