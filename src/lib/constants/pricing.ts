export const PRICING = {
  retail_per_doc:       199,
  commercial_per_doc:   499,
  nri_per_doc:          999,
  broker_monthly:      1499,
  enterprise_monthly:  4999,
  ca_reseller_monthly: 2999,
  lawyer_review_addon:  499,
  police_verify_addon:  299,
  hra_receipt:            0,
  esign_cost:            12,
  gst_rate:            0.18,
} as const

export const PLANS = {
  retail: {
    id: "retail",
    name: "Pay Per Doc",
    price: 0,
    per_doc_price: 199,
    docs_per_month: 1,
    features: [
      "Instant PDF generation",
      "WhatsApp delivery",
      "eStamp integration",
      "eSign optional",
      "30-day cloud storage",
      "Hindi, Marathi and Tamil output",
    ],
  },
  broker: {
    id: "broker",
    name: "Broker Plan",
    price: 1499,
    per_doc_price: 0,
    docs_per_month: 20,
    features: [
      "20 docs per month",
      "Client management dashboard",
      "White-label WhatsApp branding",
      "Bulk generation",
      "Analytics and reports",
      "Priority support",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    per_doc_price: 0,
    docs_per_month: -1,
    features: [
      "Unlimited docs",
      "API access",
      "Custom clauses",
      "SLA guarantee",
      "Dedicated support",
      "Custom branding",
    ],
  },
  ca_reseller: {
    id: "ca_reseller",
    name: "CA Reseller",
    price: 2999,
    per_doc_price: 0,
    docs_per_month: -1,
    features: [
      "Unlimited docs",
      "White-label PDF with CA firm name",
      "Client portal",
      "GST invoice auto-gen",
      "CA dashboard",
      "Volume pricing",
    ],
  },
} as const

export function calculateTotal(amount: number) {
  const gst = Math.round(amount * 0.18)
  return { base: amount, gst, total: amount + gst }
}