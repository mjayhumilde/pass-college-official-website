import { CheckCircle, Info, Shield } from "lucide-react";

export default function SelectedDocumentInfo({ document }) {
  if (!document) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">
            Document Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-gray-700">
                {document.name}
              </span>
            </div>

            {document.requiresClearance ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <span className="font-bold text-amber-900 text-xs sm:text-sm">
                    Requires Clearance Approval
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  This document requires clearance from your assigned teacher
                  before processing. You&apos;ll be notified once the clearance
                  is approved.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="font-bold text-green-900 text-xs sm:text-sm">
                    No Clearance Required
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-green-800 mt-1 leading-relaxed">
                  This document will be processed immediately after submission.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
