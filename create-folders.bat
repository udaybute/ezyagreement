@echo off
echo.
echo  ==========================================
echo   ELVATRIXA LEGAL - Creating Folders...
echo  ==========================================
echo.

REM ── SRC/APP/(marketing) - Public pages ────────────────────
mkdir "src\app\(marketing)"
mkdir "src\app\(marketing)\about"
mkdir "src\app\(marketing)\pricing"
mkdir "src\app\(marketing)\blog"
mkdir "src\app\(marketing)\blog\[slug]"
mkdir "src\app\(marketing)\contact"
mkdir "src\app\(marketing)\legal"
mkdir "src\app\(marketing)\legal\privacy"
mkdir "src\app\(marketing)\legal\terms"
mkdir "src\app\(marketing)\legal\disclaimer"
mkdir "src\app\(marketing)\legal\refund"
mkdir "src\app\(marketing)\rent-agreement"
mkdir "src\app\(marketing)\rent-agreement\[state]"
mkdir "src\app\(marketing)\rent-agreement\[state]\[city]"
mkdir "src\app\(marketing)\hra-receipt"
mkdir "src\app\(marketing)\stamp-duty-calculator"
mkdir "src\app\(marketing)\police-verification"
echo  [1/8] (marketing) pages - DONE

REM ── SRC/APP/(auth) - Login / Register ─────────────────────
mkdir "src\app\(auth)"
mkdir "src\app\(auth)\login"
mkdir "src\app\(auth)\register"
mkdir "src\app\(auth)\verify"
mkdir "src\app\(auth)\onboarding"
echo  [2/8] (auth) pages - DONE

REM ── SRC/APP/(app) - Dashboard / Logged-in pages ───────────
mkdir "src\app\(app)"
mkdir "src\app\(app)\dashboard"
mkdir "src\app\(app)\agreements"
mkdir "src\app\(app)\agreements\new"
mkdir "src\app\(app)\agreements\new\rental"
mkdir "src\app\(app)\agreements\new\commercial"
mkdir "src\app\(app)\agreements\new\noc"
mkdir "src\app\(app)\agreements\new\affidavit"
mkdir "src\app\(app)\agreements\[id]"
mkdir "src\app\(app)\agreements\[id]\preview"
mkdir "src\app\(app)\agreements\[id]\download"
mkdir "src\app\(app)\receipts"
mkdir "src\app\(app)\receipts\new"
mkdir "src\app\(app)\broker"
mkdir "src\app\(app)\broker\dashboard"
mkdir "src\app\(app)\broker\clients"
mkdir "src\app\(app)\broker\clients\[id]"
mkdir "src\app\(app)\broker\reports"
mkdir "src\app\(app)\profile"
mkdir "src\app\(app)\billing"
mkdir "src\app\(app)\billing\plans"
mkdir "src\app\(app)\billing\history"
mkdir "src\app\(app)\settings"
mkdir "src\app\(app)\settings\privacy"
mkdir "src\app\(app)\settings\notifications"
mkdir "src\app\(app)\settings\account"
mkdir "src\app\(app)\admin"
mkdir "src\app\(app)\admin\users"
mkdir "src\app\(app)\admin\documents"
mkdir "src\app\(app)\admin\payments"
mkdir "src\app\(app)\admin\analytics"
echo  [3/8] (app) dashboard pages - DONE

REM ── SRC/APP/API - Backend routes ──────────────────────────
mkdir "src\app\api\agreements"
mkdir "src\app\api\agreements\generate"
mkdir "src\app\api\agreements\[id]"
mkdir "src\app\api\agreements\[id]\sign"
mkdir "src\app\api\agreements\[id]\download"
mkdir "src\app\api\payments"
mkdir "src\app\api\payments\create-order"
mkdir "src\app\api\payments\verify"
mkdir "src\app\api\webhooks"
mkdir "src\app\api\webhooks\razorpay"
mkdir "src\app\api\webhooks\setu"
mkdir "src\app\api\esign"
mkdir "src\app\api\estamp"
mkdir "src\app\api\whatsapp"
mkdir "src\app\api\whatsapp\send"
mkdir "src\app\api\receipts"
mkdir "src\app\api\user"
mkdir "src\app\api\user\data-export"
mkdir "src\app\api\user\data-delete"
mkdir "src\app\api\admin"
mkdir "src\app\api\cron"
mkdir "src\app\api\cron\delete-expired"
mkdir "src\app\api\seo"
echo  [4/8] API routes - DONE

REM ── SRC/COMPONENTS - All React UI components ──────────────
mkdir "src\components\ui"
mkdir "src\components\forms"
mkdir "src\components\forms\agreement-wizard"
mkdir "src\components\forms\agreement-wizard\steps"
mkdir "src\components\forms\receipt-form"
mkdir "src\components\agreements"
mkdir "src\components\agreements\preview"
mkdir "src\components\agreements\pdf-viewer"
mkdir "src\components\dashboard"
mkdir "src\components\dashboard\widgets"
mkdir "src\components\marketing"
mkdir "src\components\marketing\hero"
mkdir "src\components\marketing\features"
mkdir "src\components\marketing\testimonials"
mkdir "src\components\marketing\pricing"
mkdir "src\components\marketing\faq"
mkdir "src\components\broker"
mkdir "src\components\broker\client-table"
mkdir "src\components\broker\bulk-generator"
mkdir "src\components\receipts"
mkdir "src\components\privacy"
mkdir "src\components\privacy\consent-modal"
mkdir "src\components\privacy\dpdp-banner"
mkdir "src\components\shared"
mkdir "src\components\shared\navbar"
mkdir "src\components\shared\footer"
mkdir "src\components\shared\sidebar"
mkdir "src\components\shared\modals"
echo  [5/8] Components - DONE

REM ── SRC/LIB - Utilities, helpers, data ────────────────────
mkdir "src\lib\constants"
mkdir "src\lib\utils"
mkdir "src\lib\hooks"
mkdir "src\lib\actions"
mkdir "src\lib\db"
mkdir "src\lib\api-clients"
mkdir "src\lib\api-clients\razorpay"
mkdir "src\lib\api-clients\setu"
mkdir "src\lib\api-clients\shcil"
mkdir "src\lib\api-clients\whatsapp"
mkdir "src\lib\api-clients\claude"
mkdir "src\lib\templates"
mkdir "src\lib\templates\states"
mkdir "src\lib\templates\partials"
mkdir "src\lib\templates\hra"
mkdir "src\lib\i18n"
mkdir "src\lib\i18n\messages"
mkdir "src\lib\seo"
echo  [6/8] Lib (utilities + templates) - DONE

REM ── SRC/ Other ─────────────────────────────────────────────
mkdir "src\types"
mkdir "src\config"
mkdir "src\styles"
echo  [6.5/8] Types + Config + Styles - DONE

REM ── PUBLIC ─────────────────────────────────────────────────
mkdir "public\fonts"
mkdir "public\images\og"
mkdir "public\images\icons"
mkdir "public\images\states"
mkdir "public\docs"
echo  [7/8] Public assets - DONE

REM ── PROJECT ROOT FOLDERS ───────────────────────────────────
mkdir "supabase\migrations"
mkdir "supabase\seed"
mkdir "supabase\functions"
mkdir "content\blog"
mkdir "content\seo-pages\states"
mkdir "content\seo-pages\cities"
mkdir "content\seo-pages\documents"
mkdir "scripts\seo"
mkdir "scripts\seed"
mkdir "scripts\deploy"
mkdir "docs\api"
mkdir "docs\compliance"
mkdir "docs\legal-review"
mkdir "docs\architecture"
mkdir "tests\unit"
mkdir "tests\integration"
mkdir "tests\e2e"
echo  [8/8] Supabase + Docs + Tests + Scripts + Content - DONE

echo.
echo  ==========================================
echo   ALL FOLDERS CREATED SUCCESSFULLY!
echo  ==========================================
echo.
echo  Folder breakdown:
echo   src/app/(marketing)  - Public SEO pages
echo   src/app/(app)        - Dashboard pages
echo   src/app/(auth)       - Login/Register
echo   src/app/api          - Backend API routes
echo   src/components       - All UI components
echo   src/lib              - Helpers, templates, utils
echo   src/types            - TypeScript types
echo   supabase             - Database migrations
echo   content              - Blog + SEO content
echo   docs                 - Compliance + legal docs
echo   tests                - Unit + E2E tests
echo.
pause
