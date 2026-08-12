import { Users } from "lucide-react";

export default function NewsletterHeader({ subscribersCount, onOpenSubscribers }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-red-primary">
          Newsletter Builder
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Compose and send newsletters to your subscribers
        </p>
      </div>

      <button
        onClick={onOpenSubscribers}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border rounded-full text-red-primary border-red-primary hover:bg-red-50 transition hover:cursor-pointer"
      >
        <Users size={16} />
        Subscribers ({subscribersCount})
      </button>
    </div>
  );
}
