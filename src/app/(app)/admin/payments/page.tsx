"use client"

import { useState, useEffect } from "react"

interface AdminPayment {
  id: string
  plan_type: string
  amount: number
  gst_amount: number
  currency: string
  status: string
  razorpay_order_id: string | null
  created_at: string
  profiles: { email: string; full_name: string } | null
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<AdminPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  async function fetchPayments() {
    setLoading(true)
    const url = statusFilter ? `/api/admin/payments?status=${statusFilter}` : "/api/admin/payments"
    const res = await fetch(url)
    const data = await res.json()
    setPayments(data.payments ?? [])
    setLoading(false)
  }

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">

      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Payments</h1>
        <p className="text-gray-500 text-sm mt-1">
          {payments.length} payments · Rs.{totalRevenue.toLocaleString("en-IN")} collected
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        {["", "paid", "pending", "failed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={statusFilter === s ? "btn-primary py-1.5 text-xs" : "btn-secondary py-1.5 text-xs"}
          >
            {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Loading payments...</p>
        </div>
      ) : payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      Rs.{Number(p.amount).toLocaleString("en-IN")}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                      ${p.status === "paid" ? "badge-green" : ""}
                      ${p.status === "pending" ? "badge-amber" : ""}
                      ${p.status === "failed" ? "badge-gray" : ""}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="capitalize">{p.plan_type}</span>
                    <span>{p.profiles?.full_name} ({p.profiles?.email})</span>
                    <span>{new Date(p.created_at).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">💳</p>
          <p className="font-medium">No payments found</p>
        </div>
      )}

    </div>
  )
}
