import { Check, Eye, RefreshCw, X } from "lucide-react";
import { formatAccountRequestDate } from "../utils/accountRequestFormatters";
import AccountRequestStatusBadge from "./AccountRequestStatusBadge";

export default function AccountRequestsTable({
  requests,
  isLoading,
  onView,
  onApprove,
  onReject,
  onOverride,
}) {
  if (isLoading && requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">No requests found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course &amp; Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {request.firstName} {request.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{request.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {request.studentNumber || (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{request.course}</div>
                  <div className="text-sm text-gray-500 capitalize">
                    {request.role}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <AccountRequestStatusBadge status={request.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatAccountRequestDate(request.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(request)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
                      aria-label="View request details"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => onApprove(request._id)}
                          disabled={isLoading}
                          className="p-1 text-green-400 hover:text-green-700 transition-colors hover:cursor-pointer"
                          aria-label="Approve request"
                          title="Approve Request"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onReject(request)}
                          disabled={isLoading}
                          className="p-1 text-red-400 hover:text-red-700 transition-colors hover:cursor-pointer"
                          aria-label="Reject request"
                          title="Reject Request"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {request.status === "rejected" && (
                      <button
                        onClick={() => onOverride(request._id)}
                        disabled={isLoading}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors hover:cursor-pointer"
                        title="Override Rejection"
                      >
                        Override
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
