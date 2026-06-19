import { createHash, createCipheriv, createDecipheriv, randomBytes } from "crypto"

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

export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16)
}