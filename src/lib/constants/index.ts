export * from "./states"
export * from "./pricing"
export * from "./languages"

export const APP_NAME        = "Elvatrixa Legal"
export const APP_TAGLINE     = "Rental Agreements in 5 Minutes - Rs.199 Flat"
export const APP_DESCRIPTION = "India's first privacy-first, vernacular, instant-delivery legal document platform"
export const SUPPORT_EMAIL   = "support@elvatrixa.com"
export const FOUNDER_EMAIL   = "uday@elvatrixa.com"
export const COMPANY_NAME    = "Elvatrixa Pvt. Ltd."

export const DISCLAIMERS = {
  state_laws:       "Rental laws vary by state. Always verify with a local advocate.",
  mta_cap:          "The 2-month deposit cap applies ONLY in UP, Rajasthan, Kerala.",
  notarization:     "Notarization is OPTIONAL. NOT mandatory for 11-month agreements.",
  police_verif:     "Police verification is mandatory ONLY in Delhi, MH, KA, Hyderabad, Kolkata.",
  hra_tax:          "HRA exemption ONLY under OLD tax regime. PAN required if rent over Rs.3,000 per month.",
  not_legal_advice: "This is a drafting tool, NOT legal advice. Consult an advocate for disputes.",
  dpdp:             "DPDP Act 2025 compliant. Aadhaar optional and deleted after eSign.",
} as const