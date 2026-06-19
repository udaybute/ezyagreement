import { createAdminClient } from "@/lib/db/admin"
import { hashIP } from "./encrypt"

export type AuditEvent =
  | "DOC_CREATED"
  | "DOC_VIEWED"
  | "DOC_DOWNLOADED"
  | "DOC_SIGNED"
  | "CONSENT_GIVEN"
  | "CONSENT_WITHDRAWN"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "DATA_EXPORTED"
  | "DATA_DELETED"
  | "LOGIN"
  | "LOGOUT"

export async function logAuditEvent(
  userId: string | null,
  event: AuditEvent,
  resourceId?: string,
  request?: Request,
  metadata?: Record<string, unknown>
) {
  try {
    const ip = request?.headers.get("x-forwarded-for") ?? "unknown"
    const ua = request?.headers.get("user-agent") ?? "unknown"
    const supabase = createAdminClient()
    await supabase.from("audit_logs").insert({
      user_id: userId,
      event_type: event,
      resource_id: resourceId,
      ip_hash: hashIP(ip),
      user_agent_hash: hashIP(ua),
      metadata,
    })
  } catch (error) {
    console.error("Audit log failed:", error)
  }
}