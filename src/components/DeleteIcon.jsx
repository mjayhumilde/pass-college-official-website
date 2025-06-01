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
    if (dataLabel === "event") {
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
        className="transition text-red-50 hover:cursor-pointer"
        title="Delete Item"
        onClick={handleDeleteClick}
      >
        <Trash2 className="w-5 h-5 sm:h-5 sm:w-5" />
      </button>

      {/* Confirmation Popup */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-red-950 bg-black/50">
          <div className="w-full max-w-md p-4 bg-white rounded-lg sm:p-6">
            <h2 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-sm sm:mb-6 sm:text-base">
              Are you sure you want to delete this {itemType}? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded-full text-red-primary hover:bg-red-100 border-red-primary hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-white rounded-full bg-red-primary hover-bg-red-primary hover:cursor-pointer hover:bg-red-800"
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
