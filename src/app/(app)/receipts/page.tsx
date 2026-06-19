import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

/**
 * All Receipts Page
 * - Shows all generated HRA receipts
 * - Quick access to generate new receipt
 * - Responsive: mobile first
 */

export default async function ReceiptsPage() {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch all receipt documents ──────────────────────────
  const { data: receipts } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .eq("document_type", "rent_receipt")
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link href="/dashboard"
            className="text-blue-600 text-sm mb-1 block">
            ← Dashboard
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Rent Receipts
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {receipts?.length ?? 0} receipts generated
          </p>
        </div>
        <Link href="/receipts/new"
          className="btn-primary py-2 text-sm">
          + Generate New Receipt
        </Link>
      </div>

      {/* ── Free HRA info ── */}
      <div className="card bg-green-50 border-green-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🧾</div>
          <div>
            <p className="font-semibold text-gray-900">
              HRA Rent Receipt — Always Free
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Generate unlimited HRA-compliant rent receipts for
              income tax filing. PAN check included.
              Valid under Section 10(13A).
            </p>
            <Link href="/receipts/new"
              className="btn-primary inline-block mt-3 py-1.5 text-sm">
              Generate Free Receipt
            </Link>
          </div>
        </div>
      </div>

      {/* ── Receipts list ── */}
      {receipts && receipts.length > 0 ? (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            All Receipts
          </h2>
          <div className="space-y-3">
            {receipts.map((receipt) => (
              <div key={receipt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-2">

                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {receipt.ref_number}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {receipt.city} ·{" "}
                    {new Date(receipt.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {/* Delete warning */}
                  <p className="text-red-400 text-xs mt-0.5">
                    Auto-delete:{" "}
                    {new Date(receipt.delete_after).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={
                    receipt.status === "generated"
                      ? "badge-green"
                      : "badge-amber"
                  }>
                    {receipt.status}
                  </span>
                  <Link
                    href={`/agreements/${receipt.id}`}
                    className="btn-secondary py-1 text-xs">
                    View
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🧾</p>
          <p className="font-medium text-gray-900">No receipts yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Generate your first free HRA receipt
          </p>
          <Link href="/receipts/new"
            className="btn-primary inline-block mt-4 py-2 text-sm">
            Generate Free Receipt
          </Link>
        </div>
      )}

      {/* ── HRA rules reminder ── */}
      <div className="card bg-blue-50 border-blue-200 mt-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          📋 HRA Tax Rules Reminder
        </h3>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>• HRA exemption ONLY under Old Tax Regime</li>
          <li>• PAN of landlord mandatory if rent exceeds Rs.3,000/month</li>
          <li>• Form 10BA required if annual rent exceeds Rs.1,00,000</li>
          <li>• Landlord signature mandatory on receipt</li>
        </ul>
      </div>

    </div>
  )
}