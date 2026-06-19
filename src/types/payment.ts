export type PlanType = "retail" | "broker" | "enterprise" | "ca_reseller"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export interface Payment {
  id: string
  user_id: string
  agreement_id?: string
  plan_type: PlanType
  amount: number
  gst_amount: number
  currency: "INR"
  razorpay_order_id: string
  razorpay_payment_id?: string
  status: PaymentStatus
  invoice_url?: string
  created_at: string
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
}