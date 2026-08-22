import { Calendar, CheckCircle, Clock, FileText, MapPin } from "lucide-react";
import { formatClearanceDate } from "../utils/clearanceMeetingUtils";

export default function ScheduledMeetingDetails({ meeting, meetingReady }) {
  return (
    <div className="ml-16 rounded-xl border-2 border-blue-200 overflow-hidden">
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center gap-2">
        <Calendar size={14} className="text-blue-600 flex-shrink-0" />
        <span className="text-sm font-bold text-blue-800">
          Scheduled Meeting Details
        </span>
        <span
          className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
            meetingReady
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-amber-100 text-amber-700 border-amber-200"
          }`}
        >
          {meetingReady ? <CheckCircle size={10} /> : <Clock size={10} />}
          {meetingReady ? "Ready to Complete" : "Upcoming"}
        </span>
      </div>

      <div className="bg-white px-4 py-3 space-y-2.5">
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
          <Calendar size={14} className="text-blue-500 flex-shrink-0" />
          <span className="font-medium">
            {formatClearanceDate(meeting.meetingDate)}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
          <MapPin size={14} className="text-blue-500 flex-shrink-0" />
          <span>
            Room: <span className="font-medium">{meeting.room}</span>
          </span>
        </div>
        {meeting.description && (
          <div className="flex items-start gap-2.5 text-sm text-gray-600">
            <FileText
              size={14}
              className="text-blue-500 flex-shrink-0 mt-0.5"
            />
            <span>{meeting.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}
