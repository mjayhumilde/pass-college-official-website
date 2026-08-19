import RequestStatusIcon from "./RequestStatusIcon";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "approved":
      return "text-green-600 bg-green-50 border-green-200";
    case "rejected":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export default function RequestStatusResult({ statusResult }) {
  if (!statusResult) {
    return null;
  }

  const request = statusResult.data;

  return (
    <div
      className={`p-4 mb-6 border rounded-lg ${getStatusColor(
        request?.status,
      )}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <RequestStatusIcon status={request?.status} size={20} />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">Request Status: {request?.status}</h3>
          {request?.status === "rejected" && request?.rejectionReason && (
            <p className="text-sm mt-1">Reason: {request.rejectionReason}</p>
          )}
          <p className="text-xs mt-1">
            Submitted: {new Date(request?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
