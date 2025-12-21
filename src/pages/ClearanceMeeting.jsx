import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  BookOpen,
  FileText,
  MapPin,
  Plus,
  CheckCircle,
  Loader2,
  AlertCircle,
  Search,
  Check,
  RefreshCw,
} from "lucide-react";
import useClearanceStore from "../store/useClearanceStore";

export default function ClearanceMeeting() {
  const {
    pendingClearances,
    loading,
    error,
    fetchPendingClearances,
    scheduleClearanceMeeting,
    rescheduleClearanceMeeting,
    completeClearance,
  } = useClearanceStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(null);
  const [isReschedule, setIsReschedule] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    meetingDate: "",
    meetingTime: "",
    description: "",
  });

  useEffect(() => {
    fetchPendingClearances();
  }, [fetchPendingClearances]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDocumentType = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const openScheduleModal = (doc, reschedule = false) => {
    setSelectedDocument(doc);
    setIsReschedule(reschedule);

    if (reschedule && doc.clearanceMeeting) {
      const meetingDate = new Date(doc.clearanceMeeting.meetingDate);
      const dateStr = meetingDate.toISOString().split("T")[0];
      const timeStr = meetingDate.toTimeString().slice(0, 5);

      setFormData({
        room: doc.clearanceMeeting.room || "",
        meetingDate: dateStr,
        meetingTime: timeStr,
        description: doc.clearanceMeeting.description || "",
      });
    } else {
      setFormData({
        room: "",
        meetingDate: "",
        meetingTime: "",
        description: "",
      });
    }
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedDocument(null);
    setIsReschedule(false);
    setFormData({
      room: "",
      meetingDate: "",
      meetingTime: "",
      description: "",
    });
  };

  const handleScheduleMeeting = async () => {
    if (
      !formData.room.trim() ||
      !formData.meetingDate ||
      !formData.meetingTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const meetingDateTime = new Date(
      `${formData.meetingDate}T${formData.meetingTime}`
    );

    if (meetingDateTime < new Date()) {
      alert("Meeting date and time must be in the future");
      return;
    }

    setScheduleLoading(true);
    try {
      const payload = {
        room: formData.room.trim(),
        meetingDate: meetingDateTime.toISOString(),
        description: formData.description.trim() || undefined,
      };

      if (isReschedule) {
        await rescheduleClearanceMeeting(selectedDocument._id, payload);
        alert("Clearance meeting rescheduled successfully!");
      } else {
        await scheduleClearanceMeeting(selectedDocument._id, payload);
        alert("Clearance meeting scheduled successfully!");
      }

      closeScheduleModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to schedule meeting");
    } finally {
      setScheduleLoading(false);
    }
  };

  const handleCompleteClearance = async (documentId) => {
    if (
      !window.confirm(
        "Are you sure you want to mark this clearance as completed? This action cannot be undone."
      )
    ) {
      return;
    }

    setCompleteLoading(documentId);
    try {
      await completeClearance(documentId);
      alert("Clearance completed successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to complete clearance");
    } finally {
      setCompleteLoading(null);
    }
  };

  const filteredRequests = pendingClearances.filter((request) => {
    const studentName = `${request.requestedBy?.firstName || ""} ${
      request.requestedBy?.lastName || ""
    }`.toLowerCase();
    const email = (request.requestedBy?.email || "").toLowerCase();
    const course = (request.requestedBy?.course || "").toLowerCase();
    const documentType = (request.documentType || "").toLowerCase();

    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      course.includes(searchTerm.toLowerCase()) ||
      documentType.includes(searchTerm.toLowerCase())
    );
  });

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const canCompleteClearance = (meeting) => {
    if (!meeting) return false;
    const meetingTime = new Date(meeting.meetingDate).getTime();
    const now = Date.now();
    return now >= meetingTime;
  };

  const getStatusBadge = (clearanceStatus) => {
    if (clearanceStatus === "awaiting") {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
          <Clock size={12} />
          Awaiting Clearance
        </div>
      );
    } else if (clearanceStatus === "scheduled") {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
          <Calendar size={12} />
          Meeting Scheduled
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-primary to-red-700 px-6 py-12 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
              <Calendar className="text-red-primary" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">
                Clearance Management
              </h1>
              <p className="text-red-50 text-lg">
                Review and schedule clearance meetings with students
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-amber-800 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">
                Pending Clearances
              </p>
              <p className="text-3xl font-bold mt-1">
                {pendingClearances.length}
              </p>
            </div>
            <div className="bg-amber-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">
                Awaiting Schedule
              </p>
              <p className="text-3xl font-bold mt-1">
                {
                  pendingClearances.filter(
                    (r) => r.clearanceStatus === "awaiting"
                  ).length
                }
              </p>
            </div>
            <div className="bg-green-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">Scheduled</p>
              <p className="text-3xl font-bold mt-1">
                {
                  pendingClearances.filter(
                    (r) => r.clearanceStatus === "scheduled"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 shadow-md">
            <AlertCircle
              size={20}
              className="text-red-500 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Search Clearance Requests
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by student name, email, course, or document type..."
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-red-800 focus:border-red-primary
                   sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Loader2
              className="animate-spin text-red-primary mx-auto mb-4"
              size={56}
            />
            <p className="text-gray-600 font-medium text-lg">
              Loading pending clearance requests...
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-600"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Student Info */}
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

                      {/* Document Info */}
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
                            Requested on {formatDate(request.createdAt)}
                          </span>
                        </div>

                        {/* Clearance Status */}
                        {getStatusBadge(request.clearanceStatus)}
                      </div>

                      {/* Meeting Info if scheduled */}
                      {request.clearanceStatus === "scheduled" &&
                        request.clearanceMeeting && (
                          <div className="ml-16 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <p className="text-sm font-semibold text-green-900 mb-2">
                              Meeting Scheduled
                            </p>
                            <div className="space-y-1 text-sm text-green-700">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                <span>
                                  {formatDate(
                                    request.clearanceMeeting.meetingDate
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>
                                  Room: {request.clearanceMeeting.room}
                                </span>
                              </div>
                              {request.clearanceMeeting.description && (
                                <p className="mt-2">
                                  {request.clearanceMeeting.description}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-3 lg:min-w-[220px]">
                      {request.clearanceStatus === "awaiting" && (
                        <button
                          onClick={() => openScheduleModal(request, false)}
                          className="flex items-center gap-2 px-6 py-3 bg-red-primary text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
                        >
                          <Calendar size={20} />
                          Schedule Meeting
                        </button>
                      )}

                      {request.clearanceStatus === "scheduled" && (
                        <>
                          <button
                            onClick={() => openScheduleModal(request, true)}
                            className="flex items-center gap-2 px-6 py-3 bg-red-primary text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
                          >
                            <RefreshCw size={20} />
                            Reschedule
                          </button>

                          <button
                            onClick={() => handleCompleteClearance(request._id)}
                            disabled={
                              !canCompleteClearance(request.clearanceMeeting) ||
                              completeLoading === request._id
                            }
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:cursor-pointer w-full justify-center"
                            title={
                              !canCompleteClearance(request.clearanceMeeting)
                                ? "Can only complete after meeting time"
                                : "Mark clearance as completed"
                            }
                          >
                            {completeLoading === request._id ? (
                              <Loader2 className="animate-spin" size={20} />
                            ) : (
                              <Check size={20} />
                            )}
                            Complete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule/Reschedule Meeting Modal */}
      {showScheduleModal && selectedDocument && (
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
                    {selectedDocument.requestedBy?.firstName}{" "}
                    {selectedDocument.requestedBy?.lastName}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Student Info Summary */}
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-sm font-semibold text-red-primary mb-2">
                  Document Request
                </p>
                <p className="text-red-primary font-medium">
                  {formatDocumentType(selectedDocument.documentType)}
                </p>
                <p className="text-sm red text-red-primary mt-1">
                  {selectedDocument.requestedBy?.email}
                </p>
                {selectedDocument.requestedBy?.course && (
                  <p className="text-sm red text-red-primary">
                    {selectedDocument.requestedBy.course}
                  </p>
                )}
              </div>

              {/* Meeting Room */}
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
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    placeholder="e.g., Faculty Room 201, Library Room A"
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>
              </div>

              {/* Meeting Date */}
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
                    onChange={(e) =>
                      setFormData({ ...formData, meetingDate: e.target.value })
                    }
                    min={getTodayDate()}
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>
              </div>

              {/* Meeting Time */}
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
                    onChange={(e) =>
                      setFormData({ ...formData, meetingTime: e.target.value })
                    }
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Meeting Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add any notes or requirements for the meeting..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all resize-none"
                  rows="4"
                />
              </div>

              {/* Info Box */}
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeScheduleModal}
                  disabled={scheduleLoading}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleMeeting}
                  disabled={
                    scheduleLoading ||
                    !formData.room.trim() ||
                    !formData.meetingDate ||
                    !formData.meetingTime
                  }
                  className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {scheduleLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      {isReschedule ? "Rescheduling..." : "Scheduling..."}
                    </>
                  ) : (
                    <>
                      {isReschedule ? (
                        <RefreshCw size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                      {isReschedule ? "Reschedule Meeting" : "Schedule Meeting"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
