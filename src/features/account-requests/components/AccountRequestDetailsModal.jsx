import { X } from "lucide-react";
import { formatAccountRequestDate } from "../utils/accountRequestFormatters";
import AccountRequestStatusBadge from "./AccountRequestStatusBadge";

function DetailField({ label, children }) {
  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-1">{label}</p>
      {children}
    </div>
  );
}

export default function AccountRequestDetailsModal({ request, onClose }) {
  if (!request) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Request Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 hover:cursor-pointer"
            aria-label="Close request details"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailField label="First Name">
              <p className="text-gray-900">{request.firstName}</p>
            </DetailField>
            <DetailField label="Last Name">
              <p className="text-gray-900">{request.lastName}</p>
            </DetailField>
            <DetailField label="Email">
              <p className="text-gray-900">{request.email}</p>
            </DetailField>
            <DetailField label="Student Number">
              <p className="text-gray-900">
                {request.studentNumber || (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </p>
            </DetailField>
            <DetailField label="Course">
              <p className="text-gray-900">{request.course}</p>
            </DetailField>
            <DetailField label="Role">
              <p className="text-gray-900 capitalize">{request.role}</p>
            </DetailField>
            <DetailField label="Status">
              <AccountRequestStatusBadge status={request.status} />
            </DetailField>
            <DetailField label="Submitted">
              <p className="text-gray-900">
                {formatAccountRequestDate(request.createdAt)}
              </p>
            </DetailField>
            {request.updatedAt && request.updatedAt !== request.createdAt && (
              <DetailField label="Last Updated">
                <p className="text-gray-900">
                  {formatAccountRequestDate(request.updatedAt)}
                </p>
              </DetailField>
            )}
          </div>

          {request.registrationFormImages && (
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-3">
                Registration Form Images
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.registrationFormImages.front && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Front</p>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          request.registrationFormImages.front,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      className="w-full hover:cursor-pointer"
                      title="Open front image"
                    >
                      <img
                        src={request.registrationFormImages.front}
                        alt="Registration Form - Front"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                      />
                    </button>
                  </div>
                )}
                {request.registrationFormImages.back && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Back</p>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          request.registrationFormImages.back,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      className="w-full hover:cursor-pointer"
                      title="Open back image"
                    >
                      <img
                        src={request.registrationFormImages.back}
                        alt="Registration Form - Back"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {request.rejectionReason && (
            <DetailField label="Rejection Reason">
              <p className="text-gray-900 bg-red-50 p-3 rounded-lg">
                {request.rejectionReason}
              </p>
            </DetailField>
          )}

          {request.additionalInfo && (
            <DetailField label="Additional Information">
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                {request.additionalInfo}
              </p>
            </DetailField>
          )}
        </div>
      </div>
    </div>
  );
}
