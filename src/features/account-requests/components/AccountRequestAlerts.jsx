import { CheckCircle, XCircle } from "lucide-react";

export default function AccountRequestAlerts({ success, error }) {
  return (
    <>
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-800">{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
    </>
  );
}
