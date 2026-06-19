import Link from "next/link"

export default function NewAgreementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-blue-600 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Document
        </h1>
        <p className="text-gray-500 mt-1">
          Select the type of document you want to generate
        </p>
      </div>

      {/* Document Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link href="/agreements/new/rental" className="card hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📄</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                  Rental Agreement
                </h3>
                <span className="badge-blue">Rs.199</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                11-month residential rental agreement with eStamp
              </p>
              <p className="text-green-600 text-xs mt-2 font-medium">
                ✓ Most popular
              </p>
            </div>
          </div>
        </Link>

        <Link href="/agreements/new/commercial" className="card hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏢</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                  Commercial Lease
                </h3>
                <span className="badge-blue">Rs.499</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Shop, office, godown — commercial property lease
              </p>
            </div>
          </div>
        </Link>

        <Link href="/agreements/new/noc" className="card hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                  NOC
                </h3>
                <span className="badge-blue">Rs.199</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                No Objection Certificate for tenant or property
              </p>
            </div>
          </div>
        </Link>

        <Link href="/agreements/new/affidavit" className="card hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚖️</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                  Affidavit
                </h3>
                <span className="badge-blue">Rs.199</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                General affidavit for court or official use
              </p>
            </div>
          </div>
        </Link>

        <Link href="/receipts/new" className="card hover:border-green-400 hover:shadow-md transition-all cursor-pointer group md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🧾</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                  HRA Rent Receipt
                </h3>
                <span className="badge-green">FREE</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                HRA-compliant rent receipt with PAN check — free forever
              </p>
            </div>
          </div>
        </Link>

      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800 text-xs leading-relaxed">
          <strong>Disclaimer:</strong> This is a document drafting tool, not legal advice.
          Rental laws vary by state. Always verify with a local advocate for complex cases.
        </p>
      </div>

    </div>
  )
}