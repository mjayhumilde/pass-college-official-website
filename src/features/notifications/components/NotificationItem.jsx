import { X } from "lucide-react";
import NotificationTypeIcon from "./NotificationTypeIcon";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function NotificationItem({
  notification,
  onOpen,
  onMarkAsRead,
  onDelete,
}) {
  const isUnread = notification.notifStatus === "unread";

  return (
    <li
      className={`p-4 sm:p-6 transition-colors ${
        isUnread ? "bg-red-50" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex items-start space-x-3 sm:space-x-4 flex-1 cursor-pointer hover:opacity-80"
          onClick={() => onOpen(notification)}
        >
          <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
            <NotificationTypeIcon postType={notification.postType} />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900">
                {notification.title}
              </h3>
              {isUnread && (
                <span className="w-2 h-2 ml-2 bg-red-800 rounded-full" />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {notification.description}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span>{formatDate(notification.createdAt)}</span>
              <span className="mx-2">&bull;</span>
              <span className="capitalize">{notification.postType}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 ml-2">
          {isUnread && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onMarkAsRead(notification._id);
              }}
              className="text-xs text-red-800 hover:text-red-900 hover:cursor-pointer whitespace-nowrap"
            >
              Mark as read
            </button>
          )}
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete(notification._id);
            }}
            className="text-red-primary hover:text-red-800 hover:cursor-pointer"
            aria-label="Delete notification"
            title="Delete notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
