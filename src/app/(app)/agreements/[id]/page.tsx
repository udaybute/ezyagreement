import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

/**
 * Agreement Detail Page
 * - Shows full agreement details
 * - Download option
 * - Status tracking
 * - Responsive: mobile first
 */

export default async function AgreementDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Admins can view any document; everyone else only their own ──
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const doc = profile?.role === "admin"
    ? (await createAdminClient().from("documents").select("*").eq("id", params.id).single()).data
    : (await supabase.from("documents").select("*").eq("id", params.id).eq("user_id", user.id).single()).data

  // ── If not found ─────────────────────────────────────────
  if (!doc) notFound()

  // ── Format dates ─────────────────────────────────────────
  const createdAt = new Date(doc.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  const deleteAfter = new Date(doc.delete_after).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  // ── Get form data ────────────────────────────────────────
  const data = doc.form_data as any

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <div className="mb-6">
        <Link href="/dashboard"
          className="text-blue-600 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {doc.document_type.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Ref: {doc.ref_number}
            </p>
          </div>

          {/* Status badge */}
          <span className={`
            text-sm font-medium px-3 py-1 rounded-full self-start
            ${doc.status === "signed"    ? "badge-green"  : ""}
            ${doc.status === "generated" ? "badge-blue"   : ""}
            ${doc.status === "draft"     ? "badge-amber"  : ""}
            ${doc.status === "expired"   ? "badge-gray"   : ""}
          `}>
            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
          </span>
        </div>
      </div>

      {/* ── Key details ── */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Agreement Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">State</p>
            <p className="font-medium text-gray-900 mt-0.5">{doc.state_code}</p>
          </div>
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-medium text-gray-900 mt-0.5">{doc.city}</p>
          </div>
          <div>
            <p className="text-gray-500">Language</p>
            <p className="font-medium text-gray-900 mt-0.5 uppercase">{doc.language}</p>
          </div>
          <div>
            <p className="text-gray-500">Stamp Duty</p>
            <p className="font-medium text-gray-900 mt-0.5">
              Rs.{doc.stamp_duty_amount?.toLocaleString("en-IN") ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Created On</p>
            <p className="font-medium text-gray-900 mt-0.5">{createdAt}</p>
          </div>
          <div>
            <p className="text-gray-500">Auto Delete On</p>
            <p className="font-medium text-red-600 mt-0.5">{deleteAfter}</p>
          </div>
        </div>
      </div>

      {/* ── Parties ── */}
      {data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

            {/* Landlord */}
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-3">
                🏠 Landlord
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">
                    {data.landlord_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-700">{data.landlord_phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">ID Type</p>
                  <p className="text-gray-700 uppercase">
                    {data.landlord_id_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Tenant */}
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-3">
                👤 Tenant
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">
                    {data.tenant_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-700">{data.tenant_phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">ID Type</p>
                  <p className="text-gray-700 uppercase">
                    {data.tenant_id_type}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Financial terms */}
          <div className="card mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">
              💰 Financial Terms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Monthly Rent</p>
                <p className="font-bold text-gray-900 text-lg mt-0.5">
                  Rs.{data.monthly_rent?.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Security Deposit</p>
                <p className="font-medium text-gray-900 mt-0.5">
                  Rs.{data.security_deposit?.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {data.duration_months} months
                </p>
              </div>
              <div>
                <p className="text-gray-500">Start Date</p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {data.start_date
                    ? new Date(data.start_date).toLocaleDateString("en-IN")
                    : "N/A"
                  }
                </p>
              </div>
              <div>
                <p className="text-gray-500">Notice Period</p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {data.notice_period_days} days
                </p>
              </div>
              <div>
                <p className="text-gray-500">Electricity</p>
                <p className="font-medium text-gray-900 mt-0.5 capitalize">
                  {data.electricity_payer}
                </p>
              </div>
            </div>
          </div>

          {/* Property */}
          <div className="card mb-4">
            <h2 className="font-semibold text-gray-900 mb-3">
              📍 Property
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500">Address</p>
                <p className="text-gray-900">{data.property_address}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="text-gray-900 capitalize">{data.property_type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Furnished</p>
                  <p className="text-gray-900 capitalize">{data.furnished}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── DPDP notice ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-xs">
          🔒 <strong>DPDP Act 2025:</strong> This document will be automatically
          deleted on {deleteAfter}. Download and save it before that date.
        </p>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard"
          className="btn-secondary flex-1 text-center">
          ← Dashboard
        </Link>
        <Link href={`/agreements/${doc.id}/preview`}
          className="btn-secondary flex-1 text-center">
          Preview Document
        </Link>
        <Link href={`/agreements/${doc.id}/download`}
          className="btn-primary flex-1 text-center">
          Download
        </Link>
      </div>

    </div>
  )
}