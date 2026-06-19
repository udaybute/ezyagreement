/**
 * Billing Plans Page
 * Server Component
 */

import { createClient } from "@/lib/db/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BillingPlansPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, documents_count")
    .eq("id", user.id)
    .single();

  const currentPlan = profile?.role ?? "retail";

  const plans = [
    {
      id: "retail",
      name: "Pay Per Doc",
      price: "₹199",
      per: "per doc",
      desc: "Perfect for individuals — pay only when you need",
      features: [
        "Instant PDF generation",
        "WhatsApp delivery",
        "eStamp included",
        "30-day storage",
        "Hindi/Marathi output",
        "GST invoice",
      ],
      cta: "Current Plan",
    },
    {
      id: "broker",
      name: "Broker Plan",
      price: "₹1,499",
      per: "per month",
      desc: "For real estate brokers — 20 docs/month",
      features: [
        "20 docs per month",
        "Client dashboard",
        "White-label WhatsApp",
        "Bulk generation",
        "Analytics & reports",
        "Priority support",
      ],
      cta: "Upgrade to Broker",
    },
    {
      id: "ca_reseller",
      name: "CA Reseller",
      price: "₹2,999",
      per: "per month",
      desc: "For CAs and lawyers — unlimited docs",
      features: [
        "Unlimited docs",
        "White-label PDF",
        "Client portal",
        "GST invoice auto-gen",
        "CA dashboard",
        "Volume pricing",
      ],
      cta: "Upgrade to CA Plan",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "₹4,999",
      per: "per month",
      desc: "For co-living and PG operators",
      features: [
        "Unlimited docs",
        "API access",
        "Custom clauses",
        "SLA guarantee",
        "Dedicated support",
        "Custom branding",
      ],
      cta: "Contact Us",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-blue-600 text-sm hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
          Plans & Billing
        </h1>

        <p className="text-gray-500 mt-2">
          Current Plan:
          <span className="ml-2 font-semibold text-blue-700 capitalize">
            {currentPlan}
          </span>
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-xl bg-white shadow-sm p-5 flex flex-col ${
                isCurrent
                  ? "border-2 border-blue-600"
                  : "border border-gray-200"
              }`}
            >
              {isCurrent && (
                <div className="inline-flex w-fit mb-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Current Plan
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900">
                {plan.name}
              </h3>

              <div className="mt-3">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>

                <span className="text-sm text-gray-500 ml-2">
                  {plan.per}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {plan.desc}
              </p>

              <ul className="mt-5 space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-600">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button
                  disabled
                  className="mt-6 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : plan.id === "enterprise" ? (
                <Link
                  href="/contact"
                  className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-center text-sm font-medium hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              ) : (
                <Link
                  href={`/billing/checkout?plan=${plan.id}`}
                  className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment History */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Payment History
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View all past payments and GST invoices.
            </p>
          </div>

          <Link
            href="/billing/history"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}