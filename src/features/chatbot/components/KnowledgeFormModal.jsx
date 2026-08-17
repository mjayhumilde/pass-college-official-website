import { Save, X } from "lucide-react";

export default function KnowledgeFormModal({
  isOpen,
  editingItem,
  formData,
  onFieldChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  const isSubmitDisabled = !formData.question.trim() || !formData.answer.trim();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-red-primary">
              {editingItem ? "Edit Knowledge" : "Add New Knowledge"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
              aria-label="Close knowledge form"
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(event) =>
                  onFieldChange("question", event.target.value)
                }
                className="block w-full p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-950 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                placeholder="Enter the question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <textarea
                value={formData.answer}
                onChange={(event) =>
                  onFieldChange("answer", event.target.value)
                }
                rows={6}
                className="block w-full p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-950 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                placeholder="Enter the answer..."
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border hover:cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="hover:cursor-pointer px-6 py-3 bg-red-primary text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Save className="h-5 w-5" />
                {editingItem ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
