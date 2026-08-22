import {
  AlertCircle,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
} from "lucide-react";
import {
  formatDocumentType,
  getTodayDate,
} from "../utils/clearanceMeetingUtils";

export default function ScheduleClearanceMeetingModal({
  document,
  formData,
  isLoading,
  isReschedule,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  if (!document) {
    return null;
  }

  const isSubmitDisabled =
    isLoading ||
    !formData.room.trim() ||
    !formData.meetingDate ||
    !formData.meetingTime;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="bg-red-primary p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
              {isReschedule ? (
                <RefreshCw className="text-red-primary" size={24} />
              ) : (
                <Calendar className="text-red-primary" size={24} />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">
                {isReschedule ? "Reschedule" : "Schedule"} Clearance Meeting
              </h3>
              <p className="text-red-50 text-sm mt-1">
                {document.requestedBy?.firstName}{" "}
                {document.requestedBy?.lastName}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm font-semibold text-red-primary mb-2">
              Document Request
            </p>
            <p className="text-red-primary font-medium">
              {formatDocumentType(document.documentType)}
            </p>
            <p className="text-sm text-red-primary mt-1">
              {document.requestedBy?.email}
            </p>
            {document.requestedBy?.course && (
              <p className="text-sm text-red-primary">
                {document.requestedBy.course}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Meeting Room <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={formData.room}
                onChange={(event) => onFieldChange("room", event.target.value)}
                placeholder="e.g., Faculty Room 201, Library Room A"
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Meeting Date <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="date"
                value={formData.meetingDate}
                onChange={(event) =>
                  onFieldChange("meetingDate", event.target.value)
                }
                min={getTodayDate()}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Meeting Time <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Clock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="time"
                value={formData.meetingTime}
                onChange={(event) =>
                  onFieldChange("meetingTime", event.target.value)
                }
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Meeting Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(event) =>
                onFieldChange("description", event.target.value)
              }
              placeholder="Add any notes or requirements for the meeting..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all resize-none"
              rows="4"
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle
                size={16}
                className="text-amber-700 mt-0.5 flex-shrink-0"
              />
              <div className="text-sm text-amber-700">
                <p className="font-semibold mb-1">Important</p>
                <p>
                  The student will be notified via email about this meeting.
                  Please ensure the meeting details are accurate.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  {isReschedule ? "Rescheduling..." : "Scheduling..."}
                </>
              ) : (
                <>
                  {isReschedule ? <RefreshCw size={18} /> : <Plus size={18} />}
                  {isReschedule ? "Reschedule Meeting" : "Schedule Meeting"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
