"use client"

/**
 * Payment Button Component
 * Opens Razorpay payment modal
 * Handles: order creation, payment, verification
 * Responsive: works on all screen sizes
 */

import { useState } from "react"

interface PaymentButtonProps {
  /** Amount in Rs (without GST) */
  amount: number
  /** Plan type for backend */
  planType?: string
  /** Text to show on button */
  label?: string
  /** Called after successful payment */
  onSuccess?: (paymentId: string) => void
}

export default function PaymentButton({
  amount,
  planType = "retail",
  label = "Pay Now",
  onSuccess,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  // ── Calculate GST ────────────────────────────────────────
  const gst = Math.round(amount * 0.18)
  const total = amount + gst

  async function handlePayment() {
    setLoading(true)

    try {
      // ── Step 1: Create order ─────────────────────────────
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_type: planType }),
      })
      const { order } = await orderRes.json()

      // ── Step 2: Open Razorpay modal ──────────────────────
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Elvatrixa Legal",
        description: "Rental Agreement Generation",
        order_id: order.id,
        // ── Step 3: Handle success ───────────────────────
        handler: async function (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) {
          // Verify payment on backend
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan_type: planType,
              amount,
            }),
          })

          const result = await verifyRes.json()
          if (result.success) {
            onSuccess?.(response.razorpay_payment_id)
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#1D4ED8", // Blue color matching our UI
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      // ── Open Razorpay checkout ───────────────────────────
      // @ts-ignore — Razorpay is loaded via CDN script
      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="btn-primary w-full text-base py-3"
    >
      {loading
        ? "Opening payment..."
        : `${label} — Rs. ${total} (incl. GST)`
      }
    </button>
  )
}