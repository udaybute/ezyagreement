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
  firm_name?: string
  gstin?: string
  state: string
  city: string
  consent: ConsentRecord
  consent_withdrawn: boolean
  consent_withdrawn_at?: string
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