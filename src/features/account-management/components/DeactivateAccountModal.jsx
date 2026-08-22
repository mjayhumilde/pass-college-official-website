import { Loader2 } from "lucide-react";

export default function DeactivateAccountModal({
  account,
  isLoading,
  onClose,
  onConfirm,
}) {
  if (!account) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-4 mx-4 bg-white rounded-lg sm:p-6">
        <h2 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4 text-red-primary">
          Confirm Deactivation
        </h2>
        <p className="mb-4 text-sm sm:mb-6 sm:text-base text-gray-700">
          Are you sure you want to deactivate the account for{" "}
          <span className="font-semibold text-red-primary">
            {account.firstName} {account.lastName}
          </span>
          ? The account can be reactivated later from the deactivated accounts
          list.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-full text-red-primary hover:bg-red-100 border-red-primary hover:cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer disabled:opacity-50 transition flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Deactivating..." : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}
