/**
 * API Route: Create Razorpay Order
 * Called before payment — creates order on Razorpay
 * Returns: order_id which is used by frontend to open payment modal
 */

import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { createClient } from "@/lib/db/server"
import { calculateTotal } from "@/lib/constants"

// ── Initialize Razorpay ──────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  try {
    // ── Check if user is logged in ───────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // ── Get plan type from request ───────────────────────────
    const { plan_type = "retail" } = await request.json()

    // ── Calculate amount ─────────────────────────────────────
    const amount = plan_type === "retail" ? 199 : 1499
    const { total } = calculateTotal(amount)

    // ── Create Razorpay order ────────────────────────────────
    const order = await razorpay.orders.create({
      amount: total * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `elv_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan_type,
      },
    })

    return NextResponse.json({ order })

  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}