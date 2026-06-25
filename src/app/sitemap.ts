import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/hra-receipt",
    "/legal",
    "/police-verification",
    "/pricing",
    "/rent-agreement",
    "/stamp-duty-calculator",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
