"use client"

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-secondary flex-1 text-center"
    >
      Print / Save as PDF
    </button>
  )
}
