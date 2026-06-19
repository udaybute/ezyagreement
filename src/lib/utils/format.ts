export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string, locale = "en-IN"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function maskAadhaar(aadhaar: string): string {
  return "XXXX-XXXX-" + aadhaar.slice(-4)
}

export function generateRefNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ELV-${year}-${random}`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function numberToWords(num: number): string {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
    "Seventeen","Eighteen","Nineteen"]
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
  if (num === 0) return "Zero"
  if (num < 20) return ones[num]
  if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? " "+ones[num%10] : "")
  if (num < 1000) return ones[Math.floor(num/100)]+" Hundred"+(num%100 ? " "+numberToWords(num%100) : "")
  if (num < 100000) return numberToWords(Math.floor(num/1000))+" Thousand"+(num%1000 ? " "+numberToWords(num%1000) : "")
  if (num < 10000000) return numberToWords(Math.floor(num/100000))+" Lakh"+(num%100000 ? " "+numberToWords(num%100000) : "")
  return numberToWords(Math.floor(num/10000000))+" Crore"+(num%10000000 ? " "+numberToWords(num%10000000) : "")
}