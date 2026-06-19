"use client"

/**
 * Stamp Duty Calculator - Public page
 * - No login required — free for everyone
 * - SEO: "stamp duty calculator rent agreement India"
 * - Shows correct stamp duty for all 28 states
 * - Responsive: mobile first
 */

import { useState } from "react"
import Link from "next/link"
import { STATES } from "@/lib/constants"
import { calculateStampDuty, isDepositExceedingCap } from "@/lib/utils"

export default function StampDutyCalculatorPage() {
  const [state, setState] = useState("")
  const [monthlyRent, setMonthlyRent] = useState(0)
  const [duration, setDuration] = useState(11)
  const [deposit, setDeposit] = useState(0)

  // ── Get selected state info ────────────────────────────────
  const selectedState = STATES.find((s) => s.code === state)

  // ── Calculate stamp duty ───────────────────────────────────
  const stampDuty = state
    ? calculateStampDuty(state, monthlyRent, duration, deposit)
    : 0

  // ── Check deposit cap warning ──────────────────────────────
  const depositWarning = isDepositExceedingCap(state, monthlyRent, deposit)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Stamp Duty Calculator
        </h1>
        <p className="text-gray-600">
          Calculate exact stamp duty for rental agreements across all 28 states
        </p>
      </div>

      {/* ── Calculator form ── */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Enter Details</h2>
        <div className="space-y-4">

          {/* State */}
          <div>
            <label className="label">State *</label>
            <select className="input" value={state}
              onChange={(e) => setState(e.target.value)}>
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Monthly rent */}
          <div>
            <label className="label">Monthly Rent (Rs.)</label>
            <input className="input" type="number"
              placeholder="e.g. 15000"
              value={monthlyRent || ""}
              onChange={(e) => setMonthlyRent(Number(e.target.value))} />
          </div>

          {/* Duration */}
          <div>
            <label className="label">Duration (Months)</label>
            <div className="grid grid-cols-3 gap-2">
              {[11, 12, 24].map((m) => (
                <button key={m}
                  onClick={() => setDuration(m)}
                  className={`
                    py-2 rounded-lg border text-sm font-medium transition-colors
                    ${duration === m
                      ? "border-blue-700 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }
                  `}>
                  {m} months
                </button>
              ))}
            </div>
          </div>

          {/* Security deposit */}
          <div>
            <label className="label">Security Deposit (Rs.)</label>
            <input className="input" type="number"
              placeholder="e.g. 30000"
              value={deposit || ""}
              onChange={(e) => setDeposit(Number(e.target.value))} />
            {/* MTA deposit warning */}
            {depositWarning && (
              <p className="text-amber-600 text-xs mt-1">
                ⚠️ Deposit exceeds 2-month cap in {selectedState?.name} (MTA 2021)
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ── Result ── */}
      {state && monthlyRent > 0 && (
        <div className="card bg-green-50 border-green-200 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Stamp Duty — {selectedState?.name}
          </h2>
          <div className="space-y-3">

            {/* Main amount */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Stamp Duty Amount</span>
              <span className="text-2xl font-bold text-green-700">
                Rs. {stampDuty.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t border-green-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Rate</span>
                <span className="text-gray-900">
                  {selectedState?.stamp_duty_formula.rate}%
                  ({selectedState?.stamp_duty_formula.type.replace(/_/g, " ")})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">eStamp Available</span>
                <span className={selectedState?.estamp_available
                  ? "text-green-700 font-medium"
                  : "text-red-600 font-medium"}>
                  {selectedState?.estamp_available ? "Yes ✓" : "No — Manual only"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Registration Required</span>
                <span className="text-gray-900">
                  {selectedState?.registration_required === "all"
                    ? "Yes — All agreements"
                    : "Only above 11 months"}
                </span>
              </div>
              {selectedState?.police_verification_required && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Police Verification</span>
                  <span className="text-amber-600 font-medium">Required ⚠️</span>
                </div>
              )}
              {selectedState?.mta_adopted && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Deposit Cap</span>
                  <span className="text-gray-900">
                    Max {selectedState.deposit_cap_months} months rent (MTA 2021)
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── All states table ── */}
      <div className="card mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">
          Stamp Duty — All States
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-500 font-medium">State</th>
                <th className="text-left py-2 text-gray-500 font-medium">Rate</th>
                <th className="text-left py-2 text-gray-500 font-medium">eStamp</th>
                <th className="text-left py-2 text-gray-500 font-medium hidden md:table-cell">Registration</th>
              </tr>
            </thead>
            <tbody>
              {STATES.map((s) => (
                <tr key={s.code}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors
                    ${state === s.code ? "bg-blue-50" : ""}
                  `}>
                  <td className="py-2.5 font-medium text-gray-900">{s.name}</td>
                  <td className="py-2.5 text-gray-600">
                    {s.stamp_duty_formula.rate}%
                  </td>
                  <td className="py-2.5">
                    {s.estamp_available
                      ? <span className="text-green-600">✓</span>
                      : <span className="text-red-500">✗</span>
                    }
                  </td>
                  <td className="py-2.5 text-gray-600 hidden md:table-cell">
                    {s.registration_required === "all"
                      ? "All agreements"
                      : ">11 months"
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-xs leading-relaxed">
          <strong>Disclaimer:</strong> Stamp duty rates are approximate and may vary.
          Always verify with your state's registration department before paying.
          This tool is for reference only, not legal advice.
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="card bg-blue-50 border-blue-200 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">
          Ready to generate your agreement?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          State-specific rental agreement with correct stamp duty — Rs.199 flat
        </p>
        <Link href="/login" className="btn-primary inline-block px-8">
          Generate Agreement — Rs.199
        </Link>
      </div>

    </div>
  )
}