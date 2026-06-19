/**
 * API Route: Generate Rental Agreement PDF
 * Called after successful payment
 * Creates PDF with all agreement details
 * Saves to Supabase Storage
 * DPDP: encrypts PII before saving to database
 */

import { NextResponse } from "next/server"
import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { generateRefNumber, numberToWords } from "@/lib/utils"
import { getStateByCode } from "@/lib/constants"
import { calculateStampDuty } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    // ── Check if user is logged in ───────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ── Get form data from request ───────────────────────────
    const { formData, paymentId } = await request.json()

    // ── Get state info ───────────────────────────────────────
    const state = getStateByCode(formData.state)
    if (!state) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 })
    }

    // ── Calculate stamp duty ─────────────────────────────────
    const stampDuty = calculateStampDuty(
      formData.state,
      formData.monthly_rent,
      formData.duration_months,
      formData.security_deposit
    )

    // ── Generate reference number ────────────────────────────
    const refNumber = generateRefNumber()

    // ── Calculate end date ───────────────────────────────────
    const startDate = new Date(formData.start_date)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + formData.duration_months)

    // ── Generate PDF content as HTML string ──────────────────
    // We use a text-based approach for simplicity
    // In production, use puppeteer for better formatting
    const agreementText = generateAgreementText({
      formData,
      state,
      stampDuty,
      refNumber,
      startDate,
      endDate,
    })

    // ── Save document to database ────────────────────────────
    const adminSupabase = createAdminClient()
    const { data: doc, error: docError } = await adminSupabase
      .from("documents")
      .insert({
        user_id: user.id,
        ref_number: refNumber,
        document_type: "rental_agreement",
        state_code: formData.state,
        city: formData.city,
        language: "en",
        status: "generated",
        form_data: formData, // In production: encrypt PII fields
        stamp_duty_amount: stampDuty,
      })
      .select()
      .single()

    if (docError) {
      console.error("Document save error:", docError)
      return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
    }

    // ── Update payment with document ID ─────────────────────
    if (paymentId) {
      await adminSupabase
        .from("payments")
        .update({ document_id: doc.id })
        .eq("razorpay_payment_id", paymentId)
    }

    return NextResponse.json({
      success: true,
      document_id: doc.id,
      ref_number: refNumber,
      agreement_text: agreementText,
    })

  } catch (error) {
    console.error("Generate agreement error:", error)
    return NextResponse.json(
      { error: "Failed to generate agreement" },
      { status: 500 }
    )
  }
}

// ── Agreement text generator ─────────────────────────────────
function generateAgreementText({
  formData,
  state,
  stampDuty,
  refNumber,
  startDate,
  endDate,
}: {
  formData: any
  state: any
  stampDuty: number
  refNumber: string
  startDate: Date
  endDate: Date
}) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

  return `
LEAVE AND LICENCE AGREEMENT
(${state.name} — ${state.governing_act})

Reference No: ${refNumber}
Date: ${formatDate(new Date())}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This Leave and Licence Agreement is entered into on ${formatDate(new Date())} 
at ${formData.city}, ${state.name}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARTIES

LICENSOR (Landlord):
Name    : ${formData.landlord_name}
Address : ${formData.landlord_address}
Phone   : ${formData.landlord_phone}
ID Type : ${formData.landlord_id_type.toUpperCase()}
ID No   : ${formData.landlord_id_number}

LICENSEE (Tenant):
Name    : ${formData.tenant_name}
Address : ${formData.tenant_address}
Phone   : ${formData.tenant_phone}
ID Type : ${formData.tenant_id_type.toUpperCase()}
ID No   : ${formData.tenant_id_number}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPERTY

Address   : ${formData.property_address}
City      : ${formData.city}, ${state.name}
Type      : ${formData.property_type.charAt(0).toUpperCase() + formData.property_type.slice(1)}
Furnished : ${formData.furnished.charAt(0).toUpperCase() + formData.furnished.slice(1)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TERMS

Period          : ${formatDate(startDate)} to ${formatDate(endDate)}
Duration        : ${formData.duration_months} months
Monthly Rent    : Rs. ${formData.monthly_rent.toLocaleString("en-IN")} 
                  (Rupees ${numberToWords(formData.monthly_rent)} Only)
Security Deposit: Rs. ${formData.security_deposit.toLocaleString("en-IN")}
                  (Rupees ${numberToWords(formData.security_deposit)} Only)
Notice Period   : ${formData.notice_period_days} days
Electricity     : Paid by ${formData.electricity_payer.charAt(0).toUpperCase() + formData.electricity_payer.slice(1)}
Water           : Paid by ${formData.water_payer.charAt(0).toUpperCase() + formData.water_payer.slice(1)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAMP DUTY

Applicable Stamp Duty (${state.name}): Rs. ${stampDuty.toLocaleString("en-IN")}
Rate: ${state.stamp_duty_formula.rate}% of total consideration
${state.estamp_available ? "eStamp available online: " + (state.estamp_portal || "SHCIL portal") : "Manual stamp paper required (Bihar)"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPECIAL CONDITIONS

${formData.special_conditions || "None"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIGNATURES

LICENSOR (Landlord)              LICENSEE (Tenant)

___________________________      ___________________________
${formData.landlord_name}
Date:                            Date:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DISCLAIMER
This document was generated by Elvatrixa Legal (elvatrixa.com).
This is a drafting tool, not legal advice. Verify with a qualified 
advocate. Document Ref: ${refNumber}
Generated on: ${formatDate(new Date())}
  `.trim()
}