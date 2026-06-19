/**
 * DPDP Data Delete API
 * - User can delete all their data
 * - Required by DPDP Act 2025 (Right to Erasure)
 * - Deletes: documents, broker clients, profile data
 * - Payment records kept for GST law compliance
 */

import { NextResponse } from "next/server"
import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { logAuditEvent } from "@/lib/utils"

export async function DELETE(request: Request) {
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

    // ── Log before deletion ──────────────────────────────
    await logAuditEvent(
      user.id,
      "DATA_DELETED",
      user.id,
      request,
      { email: user.email }
    )

    // ── Delete documents ─────────────────────────────────
    await adminSupabase
      .from("documents")
      .delete()
      .eq("user_id", user.id)

    // ── Delete broker clients ────────────────────────────
    await adminSupabase
      .from("broker_clients")
      .delete()
      .eq("broker_id", user.id)

    // ── Update profile — mark consent withdrawn ──────────
    // Note: We keep profile shell for GST payment records
    // But clear all PII data
    await adminSupabase
      .from("profiles")
      .update({
        full_name:            "Deleted User",
        phone:                null,
        state:                null,
        city:                 null,
        firm_name:            null,
        consent_withdrawn:    true,
        consent_withdrawn_at: new Date().toISOString(),
        consent_doc_generation: false,
        consent_esign:          false,
        consent_whatsapp:       false,
        consent_marketing:      false,
        updated_at:           new Date().toISOString(),
      })
      .eq("id", user.id)

    // ── Sign out user ────────────────────────────────────
    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message: "All your data has been deleted. You have been logged out.",
    })

  } catch (error) {
    console.error("Data delete error:", error)
    return NextResponse.json(
      { error: "Delete failed. Please email support@elvatrixa.com" },
      { status: 500 }
    )
  }
}