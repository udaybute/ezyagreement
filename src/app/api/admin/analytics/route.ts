import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/db/admin"
import { requireAdmin } from "@/lib/auth/require-admin"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const adminSupabase = createAdminClient()

  const { data: profiles } = await adminSupabase.from("profiles").select("role, created_at")
  const { data: documents } = await adminSupabase.from("documents").select("document_type, state_code, created_at")
  const { data: payments } = await adminSupabase.from("payments").select("amount, status, created_at")

  const totalUsers = profiles?.length ?? 0
  const totalDocuments = documents?.length ?? 0
  const paidPayments = payments?.filter((p) => p.status === "paid") ?? []
  const totalRevenue = paidPayments.reduce((sum, p) => sum + Number(p.amount), 0)

  const roleBreakdown: Record<string, number> = {}
  profiles?.forEach((p) => {
    roleBreakdown[p.role] = (roleBreakdown[p.role] ?? 0) + 1
  })

  const docTypeBreakdown: Record<string, number> = {}
  documents?.forEach((d) => {
    docTypeBreakdown[d.document_type] = (docTypeBreakdown[d.document_type] ?? 0) + 1
  })

  const monthlyStats: Record<string, { users: number; documents: number; revenue: number }> = {}

  profiles?.forEach((p) => {
    const month = new Date(p.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].users += 1
  })

  documents?.forEach((d) => {
    const month = new Date(d.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].documents += 1
  })

  paidPayments.forEach((p) => {
    const month = new Date(p.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    monthlyStats[month] ??= { users: 0, documents: 0, revenue: 0 }
    monthlyStats[month].revenue += Number(p.amount)
  })

  return NextResponse.json({
    totalUsers,
    totalDocuments,
    totalRevenue,
    roleBreakdown,
    docTypeBreakdown,
    monthlyStats,
  })
}
