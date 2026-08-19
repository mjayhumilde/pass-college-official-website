export const formatAccountRequestDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const getStatusBadgeClass = (status) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";

  switch (status) {
    case "pending":
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case "approved":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "rejected":
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};
