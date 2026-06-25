"use client"

import { useState, useEffect } from "react"

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  documents_count: number
  created_at: string
}

const ROLES = ["retail", "broker", "ca", "admin"]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    const res = await fetch("/api/admin/users")
    const data = await res.json()
    setUsers(data.users ?? [])
    setLoading(false)
  }

  async function changeRole(userId: string, role: string) {
    setUpdatingId(userId)
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, role }),
    })
    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)))
    } else {
      alert("Failed to update role. Please try again.")
    }
    setUpdatingId(null)
  }

  const filtered = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">

      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-500 text-sm mt-1">{users.length} total users</p>
      </div>

      <div className="mb-4">
        <input
          className="input"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Loading users...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((u) => (
            <div key={u.id} className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{u.full_name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                    <span>{u.email}</span>
                    <span>{u.documents_count} documents</span>
                    <span>Joined {new Date(u.created_at).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
                <select
                  className="input w-auto py-1.5 text-sm flex-shrink-0"
                  value={u.role}
                  disabled={updatingId === u.id}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">👥</p>
          <p className="font-medium">No users found</p>
        </div>
      )}

    </div>
  )
}
