import { createClient } from "@/lib/db/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

/**
 * Agreement Download Page
 * - Shows download options for generated agreement
 * - Text + future PDF download
 * - DPDP: shows auto-delete warning
 * - Responsive: mobile first
 */

export default async function AgreementDownloadPage({
  params,
}: {
  params: { id: string }
}) {
  // ── Auth check ───────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // ── Fetch agreement ──────────────────────────────────────
  const { data: doc } = await supabase
    .from("documents")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (!doc) notFound()

  const deleteAfter = new Date(doc.delete_after).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  const createdAt = new Date(doc.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">

      {/* ── Header ── */}
      <Link href={`/agreements/${params.id}`}
        className="text-blue-600 text-sm mb-6 block">
        ← Back to Agreement
      </Link>

      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Download Agreement
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Ref: {doc.ref_number}
      </p>

      {/* ── DPDP warning ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-sm font-medium mb-1">
          ⚠️ Auto-Delete Warning
        </p>
        <p className="text-amber-700 text-xs leading-relaxed">
          This document will be automatically deleted on{" "}
          <strong>{deleteAfter}</strong> as per DPDP Act 2025.
          Download and save it before that date.
        </p>
      </div>

      {/* ── Document info ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Document Details
        </h2>
        <div className="space-y-2 text-sm">
          {[
            ["Ref Number",     doc.ref_number],
            ["Document Type",  doc.document_type.replace(/_/g, " ")],
            ["State",          doc.state_code],
            ["City",           doc.city],
            ["Status",         doc.status],
            ["Created On",     createdAt],
            ["Auto Delete On", deleteAfter],
          ].map(([label, value]) => (
            <div key={label}
              className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
              <span className="text-gray-500 capitalize">{label}</span>
              <span className="text-gray-900 capitalize">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Download options ── */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-gray-900">
          Download Options
        </h2>

        {/* Text download — available now */}
        <div className="card">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📄</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                Text Format (.txt)
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Download as text file. Print on stamp paper and sign.
              </p>
              <p className="text-green-600 text-xs mt-1 font-medium">
                ✓ Available now
              </p>
            </div>
            
              href={`/api/agreements/${params.id}/download?format=txt`}
              className="btn-primary py-2 text-sm whitespace-nowrap"
              download>
              Download
            </a>
          </div>
        </div>

        {/* PDF — coming soon */}
        <div className="card opacity-60">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                PDF Format (.pdf)
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Court-ready PDF with proper formatting and stamp duty.
              </p>
              <p className="text-amber-600 text-xs mt-1 font-medium">
                ⏳ Coming soon — eStamp integration pending
              </p>
            </div>
            <button
              disabled
              className="btn-secondary py-2 text-sm opacity-50 cursor-not-allowed whitespace-nowrap">
              Coming Soon
            </button>
          </div>
        </div>

        {/* eSign — coming soon */}
        <div className="card opacity-60">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✍️</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                eSign — Digital Signature
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Send signing link to landlord and tenant via WhatsApp.
                OTP-based eSign.
              </p>
              <p className="text-amber-600 text-xs mt-1 font-medium">
                ⏳ Coming soon — Setu eSign integration pending
              </p>
            </div>
            <button
              disabled
              className="btn-secondary py-2 text-sm opacity-50 cursor-not-allowed whitespace-nowrap">
              Coming Soon
            </button>
          </div>
        </div>

      </div>

      {/* ── Next steps ── */}
      <div className="card bg-blue-50 border-blue-200 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          📋 Next Steps After Download
        </h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
            Download the text file above
          </li>
          <li className="flex gap-2">
            <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
            Buy stamp paper from SHCIL portal —
            Rs. {doc.stamp_duty_amount?.toLocaleString("en-IN") ?? "as applicable"}
          </li>
          <li className="flex gap-2">
            <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
            Print agreement on stamp paper
          </li>
          <li className="flex gap-2">
            <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
            Both parties sign with 2 witnesses
          </li>
          {doc.state_code === "MH" && (
            <li className="flex gap-2">
              <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
              Register at Sub-Registrar office
              (Maharashtra — mandatory for all agreements)
            </li>
          )}
        </ol>
      </div>

      {/* ── Stamp paper link ── */}
      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          Buy Stamp Paper Online
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          Buy eStamp directly from SHCIL official portal
        </p>
        
          href="https://www.shcilestamp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary py-2 text-sm inline-block">
          Open SHCIL Portal ↗
        </a>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard"
          className="btn-secondary flex-1 text-center">
          ← Dashboard
        </Link>
        <Link href="/agreements/new"
          className="btn-primary flex-1 text-center">
          Create New Agreement
        </Link>
      </div>

    </div>
  )
}