"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface AdminDocument {
  id: string
  ref_number: string
  document_type: string
  state_code: string
  city: string
  status: string
  created_at: string
  profiles: { email: string; full_name: string } | null
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<AdminDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchDocuments()
  }, [])

  async function fetchDocuments() {
    setLoading(true)
    const res = await fetch("/api/admin/documents")
    const data = await res.json()
    setDocuments(data.documents ?? [])
    setLoading(false)
  }

  const filtered = documents.filter((d) =>
    d.ref_number?.toLowerCase().includes(search.toLowerCase()) ||
    d.profiles?.email?.toLowerCase().includes(search.toLowerCase()) ||
    d.profiles?.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">

      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Documents</h1>
        <p className="text-gray-500 text-sm mt-1">{documents.length} total documents</p>
      </div>

      <div className="mb-4">
        <input
          className="input"
          type="text"
          placeholder="Search by ref number, name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Loading documents...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((doc) => (
            <div key={doc.id} className="card hover:border-gray-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{doc.ref_number}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                      ${doc.status === "signed" ? "badge-green" : ""}
                      ${doc.status === "generated" ? "badge-blue" : ""}
                      ${doc.status === "draft" ? "badge-amber" : ""}
                      ${doc.status === "expired" ? "badge-gray" : ""}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="capitalize">{doc.document_type.replace(/_/g, " ")}</span>
                    <span>📍 {doc.city}, {doc.state_code}</span>
                    <span>{doc.profiles?.full_name} ({doc.profiles?.email})</span>
                  </div>
                </div>
                <Link
                  href={`/agreements/${doc.id}`}
                  className="btn-secondary py-1.5 text-xs flex-shrink-0"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-medium">No documents found</p>
        </div>
      )}

    </div>
  )
}
