import { CheckCircle, Loader2 } from "lucide-react";
import ClearanceRequestCard from "./ClearanceRequestCard";

export default function ClearanceRequestsList({
  completeLoading,
  isLoading,
  requests,
  searchTerm,
  onComplete,
  onReschedule,
  onSchedule,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <Loader2
          className="animate-spin text-red-primary mx-auto mb-4"
          size={56}
        />
        <p className="text-gray-600 font-medium text-lg">
          Loading pending clearance requests...
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
          <CheckCircle className="text-gray-400" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {searchTerm
            ? "No matching requests found"
            : "No pending clearance requests"}
        </h3>
        <p className="text-gray-500">
          {searchTerm
            ? "Try adjusting your search criteria"
            : "All clearance requests have been completed"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <ClearanceRequestCard
          key={request._id}
          completeLoading={completeLoading}
          request={request}
          onComplete={onComplete}
          onReschedule={onReschedule}
          onSchedule={onSchedule}
        />
      ))}
    </div>
  );
}
