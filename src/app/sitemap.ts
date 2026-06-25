import type { MetadataRoute } from "next"
import { STATES } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/hra-receipt",
    "/legal/privacy",
    "/legal/terms",
    "/legal/disclaimer",
    "/legal/refund",
    "/police-verification",
    "/pricing",
    "/stamp-duty-calculator",
  ]

  const slugify = (value: string) =>
    value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  const cityRoutes = STATES.flatMap((state) =>
    state.major_cities.map(
      (city) => `/rent-agreement/${slugify(state.name)}/${slugify(city)}`
    )
  )

  const blogSlugs = [
    "rental-agreement-format-maharashtra",
    "stamp-duty-all-states-2026",
    "hra-rent-receipt-guide",
    "police-verification-guide",
    "mta-2021-fact-check",
  ]
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`)

  return [...routes, ...blogRoutes, ...cityRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
