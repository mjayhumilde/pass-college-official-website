export function createEmptyMeetingForm() {
  return {
    room: "",
    meetingDate: "",
    meetingTime: "",
    description: "",
  };
}

export function createMeetingForm(document, isReschedule) {
  if (!isReschedule || !document.clearanceMeeting) {
    return createEmptyMeetingForm();
  }

  const meetingDate = new Date(document.clearanceMeeting.meetingDate);

  return {
    room: document.clearanceMeeting.room || "",
    meetingDate: meetingDate.toISOString().split("T")[0],
    meetingTime: meetingDate.toTimeString().slice(0, 5),
    description: document.clearanceMeeting.description || "",
  };
}

export function formatClearanceDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDocumentType(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function canCompleteClearance(meeting) {
  if (!meeting) {
    return false;
  }

  return Date.now() >= new Date(meeting.meetingDate).getTime();
}

export function filterClearanceRequests(requests, searchTerm) {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return requests.filter((request) => {
    const studentName =
      `${request.requestedBy?.firstName || ""} ${request.requestedBy?.lastName || ""}`.toLowerCase();
    const email = (request.requestedBy?.email || "").toLowerCase();
    const course = (request.requestedBy?.course || "").toLowerCase();
    const documentType = (request.documentType || "").toLowerCase();

    return (
      studentName.includes(normalizedSearchTerm) ||
      email.includes(normalizedSearchTerm) ||
      course.includes(normalizedSearchTerm) ||
      documentType.includes(normalizedSearchTerm)
    );
  });
}
