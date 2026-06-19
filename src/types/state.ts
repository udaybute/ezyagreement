export type RegistrationRequirement = "all" | "above_11_months" | "not_required"

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
  mta_adopted: boolean
  deposit_cap_months?: number
  registration_required: RegistrationRequirement
  police_verification_required: boolean
  police_verification_portal?: string
  stamp_duty_formula: StampDutyFormula
  estamp_available: boolean
  estamp_portal?: string
  online_registration: boolean
  major_cities: string[]
}