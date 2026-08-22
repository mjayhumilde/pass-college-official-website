import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import ClearanceManagementHeader from "../components/ClearanceManagementHeader";
import ClearanceRequestsList from "../components/ClearanceRequestsList";
import ClearanceSearch from "../components/ClearanceSearch";
import ScheduleClearanceMeetingModal from "../components/ScheduleClearanceMeetingModal";
import useClearanceStore from "../store/useClearanceStore";
import {
  createEmptyMeetingForm,
  createMeetingForm,
  filterClearanceRequests,
} from "../utils/clearanceMeetingUtils";

export default function ClearanceMeetingPage() {
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
  const [formData, setFormData] = useState(createEmptyMeetingForm);

  useEffect(() => {
    fetchPendingClearances();
  }, [fetchPendingClearances]);

  const filteredRequests = filterClearanceRequests(
    pendingClearances,
    searchTerm,
  );
  const awaitingCount = pendingClearances.filter(
    (request) => request.clearanceStatus === "awaiting",
  ).length;
  const scheduledCount = pendingClearances.filter(
    (request) => request.clearanceStatus === "scheduled",
  ).length;

  const openScheduleModal = (document, reschedule = false) => {
    setSelectedDocument(document);
    setIsReschedule(reschedule);
    setFormData(createMeetingForm(document, reschedule));
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedDocument(null);
    setIsReschedule(false);
    setFormData(createEmptyMeetingForm());
  };

  const handleFormFieldChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
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
      `${formData.meetingDate}T${formData.meetingTime}`,
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
    } catch (requestError) {
      alert(
        requestError.response?.data?.message || "Failed to schedule meeting",
      );
    } finally {
      setScheduleLoading(false);
    }
  };

  const handleCompleteClearance = async (documentId) => {
    if (
      !window.confirm(
        "Are you sure you want to mark this clearance as completed? This action cannot be undone.",
      )
    ) {
      return;
    }

    setCompleteLoading(documentId);
    try {
      await completeClearance(documentId);
      alert("Clearance completed successfully!");
    } catch (requestError) {
      alert(
        requestError.response?.data?.message || "Failed to complete clearance",
      );
    } finally {
      setCompleteLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ClearanceManagementHeader
        awaitingCount={awaitingCount}
        scheduledCount={scheduledCount}
        totalCount={pendingClearances.length}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
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

        <ClearanceSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <ClearanceRequestsList
          completeLoading={completeLoading}
          isLoading={loading}
          requests={filteredRequests}
          searchTerm={searchTerm}
          onComplete={handleCompleteClearance}
          onReschedule={(document) => openScheduleModal(document, true)}
          onSchedule={(document) => openScheduleModal(document, false)}
        />
      </div>

      {showScheduleModal && (
        <ScheduleClearanceMeetingModal
          document={selectedDocument}
          formData={formData}
          isLoading={scheduleLoading}
          isReschedule={isReschedule}
          onClose={closeScheduleModal}
          onFieldChange={handleFormFieldChange}
          onSubmit={handleScheduleMeeting}
        />
      )}
    </main>
  );
}
