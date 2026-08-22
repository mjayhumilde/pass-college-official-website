import { AlertCircle } from "lucide-react";

export default function AccountManagementAlerts({ successMessage, error }) {
  return (
    <>
      {successMessage && (
        <div className="flex items-center gap-2 p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
    </>
  );
}
