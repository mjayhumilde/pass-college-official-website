import {
  AlertCircle,
  Loader2,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";

export default function SubscribersModal({
  addEmail,
  addError,
  addName,
  loadingSubscribers,
  onAddEmailChange,
  onAddNameChange,
  onAddSubscriber,
  onClose,
  onDeleteSubscriber,
  subscribers,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-red-primary">Subscribers</h2>
            <p className="text-xs text-gray-400">{subscribers.length} total</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Add Subscriber
          </p>
          {addError && (
            <p className="text-xs text-red-600 mb-2 flex items-center gap-1">
              <AlertCircle size={12} /> {addError}
            </p>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name (optional)"
              value={addName}
              onChange={(event) => onAddNameChange(event.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            />
            <input
              type="email"
              placeholder="Email address *"
              value={addEmail}
              onChange={(event) => onAddEmailChange(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" && onAddSubscriber()
              }
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            />
            <button
              onClick={onAddSubscriber}
              disabled={loadingSubscribers}
              className="flex items-center gap-1 px-4 py-2 bg-red-primary text-white text-sm font-semibold rounded-lg hover:bg-red-800 transition disabled:opacity-50 hover:cursor-pointer"
            >
              <UserPlus size={15} />
              Add
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingSubscribers ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-red-primary" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Users size={32} className="mb-2" />
              <p className="text-sm">No subscribers yet</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-800">
                      {subscriber.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          subscriber.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {subscriber.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => onDeleteSubscriber(subscriber._id)}
                        className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition hover:cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
