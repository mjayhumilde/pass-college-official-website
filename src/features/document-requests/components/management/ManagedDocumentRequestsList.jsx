import { FileText, Loader2 } from "lucide-react";
import ManagedDocumentRequestCard from "./ManagedDocumentRequestCard";

export default function ManagedDocumentRequestsList({
  isLoading,
  requests,
  searchTerm,
  statusFilter,
  statusLoading,
  onAdvance,
  onCancel,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <Loader2 className="animate-spin text-red-600 mx-auto mb-4" size={56} />
        <p className="text-gray-600 font-medium text-lg">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
          <FileText className="text-gray-400" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No requests found
        </h3>
        <p className="text-gray-500">
          {searchTerm || statusFilter !== "all"
            ? "Try adjusting your search or filter criteria"
            : "No document requests have been submitted yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {requests.map((request) => (
        <ManagedDocumentRequestCard
          key={request._id}
          request={request}
          statusLoading={statusLoading}
          onAdvance={onAdvance}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
