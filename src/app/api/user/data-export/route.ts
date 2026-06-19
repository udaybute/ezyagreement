/**
 * DPDP Data Export API
 * - User can download all their data
 * - Required by DPDP Act 2025 (Right to Access)
 * - Returns JSON with all user data
 */

import { NextResponse } from "next/server"
import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { logAuditEvent } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    // ── Auth check ───────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const adminSupabase = createAdminClient()

    // ── Fetch all user data ──────────────────────────────
    const [profile, documents, payments, clients] = await Promise.all([
      adminSupabase.from("profiles").select("*").eq("id", user.id).single(),
      adminSupabase.from("documents").select("*").eq("user_id", user.id),
      adminSupabase.from("payments").select("*").eq("user_id", user.id),
      adminSupabase.from("broker_clients").select("*").eq("broker_id", user.id),
    ])

    // ── Build export object ──────────────────────────────
    const exportData = {
      export_info: {
        exported_at: new Date().toISOString(),
        exported_by: user.email,
        purpose: "DPDP Act 2025 - Right to Access",
        note: "This is all data Elvatrixa Legal holds about you.",
      },
      profile: profile.data,
      documents: documents.data ?? [],
      payments: payments.data ?? [],
      broker_clients: clients.data ?? [],
    }

    // ── Log audit event ──────────────────────────────────
    await logAuditEvent(
      user.id,
      "DATA_EXPORTED",
      user.id,
      request
    )

    // ── Return as downloadable JSON ──────────────────────
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="elvatrixa-my-data-${Date.now()}.json"`,
      },
    })

  } catch (error) {
    console.error("Data export error:", error)
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500 }
    )
  }
}