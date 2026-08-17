import { AlertCircle } from "lucide-react";

export default function KnowledgeErrorBanner({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
      <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
      <span className="text-red-700">{error}</span>
    </div>
  );
}
