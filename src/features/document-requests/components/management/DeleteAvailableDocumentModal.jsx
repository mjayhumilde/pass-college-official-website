import { Loader2, Trash2 } from "lucide-react";

export default function DeleteAvailableDocumentModal({
  document,
  isLoading,
  onClose,
  onConfirm,
}) {
  if (!document) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
              <Trash2 className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Delete Document</h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-900 font-semibold mb-2">
              Are you sure you want to delete this document?
            </p>
            <p className="text-red-700 text-sm">
              <strong>{document.name}</strong>
            </p>
          </div>

          <p className="text-gray-600 text-sm">
            This action will soft-delete the document. It will no longer be
            available for students to request, but existing records will be
            preserved.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
