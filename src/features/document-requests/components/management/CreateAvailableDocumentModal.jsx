import { Loader2, Plus } from "lucide-react";

export default function CreateAvailableDocumentModal({
  formData,
  isLoading,
  isOpen,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  const isSubmitDisabled =
    isLoading ||
    !formData.name.trim() ||
    (formData.requiresClearance && !formData.assignedTeacher.trim());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
              <Plus className="text-red-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Add Available Document
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Document Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => onFieldChange("name", event.target.value)}
              placeholder="e.g., Transcript of Records, Good Moral Certificate"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <input
              type="checkbox"
              id="requiresClearance"
              checked={formData.requiresClearance}
              onChange={(event) =>
                onFieldChange("requiresClearance", event.target.checked)
              }
              className="w-5 h-5 text-red-600 rounded focus:ring-red-600 hover:cursor-pointer"
            />
            <label
              htmlFor="requiresClearance"
              className="flex-1 cursor-pointer"
            >
              <span className="block font-bold text-gray-900">
                Requires Teacher Clearance
              </span>
              <span className="block text-sm text-gray-600">
                Check if this document needs teacher approval
              </span>
            </label>
          </div>

          {formData.requiresClearance && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Assigned Teacher ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.assignedTeacher}
                onChange={(event) =>
                  onFieldChange("assignedTeacher", event.target.value)
                }
                placeholder="Enter teacher's user ID"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
              />
              <p className="mt-2 text-xs text-gray-500">
                Required when clearance is needed
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Create Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
