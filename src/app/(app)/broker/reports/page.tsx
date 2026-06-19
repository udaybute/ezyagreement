import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

/**
 * Broker Reports Page
 * - Monthly document stats
 * - Revenue summary
 * - Client activity
 * - Responsive: mobile first
 */

export default async function BrokerReportsPage() {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch all documents ──────────────────────────────────
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // ── Fetch all payments ───────────────────────────────────
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "paid")
    .order("created_at", { ascending: false })

  // ── Fetch clients ────────────────────────────────────────
  const { data: clients } = await supabase
    .from("broker_clients")
    .select("*")

  // ── Calculate stats ──────────────────────────────────────
  const totalDocs     = documents?.length ?? 0
  const totalRevenue  = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0
  const totalClients  = clients?.length ?? 0
  const signedDocs    = documents?.filter((d) => d.status === "signed").length ?? 0

  // ── Monthly breakdown ────────────────────────────────────
  const monthlyStats: Record<string, { docs: number; revenue: number }> = {}

  documents?.forEach((doc) => {
    const month = new Date(doc.created_at).toLocaleDateString("en-IN", {
      month: "long", year: "numeric",
    })
    if (!monthlyStats[month]) monthlyStats[month] = { docs: 0, revenue: 0 }
    monthlyStats[month].docs += 1
  })

  payments?.forEach((payment) => {
    const month = new Date(payment.created_at).toLocaleDateString("en-IN", {
      month: "long", year: "numeric",
    })
    if (!monthlyStats[month]) monthlyStats[month] = { docs: 0, revenue: 0 }
    monthlyStats[month].revenue += payment.amount
  })

  // ── State-wise breakdown ─────────────────────────────────
  const stateStats: Record<string, number> = {}
  documents?.forEach((doc) => {
    const state = doc.state_code
    stateStats[state] = (stateStats[state] ?? 0) + 1
  })

  // ── Document type breakdown ──────────────────────────────
  const typeStats: Record<string, number> = {}
  documents?.forEach((doc) => {
    const type = doc.document_type.replace(/_/g, " ")
    typeStats[type] = (typeStats[type] ?? 0) + 1
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header ── */}
      <div className="mb-8">
        <Link href="/broker/dashboard"
          className="text-blue-600 text-sm mb-4 block">
          ← Broker Dashboard
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your document and revenue summary
        </p>
      </div>

      {/* ── Overall stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-700">{totalDocs}</p>
          <p className="text-gray-500 text-sm mt-1">Total Docs</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{signedDocs}</p>
          <p className="text-gray-500 text-sm mt-1">Signed</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-purple-600">{totalClients}</p>
          <p className="text-gray-500 text-sm mt-1">Clients</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-amber-600">
            Rs.{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-500 text-sm mt-1">Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* ── Monthly breakdown ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Monthly Breakdown
          </h2>
          {Object.keys(monthlyStats).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(monthlyStats)
                .slice(0, 6)
                .map(([month, stats]) => (
                <div key={month}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {month}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stats.docs} documents
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-green-700">
                    Rs.{stats.revenue.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm">No data yet</p>
            </div>
          )}
        </div>

        {/* ── State breakdown ── */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            Documents by State
          </h2>
          {Object.keys(stateStats).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(stateStats)
                .sort((a, b) => b[1] - a[1])
                .map(([state, count]) => (
                <div key={state}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900">
                    {state}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Progress bar */}
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / totalDocs) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-6 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">🗺️</p>
              <p className="text-sm">No data yet</p>
            </div>
          )}
        </div>

      </div>

      {/* ── Document type breakdown ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Documents by Type
        </h2>
        {Object.keys(typeStats).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type}
                className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{count}</p>
                <p className="text-gray-600 text-xs mt-1 capitalize">{type}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">📄</p>
            <p className="text-sm">No documents yet</p>
          </div>
        )}
      </div>

      {/* ── Recent payments ── */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">
          Recent Payments
        </h2>
        {payments && payments.length > 0 ? (
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {payment.plan_type.replace("_", " ")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    Rs.{payment.amount.toLocaleString("en-IN")}
                  </p>
                  <span className="badge-green text-xs">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">💳</p>
            <p className="text-sm">No payments yet</p>
          </div>
        )}
      </div>

    </div>
  )
}