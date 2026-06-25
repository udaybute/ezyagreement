import { createAdminClient } from "@/lib/db/admin"

export default async function AdminAnalyticsPage() {
  const adminSupabase = createAdminClient()

  const { data: profiles } = await adminSupabase.from("profiles").select("role, created_at")
  const { data: documents } = await adminSupabase.from("documents").select("document_type, state_code, created_at")
  const { data: payments } = await adminSupabase.from("payments").select("amount, status, created_at")

  const totalUsers = profiles?.length ?? 0
  const totalDocuments = documents?.length ?? 0
  const paidPayments = payments?.filter((p) => p.status === "paid") ?? []
  const totalRevenue = paidPayments.reduce((sum, p) => sum + Number(p.amount), 0)

  const roleBreakdown: Record<string, number> = {}
  profiles?.forEach((p) => {
    roleBreakdown[p.role] = (roleBreakdown[p.role] ?? 0) + 1
  })

  const docTypeBreakdown: Record<string, number> = {}
  documents?.forEach((d) => {
    docTypeBreakdown[d.document_type] = (docTypeBreakdown[d.document_type] ?? 0) + 1
  })

  const monthlyStats: Record<string, { users: number; documents: number; revenue: number }> = {}

  profiles?.forEach((p) => {
    const month = new Date(p.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].users += 1
  })
  documents?.forEach((d) => {
    const month = new Date(d.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].documents += 1
  })
  paidPayments.forEach((p) => {
    const month = new Date(p.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].revenue += Number(p.amount)
  })

  const months = Object.entries(monthlyStats).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of users, documents and revenue</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-700">{totalUsers}</p>
          <p className="text-gray-500 text-sm mt-1">Total Users</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{totalDocuments}</p>
          <p className="text-gray-500 text-sm mt-1">Total Documents</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-amber-600">
            Rs.{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Users by Role</h2>
          <div className="space-y-3">
            {Object.entries(roleBreakdown).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{role}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(count / Math.max(totalUsers, 1)) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Documents by Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(docTypeBreakdown).map(([type, count]) => (
              <div key={type} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-700">{count}</p>
                <p className="text-gray-600 text-xs mt-1 capitalize">{type.replace(/_/g, " ")}</p>
              </div>
            ))}
            {totalDocuments === 0 && (
              <p className="text-gray-400 text-sm col-span-2 text-center py-4">No documents yet</p>
            )}
          </div>
        </div>

      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Monthly Breakdown</h2>
        {months.length > 0 ? (
          <div className="space-y-2">
            {months.map(([month, stats]) => (
              <div key={month} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-700">{month}</span>
                <span className="text-gray-500">
                  {stats.users} users · {stats.documents} docs · Rs.{stats.revenue.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">No data yet</p>
        )}
      </div>

    </div>
  )
}
