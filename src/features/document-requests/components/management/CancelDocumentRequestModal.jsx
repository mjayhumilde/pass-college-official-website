import { Loader2, XCircle } from "lucide-react";

export default function CancelDocumentRequestModal({
  cancelReason,
  isLoading,
  request,
  onCancelReasonChange,
  onClose,
  onConfirm,
}) {
  if (!request) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
              <XCircle className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Cancel Request</h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            Please provide a detailed reason for cancelling this document
            request. This will be visible to the student.
          </p>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-600">*</span>
            </label>
            <textarea
              value={cancelReason}
              onChange={(event) => onCancelReasonChange(event.target.value)}
              placeholder="Enter the reason for cancellation..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all resize-none"
              rows="4"
            />
            <p className="mt-2 text-xs text-gray-500">
              Minimum 10 characters required
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading || cancelReason.trim().length < 10}
              className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Cancelling...
                </>
              ) : (
                "Confirm Cancel"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
