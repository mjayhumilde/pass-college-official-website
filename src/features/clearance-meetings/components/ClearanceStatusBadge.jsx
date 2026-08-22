import { Calendar, Clock } from "lucide-react";

export default function ClearanceStatusBadge({ status }) {
  if (status === "awaiting") {
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
        <Clock size={12} />
        Awaiting Clearance
      </div>
    );
  }

  if (status === "scheduled") {
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
        <Calendar size={12} />
        Meeting Scheduled
      </div>
    );
  }

  return null;
}
