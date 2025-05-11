import usePostStore from "../store/usePostStore";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteIcon({ id, itemType }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const {
    deleteAnnouncement,
    deleteNews,
    deleteEvents,
    deleteUniforms,
    deleteCareers,
  } = usePostStore();

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);

    const dataLabel = itemType.toLowerCase();
    if (dataLabel === "announcement") {
      deleteAnnouncement(id);
    }
    if (dataLabel === "news") {
      deleteNews(id);
    }
    if (dataLabel === "events") {
      deleteEvents(id);
    }
    if (dataLabel === "uniforms") {
      deleteUniforms(id);
    }
    if (dataLabel === "careers") {
      deleteCareers(id);
    }
  };

  return (
    <>
      <button
        className="text-red-primary hover:text-red-800 transition hover:cursor-pointer"
        title="Delete Item"
        onClick={handleDeleteClick}
      >
        <Trash2 className="h-5 w-5 sm:h-5 sm:w-5" />
      </button>

      {/* Confirmation Popup */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete this {itemType}? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 sm:px-4 py-2 text-sm bg-red-primary text-white rounded-lg hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
