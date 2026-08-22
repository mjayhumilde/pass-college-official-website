import {
  BookOpen,
  Calendar,
  Check,
  Clock,
  FileText,
  Loader2,
  Mail,
  RefreshCw,
  User,
} from "lucide-react";
import {
  canCompleteClearance,
  formatClearanceDate,
  formatDocumentType,
} from "../utils/clearanceMeetingUtils";
import ClearanceStatusBadge from "./ClearanceStatusBadge";
import ScheduledMeetingDetails from "./ScheduledMeetingDetails";

export default function ClearanceRequestCard({
  completeLoading,
  request,
  onComplete,
  onReschedule,
  onSchedule,
}) {
  const meetingReady = canCompleteClearance(request.clearanceMeeting);
  const isCompleting = completeLoading === request._id;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-600">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-primary to-red-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {request.requestedBy?.photo ? (
                  <img
                    src={request.requestedBy.photo}
                    alt={request.requestedBy.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-white" size={24} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {request.requestedBy?.firstName}{" "}
                  {request.requestedBy?.lastName}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <span>{request.requestedBy?.email}</span>
                  </div>
                  {request.requestedBy?.course && (
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{request.requestedBy.course}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="ml-16 space-y-2">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-red-600" />
                <span className="font-semibold text-gray-900">
                  {formatDocumentType(request.documentType)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} />
                <span>
                  Requested on {formatClearanceDate(request.createdAt)}
                </span>
              </div>
              <ClearanceStatusBadge status={request.clearanceStatus} />
            </div>

            {request.clearanceStatus === "scheduled" &&
              request.clearanceMeeting && (
                <ScheduledMeetingDetails
                  meeting={request.clearanceMeeting}
                  meetingReady={meetingReady}
                />
              )}
          </div>

          <div className="flex flex-col items-end gap-3 lg:min-w-[220px]">
            {request.clearanceStatus === "awaiting" && (
              <button
                onClick={() => onSchedule(request)}
                className="flex items-center gap-2 px-6 py-3 bg-red-primary text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
              >
                <Calendar size={20} />
                Schedule Meeting
              </button>
            )}

            {request.clearanceStatus === "scheduled" && (
              <>
                <button
                  onClick={() => onReschedule(request)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-primary text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
                >
                  <RefreshCw size={20} />
                  Reschedule
                </button>

                <button
                  onClick={() => onComplete(request._id)}
                  disabled={!meetingReady || isCompleting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
                >
                  {isCompleting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Check size={20} />
                  )}
                  Complete
                </button>

                {!meetingReady && request.clearanceMeeting && (
                  <p className="text-xs text-gray-400 text-center w-full flex items-center justify-center gap-1">
                    <Clock size={11} />
                    Available after{" "}
                    {formatClearanceDate(request.clearanceMeeting.meetingDate)}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
