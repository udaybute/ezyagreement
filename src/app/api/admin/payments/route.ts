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

  const adminSupabase = createAdminClient()
  let query = adminSupabase
    .from("payments")
    .select("id, plan_type, amount, gst_amount, currency, status, razorpay_order_id, created_at, profiles(email, full_name)")
    .order("created_at", { ascending: false })

  if (status) query = query.eq("status", status)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }

  return NextResponse.json({ payments: data })
}
