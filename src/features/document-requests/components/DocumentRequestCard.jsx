import { Clock, FileText, Loader2, Shield, Trash2 } from "lucide-react";
import ClearanceMeetingCard from "./ClearanceMeetingCard";
import DocumentStatusTimeline from "./DocumentStatusTimeline";
import {
  formatDate,
  formatDocumentType,
  getStatusConfig,
} from "../utils/documentRequestUtils";

export default function DocumentRequestCard({
  deleteLoading,
  document,
  onDelete,
}) {
  const statusConfig = getStatusConfig(document.documentStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group border-2 border-gray-100 rounded-xl p-4 sm:p-6 hover:border-red-primary hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex-1 space-y-3 sm:space-y-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-primary group-hover:scale-110 transition-all duration-300">
              <FileText className="text-red-primary group-hover:text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-base sm:text-xl font-bold text-gray-900 break-words">
                  {formatDocumentType(document.documentType)}
                </h4>
                {document.requiresClearance && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] sm:text-xs font-bold border border-amber-300">
                    <Shield size={10} className="sm:w-3 sm:h-3" />
                    <span>Clearance Required</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="break-words">
                  Requested {formatDate(document.dateRequest)}
                </span>
              </div>
            </div>
          </div>

          {document.requiresClearance && document.clearanceStatus && (
            <div className="ml-0 sm:ml-16 space-y-3">
              {document.clearanceStatus === "awaiting" && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs sm:text-sm font-semibold">
                  <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>Awaiting Clearance Meeting Schedule</span>
                </div>
              )}

              {(document.clearanceStatus === "scheduled" ||
                document.clearanceStatus === "completed") && (
                <ClearanceMeetingCard
                  documentId={document._id}
                  clearanceStatus={document.clearanceStatus}
                />
              )}
            </div>
          )}

          {document.documentStatus !== "cancelled" && (
            <DocumentStatusTimeline currentStatus={document.documentStatus} />
          )}

          {document.cancelReason && (
            <div className="ml-0 sm:ml-16 mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
              <p className="text-xs sm:text-sm font-semibold text-red-900 mb-1">
                Cancellation Reason
              </p>
              <p className="text-xs sm:text-sm text-red-700 break-words">
                {document.cancelReason}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-bold text-xs sm:text-sm ${statusConfig.color}`}
          >
            <StatusIcon
              size={14}
              className={`${statusConfig.iconColor} sm:w-4 sm:h-4`}
            />
            <span className="whitespace-nowrap">{statusConfig.label}</span>
          </div>

          {document.documentStatus === "pending" && (
            <button
              onClick={() => onDelete(document._id)}
              disabled={deleteLoading === document._id}
              className="inline-flex hover:cursor-pointer items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-red-600 border-2 border-red-200 rounded-full hover:bg-red-50 hover:border-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {deleteLoading === document._id ? (
                <>
                  <Loader2 className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  <span>Delete</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
