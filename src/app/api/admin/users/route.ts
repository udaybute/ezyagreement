import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/db/admin"
import { requireAdmin } from "@/lib/auth/require-admin"

const VALID_ROLES = ["retail", "broker", "ca", "admin"]

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const adminSupabase = createAdminClient()
  const { data, error } = await adminSupabase
    .from("profiles")
    .select("id, email, full_name, role, documents_count, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }

  return NextResponse.json({ users: data })
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { user_id, role } = await request.json()

  if (!user_id || !VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase
    .from("profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", user_id)

  if (error) {
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
