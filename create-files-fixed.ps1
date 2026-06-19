# ============================================================
#  ELVATRIXA LEGAL — Create All Files
#  Run: Right-click → Run with PowerShell
#  OR in VS Code terminal: .\create-files.ps1
# ============================================================

$ErrorActionPreference = "Continue"
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host "   ELVATRIXA LEGAL - Creating All Files..." -ForegroundColor Cyan
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host ""

# ── Helper function ──────────────────────────────────────────
function Write-File($path, $content) {
    $dir = Split-Path $path -Parent
    if ($dir -and !(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  + $path" -ForegroundColor Green
}

# ════════════════════════════════════════════════════════════
#  1. ROOT CONFIG FILES
# ════════════════════════════════════════════════════════════
Write-Host "[1/10] Root config files..." -ForegroundColor Yellow

Write-File "next.config.mjs" @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
'@

Write-File ".env.example" @'
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Elvatrixa Legal

# Supabase (India region - ap-south-1)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# Setu eSign API
SETU_CLIENT_ID=your-setu-client-id
SETU_CLIENT_SECRET=your-setu-client-secret
SETU_BASE_URL=https://dg-sandbox.setu.co

# SHCIL eStamp
SHCIL_API_KEY=your-shcil-api-key

# WhatsApp (Gupshup)
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_APP_ID=your-app-id

# Claude AI (clause explainer)
ANTHROPIC_API_KEY=your-claude-api-key

# Resend (email)
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@elvatrixa.com

# Security - generate random 32-char strings
ENCRYPTION_KEY=generate-a-random-32-character-string
AUDIT_LOG_SECRET=generate-another-random-secret

# Admin
ADMIN_EMAIL=uday@elvatrixa.com
CRON_SECRET=your-cron-secret
'@

Write-File ".env.local" @'
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Elvatrixa Legal

# Supabase - fill after creating project at supabase.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Razorpay - fill after creating account at razorpay.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# Setu eSign - sandbox keys from setu.co
SETU_CLIENT_ID=your-setu-client-id
SETU_CLIENT_SECRET=your-setu-client-secret
SETU_BASE_URL=https://dg-sandbox.setu.co

# Claude AI - from console.anthropic.com
ANTHROPIC_API_KEY=your-claude-api-key

# Security - change these to any random 32-char string
ENCRYPTION_KEY=change-this-to-random-32-chars!!
AUDIT_LOG_SECRET=change-this-to-another-secret!!

# Admin
ADMIN_EMAIL=uday@elvatrixa.com
CRON_SECRET=your-cron-secret
'@

Write-File "README.md" @'
# Elvatrixa Legal

> India's first privacy-first, vernacular, instant-delivery legal document platform.

**Founder:** Uday Bute | **Company:** Elvatrixa Pvt. Ltd.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres, Mumbai region)
- **Auth:** Supabase Auth (OTP only)
- **Payments:** Razorpay
- **eSign:** Setu API
- **eStamp:** SHCIL API (27 states)
- **WhatsApp:** Gupshup Business API
- **AI:** Claude API (clause explainer)
- **PDF:** PDFKit (server-side only)
- **Hosting:** Vercel + Supabase (India region)

## Getting Started
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Key Features
- State-specific rental agreements (28 states)
- Rs.199 flat pricing - instant PDF + WhatsApp delivery
- Hindi / Marathi / Tamil output
- DPDP Act 2025 compliant from Day 1
- Zero Aadhaar storage
- Free HRA rent receipt generator
- Broker B2B dashboard
'@

# ════════════════════════════════════════════════════════════
#  2. STYLES
# ════════════════════════════════════════════════════════════
Write-Host "[2/10] Styles..." -ForegroundColor Yellow

Write-File "src/app/globals.css" @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-gray-900 antialiased;
  }
  .font-devanagari {
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium
           hover:bg-blue-800 transition-colors duration-150 disabled:opacity-50;
  }
  .btn-secondary {
    @apply border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg
           font-medium hover:bg-gray-50 transition-colors duration-150;
  }
  .btn-danger {
    @apply bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium
           hover:bg-red-700 transition-colors duration-150;
  }
  .card {
    @apply bg-white border border-gray-200 rounded-xl p-6 shadow-sm;
  }
  .input {
    @apply w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
           disabled:bg-gray-50 disabled:text-gray-500;
  }
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  .badge-green  { @apply badge bg-green-100 text-green-800; }
  .badge-blue   { @apply badge bg-blue-100 text-blue-800; }
  .badge-amber  { @apply badge bg-amber-100 text-amber-800; }
  .badge-red    { @apply badge bg-red-100 text-red-800; }
  .badge-gray   { @apply badge bg-gray-100 text-gray-800; }
}
'@

# ════════════════════════════════════════════════════════════
#  3. TYPESCRIPT TYPES
# ════════════════════════════════════════════════════════════
Write-Host "[3/10] TypeScript types..." -ForegroundColor Yellow

Write-File "src/types/agreement.ts" @'
// ─── Agreement Types ─────────────────────────────────────────

export type DocumentType =
  | "rental_agreement"
  | "commercial_lease"
  | "noc"
  | "affidavit"
  | "rent_receipt"
  | "termination_notice"
  | "renewal_notice"

export type AgreementStatus =
  | "draft"
  | "generated"
  | "sent"
  | "signed"
  | "expired"

export type Language = "en" | "hi" | "mr" | "ta"

export type PropertyType = "residential" | "commercial" | "pg"

export type FurnishingType = "furnished" | "semi-furnished" | "unfurnished"

export type IdType =
  | "pan"
  | "voter_id"
  | "passport"
  | "driving_licence"
  | "aadhaar_last4" // NEVER store full Aadhaar — DPDP compliance

export interface Party {
  name: string
  address: string
  phone: string
  email?: string
  id_type: IdType
  id_number: string // masked/last4 only for Aadhaar
}

export interface AgreementFormData {
  // Parties
  landlord: Party
  tenant: Party
  // Property
  property_address: string
  property_type: PropertyType
  furnished: FurnishingType
  // Financial
  monthly_rent: number
  security_deposit: number
  advance_payment?: number
  maintenance_charges?: number
  // Dates
  start_date: string
  duration_months: number
  // Terms
  notice_period_days: number
  lock_in_months?: number
  // Utilities
  electricity_payer: "tenant" | "landlord"
  water_payer: "tenant" | "landlord"
  // Extra
  special_conditions?: string
}

export interface RentalAgreement {
  id: string
  user_id: string
  ref_number: string
  document_type: DocumentType
  state: string
  city: string
  language: Language
  status: AgreementStatus
  data: AgreementFormData
  pdf_path?: string
  signed_pdf_path?: string
  stamp_duty_amount?: number
  estamp_id?: string
  esign_id?: string
  whatsapp_sent: boolean
  created_at: string
  updated_at: string
  expires_at?: string
  delete_after: string // DPDP: auto-delete after 30 days
}
'@

Write-File "src/types/user.ts" @'
// ─── User Types ───────────────────────────────────────────────

export type UserRole = "retail" | "broker" | "ca" | "admin"

export interface ConsentRecord {
  doc_generation: boolean
  esign: boolean
  whatsapp: boolean
  marketing: boolean
  given_at: string
}

export interface UserProfile {
  id: string
  email: string
  phone?: string
  full_name: string
  role: UserRole
  // Broker / CA specific
  firm_name?: string
  gstin?: string
  // Location
  state: string
  city: string
  // DPDP consent — required
  consent: ConsentRecord
  consent_withdrawn: boolean
  consent_withdrawn_at?: string
  // Stats
  documents_count: number
  created_at: string
  updated_at: string
}

export interface BrokerClient {
  id: string
  broker_id: string
  name: string
  phone: string
  email?: string
  state: string
  city: string
  notes?: string
  created_at: string
}
'@

Write-File "src/types/payment.ts" @'
// ─── Payment Types ────────────────────────────────────────────

export type PlanType =
  | "retail"
  | "broker"
  | "enterprise"
  | "ca_reseller"

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"

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
'@

Write-File "src/types/state.ts" @'
// ─── State Config Types ───────────────────────────────────────

export type RegistrationRequirement =
  | "all"              // Maharashtra — even 11-month must register
  | "above_11_months"  // Most states
  | "not_required"

export type StampDutyType =
  | "percentage_annual_rent"
  | "percentage_total_rent"
  | "flat"
  | "area_based"

export interface StampDutyFormula {
  type: StampDutyType
  rate: number
  min_amount: number
  notes?: string
}

export interface StateConfig {
  code: string
  name: string
  name_hi: string
  name_mr?: string
  name_ta?: string
  governing_act: string
  mta_adopted: boolean            // Model Tenancy Act 2021
  deposit_cap_months?: number     // Only MTA states: UP, RJ, KL
  registration_required: RegistrationRequirement
  police_verification_required: boolean
  police_verification_portal?: string
  stamp_duty_formula: StampDutyFormula
  estamp_available: boolean
  estamp_portal?: string
  online_registration: boolean    // Only Maharashtra = true
  major_cities: string[]
}
'@

Write-File "src/types/index.ts" @'
// ─── Export all types from one place ─────────────────────────
// Usage: import { RentalAgreement, UserProfile } from "@/types"

export * from "./agreement"
export * from "./user"
export * from "./payment"
export * from "./state"
'@

# ════════════════════════════════════════════════════════════
#  4. CONSTANTS
# ════════════════════════════════════════════════════════════
Write-Host "[4/10] Constants (states, pricing)..." -ForegroundColor Yellow

Write-File "src/lib/constants/states.ts" @'
import type { StateConfig } from "@/types"

// ─── All States Data ──────────────────────────────────────────
// IMPORTANT: MTA 2021 adopted by ONLY 3-4 states — NOT nationwide
// Source: State Rent Control Acts + official government records

export const STATES: StateConfig[] = [
  // ── TIER 1: High volume states ────────────────────────────
  {
    code: "MH",
    name: "Maharashtra",
    name_hi: "महाराष्ट्र",
    name_mr: "महाराष्ट्र",
    governing_act: "Maharashtra Rent Control Act 1999",
    mta_adopted: false,
    registration_required: "all", // UNIQUE — even 11-month needs registration
    police_verification_required: true,
    police_verification_portal: "https://tenant.mahapolice.gov.in",
    stamp_duty_formula: { type: "percentage_total_rent", rate: 0.25, min_amount: 100 },
    estamp_available: true,
    estamp_portal: "https://gras.mahakosh.gov.in",
    online_registration: true, // ONLY state with full online registration
    major_cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur"],
  },
  {
    code: "KA",
    name: "Karnataka",
    name_hi: "कर्नाटक",
    governing_act: "Karnataka Rent Act 1999",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: true,
    police_verification_portal: "https://ksaps.karnataka.gov.in",
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 0.5, min_amount: 500 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum", "Dharwad"],
  },
  {
    code: "DL",
    name: "Delhi",
    name_hi: "दिल्ली",
    governing_act: "Delhi Rent Control Act 1958",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: true,
    police_verification_portal: "https://delhipolice.gov.in/tenant-verification",
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 2, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["New Delhi", "Dwarka", "Rohini", "Janakpuri", "Saket"],
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    name_hi: "तमिलनाडु",
    name_ta: "தமிழ்நாடு",
    governing_act: "Tamil Nadu Rent Control Act 1960",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 1, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  },
  // ── MTA STATES — 2-month deposit cap applies here ONLY ───
  {
    code: "UP",
    name: "Uttar Pradesh",
    name_hi: "उत्तर प्रदेश",
    governing_act: "UP Rent Control Act 2021",
    mta_adopted: true,
    deposit_cap_months: 2,
    registration_required: "above_11_months",
    police_verification_required: true,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 4, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad"],
  },
  {
    code: "RJ",
    name: "Rajasthan",
    name_hi: "राजस्थान",
    governing_act: "Rajasthan Rent Control Act 2001",
    mta_adopted: true,
    deposit_cap_months: 2,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 6, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  },
  {
    code: "KL",
    name: "Kerala",
    name_hi: "केरल",
    governing_act: "Kerala Rent Control Act 1999",
    mta_adopted: true,
    deposit_cap_months: 2,
    registration_required: "above_11_months",
    police_verification_required: true,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 0.25, min_amount: 200 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  },
  // ── OTHER MAJOR STATES ─────────────────────────────────────
  {
    code: "TS",
    name: "Telangana",
    name_hi: "तेलंगाना",
    governing_act: "Telangana Rent Control Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: true,
    police_verification_portal: "https://hyderabadpolice.gov.in",
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 4, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  },
  {
    code: "GJ",
    name: "Gujarat",
    name_hi: "गुजरात",
    governing_act: "Gujarat Rent Control Act 1999",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 4.9, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  },
  {
    code: "WB",
    name: "West Bengal",
    name_hi: "पश्चिम बंगाल",
    governing_act: "West Bengal Rent Control Act 1997",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: true,
    police_verification_portal: "https://kolkatapolice.gov.in",
    stamp_duty_formula: { type: "percentage_total_rent", rate: 5.5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  },
  {
    code: "AP",
    name: "Andhra Pradesh",
    name_hi: "आंध्र प्रदेश",
    governing_act: "Andhra Pradesh Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 0.5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  },
  {
    code: "HR",
    name: "Haryana",
    name_hi: "हरियाणा",
    governing_act: "Haryana Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "area_based", rate: 6, min_amount: 100, notes: "5-7% based on area" },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Gurugram", "Faridabad", "Panchkula", "Ambala", "Rohtak"],
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    name_hi: "मध्य प्रदेश",
    governing_act: "Madhya Pradesh Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 8, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  },
  {
    code: "PB",
    name: "Punjab",
    name_hi: "पंजाब",
    governing_act: "Punjab Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "area_based", rate: 6, min_amount: 100, notes: "5-7% gender-based" },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Ludhiana", "Amritsar", "Chandigarh", "Jalandhar", "Patiala"],
  },
  {
    code: "BR",
    name: "Bihar",
    name_hi: "बिहार",
    governing_act: "Bihar Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 6, min_amount: 100 },
    estamp_available: false, // Bihar — no eStamp, manual stamp paper only
    online_registration: false,
    major_cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  },
  {
    code: "OD",
    name: "Odisha",
    name_hi: "ओडिशा",
    governing_act: "Odisha Rent Control Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Bhubaneswar", "Cuttack", "Rourkela"],
  },
  {
    code: "AS",
    name: "Assam",
    name_hi: "असम",
    governing_act: "Assam Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_total_rent", rate: 8.25, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Guwahati", "Silchar", "Dibrugarh"],
  },
  {
    code: "JH",
    name: "Jharkhand",
    name_hi: "झारखंड",
    governing_act: "Jharkhand Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  },
  {
    code: "CG",
    name: "Chhattisgarh",
    name_hi: "छत्तीसगढ़",
    governing_act: "Chhattisgarh Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Raipur", "Bhilai", "Bilaspur"],
  },
  {
    code: "UK",
    name: "Uttarakhand",
    name_hi: "उत्तराखंड",
    governing_act: "Uttarakhand Rent Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Dehradun", "Haridwar", "Roorkee", "Nainital"],
  },
  {
    code: "HP",
    name: "Himachal Pradesh",
    name_hi: "हिमाचल प्रदेश",
    governing_act: "HP Rent Control Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Shimla", "Dharamsala", "Manali", "Solan"],
  },
  {
    code: "GA",
    name: "Goa",
    name_hi: "गोवा",
    governing_act: "Goa Rent Control Act",
    mta_adopted: false,
    registration_required: "above_11_months",
    police_verification_required: false,
    stamp_duty_formula: { type: "percentage_annual_rent", rate: 3, min_amount: 100 },
    estamp_available: true,
    online_registration: false,
    major_cities: ["Panaji", "Margao", "Vasco", "Mapusa"],
  },
]

// ─── Helper functions ──────────────────────────────────────────
export const getStateByCode = (code: string) =>
  STATES.find((s) => s.code === code)

export const getStateByName = (name: string) =>
  STATES.find((s) => s.name.toLowerCase() === name.toLowerCase())

export const MTA_STATES = STATES
  .filter((s) => s.mta_adopted)
  .map((s) => s.code)

export const POLICE_VERIFICATION_STATES = STATES
  .filter((s) => s.police_verification_required)
  .map((s) => s.code)

export const ESTAMP_STATES = STATES
  .filter((s) => s.estamp_available)
  .map((s) => s.code)
'@

Write-File "src/lib/constants/pricing.ts" @'
// ─── Pricing Constants ────────────────────────────────────────

export const PRICING = {
  // Pay per doc
  retail_per_doc:       199,  // residential
  commercial_per_doc:   499,  // commercial lease
  nri_per_doc:          999,  // NRI users
  // Subscriptions (monthly)
  broker_monthly:      1499,  // 20 docs/month
  enterprise_monthly:  4999,  // unlimited
  ca_reseller_monthly: 2999,  // CA white-label plan
  // Add-ons (per doc)
  lawyer_review_addon:  499,
  police_verify_addon:  299,  // MH/DL/KA only
  // Free (loss leaders)
  hra_receipt:            0,  // FREE — drives upsell
  // Internal costs
  esign_cost:            12,  // Setu API cost per verification
  gst_rate:            0.18,  // 18% GST on all services
} as const

export const PLANS = {
  retail: {
    id: "retail",
    name: "Pay Per Doc",
    name_hi: "प्रति दस्तावेज़",
    price: 0,
    per_doc_price: PRICING.retail_per_doc,
    docs_per_month: 1,
    features: [
      "Instant PDF generation",
      "WhatsApp delivery",
      "eStamp integration",
      "eSign (optional)",
      "30-day cloud storage",
      "Hindi/Marathi output",
    ],
  },
  broker: {
    id: "broker",
    name: "Broker Plan",
    name_hi: "ब्रोकर प्लान",
    price: PRICING.broker_monthly,
    per_doc_price: 0,
    docs_per_month: 20,
    features: [
      "20 docs/month",
      "Client management dashboard",
      "White-label WhatsApp branding",
      "Bulk generation",
      "Analytics & reports",
      "Priority support",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    name_hi: "एंटरप्राइज",
    price: PRICING.enterprise_monthly,
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
    name_hi: "CA रिसेलर",
    price: PRICING.ca_reseller_monthly,
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

// Calculate total amount with GST
export function calculateTotal(amount: number): {
  base: number
  gst: number
  total: number
} {
  const gst = Math.round(amount * PRICING.gst_rate)
  return { base: amount, gst, total: amount + gst }
}
'@

Write-File "src/lib/constants/languages.ts" @'
// ─── Language Constants ───────────────────────────────────────

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", native: "English"  },
  { code: "hi", name: "Hindi",   native: "हिंदी"    },
  { code: "mr", name: "Marathi", native: "मराठी"    },
  { code: "ta", name: "Tamil",   native: "தமிழ்"    },
] as const

export type SupportedLocale = "en" | "hi" | "mr" | "ta"
'@

Write-File "src/lib/constants/index.ts" @'
// ─── Export all constants from one place ──────────────────────
// Usage: import { STATES, PRICING, APP_NAME } from "@/lib/constants"

export * from "./states"
export * from "./pricing"
export * from "./languages"

// App info
export const APP_NAME        = "Elvatrixa Legal"
export const APP_TAGLINE     = "Rental Agreements in 5 Minutes — Rs.199 Flat"
export const APP_DESCRIPTION = "India's first privacy-first, vernacular, instant-delivery legal document platform"
export const SUPPORT_EMAIL   = "support@elvatrixa.com"
export const FOUNDER_EMAIL   = "uday@elvatrixa.com"
export const COMPANY_NAME    = "Elvatrixa Pvt. Ltd."

// Legal disclaimers — must appear on all pages + PDF footer
export const DISCLAIMERS = {
  state_laws:       "Rental laws vary by state. This tool generates agreements based on YOUR STATE's current laws. Always verify with a local advocate.",
  mta_cap:          "The 2-month security deposit cap applies ONLY in states that adopted MTA 2021 (UP, Rajasthan, Kerala). Most states have NO cap.",
  notarization:     "Notarization is OPTIONAL nationwide. NOT mandatory for 11-month agreements.",
  police_verif:     "Police verification is mandatory only in Delhi, Maharashtra, Karnataka, Hyderabad, and Kolkata.",
  hra_tax:          "HRA exemption is available ONLY under the OLD tax regime. PAN required if rent > Rs.3,000/month.",
  not_legal_advice: "This is a drafting tool, NOT legal advice. Consult a qualified advocate for disputes.",
  dpdp:             "DPDP Act 2025 compliant. Aadhaar is optional and deleted after eSign. Zero Aadhaar storage.",
} as const
'@

# ════════════════════════════════════════════════════════════
#  5. DATABASE CLIENTS
# ════════════════════════════════════════════════════════════
Write-Host "[5/10] Database clients..." -ForegroundColor Yellow

Write-File "src/lib/db/client.ts" @'
import { createBrowserClient } from "@supabase/ssr"

// Client-side Supabase client
// Use in: React components, client hooks
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
'@

Write-File "src/lib/db/server.ts" @'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Server-side Supabase client
// Use in: Server Components, API routes, Server Actions
export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — safely ignore
          }
        },
      },
    }
  )
}
'@

Write-File "src/lib/db/admin.ts" @'
import { createClient } from "@supabase/supabase-js"

// Admin Supabase client — bypasses RLS
// Use ONLY in: API routes, cron jobs, webhooks
// NEVER use in client components or expose to browser
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
'@

Write-File "src/lib/db/index.ts" @'
// Supabase client exports
// Client-side: import { createClient } from "@/lib/db/client"
// Server-side: import { createClient } from "@/lib/db/server"
// Admin:       import { createAdminClient } from "@/lib/db/admin"
export { createClient } from "./client"
'@

# ════════════════════════════════════════════════════════════
#  6. UTILITY FUNCTIONS
# ════════════════════════════════════════════════════════════
Write-Host "[6/10] Utility functions..." -ForegroundColor Yellow

Write-File "src/lib/utils/stamp-duty.ts" @'
import { getStateByCode } from "@/lib/constants"

// ─── Stamp Duty Calculator ────────────────────────────────────
// Calculates correct stamp duty per state formula
// Source: Official state stamp duty portals

export function calculateStampDuty(
  stateCode: string,
  monthlyRent: number,
  durationMonths: number,
  securityDeposit: number
): number {
  const state = getStateByCode(stateCode)
  if (!state) return 0

  const { stamp_duty_formula: f } = state
  const annualRent = monthlyRent * 12
  const totalRent  = monthlyRent * durationMonths

  let duty = 0
  switch (f.type) {
    case "percentage_annual_rent":
      duty = (annualRent * f.rate) / 100
      break
    case "percentage_total_rent":
      duty = ((totalRent + securityDeposit) * f.rate) / 100
      break
    case "flat":
      duty = f.rate
      break
    case "area_based":
      duty = (annualRent * f.rate) / 100
      break
  }

  return Math.max(Math.round(duty), f.min_amount)
}

// Check if security deposit exceeds MTA cap
// Only applicable in UP, Rajasthan, Kerala
export function isDepositExceedingCap(
  stateCode: string,
  monthlyRent: number,
  securityDeposit: number
): boolean {
  const state = getStateByCode(stateCode)
  if (!state?.deposit_cap_months) return false
  return securityDeposit > (monthlyRent * state.deposit_cap_months)
}
'@

Write-File "src/lib/utils/encrypt.ts" @'
import { createHash, createCipheriv, createDecipheriv, randomBytes } from "crypto"

// ─── AES-256-GCM Encryption ───────────────────────────────────
// Used for encrypting PII fields before storing in database
// DPDP compliance: encrypt name, phone, address

const ALGO = "aes-256-gcm"

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY
  if (!key) throw new Error("ENCRYPTION_KEY not set in .env.local")
  return Buffer.from(key, "utf8").slice(0, 32)
}

export function encrypt(plaintext: string): string {
  const iv = randomBytes(16)
  const cipher = createCipheriv(ALGO, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`
}

export function decrypt(ciphertext: string): string {
  const [ivHex, tagHex, encHex] = ciphertext.split(":")
  if (!ivHex || !tagHex || !encHex) throw new Error("Invalid ciphertext format")
  const decipher = createDecipheriv(ALGO, getKey(), Buffer.from(ivHex, "hex"))
  decipher.setAuthTag(Buffer.from(tagHex, "hex"))
  return (
    decipher.update(Buffer.from(encHex, "hex")).toString("utf8") +
    decipher.final("utf8")
  )
}

// Hash IP address for audit logs
// DPDP: never store raw IPs — only hashed versions
export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16)
}
'@

Write-File "src/lib/utils/audit.ts" @'
import { createAdminClient } from "@/lib/db/admin"
import { hashIP } from "./encrypt"

// ─── Audit Event Types ────────────────────────────────────────
// DPDP compliance: log all data access and consent events
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
    // Never let audit logging crash the app
    console.error("Audit log failed:", error)
  }
}
'@

Write-File "src/lib/utils/format.ts" @'
// ─── Format Utilities ─────────────────────────────────────────

// Format amount in Indian Rupees
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format date for display
export function formatDate(date: string, locale = "en-IN"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Mask Aadhaar — only keep last 4 digits
// DPDP compliance: never store or display full Aadhaar
export function maskAadhaar(aadhaar: string): string {
  return "XXXX-XXXX-" + aadhaar.slice(-4)
}

// Generate agreement reference number
export function generateRefNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ELV-${year}-${random}`
}

// Truncate long text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Convert number to words (for legal documents)
export function numberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
  if (num === 0) return "Zero"
  if (num < 20) return ones[num]
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
  if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numberToWords(num % 100) : "")
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "")
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numberToWords(num % 100000) : "")
  return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numberToWords(num % 10000000) : "")
}
'@

Write-File "src/lib/utils/index.ts" @'
// ─── Export all utilities ─────────────────────────────────────
export * from "./stamp-duty"
export * from "./encrypt"
export * from "./audit"
export * from "./format"
'@

# ════════════════════════════════════════════════════════════
#  7. APP LAYOUT + ROOT PAGES
# ════════════════════════════════════════════════════════════
Write-Host "[7/10] App layout and pages..." -ForegroundColor Yellow

Write-File "src/app/layout.tsx" @'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Elvatrixa Legal — Rental Agreement Rs.199 | Instant PDF",
    template: "%s | Elvatrixa Legal",
  },
  description:
    "Generate state-specific rental agreements in 5 minutes. Rs.199 flat. Instant PDF + WhatsApp delivery. Hindi/Marathi output. DPDP-compliant. Zero Aadhaar storage.",
  keywords: [
    "rental agreement",
    "rent agreement online",
    "rent agreement Maharashtra",
    "rental agreement format",
    "stamp duty calculator",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Elvatrixa Legal",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
'@

Write-File "src/app/page.tsx" @'
// Homepage — TODO: Replace with full marketing page
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-blue-700 font-semibold text-sm mb-3">
          India&apos;s First Privacy-First Legal Document Platform
        </p>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Elvatrixa Legal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Rental Agreements in 5 Minutes — Rs.199 Flat
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/agreements/new" className="btn-primary">
            Generate Agreement
          </a>
          <a href="/pricing" className="btn-secondary">
            View Pricing
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          DPDP Act 2025 Compliant · Zero Aadhaar Storage · 28 States Covered
        </p>
      </div>
    </main>
  )
}
'@

Write-File "src/app/not-found.tsx" @'
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-blue-700">404</h1>
      <p className="mt-3 text-xl text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-400">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="mt-8 btn-primary">
        Go to Homepage
      </a>
    </div>
  )
}
'@

Write-File "src/app/robots.ts" @'
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}
'@

# ════════════════════════════════════════════════════════════
#  8. PLACEHOLDER PAGES
# ════════════════════════════════════════════════════════════
Write-Host "[8/10] Placeholder pages..." -ForegroundColor Yellow

$pages = @{
  "src/app/(auth)/login/page.tsx"                     = @("Login", "Build OTP login - no passwords")
  "src/app/(auth)/register/page.tsx"                  = @("Register", "Build registration with DPDP consent")
  "src/app/(auth)/verify/page.tsx"                    = @("Verify OTP", "Build OTP verification")
  "src/app/(auth)/onboarding/page.tsx"                = @("Onboarding", "Build user onboarding — collect name, state, role")
  "src/app/(app)/dashboard/page.tsx"                  = @("Dashboard", "Build main dashboard with recent docs")
  "src/app/(app)/agreements/new/page.tsx"             = @("New Agreement", "Build 5-step agreement wizard")
  "src/app/(app)/agreements/new/rental/page.tsx"      = @("New Rental Agreement", "Build rental agreement form")
  "src/app/(app)/agreements/new/commercial/page.tsx"  = @("New Commercial Lease", "Build commercial lease form")
  "src/app/(app)/agreements/new/noc/page.tsx"         = @("New NOC", "Build NOC generator")
  "src/app/(app)/broker/dashboard/page.tsx"           = @("Broker Dashboard", "Build broker client management")
  "src/app/(app)/broker/clients/page.tsx"             = @("Broker Clients", "Build client list and management")
  "src/app/(app)/broker/reports/page.tsx"             = @("Broker Reports", "Build usage analytics and reports")
  "src/app/(app)/receipts/new/page.tsx"               = @("HRA Receipt Generator", "Build free HRA receipt generator")
  "src/app/(app)/billing/plans/page.tsx"              = @("Billing Plans", "Build plan upgrade page")
  "src/app/(app)/billing/history/page.tsx"            = @("Payment History", "Build payment history with GST invoices")
  "src/app/(app)/settings/privacy/page.tsx"           = @("Privacy Settings", "Build DPDP data export and delete")
  "src/app/(app)/settings/account/page.tsx"           = @("Account Settings", "Build profile edit")
  "src/app/(marketing)/pricing/page.tsx"              = @("Pricing", "Build pricing comparison page")
  "src/app/(marketing)/blog/page.tsx"                 = @("Blog", "Build blog listing page")
  "src/app/(marketing)/hra-receipt/page.tsx"          = @("Free HRA Receipt", "Build public HRA receipt generator")
  "src/app/(marketing)/stamp-duty-calculator/page.tsx"= @("Stamp Duty Calculator", "Build stamp duty calculator")
  "src/app/(marketing)/police-verification/page.tsx"  = @("Police Verification Guide", "Build police verification guide")
  "src/app/(marketing)/about/page.tsx"                = @("About", "Build about page")
  "src/app/(marketing)/contact/page.tsx"              = @("Contact", "Build contact page")
}

foreach ($path in $pages.Keys) {
  $title = $pages[$path][0]
  $todo  = $pages[$path][1]
  Write-File $path @"
// TODO: $todo
export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900">$title</h1>
      <p className="text-gray-500 mt-2">$todo</p>
    </div>
  )
}
"@
}

# ════════════════════════════════════════════════════════════
#  9. SUPABASE MIGRATION
# ════════════════════════════════════════════════════════════
Write-Host "[9/10] Supabase migration..." -ForegroundColor Yellow

Write-File "supabase/migrations/001_initial_schema.sql" @'
-- ════════════════════════════════════════════════════════════
-- Elvatrixa Legal - Initial Database Schema
-- DPDP Act 2025 Compliant
-- Run this in: Supabase Dashboard > SQL Editor
-- ════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ── Profiles ──────────────────────────────────────────────────
create table public.profiles (
  id                     uuid references auth.users on delete cascade primary key,
  email                  text not null,
  phone                  text,
  full_name              text not null,
  role                   text default 'retail'
                         check (role in ('retail','broker','ca','admin')),
  firm_name              text,
  gstin                  text,
  state                  text,
  city                   text,
  -- DPDP consent (required)
  consent_doc_generation boolean default false,
  consent_esign          boolean default false,
  consent_whatsapp       boolean default false,
  consent_marketing      boolean default false,
  consent_given_at       timestamptz,
  consent_withdrawn      boolean default false,
  consent_withdrawn_at   timestamptz,
  -- Stats
  documents_count        integer default 0,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- ── Documents ─────────────────────────────────────────────────
create table public.documents (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  ref_number        text unique,
  document_type     text not null,
  state_code        text not null,
  city              text,
  language          text default 'en',
  status            text default 'draft',
  form_data         jsonb,        -- PII fields encrypted at app level
  pdf_path          text,         -- Supabase Storage path
  signed_pdf_path   text,
  stamp_duty_amount numeric,
  estamp_id         text,
  esign_id          text,
  whatsapp_sent     boolean default false,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  expires_at        timestamptz,
  delete_after      timestamptz default (now() + interval '30 days')
);

-- ── Payments ──────────────────────────────────────────────────
create table public.payments (
  id                    uuid default gen_random_uuid() primary key,
  user_id               uuid references public.profiles(id) not null,
  document_id           uuid references public.documents(id),
  plan_type             text not null,
  amount                numeric not null,
  gst_amount            numeric not null default 0,
  currency              text default 'INR',
  razorpay_order_id     text unique,
  razorpay_payment_id   text,
  status                text default 'pending',
  invoice_url           text,
  created_at            timestamptz default now()
);

-- ── Audit Logs (APPEND-ONLY — never delete rows) ──────────────
create table public.audit_logs (
  id              bigserial primary key,
  user_id         uuid,
  event_type      text not null,
  resource_id     text,
  ip_hash         text,
  user_agent_hash text,
  metadata        jsonb,
  created_at      timestamptz default now()
);

-- ── Consent Records ───────────────────────────────────────────
create table public.consent_records (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references public.profiles(id),
  event       text not null,
  purposes    jsonb,
  ip_hash     text,
  created_at  timestamptz default now()
);

-- ── Broker Clients ────────────────────────────────────────────
create table public.broker_clients (
  id          uuid default gen_random_uuid() primary key,
  broker_id   uuid references public.profiles(id) on delete cascade not null,
  name        text not null,
  phone       text,
  email       text,
  state       text,
  city        text,
  notes       text,
  created_at  timestamptz default now()
);

-- ── Enable Row Level Security ─────────────────────────────────
alter table public.profiles        enable row level security;
alter table public.documents       enable row level security;
alter table public.payments        enable row level security;
alter table public.audit_logs      enable row level security;
alter table public.consent_records enable row level security;
alter table public.broker_clients  enable row level security;

-- ── RLS Policies ──────────────────────────────────────────────
create policy "Users view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users view own documents"
  on public.documents for select using (auth.uid() = user_id);
create policy "Users insert own documents"
  on public.documents for insert with check (auth.uid() = user_id);
create policy "Users update own documents"
  on public.documents for update using (auth.uid() = user_id);

create policy "Users view own payments"
  on public.payments for select using (auth.uid() = user_id);

create policy "Service role audit access"
  on public.audit_logs for all using (auth.role() = 'service_role');

create policy "Brokers view own clients"
  on public.broker_clients for all using (auth.uid() = broker_id);

-- ── Auto-create profile on signup ────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'User')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
'@

# ════════════════════════════════════════════════════════════
#  10. DOCS
# ════════════════════════════════════════════════════════════
Write-Host "[10/10] Compliance docs..." -ForegroundColor Yellow

Write-File "docs/compliance/DPDP_CHECKLIST.md" @'
# DPDP Act 2025 - Compliance Checklist

**Law:** Digital Personal Data Protection Act 2023
**Rules notified:** November 13, 2025
**Max penalty:** Rs.250 crore per breach

## Day 1 Must-Haves

- [ ] Explicit consent before any data collection
- [ ] Data minimisation — collect only what is needed
- [ ] Zero Aadhaar storage — process then immediately delete
- [ ] 30-day auto-delete for all user data
- [ ] Self-serve data export button (/api/user/data-export)
- [ ] Self-serve data delete button (/api/user/data-delete)
- [ ] Breach response SOP in place (72-hour reporting)
- [ ] Plain-language privacy policy in Hindi + English
- [ ] Age gate — block users under 18
- [ ] Granular consent checkboxes for each purpose
- [ ] Consent withdrawal accessible in less than 3 clicks

## Data Retention Policy

| Data Type | Stored? | Encrypted? | Retained |
|-----------|---------|------------|---------|
| Name | Yes | Yes AES-256 | 30 days |
| Phone | Yes | Yes AES-256 | 30 days |
| Address | Yes | Yes AES-256 | 30 days |
| PAN | Last 4 only | Yes | 30 days |
| Aadhaar | NEVER | N/A | NEVER |
| IP Address | Hashed only | SHA-256 | 7 years |
'@

Write-File "docs/legal-review/DISCLAIMERS.md" @'
# Legal Disclaimers - Must appear on ALL pages + PDF footer

1. STATE LAWS: Rental laws vary by state. Always verify with a local advocate.
2. MTA 2021: 2-month deposit cap applies ONLY in UP, Rajasthan, Kerala.
3. NOTARIZATION: Optional nationwide. NOT mandatory for 11-month agreements.
4. POLICE VERIFICATION: Mandatory only in Delhi, MH, KA, Hyderabad, Kolkata.
5. HRA TAX: Available ONLY under OLD tax regime. PAN needed if rent over Rs.3,000/month.
6. NOT LEGAL ADVICE: This is a drafting tool. Consult an advocate for disputes.
7. DPDP: Compliant with DPDP Act 2025. Aadhaar optional and deleted after eSign.
'@

Write-File "docs/compliance/BREACH_RESPONSE_SOP.md" @'
# Data Breach Response SOP

DPDP Requirement: Report to Data Protection Board within 72 hours

## Steps

1. DETECT (0-4 hrs): Alert via Supabase anomaly detection
2. CONTAIN (4-8 hrs): Isolate systems, revoke compromised API keys
3. ASSESS (8-24 hrs): What data leaked, how many users, how accessed
4. NOTIFY (24-72 hrs): Inform Data Protection Board + affected users
5. RECOVER: Fix root cause, post-incident review, update security measures
'@

# ════════════════════════════════════════════════════════════
#  DONE
# ════════════════════════════════════════════════════════════
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Green
Write-Host "   ALL FILES CREATED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  ==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Files created:" -ForegroundColor White
Write-Host "   Root:        next.config.mjs, .env.local, .env.example, README.md" -ForegroundColor Gray
Write-Host "   Styles:      globals.css" -ForegroundColor Gray
Write-Host "   Types:       agreement.ts, user.ts, payment.ts, state.ts, index.ts" -ForegroundColor Gray
Write-Host "   Constants:   states.ts (22 states), pricing.ts, languages.ts, index.ts" -ForegroundColor Gray
Write-Host "   DB:          client.ts, server.ts, admin.ts, index.ts" -ForegroundColor Gray
Write-Host "   Utils:       stamp-duty.ts, encrypt.ts, audit.ts, format.ts, index.ts" -ForegroundColor Gray
Write-Host "   App:         layout.tsx, page.tsx, not-found.tsx, robots.ts" -ForegroundColor Gray
Write-Host "   Pages:       24 placeholder pages" -ForegroundColor Gray
Write-Host "   Supabase:    001_initial_schema.sql" -ForegroundColor Gray
Write-Host "   Docs:        3 compliance documents" -ForegroundColor Gray
Write-Host ""
Write-Host "  Next step:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host "   Open http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
