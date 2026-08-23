import {
  BookOpen,
  Check,
  Clock,
  FileText,
  Loader2,
  Mail,
  XCircle,
} from "lucide-react";
import {
  canAdvanceDocumentStatus,
  canCancelDocumentStatus,
  formatManagementDate,
  formatManagementDocumentType,
  getManagementStatusConfig,
  getNextDocumentStatus,
} from "../../utils/documentManagementUtils";
import ClearanceStatusNotice from "./ClearanceStatusNotice";

const DEFAULT_AVATAR =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";

export default function ManagedDocumentRequestCard({
  request,
  statusLoading,
  onAdvance,
  onCancel,
}) {
  const statusConfig = getManagementStatusConfig(request.documentStatus);
  const StatusIcon = statusConfig.icon;
  const canAdvance = canAdvanceDocumentStatus(
    request.documentStatus,
    request.requiresClearance,
    request.clearanceStatus,
  );
  const canCancel = canCancelDocumentStatus(request.documentStatus);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-600">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={request.requestedBy?.photo || DEFAULT_AVATAR}
                  alt=""
                  className="w-full h-full object-cover"
                />
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

            <div className="ml-16 space-y-2">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-red-600" />
                <span className="font-semibold text-gray-900">
                  {formatManagementDocumentType(request.documentType)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} />
                <span>
                  Requested on {formatManagementDate(request.dateRequest)}
                </span>
              </div>
            </div>

            {request.cancelReason && (
              <div className="ml-16 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <p className="text-sm font-semibold text-red-900 mb-1">
                  Cancellation Reason
                </p>
                <p className="text-sm text-red-700">{request.cancelReason}</p>
              </div>
            )}

            <ClearanceStatusNotice request={request} />
          </div>

          <div className="flex flex-col items-end gap-4 lg:min-w-[220px]">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm ${statusConfig.color}`}
            >
              <StatusIcon size={16} />
              {statusConfig.label}
            </div>

            <div className="flex gap-2">
              {canAdvance && (
                <button
                  onClick={() =>
                    onAdvance(
                      request._id,
                      getNextDocumentStatus(request.documentStatus),
                    )
                  }
                  disabled={statusLoading === request._id}
                  className="px-4 py-2 rounded-full hover:cursor-pointer bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  {statusLoading === request._id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                  <span className="hidden sm:inline">Advance</span>
                </button>
              )}

              {canCancel && (
                <button
                  onClick={() => onCancel(request)}
                  disabled={statusLoading === request._id}
                  className="px-4 py-2 hover:cursor-pointer rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <XCircle size={16} />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
              )}

              {!canAdvance && !canCancel && (
                <span className="text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-full font-medium">
                  No actions available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
