import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { getTeacherName } from "../../utils/documentManagementUtils";

export default function ClearanceStatusNotice({ request }) {
  if (!request.requiresClearance || request.documentStatus === "cancelled") {
    return null;
  }

  const teacherName = getTeacherName(request.assignedTeacher);

  if (request.clearanceStatus === "awaiting") {
    return (
      <div className="ml-16">
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <AlertCircle
            size={15}
            className="text-amber-600 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-amber-900 mb-0.5">
              Clearance Required - Awaiting Schedule
            </p>
            <p className="text-xs text-amber-700">
              Waiting for <span className="font-semibold">{teacherName}</span>{" "}
              to schedule a clearance meeting. Status cannot be advanced yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (request.clearanceStatus === "scheduled") {
    return (
      <div className="ml-16">
        <div className="flex items-start gap-2.5 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <Clock size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-blue-900 mb-0.5">
              Clearance Meeting Scheduled
            </p>
            <p className="text-xs text-blue-700">
              Meeting set by{" "}
              <span className="font-semibold">{teacherName}</span>. Waiting for
              teacher to mark it as completed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (request.clearanceStatus === "completed") {
    return (
      <div className="ml-16">
        <div className="flex items-start gap-2.5 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
          <CheckCircle
            size={15}
            className="text-green-600 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-green-900 mb-0.5">
              Clearance Approved
            </p>
            <p className="text-xs text-green-700">
              Cleared by <span className="font-semibold">{teacherName}</span>.
              Document can now be processed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
