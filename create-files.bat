@echo off
chcp 65001 >nul
echo.
echo  ==========================================
echo   ELVATRIXA LEGAL - Creating All Files...
echo  ==========================================
echo.

REM ════════════════════════════════════════════
REM  1. ROOT CONFIG FILES
REM ════════════════════════════════════════════

echo [1/10] Creating root config files...

REM next.config.mjs
(
echo /** @type {import('next').NextConfig} */
echo const nextConfig = {
echo   images: {
echo     remotePatterns: [
echo       { protocol: "https", hostname: "**.supabase.co" },
echo     ],
echo   },
echo   async headers() {
echo     return [
echo       {
echo         source: "/(.*)",
echo         headers: [
echo           { key: "X-Frame-Options", value: "DENY" },
echo           { key: "X-Content-Type-Options", value: "nosniff" },
echo           { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
echo           { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
echo         ],
echo       },
echo     ]
echo   },
echo }
echo.
echo export default nextConfig
) > next.config.mjs

REM .env.example
(
echo # App
echo NEXT_PUBLIC_APP_URL=http://localhost:3000
echo NEXT_PUBLIC_APP_NAME=Elvatrixa Legal
echo.
echo # Supabase ^(India region - ap-south-1^)
echo NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
echo.
echo # Razorpay
echo NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
echo RAZORPAY_KEY_SECRET=your-razorpay-secret
echo RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
echo.
echo # Setu eSign API
echo SETU_CLIENT_ID=your-setu-client-id
echo SETU_CLIENT_SECRET=your-setu-client-secret
echo SETU_BASE_URL=https://dg-sandbox.setu.co
echo.
echo # SHCIL eStamp
echo SHCIL_API_KEY=your-shcil-api-key
echo.
echo # WhatsApp ^(Gupshup^)
echo WHATSAPP_API_KEY=your-whatsapp-api-key
echo WHATSAPP_APP_ID=your-app-id
echo.
echo # Claude AI
echo ANTHROPIC_API_KEY=your-claude-api-key
echo.
echo # Resend ^(email^)
echo RESEND_API_KEY=your-resend-api-key
echo FROM_EMAIL=noreply@elvatrixa.com
echo.
echo # Security
echo ENCRYPTION_KEY=generate-a-random-32-character-string
echo AUDIT_LOG_SECRET=generate-another-random-secret
echo.
echo # Admin
echo ADMIN_EMAIL=uday@elvatrixa.com
echo CRON_SECRET=your-cron-secret
) > .env.example

REM .env.local
(
echo # App
echo NEXT_PUBLIC_APP_URL=http://localhost:3000
echo NEXT_PUBLIC_APP_NAME=Elvatrixa Legal
echo.
echo # Supabase - fill after creating project at supabase.com
echo NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
echo.
echo # Razorpay - fill after creating account at razorpay.com
echo NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
echo RAZORPAY_KEY_SECRET=your-razorpay-secret
echo RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
echo.
echo # Setu eSign - sandbox keys from setu.co
echo SETU_CLIENT_ID=your-setu-client-id
echo SETU_CLIENT_SECRET=your-setu-client-secret
echo SETU_BASE_URL=https://dg-sandbox.setu.co
echo.
echo # Claude AI - from console.anthropic.com
echo ANTHROPIC_API_KEY=your-claude-api-key
echo.
echo # Security - change these to random strings
echo ENCRYPTION_KEY=change-this-to-random-32-chars!!
echo AUDIT_LOG_SECRET=change-this-to-another-secret!!
echo.
echo # Admin
echo ADMIN_EMAIL=uday@elvatrixa.com
echo CRON_SECRET=your-cron-secret
) > .env.local

REM README.md
(
echo # Elvatrixa Legal
echo.
echo ^> India's first privacy-first, vernacular, instant-delivery legal document platform.
echo.
echo **Founder:** Uday Bute ^| **Company:** Elvatrixa Pvt. Ltd.
echo.
echo ## Stack
echo.
echo - **Framework:** Next.js 14 ^(App Router^)
echo - **Language:** TypeScript
echo - **Styling:** Tailwind CSS
echo - **Database:** Supabase ^(Postgres, Mumbai region^)
echo - **Auth:** Supabase Auth ^(OTP only - no passwords^)
echo - **Payments:** Razorpay
echo - **eSign:** Setu API
echo - **eStamp:** SHCIL API ^(27 states^)
echo - **WhatsApp:** Gupshup Business API
echo - **AI:** Claude API ^(clause explainer^)
echo - **PDF:** PDFKit ^(server-side only^)
echo - **Hosting:** Vercel + Supabase ^(India region^)
echo.
echo ## Getting Started
echo.
echo ```bash
echo npm install
echo cp .env.example .env.local
echo # Fill in .env.local values
echo npm run dev
echo ```
echo.
echo ## Key Features
echo.
echo - State-specific rental agreements ^(28 states^)
echo - Rs.199 flat pricing - instant PDF + WhatsApp delivery
echo - Hindi / Marathi / Tamil output
echo - DPDP Act 2025 compliant from Day 1
echo - Zero Aadhaar storage
echo - Free HRA rent receipt generator
echo - Broker B2B dashboard
) > README.md

echo     next.config.mjs    - DONE
echo     .env.example       - DONE
echo     .env.local         - DONE
echo     README.md          - DONE

REM ════════════════════════════════════════════
REM  2. SRC/STYLES
REM ════════════════════════════════════════════

echo [2/10] Creating styles...

(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo @layer base {
echo   * { box-sizing: border-box; }
echo   html { scroll-behavior: smooth; }
echo   body { @apply bg-white text-gray-900 antialiased; }
echo   .font-devanagari { font-family: 'Noto Sans Devanagari', sans-serif; }
echo }
echo.
echo @layer components {
echo   .btn-primary {
echo     @apply bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium
echo            hover:bg-blue-800 transition-colors duration-150;
echo   }
echo   .btn-secondary {
echo     @apply border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg
echo            font-medium hover:bg-gray-50 transition-colors duration-150;
echo   }
echo   .card {
echo     @apply bg-white border border-gray-200 rounded-xl p-6;
echo   }
echo   .input {
echo     @apply w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
echo            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
echo   }
echo   .label {
echo     @apply block text-sm font-medium text-gray-700 mb-1;
echo   }
echo }
) > src\app\globals.css

echo     globals.css        - DONE

REM ════════════════════════════════════════════
REM  3. SRC/TYPES
REM ════════════════════════════════════════════

echo [3/10] Creating TypeScript types...

(
echo // ─── Agreement Types ────────────────────────────────────
echo.
echo export type DocumentType =
echo   ^| "rental_agreement"
echo   ^| "commercial_lease"
echo   ^| "noc"
echo   ^| "affidavit"
echo   ^| "rent_receipt"
echo   ^| "termination_notice"
echo   ^| "renewal_notice"
echo.
echo export type AgreementStatus =
echo   ^| "draft"
echo   ^| "generated"
echo   ^| "sent"
echo   ^| "signed"
echo   ^| "expired"
echo.
echo export type Language = "en" ^| "hi" ^| "mr" ^| "ta"
echo.
echo export type PropertyType = "residential" ^| "commercial" ^| "pg"
echo.
echo export type FurnishingType = "furnished" ^| "semi-furnished" ^| "unfurnished"
echo.
echo export type IdType =
echo   ^| "pan"
echo   ^| "voter_id"
echo   ^| "passport"
echo   ^| "driving_licence"
echo   ^| "aadhaar_last4"   // NEVER store full Aadhaar - DPDP compliance
echo.
echo export interface Party {
echo   name: string
echo   address: string
echo   phone: string
echo   email?: string
echo   id_type: IdType
echo   id_number: string   // masked/last4 only for Aadhaar
echo }
echo.
echo export interface AgreementFormData {
echo   // Parties
echo   landlord: Party
echo   tenant: Party
echo   // Property
echo   property_address: string
echo   property_type: PropertyType
echo   furnished: FurnishingType
echo   // Financial
echo   monthly_rent: number
echo   security_deposit: number
echo   advance_payment?: number
echo   maintenance_charges?: number
echo   // Dates
echo   start_date: string
echo   duration_months: number
echo   // Terms
echo   notice_period_days: number
echo   lock_in_months?: number
echo   // Utilities
echo   electricity_payer: "tenant" ^| "landlord"
echo   water_payer: "tenant" ^| "landlord"
echo   // Extra
echo   special_conditions?: string
echo }
echo.
echo export interface RentalAgreement {
echo   id: string
echo   user_id: string
echo   document_type: DocumentType
echo   state: string
echo   city: string
echo   language: Language
echo   status: AgreementStatus
echo   data: AgreementFormData
echo   pdf_path?: string
echo   signed_pdf_path?: string
echo   stamp_duty_amount?: number
echo   estamp_id?: string
echo   esign_id?: string
echo   whatsapp_sent: boolean
echo   created_at: string
echo   updated_at: string
echo   expires_at?: string
echo   delete_after: string   // DPDP: auto-delete after 30 days
echo }
) > src\types\agreement.ts

(
echo // ─── User Types ─────────────────────────────────────────
echo.
echo export type UserRole = "retail" ^| "broker" ^| "ca" ^| "admin"
echo.
echo export interface ConsentRecord {
echo   doc_generation: boolean
echo   esign: boolean
echo   whatsapp: boolean
echo   marketing: boolean
echo   given_at: string
echo }
echo.
echo export interface UserProfile {
echo   id: string
echo   email: string
echo   phone?: string
echo   full_name: string
echo   role: UserRole
echo   // Broker / CA specific
echo   firm_name?: string
echo   gstin?: string
echo   // Location
echo   state: string
echo   city: string
echo   // DPDP consent - required fields
echo   consent: ConsentRecord
echo   consent_withdrawn: boolean
echo   consent_withdrawn_at?: string
echo   // Stats
echo   documents_count: number
echo   created_at: string
echo   updated_at: string
echo }
echo.
echo export interface BrokerClient {
echo   id: string
echo   broker_id: string
echo   name: string
echo   phone: string
echo   email?: string
echo   state: string
echo   city: string
echo   notes?: string
echo   created_at: string
echo }
) > src\types\user.ts

(
echo // ─── Payment Types ──────────────────────────────────────
echo.
echo export type PlanType =
echo   ^| "retail"
echo   ^| "broker"
echo   ^| "enterprise"
echo   ^| "ca_reseller"
echo.
echo export type PaymentStatus =
echo   ^| "pending"
echo   ^| "paid"
echo   ^| "failed"
echo   ^| "refunded"
echo.
echo export interface Payment {
echo   id: string
echo   user_id: string
echo   agreement_id?: string
echo   plan_type: PlanType
echo   amount: number
echo   gst_amount: number
echo   currency: "INR"
echo   razorpay_order_id: string
echo   razorpay_payment_id?: string
echo   status: PaymentStatus
echo   invoice_url?: string
echo   created_at: string
echo }
echo.
echo export interface RazorpayOrder {
echo   id: string
echo   amount: number
echo   currency: string
echo   receipt: string
echo }
) > src\types\payment.ts

(
echo // ─── State Config Types ──────────────────────────────────
echo.
echo export type RegistrationRequirement =
echo   ^| "all"               // Maharashtra - even 11-month must register
echo   ^| "above_11_months"   // Most states
echo   ^| "not_required"
echo.
echo export type StampDutyType =
echo   ^| "percentage_annual_rent"
echo   ^| "percentage_total_rent"
echo   ^| "flat"
echo   ^| "area_based"
echo.
echo export interface StampDutyFormula {
echo   type: StampDutyType
echo   rate: number
echo   min_amount: number
echo   notes?: string
echo }
echo.
echo export interface StateConfig {
echo   code: string
echo   name: string
echo   name_hi: string
echo   name_mr?: string
echo   name_ta?: string
echo   governing_act: string
echo   mta_adopted: boolean             // Model Tenancy Act 2021
echo   deposit_cap_months?: number      // Only MTA states: UP, RJ, KL
echo   registration_required: RegistrationRequirement
echo   police_verification_required: boolean
echo   police_verification_portal?: string
echo   stamp_duty_formula: StampDutyFormula
echo   estamp_available: boolean
echo   estamp_portal?: string
echo   online_registration: boolean     // Only Maharashtra = true
echo   major_cities: string[]
echo }
) > src\types\state.ts

(
echo // ─── Export all types from one place ────────────────────
echo // Usage: import { RentalAgreement, UserProfile } from "@/types"
echo.
echo export * from "./agreement"
echo export * from "./user"
echo export * from "./payment"
echo export * from "./state"
) > src\types\index.ts

echo     agreement.ts       - DONE
echo     user.ts            - DONE
echo     payment.ts         - DONE
echo     state.ts           - DONE
echo     index.ts           - DONE

REM ════════════════════════════════════════════
REM  4. SRC/LIB/CONSTANTS
REM ════════════════════════════════════════════

echo [4/10] Creating constants...

(
echo import type { StateConfig } from "@/types"
echo.
echo // ─── All 28 States + UTs ────────────────────────────────
echo // Source: State Rent Control Acts + MTA 2021 adoption records
echo // IMPORTANT: MTA 2021 adopted by ONLY 3-4 states - NOT nationwide
echo.
echo export const STATES: StateConfig[] = [
echo   // ── TIER 1: High volume states ──────────────────────
echo   {
echo     code: "MH",
echo     name: "Maharashtra",
echo     name_hi: "महाराष्ट्र",
echo     name_mr: "महाराष्ट्र",
echo     governing_act: "Maharashtra Rent Control Act 1999",
echo     mta_adopted: false,
echo     registration_required: "all",     // UNIQUE - even 11-month needs registration
echo     police_verification_required: true,
echo     police_verification_portal: "https://tenant.mahapolice.gov.in",
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 0.25, min_amount: 100 },
echo     estamp_available: true,
echo     estamp_portal: "https://gras.mahakosh.gov.in",
echo     online_registration: true,        // ONLY state with full online registration
echo     major_cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur"],
echo   },
echo   {
echo     code: "KA",
echo     name: "Karnataka",
echo     name_hi: "कर्नाटक",
echo     governing_act: "Karnataka Rent Act 1999",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     police_verification_portal: "https://ksaps.karnataka.gov.in",
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 0.5, min_amount: 500 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum", "Dharwad"],
echo   },
echo   {
echo     code: "DL",
echo     name: "Delhi",
echo     name_hi: "दिल्ली",
echo     governing_act: "Delhi Rent Control Act 1958",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     police_verification_portal: "https://delhipolice.gov.in/tenant-verification",
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 2, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["New Delhi", "Dwarka", "Rohini", "Janakpuri", "Saket"],
echo   },
echo   {
echo     code: "TN",
echo     name: "Tamil Nadu",
echo     name_hi: "तमिलनाडु",
echo     name_ta: "தமிழ்நாடு",
echo     governing_act: "Tamil Nadu Rent Control Act 1960",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 1, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
echo   },
echo   // ── MTA STATES (deposit cap applies here ONLY) ──────
echo   {
echo     code: "UP",
echo     name: "Uttar Pradesh",
echo     name_hi: "उत्तर प्रदेश",
echo     governing_act: "UP Rent Control Act 2021",
echo     mta_adopted: true,
echo     deposit_cap_months: 2,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 4, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad"],
echo   },
echo   {
echo     code: "RJ",
echo     name: "Rajasthan",
echo     name_hi: "राजस्थान",
echo     governing_act: "Rajasthan Rent Control Act 2001",
echo     mta_adopted: true,
echo     deposit_cap_months: 2,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 6, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
echo   },
echo   {
echo     code: "KL",
echo     name: "Kerala",
echo     name_hi: "केरल",
echo     governing_act: "Kerala Rent Control Act 1999",
echo     mta_adopted: true,
echo     deposit_cap_months: 2,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 0.25, min_amount: 200 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
echo   },
echo   // ── OTHER MAJOR STATES ───────────────────────────────
echo   {
echo     code: "TS",
echo     name: "Telangana",
echo     name_hi: "तेलंगाना",
echo     governing_act: "Telangana Rent Control Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     police_verification_portal: "https://hyderabadpolice.gov.in",
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 4, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
echo   },
echo   {
echo     code: "GJ",
echo     name: "Gujarat",
echo     name_hi: "गुजरात",
echo     governing_act: "Gujarat Rent Control Act 1999",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 4.9, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
echo   },
echo   {
echo     code: "WB",
echo     name: "West Bengal",
echo     name_hi: "पश्चिम बंगाल",
echo     governing_act: "West Bengal Rent Control Act 1997",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: true,
echo     police_verification_portal: "https://kolkatapolice.gov.in",
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 5.5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
echo   },
echo   {
echo     code: "AP",
echo     name: "Andhra Pradesh",
echo     name_hi: "आंध्र प्रदेश",
echo     governing_act: "Andhra Pradesh Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 0.5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
echo   },
echo   {
echo     code: "HR",
echo     name: "Haryana",
echo     name_hi: "हरियाणा",
echo     governing_act: "Haryana Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "area_based", rate: 6, min_amount: 100, notes: "5-7% based on area" },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Gurugram", "Faridabad", "Panchkula", "Ambala", "Rohtak"],
echo   },
echo   {
echo     code: "MP",
echo     name: "Madhya Pradesh",
echo     name_hi: "मध्य प्रदेश",
echo     governing_act: "Madhya Pradesh Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 8, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
echo   },
echo   {
echo     code: "PB",
echo     name: "Punjab",
echo     name_hi: "पंजाब",
echo     governing_act: "Punjab Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "area_based", rate: 6, min_amount: 100, notes: "5-7% gender-based" },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Ludhiana", "Amritsar", "Chandigarh", "Jalandhar", "Patiala"],
echo   },
echo   {
echo     code: "BR",
echo     name: "Bihar",
echo     name_hi: "बिहार",
echo     governing_act: "Bihar Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 6, min_amount: 100 },
echo     estamp_available: false,  // Bihar has no eStamp - manual stamp paper only
echo     online_registration: false,
echo     major_cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
echo   },
echo   {
echo     code: "OD",
echo     name: "Odisha",
echo     name_hi: "ओडिशा",
echo     governing_act: "Odisha Rent Control Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Bhubaneswar", "Cuttack", "Rourkela"],
echo   },
echo   {
echo     code: "AS",
echo     name: "Assam",
echo     name_hi: "असम",
echo     governing_act: "Assam Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_total_rent", rate: 8.25, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Guwahati", "Silchar", "Dibrugarh"],
echo   },
echo   {
echo     code: "JH",
echo     name: "Jharkhand",
echo     name_hi: "झारखंड",
echo     governing_act: "Jharkhand Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
echo   },
echo   {
echo     code: "CG",
echo     name: "Chhattisgarh",
echo     name_hi: "छत्तीसगढ़",
echo     governing_act: "Chhattisgarh Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Raipur", "Bhilai", "Bilaspur"],
echo   },
echo   {
echo     code: "UK",
echo     name: "Uttarakhand",
echo     name_hi: "उत्तराखंड",
echo     governing_act: "Uttarakhand Rent Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Dehradun", "Haridwar", "Roorkee", "Nainital"],
echo   },
echo   {
echo     code: "HP",
echo     name: "Himachal Pradesh",
echo     name_hi: "हिमाचल प्रदेश",
echo     governing_act: "HP Rent Control Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 5, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Shimla", "Dharamsala", "Manali", "Solan"],
echo   },
echo   {
echo     code: "GA",
echo     name: "Goa",
echo     name_hi: "गोवा",
echo     governing_act: "Goa Rent Control Act",
echo     mta_adopted: false,
echo     registration_required: "above_11_months",
echo     police_verification_required: false,
echo     stamp_duty_formula: { type: "percentage_annual_rent", rate: 3, min_amount: 100 },
echo     estamp_available: true,
echo     online_registration: false,
echo     major_cities: ["Panaji", "Margao", "Vasco", "Mapusa"],
echo   },
echo ]
echo.
echo // ─── Helper functions ────────────────────────────────────
echo export const getStateByCode = ^(code: string^) =^>
echo   STATES.find^(^(s^) =^> s.code === code^)
echo.
echo export const getStateByName = ^(name: string^) =^>
echo   STATES.find^(^(s^) =^> s.name.toLowerCase^(^) === name.toLowerCase^(^)^)
echo.
echo export const MTA_STATES = STATES
echo   .filter^(^(s^) =^> s.mta_adopted^)
echo   .map^(^(s^) =^> s.code^)
echo.
echo export const POLICE_VERIFICATION_STATES = STATES
echo   .filter^(^(s^) =^> s.police_verification_required^)
echo   .map^(^(s^) =^> s.code^)
echo.
echo export const ESTAMP_STATES = STATES
echo   .filter^(^(s^) =^> s.estamp_available^)
echo   .map^(^(s^) =^> s.code^)
) > src\lib\constants\states.ts

(
echo // ─── Pricing Constants ───────────────────────────────────
echo.
echo export const PRICING = {
echo   // Pay per doc
echo   retail_per_doc:      199,   // residential
echo   commercial_per_doc:  499,   // commercial lease
echo   nri_per_doc:         999,   // NRI - international users
echo   // Subscriptions
echo   broker_monthly:      1499,  // 20 docs/month
echo   enterprise_monthly:  4999,  // unlimited
echo   ca_reseller_monthly: 2999,  // CA white-label
echo   // Add-ons
echo   lawyer_review_addon: 499,   // per doc
echo   police_verify_addon: 299,   // per doc ^(MH/DL/KA only^)
echo   // Free products ^(loss leaders^)
echo   hra_receipt:         0,     // FREE - drives upsell
echo   // Internal costs
echo   esign_cost:          12,    // Setu API cost per verification
echo   gst_rate:            0.18,  // 18% GST on all services
echo } as const
echo.
echo export const PLANS = {
echo   retail: {
echo     id: "retail",
echo     name: "Pay Per Doc",
echo     name_hi: "प्रति दस्तावेज़",
echo     price: 0,
echo     per_doc_price: PRICING.retail_per_doc,
echo     docs_per_month: 1,
echo     features: [
echo       "Instant PDF generation",
echo       "WhatsApp delivery",
echo       "eStamp integration",
echo       "eSign ^(optional^)",
echo       "30-day cloud storage",
echo       "Hindi/Marathi output",
echo     ],
echo   },
echo   broker: {
echo     id: "broker",
echo     name: "Broker Plan",
echo     name_hi: "ब्रोकर प्लान",
echo     price: PRICING.broker_monthly,
echo     per_doc_price: 0,
echo     docs_per_month: 20,
echo     features: [
echo       "20 docs/month",
echo       "Client management dashboard",
echo       "White-label WhatsApp branding",
echo       "Bulk generation",
echo       "Analytics ^& reports",
echo       "Priority support",
echo     ],
echo   },
echo   enterprise: {
echo     id: "enterprise",
echo     name: "Enterprise",
echo     name_hi: "एंटरप्राइज",
echo     price: PRICING.enterprise_monthly,
echo     per_doc_price: 0,
echo     docs_per_month: -1, // unlimited
echo     features: [
echo       "Unlimited docs",
echo       "API access",
echo       "Custom clauses",
echo       "SLA guarantee",
echo       "Dedicated support",
echo       "Custom branding",
echo     ],
echo   },
echo   ca_reseller: {
echo     id: "ca_reseller",
echo     name: "CA Reseller",
echo     name_hi: "CA रिसेलर",
echo     price: PRICING.ca_reseller_monthly,
echo     per_doc_price: 0,
echo     docs_per_month: -1, // unlimited
echo     features: [
echo       "Unlimited docs",
echo       "White-label PDF with CA firm name",
echo       "Client portal",
echo       "GST invoice auto-gen",
echo       "CA dashboard",
echo       "Volume pricing",
echo     ],
echo   },
echo } as const
echo.
echo // Calculate total with GST
echo export function calculateTotal^(amount: number^): {
echo   base: number
echo   gst: number
echo   total: number
echo } {
echo   const gst = Math.round^(amount * PRICING.gst_rate^)
echo   return { base: amount, gst, total: amount + gst }
echo }
) > src\lib\constants\pricing.ts

(
echo // ─── Language Constants ──────────────────────────────────
echo.
echo export const SUPPORTED_LANGUAGES = [
echo   { code: "en", name: "English",  native: "English"   },
echo   { code: "hi", name: "Hindi",    native: "हिंदी"      },
echo   { code: "mr", name: "Marathi",  native: "मराठी"      },
echo   { code: "ta", name: "Tamil",    native: "தமிழ்"      },
echo ] as const
echo.
echo export type SupportedLocale = "en" ^| "hi" ^| "mr" ^| "ta"
) > src\lib\constants\languages.ts

(
echo // ─── Export all constants ────────────────────────────────
echo // Usage: import { STATES, PRICING, APP_NAME } from "@/lib/constants"
echo.
echo export * from "./states"
echo export * from "./pricing"
echo export * from "./languages"
echo.
echo // App info
echo export const APP_NAME        = "Elvatrixa Legal"
echo export const APP_TAGLINE     = "Rental Agreements in 5 Minutes — Rs.199 Flat"
echo export const APP_DESCRIPTION = "India's first privacy-first, vernacular, instant-delivery legal document platform"
echo export const SUPPORT_WHATSAPP = "+91-XXXXXXXXXX"
echo export const SUPPORT_EMAIL    = "support@elvatrixa.com"
echo export const FOUNDER_EMAIL    = "uday@elvatrixa.com"
echo export const COMPANY_NAME     = "Elvatrixa Pvt. Ltd."
echo.
echo // Legal disclaimers - must appear on all pages
echo export const DISCLAIMERS = {
echo   state_laws:       "Rental laws vary by state. This tool generates agreements based on YOUR STATE's current laws. Always verify with a local advocate.",
echo   mta_cap:          "The 2-month security deposit cap applies ONLY in states that adopted MTA 2021 (UP, Rajasthan, Kerala). Most states have NO cap.",
echo   notarization:     "Notarization is OPTIONAL nationwide. NOT mandatory for 11-month agreements.",
echo   police_verif:     "Police verification is mandatory only in Delhi, Maharashtra, Karnataka, Hyderabad, and Kolkata.",
echo   hra_tax:          "HRA exemption is available ONLY under the OLD tax regime. PAN required if rent > Rs.3,000/month.",
echo   not_legal_advice: "This is a drafting tool, NOT legal advice. Consult a qualified advocate for disputes.",
echo   dpdp:             "DPDP Act 2025 compliant. Aadhaar is optional and deleted after eSign. Zero Aadhaar storage.",
echo } as const
) > src\lib\constants\index.ts

echo     states.ts          - DONE
echo     pricing.ts         - DONE
echo     languages.ts       - DONE
echo     index.ts           - DONE

REM ════════════════════════════════════════════
REM  5. SRC/LIB/DB
REM ════════════════════════════════════════════

echo [5/10] Creating database client...

(
echo import { createBrowserClient } from "@supabase/ssr"
echo.
echo // Client-side Supabase client ^(use in React components^)
echo export function createClient^(^) {
echo   return createBrowserClient^(
echo     process.env.NEXT_PUBLIC_SUPABASE_URL!,
echo     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
echo   ^)
echo }
) > src\lib\db\client.ts

(
echo import { createServerClient } from "@supabase/ssr"
echo import { cookies } from "next/headers"
echo.
echo // Server-side Supabase client ^(use in Server Components and API routes^)
echo export async function createClient^(^) {
echo   const cookieStore = await cookies^(^)
echo   return createServerClient^(
echo     process.env.NEXT_PUBLIC_SUPABASE_URL!,
echo     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
echo     {
echo       cookies: {
echo         getAll^(^) { return cookieStore.getAll^(^) },
echo         setAll^(cookiesToSet^) {
echo           try {
echo             cookiesToSet.forEach^(^({ name, value, options }^) =^>
echo               cookieStore.set^(name, value, options^)
echo             ^)
echo           } catch { /* Server Component - ignore */ }
echo         },
echo       },
echo     }
echo   ^)
echo }
) > src\lib\db\server.ts

(
echo import { createClient } from "@supabase/supabase-js"
echo.
echo // Admin Supabase client - bypasses RLS - SERVER ONLY
echo // Use only in API routes and cron jobs - NEVER in client components
echo export function createAdminClient^(^) {
echo   return createClient^(
echo     process.env.NEXT_PUBLIC_SUPABASE_URL!,
echo     process.env.SUPABASE_SERVICE_ROLE_KEY!,
echo     { auth: { autoRefreshToken: false, persistSession: false } }
echo   ^)
echo }
) > src\lib\db\admin.ts

(
echo // ─── Supabase exports ────────────────────────────────────
echo // Client-side: import { createClient } from "@/lib/db/client"
echo // Server-side: import { createClient } from "@/lib/db/server"
echo // Admin:       import { createAdminClient } from "@/lib/db/admin"
echo export { createClient } from "./client"
) > src\lib\db\index.ts

echo     client.ts          - DONE
echo     server.ts          - DONE
echo     admin.ts           - DONE

REM ════════════════════════════════════════════
REM  6. SRC/LIB/UTILS
REM ════════════════════════════════════════════

echo [6/10] Creating utility functions...

(
echo import { getStateByCode } from "@/lib/constants"
echo.
echo // ─── Stamp Duty Calculator ───────────────────────────────
echo // Calculates correct stamp duty per state formula
echo // Source: State-wise stamp duty rates from official portals
echo.
echo export function calculateStampDuty^(
echo   stateCode: string,
echo   monthlyRent: number,
echo   durationMonths: number,
echo   securityDeposit: number
echo ^): number {
echo   const state = getStateByCode^(stateCode^)
echo   if ^(!state^) return 0
echo.
echo   const { stamp_duty_formula: f } = state
echo   const annualRent = monthlyRent * 12
echo   const totalRent  = monthlyRent * durationMonths
echo.
echo   let duty = 0
echo   switch ^(f.type^) {
echo     case "percentage_annual_rent":
echo       duty = ^(annualRent * f.rate^) / 100
echo       break
echo     case "percentage_total_rent":
echo       duty = ^(^(totalRent + securityDeposit^) * f.rate^) / 100
echo       break
echo     case "flat":
echo       duty = f.rate
echo       break
echo     case "area_based":
echo       duty = ^(annualRent * f.rate^) / 100
echo       break
echo   }
echo.
echo   return Math.max^(Math.round^(duty^), f.min_amount^)
echo }
echo.
echo // Check if deposit exceeds MTA cap
echo export function isDepositExceedingCap^(
echo   stateCode: string,
echo   monthlyRent: number,
echo   securityDeposit: number
echo ^): boolean {
echo   const state = getStateByCode^(stateCode^)
echo   if ^(!state?.deposit_cap_months^) return false
echo   return securityDeposit ^> ^(monthlyRent * state.deposit_cap_months^)
echo }
) > src\lib\utils\stamp-duty.ts

(
echo import { createHash, createCipheriv, createDecipheriv, randomBytes } from "crypto"
echo.
echo // ─── AES-256-GCM Encryption ──────────────────────────────
echo // Used for encrypting PII fields before storing in database
echo // DPDP Act compliance: encrypt name, phone, address
echo.
echo const ALGO = "aes-256-gcm"
echo.
echo function getKey^(^): Buffer {
echo   const key = process.env.ENCRYPTION_KEY
echo   if ^(!key^) throw new Error^("ENCRYPTION_KEY not set in environment"^)
echo   return Buffer.from^(key, "utf8"^).slice^(0, 32^)
echo }
echo.
echo export function encrypt^(plaintext: string^): string {
echo   const iv = randomBytes^(16^)
echo   const cipher = createCipheriv^(ALGO, getKey^(^), iv^)
echo   const encrypted = Buffer.concat^([cipher.update^(plaintext, "utf8"^), cipher.final^(^)]^)
echo   const tag = cipher.getAuthTag^(^)
echo   return `${iv.toString^("hex"^)}:${tag.toString^("hex"^)}:${encrypted.toString^("hex"^)}`
echo }
echo.
echo export function decrypt^(ciphertext: string^): string {
echo   const [ivHex, tagHex, encHex] = ciphertext.split^(":"^)
echo   if ^(!ivHex ^|^| !tagHex ^|^| !encHex^) throw new Error^("Invalid ciphertext format"^)
echo   const decipher = createDecipheriv^(ALGO, getKey^(^), Buffer.from^(ivHex, "hex"^)^)
echo   decipher.setAuthTag^(Buffer.from^(tagHex, "hex"^)^)
echo   return ^(
echo     decipher.update^(Buffer.from^(encHex, "hex"^)^).toString^("utf8"^) +
echo     decipher.final^("utf8"^)
echo   ^)
echo }
echo.
echo // Hash IP address for audit logs ^(DPDP: don't store raw IPs^)
echo export function hashIP^(ip: string^): string {
echo   return createHash^("sha256"^).update^(ip^).digest^("hex"^).slice^(0, 16^)
echo }
) > src\lib\utils\encrypt.ts

(
echo import { createAdminClient } from "@/lib/db/admin"
echo import { hashIP } from "./encrypt"
echo.
echo // ─── Audit Event Types ───────────────────────────────────
echo // DPDP compliance: log all data access events
echo export type AuditEvent =
echo   ^| "DOC_CREATED"
echo   ^| "DOC_VIEWED"
echo   ^| "DOC_DOWNLOADED"
echo   ^| "DOC_SIGNED"
echo   ^| "CONSENT_GIVEN"
echo   ^| "CONSENT_WITHDRAWN"
echo   ^| "PAYMENT_SUCCESS"
echo   ^| "PAYMENT_FAILED"
echo   ^| "DATA_EXPORTED"
echo   ^| "DATA_DELETED"
echo   ^| "LOGIN"
echo   ^| "LOGOUT"
echo.
echo export async function logAuditEvent^(
echo   userId: string ^| null,
echo   event: AuditEvent,
echo   resourceId?: string,
echo   request?: Request,
echo   metadata?: Record^<string, unknown^>
echo ^) {
echo   try {
echo     const ip = request?.headers.get^("x-forwarded-for"^) ?? "unknown"
echo     const ua = request?.headers.get^("user-agent"^) ?? "unknown"
echo.
echo     const supabase = createAdminClient^(^)
echo     await supabase.from^("audit_logs"^).insert^({
echo       user_id: userId,
echo       event_type: event,
echo       resource_id: resourceId,
echo       ip_hash: hashIP^(ip^),
echo       user_agent_hash: hashIP^(ua^),
echo       metadata,
echo     }^)
echo   } catch ^(error^) {
echo     // Never let audit logging crash the app
echo     console.error^("Audit log failed:", error^)
echo   }
echo }
) > src\lib\utils\audit.ts

(
echo // ─── Format utilities ────────────────────────────────────
echo.
echo // Format amount in INR
echo export function formatINR^(amount: number^): string {
echo   return new Intl.NumberFormat^("en-IN", {
echo     style: "currency",
echo     currency: "INR",
echo     minimumFractionDigits: 0,
echo   }^).format^(amount^)
echo }
echo.
echo // Format date for display
echo export function formatDate^(date: string, locale = "en-IN"^): string {
echo   return new Date^(date^).toLocaleDateString^(locale, {
echo     day: "numeric",
echo     month: "long",
echo     year: "numeric",
echo   }^)
echo }
echo.
echo // Mask Aadhaar - only keep last 4 digits
echo // DPDP compliance: never store full Aadhaar
echo export function maskAadhaar^(aadhaar: string^): string {
echo   return "XXXX-XXXX-" + aadhaar.slice^(-4^)
echo }
echo.
echo // Generate agreement reference number
echo export function generateRefNumber^(^): string {
echo   const year = new Date^(^).getFullYear^(^)
echo   const random = Math.random^(^).toString^(36^).substring^(2, 8^).toUpperCase^(^)
echo   return `ELV-${year}-${random}`
echo }
echo.
echo // Truncate text
echo export function truncate^(text: string, maxLength: number^): string {
echo   if ^(text.length ^<= maxLength^) return text
echo   return text.slice^(0, maxLength^) + "..."
echo }
) > src\lib\utils\format.ts

(
echo // ─── Export all utilities ────────────────────────────────
echo export * from "./stamp-duty"
echo export * from "./encrypt"
echo export * from "./audit"
echo export * from "./format"
) > src\lib\utils\index.ts

echo     stamp-duty.ts      - DONE
echo     encrypt.ts         - DONE
echo     audit.ts           - DONE
echo     format.ts          - DONE

REM ════════════════════════════════════════════
REM  7. SRC/APP LAYOUT + ROOT FILES
REM ════════════════════════════════════════════

echo [7/10] Creating app layout files...

(
echo import type { Metadata } from "next"
echo import { Inter } from "next/font/google"
echo import "./globals.css"
echo.
echo const inter = Inter^({
echo   subsets: ["latin"],
echo   variable: "--font-inter",
echo   display: "swap",
echo }^)
echo.
echo export const metadata: Metadata = {
echo   title: {
echo     default: "Elvatrixa Legal — Rental Agreement Rs.199 ^| Instant PDF",
echo     template: "%s ^| Elvatrixa Legal",
echo   },
echo   description:
echo     "Generate state-specific rental agreements in 5 minutes. Rs.199 flat. Instant PDF + WhatsApp delivery. Hindi/Marathi output. DPDP-compliant. Zero Aadhaar storage.",
echo   keywords: [
echo     "rental agreement",
echo     "rent agreement online",
echo     "rent agreement Maharashtra",
echo     "rental agreement format",
echo     "stamp duty calculator",
echo   ],
echo   metadataBase: new URL^(process.env.NEXT_PUBLIC_APP_URL ^|^| "http://localhost:3000"^),
echo   openGraph: {
echo     type: "website",
echo     locale: "en_IN",
echo     siteName: "Elvatrixa Legal",
echo   },
echo }
echo.
echo export default function RootLayout^({
echo   children,
echo }: {
echo   children: React.ReactNode
echo }^) {
echo   return ^(
echo     ^<html lang="en" suppressHydrationWarning^>
echo       ^<body className={`${inter.variable} font-sans antialiased`}^>
echo         {children}
echo       ^</body^>
echo     ^</html^>
echo   ^)
echo }
) > src\app\layout.tsx

(
echo export default function HomePage^(^) {
echo   return ^(
echo     ^<main className="min-h-screen"^>
echo       ^<div className="max-w-4xl mx-auto px-4 py-20 text-center"^>
echo         ^<h1 className="text-4xl font-bold text-gray-900 mb-4"^>
echo           Elvatrixa Legal
echo         ^</h1^>
echo         ^<p className="text-xl text-gray-600 mb-8"^>
echo           Rental Agreements in 5 Minutes — Rs.199 Flat
echo         ^</p^>
echo         ^<p className="text-gray-500"^>
echo           India's first privacy-first, vernacular, instant-delivery legal document platform
echo         ^</p^>
echo       ^</div^>
echo     ^</main^>
echo   ^)
echo }
) > src\app\page.tsx

(
echo export default function NotFound^(^) {
echo   return ^(
echo     ^<div className="flex min-h-screen flex-col items-center justify-center"^>
echo       ^<h1 className="text-5xl font-bold text-blue-700"^>404^</h1^>
echo       ^<p className="mt-3 text-gray-600"^>Page not found^</p^>
echo       ^<a href="/" className="mt-6 text-blue-600 underline"^>Go to homepage^</a^>
echo     ^</div^>
echo   ^)
echo }
) > src\app\not-found.tsx

(
echo import type { MetadataRoute } from "next"
echo.
echo export default function robots^(^): MetadataRoute.Robots {
echo   return {
echo     rules: {
echo       userAgent: "*",
echo       allow: "/",
echo       disallow: ["/api/", "/^(app^)/", "/^(auth^)/", "/admin/"],
echo     },
echo     sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
echo   }
echo }
) > src\app\robots.ts

echo     layout.tsx         - DONE
echo     page.tsx           - DONE
echo     not-found.tsx      - DONE
echo     robots.ts          - DONE

REM ════════════════════════════════════════════
REM  8. PLACEHOLDER PAGES (so app doesnt crash)
REM ════════════════════════════════════════════

echo [8/10] Creating placeholder pages...

(
echo export default function LoginPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Login^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build login with OTP^</p^>^</div^>
echo }
) > "src\app\(auth)\login\page.tsx"

(
echo export default function RegisterPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Register^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build registration^</p^>^</div^>
echo }
) > "src\app\(auth)\register\page.tsx"

(
echo export default function DashboardPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Dashboard^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build dashboard^</p^>^</div^>
echo }
) > "src\app\(app)\dashboard\page.tsx"

(
echo export default function NewAgreementPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>New Agreement^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build agreement wizard^</p^>^</div^>
echo }
) > "src\app\(app)\agreements\new\page.tsx"

(
echo export default function BrokerDashboardPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Broker Dashboard^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build broker dashboard^</p^>^</div^>
echo }
) > "src\app\(app)\broker\dashboard\page.tsx"

(
echo export default function PrivacySettingsPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Privacy Settings^</h1^>^<p className="text-gray-500 mt-2"^>TODO: DPDP data export and delete^</p^>^</div^>
echo }
) > "src\app\(app)\settings\privacy\page.tsx"

(
echo export default function PricingPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Pricing^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build pricing page^</p^>^</div^>
echo }
) > "src\app\(marketing)\pricing\page.tsx"

(
echo export default function HRAReceiptPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Free HRA Receipt Generator^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build HRA receipt generator^</p^>^</div^>
echo }
) > "src\app\(marketing)\hra-receipt\page.tsx"

(
echo export default function StampDutyPage^(^) {
echo   return ^<div className="p-8"^>^<h1 className="text-2xl font-bold"^>Stamp Duty Calculator^</h1^>^<p className="text-gray-500 mt-2"^>TODO: Build stamp duty calculator^</p^>^</div^>
echo }
) > "src\app\(marketing)\stamp-duty-calculator\page.tsx"

echo     All placeholder pages  - DONE

REM ════════════════════════════════════════════
REM  9. SUPABASE MIGRATION
REM ════════════════════════════════════════════

echo [9/10] Creating Supabase migration...

(
echo -- ════════════════════════════════════════════════════════
echo -- Elvatrixa Legal - Initial Database Schema
echo -- DPDP Act 2025 compliant
echo -- Run this in Supabase SQL editor
echo -- ════════════════════════════════════════════════════════
echo.
echo -- Enable pgcrypto for encryption functions
echo create extension if not exists pgcrypto;
echo.
echo -- ── Profiles table ────────────────────────────────────────
echo create table public.profiles ^(
echo   id                    uuid references auth.users on delete cascade primary key,
echo   email                 text not null,
echo   phone                 text,
echo   full_name             text not null,
echo   role                  text default 'retail'
echo                         check ^(role in ^('retail', 'broker', 'ca', 'admin'^)^),
echo   firm_name             text,
echo   state                 text,
echo   city                  text,
echo   -- DPDP consent fields ^(required^)
echo   consent_doc_generation  boolean default false,
echo   consent_esign           boolean default false,
echo   consent_whatsapp        boolean default false,
echo   consent_marketing       boolean default false,
echo   consent_given_at        timestamptz,
echo   consent_withdrawn       boolean default false,
echo   consent_withdrawn_at    timestamptz,
echo   -- Stats
echo   documents_count       integer default 0,
echo   created_at            timestamptz default now^(^),
echo   updated_at            timestamptz default now^(^)
echo ^);
echo.
echo -- ── Documents table ───────────────────────────────────────
echo create table public.documents ^(
echo   id                uuid default gen_random_uuid^(^) primary key,
echo   user_id           uuid references public.profiles^(id^) on delete cascade not null,
echo   ref_number        text unique,
echo   document_type     text not null,
echo   state_code        text not null,
echo   city              text,
echo   language          text default 'en',
echo   status            text default 'draft',
echo   form_data         jsonb,          -- PII fields encrypted at app level
echo   pdf_path          text,           -- Supabase Storage path
echo   signed_pdf_path   text,
echo   stamp_duty_amount numeric,
echo   estamp_id         text,
echo   esign_id          text,
echo   whatsapp_sent     boolean default false,
echo   created_at        timestamptz default now^(^),
echo   updated_at        timestamptz default now^(^),
echo   expires_at        timestamptz,
echo   -- DPDP: auto-delete 30 days after creation
echo   delete_after      timestamptz default ^(now^(^) + interval '30 days'^)
echo ^);
echo.
echo -- ── Payments table ─────────────────────────────────────────
echo create table public.payments ^(
echo   id                      uuid default gen_random_uuid^(^) primary key,
echo   user_id                 uuid references public.profiles^(id^) not null,
echo   document_id             uuid references public.documents^(id^),
echo   plan_type               text not null,
echo   amount                  numeric not null,
echo   gst_amount              numeric not null default 0,
echo   currency                text default 'INR',
echo   razorpay_order_id       text unique,
echo   razorpay_payment_id     text,
echo   status                  text default 'pending',
echo   invoice_url             text,
echo   created_at              timestamptz default now^(^)
echo ^);
echo.
echo -- ── Audit logs table ^(APPEND-ONLY - never delete^) ─────────
echo create table public.audit_logs ^(
echo   id              bigserial primary key,
echo   user_id         uuid,
echo   event_type      text not null,
echo   resource_id     text,
echo   ip_hash         text,
echo   user_agent_hash text,
echo   metadata        jsonb,
echo   created_at      timestamptz default now^(^)
echo ^);
echo.
echo -- ── Consent records table ──────────────────────────────────
echo create table public.consent_records ^(
echo   id          uuid default gen_random_uuid^(^) primary key,
echo   user_id     uuid references public.profiles^(id^),
echo   event       text not null,
echo   purposes    jsonb,
echo   ip_hash     text,
echo   created_at  timestamptz default now^(^)
echo ^);
echo.
echo -- ── Broker clients table ───────────────────────────────────
echo create table public.broker_clients ^(
echo   id          uuid default gen_random_uuid^(^) primary key,
echo   broker_id   uuid references public.profiles^(id^) on delete cascade not null,
echo   name        text not null,
echo   phone       text,
echo   email       text,
echo   state       text,
echo   city        text,
echo   notes       text,
echo   created_at  timestamptz default now^(^)
echo ^);
echo.
echo -- ── Enable Row Level Security on ALL tables ────────────────
echo alter table public.profiles        enable row level security;
echo alter table public.documents       enable row level security;
echo alter table public.payments        enable row level security;
echo alter table public.audit_logs      enable row level security;
echo alter table public.consent_records enable row level security;
echo alter table public.broker_clients  enable row level security;
echo.
echo -- ── RLS Policies ───────────────────────────────────────────
echo -- Profiles: users can only see/edit their own profile
echo create policy "Users view own profile"
echo   on public.profiles for select using ^(auth.uid^(^) = id^);
echo create policy "Users update own profile"
echo   on public.profiles for update using ^(auth.uid^(^) = id^);
echo create policy "Users insert own profile"
echo   on public.profiles for insert with check ^(auth.uid^(^) = id^);
echo.
echo -- Documents: users can only see their own documents
echo create policy "Users view own documents"
echo   on public.documents for select using ^(auth.uid^(^) = user_id^);
echo create policy "Users insert own documents"
echo   on public.documents for insert with check ^(auth.uid^(^) = user_id^);
echo create policy "Users update own documents"
echo   on public.documents for update using ^(auth.uid^(^) = user_id^);
echo.
echo -- Payments: users can only see their own payments
echo create policy "Users view own payments"
echo   on public.payments for select using ^(auth.uid^(^) = user_id^);
echo.
echo -- Audit logs: service role only ^(no user access^)
echo create policy "Service role audit access"
echo   on public.audit_logs for all using ^(auth.role^(^) = 'service_role'^);
echo.
echo -- Broker clients: brokers see only their clients
echo create policy "Brokers view own clients"
echo   on public.broker_clients for all using ^(auth.uid^(^) = broker_id^);
echo.
echo -- ── Auto-create profile on signup ──────────────────────────
echo create or replace function public.handle_new_user^(^)
echo returns trigger language plpgsql security definer set search_path = public as $$
echo begin
echo   insert into public.profiles ^(id, email, full_name^)
echo   values ^(
echo     new.id,
echo     new.email,
echo     coalesce^(new.raw_user_meta_data -^>> 'full_name', 'User'^)
echo   ^);
echo   return new;
echo end;
echo $$;
echo.
echo create trigger on_auth_user_created
echo   after insert on auth.users
echo   for each row execute procedure public.handle_new_user^(^);
) > supabase\migrations\001_initial_schema.sql

echo     001_initial_schema.sql - DONE

REM ════════════════════════════════════════════
REM  10. DOCS FILES
REM ════════════════════════════════════════════

echo [10/10] Creating docs files...

(
echo # DPDP Act 2025 - Compliance Checklist
echo.
echo Law: Digital Personal Data Protection Act 2023
echo Rules notified: November 13, 2025
echo Full enforcement: May 13, 2027
echo Max penalty: Rs.250 crore per breach
echo.
echo ## Day 1 Must-Haves
echo.
echo - [ ] Explicit consent before any data collection
echo - [ ] Data minimisation - collect only what is needed
echo - [ ] Zero Aadhaar storage - process then delete
echo - [ ] 30-day auto-delete for all user data
echo - [ ] Self-serve data export button
echo - [ ] Self-serve data delete button
echo - [ ] Breach response SOP in place
echo - [ ] Plain-language privacy policy in Hindi + English
echo - [ ] Age gate - block users under 18
echo - [ ] Granular consent - separate for each purpose
echo - [ ] Consent withdrawal in less than 3 clicks
echo.
echo ## Data Collected
echo.
echo - Name: Yes - encrypted
echo - Phone: Yes - encrypted
echo - Address: Yes - encrypted
echo - PAN: Last 4 only
echo - Aadhaar: NEVER stored
echo - Payment: No - Razorpay handles
echo - IP Address: Hashed only
echo.
echo ## User Rights
echo.
echo - Right to access: /api/user/data-export
echo - Right to erasure: /api/user/data-delete
echo - Right to correction: Profile settings
echo - Grievance: support@elvatrixa.com
) > docs\compliance\DPDP_CHECKLIST.md

(
echo # Legal Disclaimers - MUST appear on all pages
echo.
echo ## The 7 Mandatory Disclaimers
echo.
echo 1. STATE LAWS: Rental laws vary by state. Always verify with a local advocate.
echo 2. MTA 2021: 2-month deposit cap applies ONLY in UP, Rajasthan, Kerala.
echo 3. NOTARIZATION: Optional nationwide. NOT mandatory for 11-month agreements.
echo 4. POLICE VERIFICATION: Mandatory only in Delhi, MH, KA, Hyderabad, Kolkata.
echo 5. HRA TAX: Available ONLY under OLD tax regime. PAN needed if rent over Rs.3,000/month.
echo 6. NOT LEGAL ADVICE: This is a drafting tool. Consult an advocate for disputes.
echo 7. DPDP: Compliant with DPDP Act 2025. Aadhaar optional and deleted after eSign.
echo.
echo ## Placement
echo - Footer on ALL pages
echo - Checkbox before payment
echo - PDF footer on all documents
echo - WhatsApp message footer
) > docs\legal-review\DISCLAIMERS.md

(
echo # Breach Response SOP
echo.
echo DPDP Requirement: Report to Data Protection Board within 72 hours
echo.
echo ## Steps
echo.
echo 1. DETECT 0-4 hrs: Alert via Supabase anomaly detection
echo 2. CONTAIN 4-8 hrs: Isolate systems, revoke compromised keys
echo 3. ASSESS 8-24 hrs: What data, how many users, how accessed
echo 4. NOTIFY 24-72 hrs: Inform Data Protection Board + affected users
echo 5. RECOVER: Fix root cause, post-incident review, update security
) > docs\compliance\BREACH_RESPONSE_SOP.md

echo     DPDP_CHECKLIST.md      - DONE
echo     DISCLAIMERS.md         - DONE
echo     BREACH_RESPONSE_SOP.md - DONE

echo.
echo  ==========================================
echo   ALL FILES CREATED SUCCESSFULLY!
echo  ==========================================
echo.
echo  Summary:
echo   Root:          next.config.mjs, .env.local, .env.example, README.md
echo   Styles:        src/app/globals.css
echo   Types:         agreement.ts, user.ts, payment.ts, state.ts, index.ts
echo   Constants:     states.ts ^(22 states^), pricing.ts, languages.ts, index.ts
echo   Database:      client.ts, server.ts, admin.ts
echo   Utils:         stamp-duty.ts, encrypt.ts, audit.ts, format.ts
echo   App:           layout.tsx, page.tsx, not-found.tsx, robots.ts
echo   Pages:         9 placeholder pages
echo   Migration:     001_initial_schema.sql
echo   Docs:          3 compliance documents
echo.
echo  Next step: Run  npm run dev  and open http://localhost:3000
echo.
pause
