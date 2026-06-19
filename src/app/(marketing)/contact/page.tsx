"use client"

/**
 * Contact Page
 * - Contact form + WhatsApp + email
 * - Responsive: mobile first
 */

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    // TODO: Connect to email API (Resend)
    // For now just show success
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Contact Us
        </h1>
        <p className="text-gray-600">
          We respond within 48 hours — usually much faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ── Contact form ── */}
        <div>
          {!submitted ? (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-4">
                Send a Message
              </h2>
              <div className="space-y-4">

                <div>
                  <label className="label">Your Name *</label>
                  <input className="input" type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input className="input" type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div>
                  <label className="label">Phone (Optional)</label>
                  <input className="input" type="tel"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>

                <div>
                  <label className="label">Subject *</label>
                  <select className="input" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select subject</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Payment</option>
                    <option value="broker">Broker Plan Enquiry</option>
                    <option value="enterprise">Enterprise Enquiry</option>
                    <option value="legal">Legal Document Query</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">Message *</label>
                  <textarea className="input min-h-[120px] resize-none"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>

                <button
                  className="btn-primary w-full"
                  onClick={handleSubmit}
                  disabled={
                    !form.name || !form.email ||
                    !form.subject || !form.message
                  }>
                  Send Message
                </button>

              </div>
            </div>
          ) : (
            <div className="card text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 text-sm mb-4">
                We will get back to you within 48 hours at {form.email}
              </p>
              <button
                className="btn-secondary text-sm py-2"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: "", email: "", phone: "", subject: "", message: "" })
                }}>
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* ── Contact info ── */}
        <div className="space-y-4">

          {/* WhatsApp */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💬</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Fastest response — usually within 2 hours
                </p>
                <a href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  className="btn-primary py-2 text-sm inline-block">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✉️</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 text-sm mb-1">
                  support@elvatrixa.com
                </p>
                <p className="text-gray-400 text-xs">
                  Response within 48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Office */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📍</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600 text-sm">
                  Hinjewadi, Pune
                </p>
                <p className="text-gray-600 text-sm">
                  Maharashtra, India
                </p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Help</h3>
            <div className="space-y-2 text-sm">
              <Link href="/legal/privacy"
                className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>→</span> Privacy Policy
              </Link>
              <Link href="/legal/terms"
                className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>→</span> Terms of Service
              </Link>
              <Link href="/legal/refund"
                className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>→</span> Refund Policy
              </Link>
              <Link href="/pricing"
                className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>→</span> Pricing
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}