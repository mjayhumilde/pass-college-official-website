import {
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Trash2,
  UserCheck,
} from "lucide-react";
import { formatManagementDate } from "../../utils/documentManagementUtils";

export default function AvailableDocumentCard({ document, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-red-600 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-primary flex items-center justify-center flex-shrink-0">
            <FileText className="text-white" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">
              {document.name}
            </h3>
            <div className="flex items-center gap-2">
              {document.requiresClearance ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
                  <Shield size={12} />
                  Requires Clearance
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                  <CheckCircle size={12} />
                  No Clearance
                </div>
              )}
            </div>
          </div>
        </div>

        {document.requiresClearance && document.assignedTeacher && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 text-sm">
              <UserCheck size={14} className="text-blue-600" />
              <span className="font-medium text-blue-900">
                Assigned Teacher
              </span>
            </div>
            <p className="text-sm text-blue-700 mt-1 ml-6">
              ID: {document.assignedTeacher}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Clock size={12} />
          <span>Created {formatManagementDate(document.createdAt)}</span>
        </div>

        <button
          onClick={() => onDelete(document)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-200 hover:cursor-pointer"
        >
          <Trash2 size={16} />
          Delete Document
        </button>
      </div>
    </div>
  );
}
