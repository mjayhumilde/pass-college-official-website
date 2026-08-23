import { AlertCircle } from "lucide-react";

export default function DocumentManagementError({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 shadow-md">
      <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold text-red-800">Error</p>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    </div>
  );
}
