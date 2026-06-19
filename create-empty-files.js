const fs = require("fs");
const path = require("path");

function touch(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, "", "utf8");
  console.log("+ " + filePath);
}

const files = [
  // Root config
  "next.config.mjs",
  ".env.local",
  ".env.example",
  ".gitignore",
  "README.md",

  // Styles
  "src/app/globals.css",

  // App shell
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/not-found.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",

  // Auth pages
  "src/app/(auth)/layout.tsx",
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/register/page.tsx",
  "src/app/(auth)/verify/page.tsx",
  "src/app/(auth)/onboarding/page.tsx",

  // App (dashboard) pages
  "src/app/(app)/layout.tsx",
  "src/app/(app)/dashboard/page.tsx",
  "src/app/(app)/agreements/new/page.tsx",
  "src/app/(app)/agreements/new/rental/page.tsx",
  "src/app/(app)/agreements/new/commercial/page.tsx",
  "src/app/(app)/agreements/new/noc/page.tsx",
  "src/app/(app)/agreements/new/affidavit/page.tsx",
  "src/app/(app)/agreements/[id]/page.tsx",
  "src/app/(app)/agreements/[id]/preview/page.tsx",
  "src/app/(app)/agreements/[id]/download/page.tsx",
  "src/app/(app)/receipts/page.tsx",
  "src/app/(app)/receipts/new/page.tsx",
  "src/app/(app)/broker/dashboard/page.tsx",
  "src/app/(app)/broker/clients/page.tsx",
  "src/app/(app)/broker/clients/[id]/page.tsx",
  "src/app/(app)/broker/reports/page.tsx",
  "src/app/(app)/profile/page.tsx",
  "src/app/(app)/billing/plans/page.tsx",
  "src/app/(app)/billing/history/page.tsx",
  "src/app/(app)/settings/privacy/page.tsx",
  "src/app/(app)/settings/account/page.tsx",
  "src/app/(app)/settings/notifications/page.tsx",
  "src/app/(app)/admin/users/page.tsx",
  "src/app/(app)/admin/documents/page.tsx",
  "src/app/(app)/admin/payments/page.tsx",
  "src/app/(app)/admin/analytics/page.tsx",

  // Marketing pages
  "src/app/(marketing)/layout.tsx",
  "src/app/(marketing)/page.tsx",
  "src/app/(marketing)/about/page.tsx",
  "src/app/(marketing)/pricing/page.tsx",
  "src/app/(marketing)/contact/page.tsx",
  "src/app/(marketing)/blog/page.tsx",
  "src/app/(marketing)/blog/[slug]/page.tsx",
  "src/app/(marketing)/hra-receipt/page.tsx",
  "src/app/(marketing)/stamp-duty-calculator/page.tsx",
  "src/app/(marketing)/police-verification/page.tsx",
  "src/app/(marketing)/rent-agreement/[state]/[city]/page.tsx",
  "src/app/(marketing)/legal/privacy/page.tsx",
  "src/app/(marketing)/legal/terms/page.tsx",
  "src/app/(marketing)/legal/disclaimer/page.tsx",
  "src/app/(marketing)/legal/refund/page.tsx",

  // API routes
  "src/app/api/agreements/generate/route.ts",
  "src/app/api/agreements/[id]/sign/route.ts",
  "src/app/api/agreements/[id]/download/route.ts",
  "src/app/api/payments/create-order/route.ts",
  "src/app/api/payments/verify/route.ts",
  "src/app/api/webhooks/razorpay/route.ts",
  "src/app/api/webhooks/setu/route.ts",
  "src/app/api/esign/route.ts",
  "src/app/api/estamp/route.ts",
  "src/app/api/whatsapp/send/route.ts",
  "src/app/api/receipts/route.ts",
  "src/app/api/user/data-export/route.ts",
  "src/app/api/user/data-delete/route.ts",
  "src/app/api/cron/delete-expired/route.ts",
  "src/app/api/admin/route.ts",

  // Components - UI
  "src/components/ui/button.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/modal.tsx",
  "src/components/ui/badge.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/checkbox.tsx",
  "src/components/ui/toast.tsx",
  "src/components/ui/spinner.tsx",
  "src/components/ui/progress.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/table.tsx",

  // Components - Shared
  "src/components/shared/navbar/index.tsx",
  "src/components/shared/footer/index.tsx",
  "src/components/shared/sidebar/index.tsx",
  "src/components/shared/modals/consent-modal.tsx",
  "src/components/shared/modals/confirm-modal.tsx",

  // Components - Forms (agreement wizard)
  "src/components/forms/agreement-wizard/index.tsx",
  "src/components/forms/agreement-wizard/steps/step-1-type.tsx",
  "src/components/forms/agreement-wizard/steps/step-2-property.tsx",
  "src/components/forms/agreement-wizard/steps/step-3-landlord.tsx",
  "src/components/forms/agreement-wizard/steps/step-4-tenant.tsx",
  "src/components/forms/agreement-wizard/steps/step-5-terms.tsx",
  "src/components/forms/agreement-wizard/steps/step-6-review.tsx",
  "src/components/forms/receipt-form/index.tsx",

  // Components - Agreements
  "src/components/agreements/preview/index.tsx",
  "src/components/agreements/pdf-viewer/index.tsx",
  "src/components/agreements/agreement-card.tsx",

  // Components - Dashboard
  "src/components/dashboard/stats-card.tsx",
  "src/components/dashboard/recent-docs.tsx",
  "src/components/dashboard/widgets/quick-actions.tsx",

  // Components - Marketing
  "src/components/marketing/hero/index.tsx",
  "src/components/marketing/features/index.tsx",
  "src/components/marketing/pricing/index.tsx",
  "src/components/marketing/testimonials/index.tsx",
  "src/components/marketing/faq/index.tsx",

  // Components - Broker
  "src/components/broker/client-table/index.tsx",
  "src/components/broker/bulk-generator/index.tsx",

  // Components - Privacy (DPDP)
  "src/components/privacy/consent-modal/index.tsx",
  "src/components/privacy/dpdp-banner/index.tsx",
  "src/components/privacy/disclaimer-footer.tsx",

  // Components - Receipts
  "src/components/receipts/receipt-form.tsx",
  "src/components/receipts/receipt-preview.tsx",

  // Types
  "src/types/agreement.ts",
  "src/types/user.ts",
  "src/types/payment.ts",
  "src/types/state.ts",
  "src/types/index.ts",

  // Lib - Constants
  "src/lib/constants/states.ts",
  "src/lib/constants/pricing.ts",
  "src/lib/constants/languages.ts",
  "src/lib/constants/index.ts",

  // Lib - DB clients
  "src/lib/db/client.ts",
  "src/lib/db/server.ts",
  "src/lib/db/admin.ts",
  "src/lib/db/index.ts",

  // Lib - Utils
  "src/lib/utils/stamp-duty.ts",
  "src/lib/utils/encrypt.ts",
  "src/lib/utils/audit.ts",
  "src/lib/utils/format.ts",
  "src/lib/utils/index.ts",

  // Lib - Hooks
  "src/lib/hooks/use-auth.ts",
  "src/lib/hooks/use-agreement.ts",
  "src/lib/hooks/use-payment.ts",
  "src/lib/hooks/use-broker.ts",
  "src/lib/hooks/index.ts",

  // Lib - Server Actions
  "src/lib/actions/agreement.ts",
  "src/lib/actions/payment.ts",
  "src/lib/actions/user.ts",
  "src/lib/actions/broker.ts",
  "src/lib/actions/index.ts",

  // Lib - API Clients
  "src/lib/api-clients/razorpay/index.ts",
  "src/lib/api-clients/setu/index.ts",
  "src/lib/api-clients/shcil/index.ts",
  "src/lib/api-clients/whatsapp/index.ts",
  "src/lib/api-clients/claude/index.ts",

  // Lib - Templates
  "src/lib/templates/states/maharashtra.ts",
  "src/lib/templates/states/karnataka.ts",
  "src/lib/templates/states/delhi.ts",
  "src/lib/templates/states/tamil-nadu.ts",
  "src/lib/templates/states/uttar-pradesh.ts",
  "src/lib/templates/states/gujarat.ts",
  "src/lib/templates/states/west-bengal.ts",
  "src/lib/templates/states/rajasthan.ts",
  "src/lib/templates/states/kerala.ts",
  "src/lib/templates/states/telangana.ts",
  "src/lib/templates/states/andhra-pradesh.ts",
  "src/lib/templates/states/haryana.ts",
  "src/lib/templates/states/madhya-pradesh.ts",
  "src/lib/templates/states/punjab.ts",
  "src/lib/templates/states/bihar.ts",
  "src/lib/templates/partials/clauses.ts",
  "src/lib/templates/partials/signature-block.ts",
  "src/lib/templates/partials/disclaimer.ts",
  "src/lib/templates/hra/receipt.ts",

  // Lib - SEO
  "src/lib/seo/metadata.ts",
  "src/lib/seo/generate-pages.ts",

  // Lib - i18n
  "src/lib/i18n/messages/en.json",
  "src/lib/i18n/messages/hi.json",
  "src/lib/i18n/messages/mr.json",
  "src/lib/i18n/messages/ta.json",

  // Config
  "src/config/app.ts",
  "src/config/auth.ts",

  // Supabase
  "supabase/migrations/001_initial_schema.sql",
  "supabase/migrations/002_rls_policies.sql",
  "supabase/seed/states.sql",
  "supabase/seed/test-users.sql",

  // Docs
  "docs/api/agreements.md",
  "docs/api/payments.md",
  "docs/compliance/DPDP_CHECKLIST.md",
  "docs/compliance/BREACH_RESPONSE_SOP.md",
  "docs/legal-review/DISCLAIMERS.md",
  "docs/legal-review/LAWYER_REVIEW_LOG.md",
  "docs/architecture/FOLDER_STRUCTURE.md",
  "docs/architecture/DATABASE_SCHEMA.md",

  // Scripts
  "scripts/seo/generate-pages.js",
  "scripts/seed/seed.js",
  "scripts/deploy/vercel.sh",

  // Content
  "content/blog/rental-agreement-format-maharashtra.md",
  "content/blog/stamp-duty-all-states-2026.md",
  "content/blog/hra-rent-receipt-guide.md",
  "content/blog/police-verification-guide.md",
  "content/blog/mta-2021-fact-check.md",

  // Tests
  "tests/unit/stamp-duty.test.ts",
  "tests/unit/format.test.ts",
  "tests/unit/encrypt.test.ts",
  "tests/integration/agreement.test.ts",
  "tests/integration/payment.test.ts",
  "tests/e2e/generate-agreement.test.ts",
  "tests/e2e/broker-flow.test.ts",
];

console.log("\n==========================================");
console.log(" ELVATRIXA LEGAL - Creating empty files");
console.log("==========================================\n");

files.forEach(touch);

console.log("\n==========================================");
console.log(" DONE! " + files.length + " files created.");
console.log("==========================================");
console.log("\n Now open VS Code and start writing code!");
console.log(" Run: npm run dev\n");
