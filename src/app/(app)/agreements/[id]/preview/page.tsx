import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { getStateByCode } from "@/lib/constants"
import { generateAgreementText } from "@/lib/utils/agreement-text"
import PrintButton from "@/components/shared/print-button"

export default async function AgreementPreviewPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const doc = profile?.role === "admin"
    ? (await createAdminClient().from("documents").select("*").eq("id", params.id).single()).data
    : (await supabase.from("documents").select("*").eq("id", params.id).eq("user_id", user.id).single()).data

  if (!doc) notFound()

  const state = getStateByCode(doc.state_code)
  if (!state) notFound()

  const formData = doc.form_data as any

  const startDate = formData?.start_date ? new Date(formData.start_date) : new Date(doc.created_at)
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + (formData?.duration_months ?? 0))

  const agreementText = generateAgreementText({
    formData,
    state,
    stampDuty: doc.stamp_duty_amount ?? 0,
    refNumber: doc.ref_number,
    startDate,
    endDate,
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">

      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <Link href={`/agreements/${params.id}`} className="text-blue-600 text-sm">
          ← Back to Agreement
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-gray-900">
          Document Preview
        </h1>
      </div>

      <div className="card">
        <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm text-gray-800 leading-relaxed">
          {agreementText}
        </pre>
      </div>

      <div className="no-print flex flex-col sm:flex-row gap-3 mt-6">
        <Link href={`/agreements/${params.id}/download`} className="btn-primary flex-1 text-center">
          Download Options
        </Link>
        <PrintButton />
      </div>

    </div>
  )
}
