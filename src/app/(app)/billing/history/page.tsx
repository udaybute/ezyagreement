/**
 * Payment History Page
 * - Shows all past payments
 * - GST invoice download
 * - Responsive: mobile first
 */

import { createClient } from "@/lib/db/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function BillingHistoryPage() {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch payments ───────────────────────────────────────
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // ── Calculate total spent ────────────────────────────────
  const totalSpent = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <Link href="/billing/plans"
          className="text-blue-600 text-sm mb-4 block">
          ← Back to Plans
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Payment History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          All your past payments and invoices
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card text-center">
          <p className="text-2xl font-bold text-blue-700">
            {payments?.length ?? 0}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Payments</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-600">
            Rs.{totalSpent.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Spent</p>
        </div>
      </div>

      {/* ── Payments list ── */}
      {payments && payments.length > 0 ? (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            All Transactions
          </h2>
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-2">

                <div>
                  {/* Plan type */}
                  <p className="font-medium text-gray-900 capitalize text-sm">
                    {payment.plan_type.replace("_", " ")} Plan
                  </p>
                  {/* Payment ID */}
                  <p className="text-gray-400 text-xs mt-0.5">
                    {payment.razorpay_payment_id ?? payment.razorpay_order_id}
                  </p>
                  {/* Date */}
                  <p className="text-gray-400 text-xs">
                    {new Date(payment.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Amount */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      Rs.{payment.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-400 text-xs">
                      +GST Rs.{payment.gst_amount}
                    </p>
                  </div>
                  {/* Status badge */}
                  <span className={
                    payment.status === "paid"
                      ? "badge-green"
                      : payment.status === "failed"
                      ? "badge-red"
                      : "badge-amber"
                  }>
                    {payment.status}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">💳</p>
          <p className="font-medium text-gray-900">No payments yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Your payment history will appear here
          </p>
          <Link href="/agreements/new"
            className="btn-primary inline-block mt-4 py-2 text-sm">
            Generate First Agreement
          </Link>
        </div>
      )}

      {/* ── GST note ── */}
      <div className="card bg-gray-50 mt-4">
        <p className="text-gray-600 text-sm">
          <strong>GST Invoice:</strong> All payments include 18% GST.
          For GST invoices, email us at support@elvatrixa.com with
          your payment ID and GSTIN.
        </p>
      </div>

    </div>
  )
}