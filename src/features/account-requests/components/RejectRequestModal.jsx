export default function RejectRequestModal({
  isOpen,
  reason,
  isLoading,
  onReasonChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Reject Request
        </h3>
        <p className="text-gray-600 mb-4">
          Please provide a reason for rejecting this request:
        </p>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-primary focus:border-transparent"
          rows={4}
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(event) => onReasonChange(event.target.value)}
        />
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!reason.trim() || isLoading}
            className="flex-1 px-4 py-2 bg-red-primary text-white rounded-lg hover:bg-red-800 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reject Request
          </button>
        </div>
      </form>
    </div>
  );
}
