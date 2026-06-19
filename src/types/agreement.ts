export type DocumentType =
  | "rental_agreement"
  | "commercial_lease"
  | "noc"
  | "affidavit"
  | "rent_receipt"
  | "termination_notice"
  | "renewal_notice"

export type AgreementStatus = "draft" | "generated" | "sent" | "signed" | "expired"

export type Language = "en" | "hi" | "mr" | "ta"

export type PropertyType = "residential" | "commercial" | "pg"

export type FurnishingType = "furnished" | "semi-furnished" | "unfurnished"

export type IdType = "pan" | "voter_id" | "passport" | "driving_licence" | "aadhaar_last4"

export interface Party {
  name: string
  address: string
  phone: string
  email?: string
  id_type: IdType
  id_number: string
}

export interface AgreementFormData {
  landlord: Party
  tenant: Party
  property_address: string
  property_type: PropertyType
  furnished: FurnishingType
  monthly_rent: number
  security_deposit: number
  advance_payment?: number
  maintenance_charges?: number
  start_date: string
  duration_months: number
  notice_period_days: number
  lock_in_months?: number
  electricity_payer: "tenant" | "landlord"
  water_payer: "tenant" | "landlord"
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
  delete_after: string
}