import { CheckCircle, Clock, Loader2, Package, XCircle } from "lucide-react";

const MANAGEMENT_STATUS_CONFIGS = {
  pending: {
    color: "bg-yellow-50 text-yellow-700 border-yellow-300",
    icon: Clock,
    label: "Pending",
  },
  processing: {
    color: "bg-blue-50 text-blue-700 border-blue-300",
    icon: Loader2,
    label: "Processing",
  },
  "ready-to-pickup": {
    color: "bg-green-50 text-green-700 border-green-300",
    icon: Package,
    label: "Ready to Pickup",
  },
  completed: {
    color: "bg-gray-50 text-gray-700 border-gray-300",
    icon: CheckCircle,
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-50 text-red-700 border-red-300",
    icon: XCircle,
    label: "Cancelled",
  },
};

export const REQUESTS_PER_PAGE = 8;

export function createEmptyAvailableDocumentForm() {
  return {
    name: "",
    requiresClearance: false,
    assignedTeacher: "",
  };
}

export function filterManagedRequests(requests, searchTerm, statusFilter) {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return requests.filter((request) => {
    const studentName =
      `${request.requestedBy?.firstName || ""} ${request.requestedBy?.lastName || ""}`.toLowerCase();
    const email = (request.requestedBy?.email || "").toLowerCase();
    const course = (request.requestedBy?.course || "").toLowerCase();
    const documentType = (request.documentType || "").toLowerCase();
    const matchesSearch =
      studentName.includes(normalizedSearchTerm) ||
      email.includes(normalizedSearchTerm) ||
      course.includes(normalizedSearchTerm) ||
      documentType.includes(normalizedSearchTerm);
    const matchesStatus =
      statusFilter === "all" || request.documentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });
}

export function formatManagementDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatManagementDocumentType(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getManagementStatusConfig(status) {
  return MANAGEMENT_STATUS_CONFIGS[status] || MANAGEMENT_STATUS_CONFIGS.pending;
}

export function getNextDocumentStatus(currentStatus) {
  return {
    pending: "processing",
    processing: "ready-to-pickup",
    "ready-to-pickup": "completed",
  }[currentStatus];
}

export function canAdvanceDocumentStatus(
  status,
  requiresClearance,
  clearanceStatus,
) {
  if (requiresClearance && clearanceStatus !== "completed") {
    return false;
  }

  return ["pending", "processing", "ready-to-pickup"].includes(status);
}

export function canCancelDocumentStatus(status) {
  return ["pending", "processing"].includes(status);
}

export function getDocumentStatusCounts(documents) {
  return {
    all: documents.length,
    pending: documents.filter((document) => document.documentStatus === "pending")
      .length,
    processing: documents.filter(
      (document) => document.documentStatus === "processing",
    ).length,
    "ready-to-pickup": documents.filter(
      (document) => document.documentStatus === "ready-to-pickup",
    ).length,
    completed: documents.filter(
      (document) => document.documentStatus === "completed",
    ).length,
    cancelled: documents.filter(
      (document) => document.documentStatus === "cancelled",
    ).length,
  };
}

export function getTeacherName(assignedTeacher) {
  if (!assignedTeacher) {
    return "assigned teacher";
  }

  if (typeof assignedTeacher === "object" && assignedTeacher.firstName) {
    return `${assignedTeacher.firstName} ${assignedTeacher.lastName}`;
  }

  return "assigned teacher";
}
