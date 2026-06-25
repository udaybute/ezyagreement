import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

/**
 * Broker Dashboard Page
 * - Shows broker stats: total clients, docs generated, revenue
 * - Quick actions: add client, generate doc, view reports
 * - Recent activity table
 * - Responsive: mobile first
 */

export default async function BrokerDashboardPage() {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch broker clients ─────────────────────────────────
  const { data: clients } = await supabase
    .from("broker_clients")
    .select("*")
    .order("created_at", { ascending: false })

  // ── Fetch broker documents ───────────────────────────────
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // ── Fetch broker payments ────────────────────────────────
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("status", "paid")

  // ── Calculate stats ──────────────────────────────────────
  const totalClients   = clients?.length ?? 0
  const totalDocs      = documents?.length ?? 0
  const totalRevenue   = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0
  const thisMonthDocs  = documents?.filter((d) => {
    const docDate = new Date(d.created_at)
    const now = new Date()
    return (
      docDate.getMonth() === now.getMonth() &&
      docDate.getFullYear() === now.getFullYear()
    )
  }).length ?? 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Broker Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage clients and generate agreements
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/broker/clients" className="btn-secondary py-2 text-sm">
            View Clients
          </Link>
          <Link href="/agreements/new/rental" className="btn-primary py-2 text-sm">
            + New Agreement
          </Link>
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-700">{totalClients}</p>
          <p className="text-gray-500 text-sm mt-1">Total Clients</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{totalDocs}</p>
          <p className="text-gray-500 text-sm mt-1">Total Docs</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-purple-600">{thisMonthDocs}</p>
          <p className="text-gray-500 text-sm mt-1">This Month</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-amber-600">
            Rs.{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-500 text-sm mt-1">Revenue</p>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/agreements/new/rental"
          className="card hover:border-blue-300 transition-colors cursor-pointer">
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-semibold text-gray-900">Rental Agreement</h3>
          <p className="text-gray-500 text-sm mt-1">Rs.199 — Instant PDF</p>
        </Link>
        <Link href="/agreements/new/commercial"
          className="card hover:border-blue-300 transition-colors cursor-pointer">
          <div className="text-2xl mb-2">🏢</div>
          <h3 className="font-semibold text-gray-900">Commercial Lease</h3>
          <p className="text-gray-500 text-sm mt-1">Rs.499 — Instant PDF</p>
        </Link>
        <Link href="/broker/clients"
          className="card hover:border-green-300 transition-colors cursor-pointer">
          <div className="text-2xl mb-2">👥</div>
          <h3 className="font-semibold text-gray-900">Add Client</h3>
          <p className="text-gray-500 text-sm mt-1">Manage your clients</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Recent documents ── */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Documents</h2>
            <Link href="/broker/reports" className="text-blue-600 text-sm">
              View all
            </Link>
          </div>
          {documents && documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doc.ref_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.state_code} · {doc.document_type.replace(/_/g, " ")}
                    </p>
                  </div>
                  <span className={`
                    text-xs font-medium px-2 py-0.5 rounded-full
                    ${doc.status === "generated" ? "badge-green" : "badge-amber"}
                  `}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">📂</p>
              <p className="text-sm">No documents yet</p>
            </div>
          )}
        </div>

        {/* ── Recent clients ── */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Clients</h2>
            <Link href="/broker/clients" className="text-blue-600 text-sm">
              View all
            </Link>
          </div>
          {clients && clients.length > 0 ? (
            <div className="space-y-3">
              {clients.slice(0, 5).map((client) => (
                <div key={client.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {client.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {client.city} · {client.phone}
                    </p>
                  </div>
                  <Link href={`/broker/clients/${client.id}`}
                    className="text-blue-600 text-xs hover:underline">
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">👥</p>
              <p className="text-sm">No clients yet</p>
              <Link href="/broker/clients"
                className="btn-primary inline-block mt-3 py-1.5 text-sm">
                Add First Client
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* ── Plan info ── */}
      <div className="card bg-blue-50 border-blue-200 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-semibold text-gray-900">Broker Plan</p>
            <p className="text-gray-600 text-sm mt-0.5">
              20 docs/month · White-label WhatsApp · Client dashboard
            </p>
          </div>
          <Link href="/billing/plans"
            className="btn-primary py-2 text-sm whitespace-nowrap">
            Upgrade Plan
          </Link>
        </div>
      </div>

    </div>
  )
}