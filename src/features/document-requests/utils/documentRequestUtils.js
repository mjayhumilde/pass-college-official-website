import { CheckCircle, Clock, Loader2, Package, XCircle } from "lucide-react";

const STATUS_CONFIGS = {
  pending: {
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-500",
    label: "Pending",
  },
  processing: {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Loader2,
    iconColor: "text-blue-500",
    label: "Processing",
  },
  "ready-to-pickup": {
    color: "bg-green-50 text-green-700 border-green-200",
    icon: Package,
    iconColor: "text-green-500",
    label: "Ready to Pickup",
  },
  completed: {
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: CheckCircle,
    iconColor: "text-gray-500",
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    iconColor: "text-red-500",
    label: "Cancelled",
  },
};

export const DOCUMENT_STATUS_TIMELINE = [
  "pending",
  "processing",
  "ready-to-pickup",
  "completed",
];

export function getStatusConfig(status) {
  return STATUS_CONFIGS[status] || STATUS_CONFIGS.pending;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDocumentType(type) {
  if (type.includes("-")) {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return type;
}
