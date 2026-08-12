import { AlertCircle, CheckCircle } from "lucide-react";

export default function NewsletterAlerts({
  sendSuccess,
  sendError,
  subscriberError,
}) {
  return (
    <>
      {sendSuccess && (
        <div className="flex items-center gap-2 p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-xl">
          <CheckCircle size={18} />
          <span>{sendSuccess}</span>
        </div>
      )}

      {sendError && (
        <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-xl">
          <AlertCircle size={18} />
          <span>{sendError}</span>
        </div>
      )}

      {subscriberError && (
        <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-xl">
          <AlertCircle size={18} />
          <span>{subscriberError}</span>
        </div>
      )}
    </>
  );
}
