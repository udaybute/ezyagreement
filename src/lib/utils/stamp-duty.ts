import { getStateByCode } from "@/lib/constants"

export function calculateStampDuty(
  stateCode: string,
  monthlyRent: number,
  durationMonths: number,
  securityDeposit: number
): number {
  const state = getStateByCode(stateCode)
  if (!state) return 0

  const f = state.stamp_duty_formula
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

export function isDepositExceedingCap(
  stateCode: string,
  monthlyRent: number,
  securityDeposit: number
): boolean {
  const state = getStateByCode(stateCode)
  if (!state?.deposit_cap_months) return false
  return securityDeposit > (monthlyRent * state.deposit_cap_months)
}