import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/dashboard")

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto">
          <Link href="/admin/analytics" className="py-3 text-sm font-medium text-gray-700 hover:text-blue-700 whitespace-nowrap">
            Analytics
          </Link>
          <Link href="/admin/documents" className="py-3 text-sm font-medium text-gray-700 hover:text-blue-700 whitespace-nowrap">
            Documents
          </Link>
          <Link href="/admin/payments" className="py-3 text-sm font-medium text-gray-700 hover:text-blue-700 whitespace-nowrap">
            Payments
          </Link>
          <Link href="/admin/users" className="py-3 text-sm font-medium text-gray-700 hover:text-blue-700 whitespace-nowrap">
            Users
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
