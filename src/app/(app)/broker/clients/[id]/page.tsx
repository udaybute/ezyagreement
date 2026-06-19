import { createClient } from "@/lib/db/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

/**
 * Single Client Detail Page
 * - Shows client info
 * - List of agreements created for this client
 * - Quick action to create new agreement
 * - Responsive: mobile first
 */

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch client ──────────────────────────────────────────
  const { data: client } = await supabase
    .from("broker_clients")
    .select("*")
    .eq("id", params.id)
    .eq("broker_id", user.id)
    .single()

  if (!client) notFound()

  // ── Fetch agreements (matching by phone for now) ──────────
  // Note: In future, link documents directly to client_id
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // ── Filter documents that might belong to this client ─────
  // Simple match by checking form_data for client name/phone
  const clientDocs = documents?.filter((doc) => {
    const data = doc.form_data as any
    return (
      data?.tenant?.phone === client.phone ||
      data?.tenant?.name === client.name ||
      data?.landlord?.phone === client.phone ||
      data?.landlord?.name === client.name
    )
  }) ?? []

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header ── */}
      <div className="mb-6">
        <Link href="/broker/clients"
          className="text-blue-600 text-sm mb-4 block">
          ← Back to Clients
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {client.name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Client since{" "}
              {new Date(client.created_at).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
          <Link
            href={`/agreements/new/rental?client=${client.id}`}
            className="btn-primary py-2 text-sm whitespace-nowrap">
            + New Agreement
          </Link>
        </div>
      </div>

      {/* ── Client info card ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium text-gray-900 mt-0.5">
              📱 {client.phone}
            </p>
          </div>
          {client.email && (
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-900 mt-0.5">
                ✉️ {client.email}
              </p>
            </div>
          )}
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-medium text-gray-900 mt-0.5">
              📍 {client.city}
            </p>
          </div>
          <div>
            <p className="text-gray-500">State</p>
            <p className="font-medium text-gray-900 mt-0.5">
              {client.state}
            </p>
          </div>
        </div>

        {client.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Notes</p>
            <p className="text-gray-700 text-sm">{client.notes}</p>
          </div>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card text-center">
          <p className="text-2xl font-bold text-blue-700">
            {clientDocs.length}
          </p>
          <p className="text-gray-500 text-sm mt-1">Agreements</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-600">
            {clientDocs.filter((d) => d.status === "signed").length}
          </p>
          <p className="text-gray-500 text-sm mt-1">Signed</p>
        </div>
      </div>

      {/* ── Agreements list ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Agreements
        </h2>
        {clientDocs.length > 0 ? (
          <div className="space-y-3">
            {clientDocs.map((doc) => (
              <Link
                key={doc.id}
                href={`/agreements/${doc.id}`}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {doc.ref_number}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {doc.document_type.replace(/_/g, " ")} ·{" "}
                    {doc.state_code} ·{" "}
                    {new Date(doc.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <span className={
                  doc.status === "signed"    ? "badge-green" :
                  doc.status === "generated" ? "badge-blue"  :
                  "badge-amber"
                }>
                  {doc.status}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p className="text-3xl mb-2">📄</p>
            <p className="font-medium text-sm">No agreements yet</p>
            <Link
              href={`/agreements/new/rental?client=${client.id}`}
              className="btn-primary inline-block mt-3 py-1.5 text-sm">
              Create First Agreement
            </Link>
          </div>
        )}
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href={`/agreements/new/rental?client=${client.id}`}
          className="card text-center hover:border-blue-300 transition-colors">
          <div className="text-2xl mb-1">📄</div>
          <p className="text-sm font-medium text-gray-900">
            Rental Agreement
          </p>
        </Link>
        <Link
          href={`/agreements/new/commercial?client=${client.id}`}
          className="card text-center hover:border-blue-300 transition-colors">
          <div className="text-2xl mb-1">🏢</div>
          <p className="text-sm font-medium text-gray-900">
            Commercial Lease
          </p>
        </Link>
        <Link
          href={`/receipts/new?client=${client.id}`}
          className="card text-center hover:border-green-300 transition-colors">
          <div className="text-2xl mb-1">🧾</div>
          <p className="text-sm font-medium text-gray-900">
            HRA Receipt
          </p>
        </Link>
      </div>

    </div>
  )
}