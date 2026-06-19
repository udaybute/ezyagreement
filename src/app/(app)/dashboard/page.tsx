import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

/**
 * Main Dashboard Page
 * - Shows real stats from database
 * - Quick actions for common tasks
 * - Recent documents list
 * - Responsive: mobile first
 */

export default async function DashboardPage() {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch profile ────────────────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // ── Fetch recent documents ───────────────────────────────
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // ── Fetch payments ───────────────────────────────────────
  const { data: payments } = await supabase
    .from("payments")
    .select("amount")
    .eq("user_id", user.id)
    .eq("status", "paid")

  // ── Calculate stats ──────────────────────────────────────
  const totalDocs     = documents?.length ?? 0
  const signedDocs    = documents?.filter((d) => d.status === "signed").length ?? 0
  const pendingDocs   = documents?.filter((d) => d.status === "generated").length ?? 0
  const totalSpent    = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  // ── This month documents ─────────────────────────────────
  const thisMonthDocs = documents?.filter((d) => {
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
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, {profile?.full_name || user.email}
          </p>
        </div>
        <Link href="/agreements/new" className="btn-primary">
          + New Agreement
        </Link>
      </div>

      {/* ── Stats grid ── */}
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
          <p className="text-3xl font-bold text-amber-600">{pendingDocs}</p>
          <p className="text-gray-500 text-sm mt-1">Generated</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-600">
            {thisMonthDocs}
          </p>
          <p className="text-gray-500 text-sm mt-1">This Month</p>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/agreements/new/rental"
          className="card hover:border-blue-300 transition-colors group">
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
            Rental Agreement
          </h3>
          <p className="text-gray-500 text-sm mt-1">Rs.199 — Instant PDF</p>
        </Link>

        <Link href="/agreements/new/commercial"
          className="card hover:border-blue-300 transition-colors group">
          <div className="text-2xl mb-2">🏢</div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
            Commercial Lease
          </h3>
          <p className="text-gray-500 text-sm mt-1">Rs.499 — Instant PDF</p>
        </Link>

        <Link href="/receipts/new"
          className="card hover:border-green-300 transition-colors group">
          <div className="text-2xl mb-2">🧾</div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
            HRA Receipt
          </h3>
          <p className="text-gray-500 text-sm mt-1">FREE — Instant PDF</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Recent documents ── */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">
              Recent Documents
            </h2>
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
                      {doc.state_code} ·{" "}
                      {doc.document_type.replace(/_/g, " ")} ·{" "}
                      {new Date(doc.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span className={
                    doc.status === "signed"   ? "badge-green" :
                    doc.status === "generated"? "badge-blue"  :
                    "badge-amber"
                  }>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p className="text-3xl mb-2">📂</p>
              <p className="font-medium text-sm">No documents yet</p>
              <Link href="/agreements/new"
                className="btn-primary inline-block mt-3 py-1.5 text-sm">
                Create First Agreement
              </Link>
            </div>
          )}
        </div>

        {/* ── Account info ── */}
        <div className="space-y-4">

          {/* Profile card */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">
              Account
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="text-blue-700 font-medium capitalize">
                  {profile?.role ?? "retail"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Spent</span>
                <span className="text-gray-900">
                  Rs.{totalSpent.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Link href="/settings/account"
                className="btn-secondary py-1.5 text-xs flex-1 text-center">
                Settings
              </Link>
              <Link href="/billing/plans"
                className="btn-primary py-1.5 text-xs flex-1 text-center">
                Upgrade
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">
              Quick Links
            </h2>
            <div className="space-y-2">
              {[
                { href: "/stamp-duty-calculator", label: "🧮 Stamp Duty Calculator" },
                { href: "/police-verification",   label: "🚔 Police Verification Guide" },
                { href: "/broker/dashboard",       label: "👥 Broker Dashboard" },
                { href: "/settings/privacy",       label: "🔒 Privacy Settings" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center justify-between py-1.5 text-sm text-gray-600 hover:text-blue-700 transition-colors">
                  <span>{link.label}</span>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}