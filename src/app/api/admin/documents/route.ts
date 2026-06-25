import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/db/admin"
import { requireAdmin } from "@/lib/auth/require-admin"

export async function GET(request: Request) {
  const auth = await requireAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const documentType = searchParams.get("type")

  const adminSupabase = createAdminClient()
  let query = adminSupabase
    .from("documents")
    .select("id, ref_number, document_type, state_code, city, status, user_id, created_at, profiles(email, full_name)")
    .order("created_at", { ascending: false })

  if (status) query = query.eq("status", status)
  if (documentType) query = query.eq("document_type", documentType)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }

  return NextResponse.json({ documents: data })
}
