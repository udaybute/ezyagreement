/**
 * Cron Job: Delete Expired Documents
 * - Runs daily via Vercel Cron
 * - Deletes documents older than 30 days
 * - DPDP Act 2025: data minimisation requirement
 * - Protected by CRON_SECRET
 */

import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/db/admin"

export async function GET(request: Request) {
  try {
    // ── Verify cron secret ───────────────────────────────
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const adminSupabase = createAdminClient()
    const now = new Date().toISOString()

    // ── Delete expired documents ─────────────────────────
    const { data: deleted, error } = await adminSupabase
      .from("documents")
      .delete()
      .lt("delete_after", now)
      .neq("status", "signed") // Keep signed documents
      .select("id")

    if (error) {
      console.error("Cron delete error:", error)
      return NextResponse.json(
        { error: "Delete failed" },
        { status: 500 }
      )
    }

    const count = deleted?.length ?? 0
    console.log(`Cron: Deleted ${count} expired documents`)

    return NextResponse.json({
      success: true,
      deleted_count: count,
      ran_at: now,
    })

  } catch (error) {
    console.error("Cron error:", error)
    return NextResponse.json(
      { error: "Cron job failed" },
      { status: 500 }
    )
  }
}