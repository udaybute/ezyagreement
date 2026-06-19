/**
 * Razorpay Webhook Handler
 * - Receives payment events from Razorpay
 * - Verifies signature to confirm authenticity
 * - Updates payment status in database
 * - DPDP: logs all payment events in audit log
 * 
 * this is pending please do it when you seen next time
 * 
 * Save karo → phir .env.local mein Razorpay webhook secret add karo:
Razorpay Dashboard → Settings → Webhooks → Add Webhook:

URL: https://yourdomain.com/api/webhooks/razorpay
Events: payment.captured, payment.failed, refund.created
Secret: koi bhi random string

Phir .env.local mein:
RAZORPAY_WEBHOOK_SECRET=tumhara_webhook_secret
 */

import { NextResponse } from "next/server"
import crypto from "crypto"
import { createAdminClient } from "@/lib/db/admin"
import { logAuditEvent } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    // ── Get raw body for signature verification ──────────
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      )
    }

    // ── Verify webhook signature ─────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    // ── Parse event ──────────────────────────────────────
    const event = JSON.parse(body)
    const adminSupabase = createAdminClient()

    // ── Handle different event types ─────────────────────
    switch (event.event) {

      case "payment.captured": {
        // Payment successful
        const payment = event.payload.payment.entity
        await adminSupabase
          .from("payments")
          .update({ status: "paid", razorpay_payment_id: payment.id })
          .eq("razorpay_order_id", payment.order_id)

        await logAuditEvent(
          null,
          "PAYMENT_SUCCESS",
          payment.id,
          request,
          { order_id: payment.order_id, amount: payment.amount }
        )
        break
      }

      case "payment.failed": {
        // Payment failed
        const payment = event.payload.payment.entity
        await adminSupabase
          .from("payments")
          .update({ status: "failed" })
          .eq("razorpay_order_id", payment.order_id)

        await logAuditEvent(
          null,
          "PAYMENT_FAILED",
          payment.id,
          request,
          { order_id: payment.order_id, error: payment.error_description }
        )
        break
      }

      case "refund.created": {
        // Refund issued
        const refund = event.payload.refund.entity
        await adminSupabase
          .from("payments")
          .update({ status: "refunded" })
          .eq("razorpay_payment_id", refund.payment_id)
        break
      }

      default:
        // Unknown event — ignore
        console.log("Unknown webhook event:", event.event)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}