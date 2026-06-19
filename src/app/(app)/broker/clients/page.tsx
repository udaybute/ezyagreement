"use client"

/**
 * Broker Clients Page
 * - Add, view, search clients
 * - Each client can have multiple agreements
 * - Responsive: mobile first
 */

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/db/client"

// ── Types ────────────────────────────────────────────────────
interface Client {
  id: string
  name: string
  phone: string
  email?: string
  state: string
  city: string
  notes?: string
  created_at: string
}

interface NewClientForm {
  name: string
  phone: string
  email: string
  state: string
  city: string
  notes: string
}

const emptyForm: NewClientForm = {
  name: "",
  phone: "",
  email: "",
  state: "",
  city: "",
  notes: "",
}

export default function BrokerClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<NewClientForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")

  const supabase = createClient()

  // ── Fetch clients on load ────────────────────────────────
  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    setLoading(true)
    const { data } = await supabase
      .from("broker_clients")
      .select("*")
      .order("created_at", { ascending: false })
    setClients(data ?? [])
    setLoading(false)
  }

  // ── Add new client ───────────────────────────────────────
  async function addClient() {
    setSaving(true)
    const { error } = await supabase
      .from("broker_clients")
      .insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        state: form.state,
        city: form.city,
        notes: form.notes || null,
      })

    if (!error) {
      setForm(emptyForm)
      setShowForm(false)
      fetchClients()
    } else {
      alert("Failed to add client. Please try again.")
    }
    setSaving(false)
  }

  // ── Delete client ────────────────────────────────────────
  async function deleteClient(id: string) {
    if (!confirm("Delete this client?")) return
    await supabase.from("broker_clients").delete().eq("id", id)
    fetchClients()
  }

  // ── Filter clients by search ─────────────────────────────
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <Link href="/broker/dashboard"
            className="text-blue-600 text-sm mb-1 block">
            ← Broker Dashboard
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            My Clients
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {clients.length} total clients
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary py-2 text-sm">
          {showForm ? "Cancel" : "+ Add Client"}
        </button>
      </div>

      {/* ── Add client form ── */}
      {showForm && (
        <div className="card mb-6 border-blue-200 bg-blue-50">
          <h2 className="font-semibold text-gray-900 mb-4">Add New Client</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="label">Full Name *</label>
              <input className="input bg-white" type="text"
                placeholder="Client full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div>
              <label className="label">Phone *</label>
              <input className="input bg-white" type="tel"
                placeholder="10-digit mobile"
                maxLength={10}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div>
              <label className="label">Email (Optional)</label>
              <input className="input bg-white" type="email"
                placeholder="client@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label className="label">City *</label>
              <input className="input bg-white" type="text"
                placeholder="e.g. Pune"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div>
              <label className="label">State *</label>
              <input className="input bg-white" type="text"
                placeholder="e.g. Maharashtra"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>

            <div>
              <label className="label">Notes (Optional)</label>
              <input className="input bg-white" type="text"
                placeholder="Any notes about this client"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>

          </div>

          <div className="flex gap-3 mt-4">
            <button
              className="btn-primary py-2 text-sm"
              onClick={addClient}
              disabled={saving || !form.name || !form.phone || !form.city}>
              {saving ? "Saving..." : "Save Client"}
            </button>
            <button
              className="btn-secondary py-2 text-sm"
              onClick={() => { setShowForm(false); setForm(emptyForm) }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Search bar ── */}
      <div className="mb-4">
        <input
          className="input"
          type="text"
          placeholder="Search by name, phone or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ── Clients list ── */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">⏳</p>
          <p className="text-sm">Loading clients...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((client) => (
            <div key={client.id}
              className="card hover:border-gray-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                {/* Client info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span>📱 {client.phone}</span>
                    {client.email && <span>✉️ {client.email}</span>}
                    <span>📍 {client.city}, {client.state}</span>
                  </div>
                  {client.notes && (
                    <p className="text-xs text-gray-400 mt-1">
                      📝 {client.notes}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    href={`/agreements/new/rental?client=${client.id}`}
                    className="btn-primary py-1.5 text-xs">
                    + Agreement
                  </Link>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="btn-secondary py-1.5 text-xs text-red-500 border-red-200 hover:bg-red-50">
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">👥</p>
          {search ? (
            <>
              <p className="font-medium">No clients found for "{search}"</p>
              <button
                onClick={() => setSearch("")}
                className="text-blue-600 text-sm mt-2">
                Clear search
              </button>
            </>
          ) : (
            <>
              <p className="font-medium">No clients yet</p>
              <p className="text-sm mt-1">Add your first client to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-block mt-4 py-2 text-sm">
                Add First Client
              </button>
            </>
          )}
        </div>
      )}

    </div>
  )
}