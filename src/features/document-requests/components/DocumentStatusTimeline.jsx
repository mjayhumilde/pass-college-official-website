import { CheckCircle } from "lucide-react";
import { DOCUMENT_STATUS_TIMELINE } from "../utils/documentRequestUtils";

export default function DocumentStatusTimeline({ currentStatus }) {
  const currentIndex = DOCUMENT_STATUS_TIMELINE.indexOf(currentStatus);

  return (
    <div className="ml-0 sm:ml-16 mt-3 sm:mt-4 overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-2">
        {DOCUMENT_STATUS_TIMELINE.map((status, index) => (
          <div key={status} className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                index <= currentIndex
                  ? "bg-red-primary border-red-primary"
                  : "bg-white border-gray-300"
              }`}
            >
              {index < currentIndex ? (
                <CheckCircle size={12} className="text-white sm:w-4 sm:h-4" />
              ) : index === currentIndex ? (
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
              ) : (
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300" />
              )}
            </div>
            {index < DOCUMENT_STATUS_TIMELINE.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 sm:h-1 ${
                  index < currentIndex ? "bg-red-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 mt-2 min-w-max">
        {DOCUMENT_STATUS_TIMELINE.map((status, index) => (
          <div key={status} className="flex items-center">
            <span
              className={`text-[10px] sm:text-xs font-medium w-14 sm:w-20 ${
                index === currentIndex ? "text-red-primary" : "text-gray-500"
              }`}
            >
              {status === "ready-to-pickup"
                ? "Ready"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            {index < DOCUMENT_STATUS_TIMELINE.length - 1 && (
              <div className="w-8 sm:w-12" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
