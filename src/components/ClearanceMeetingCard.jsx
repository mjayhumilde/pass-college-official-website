import { useEffect } from "react";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  Loader2,
  CheckCircle,
  FileText,
} from "lucide-react";
import useClearanceStore from "../store/useClearanceStore";
const ClearanceMeetingCard = ({ documentId, clearanceStatus }) => {
  const {
    fetchMeetingForDocument,
    getMeetingForDocument,
    isLoadingForDocument,
  } = useClearanceStore();

  useEffect(() => {
    if (clearanceStatus === "scheduled" || clearanceStatus === "completed") {
      fetchMeetingForDocument(documentId);
    }
  }, [documentId, clearanceStatus, fetchMeetingForDocument]);

  const isLoading = isLoadingForDocument(documentId);
  const meeting = getMeetingForDocument(documentId);

  if (clearanceStatus !== "scheduled" && clearanceStatus !== "completed") {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-600">
        <Loader2 size={12} className="animate-spin" />
        <span>Loading meeting details...</span>
      </div>
    );
  }

  if (!meeting) return null;

  const meetingDate = new Date(meeting.meetingDate);
  const isPast = meetingDate < new Date();

  const formattedDate = meetingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = meetingDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden ${
        clearanceStatus === "completed"
          ? "border-green-200 bg-green-50"
          : "border-blue-200 bg-blue-50"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 ${
          clearanceStatus === "completed"
            ? "bg-green-100 border-b border-green-200"
            : "bg-blue-100 border-b border-blue-200"
        }`}
      >
        {clearanceStatus === "completed" ? (
          <CheckCircle
            size={14}
            className="text-green-600 flex-shrink-0 sm:w-4 sm:h-4"
          />
        ) : (
          <Calendar
            size={14}
            className="text-blue-600 flex-shrink-0 sm:w-4 sm:h-4"
          />
        )}
        <span
          className={`font-bold text-xs sm:text-sm ${
            clearanceStatus === "completed" ? "text-green-800" : "text-blue-800"
          }`}
        >
          {clearanceStatus === "completed"
            ? "Clearance Meeting — Completed"
            : isPast
              ? "Clearance Meeting — Awaiting Completion"
              : "Clearance Meeting Scheduled"}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 sm:px-4 py-3 space-y-2 sm:space-y-2.5">
        {/* Date & Time */}
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
            <Calendar size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
              Date & Time
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-800">
              {formattedDate}
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
              <Clock size={10} className="sm:w-3 sm:h-3" />
              {formattedTime}
            </p>
          </div>
        </div>

        {/* Room */}
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
            <MapPin size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
              Room / Location
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-800">
              {meeting.room}
            </p>
          </div>
        </div>

        {/* Teacher */}
        {meeting.teacher && (
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
              <User size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                Assigned Teacher
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800">
                {meeting.teacher.firstName} {meeting.teacher.lastName}
              </p>
              <p className="text-xs text-gray-500">{meeting.teacher.email}</p>
            </div>
          </div>
        )}

        {/* Description */}
        {meeting.description && (
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
              <FileText size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                Notes
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {meeting.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearanceMeetingCard;
