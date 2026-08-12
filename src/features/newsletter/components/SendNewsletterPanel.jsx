import { Loader2, Send } from "lucide-react";

export default function SendNewsletterPanel({
  activeSubscriberCount,
  blocksCount,
  loadingSubscribers,
  onSend,
  sending,
  subject,
}) {
  console.log({
    activeSubscriberCount,
    blocksCount,
    loadingSubscribers,
    onSend,
    sending,
    subject,
  });
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
        Send Newsletter
      </p>

      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subject</span>
          <span
            className={`font-semibold ${
              subject ? "text-green-600" : "text-red-400"
            }`}
          >
            {subject ? "Set" : "Missing"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Blocks</span>
          <span
            className={`font-semibold ${
              blocksCount > 0 ? "text-green-600" : "text-red-400"
            }`}
          >
            {blocksCount > 0
              ? `${blocksCount} block${blocksCount > 1 ? "s" : ""}`
              : "None added"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Recipients</span>
          <span className="font-semibold text-gray-700">
            {loadingSubscribers ? "..." : `${activeSubscriberCount} active`}
          </span>
        </div>
      </div>

      <button
        onClick={onSend}
        disabled={sending || !subject.trim() || blocksCount === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-primary text-white font-bold rounded-xl hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
      >
        {sending ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={18} /> Send to All Subscribers
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        An unsubscribe link is automatically added to every email.
      </p>
    </div>
  );
}
