/**
 * API Route: Verify Razorpay Payment
 * Called after payment — verifies signature to confirm payment is genuine
 * Saves payment record to database
 */

import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { logAuditEvent } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    // ── Check if user is logged in ───────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ── Get payment details from request ─────────────────────
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan_type,
      amount,
    } = await request.json()

    // ── Verify signature ─────────────────────────────────────
    // This confirms payment is genuine and not tampered
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // ── Save payment to database ─────────────────────────────
    const adminSupabase = createAdminClient()
    const gst = Math.round(amount * 0.18)

    await adminSupabase.from("payments").insert({
      user_id: user.id,
      plan_type,
      amount,
      gst_amount: gst,
      currency: "INR",
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
    })

    // ── Log audit event ──────────────────────────────────────
    await logAuditEvent(user.id, "PAYMENT_SUCCESS", razorpay_payment_id, request)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    )
  }
}