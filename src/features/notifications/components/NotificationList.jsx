import NotificationItem from "./NotificationItem";

export default function NotificationList({
  notifications,
  isLoading,
  onOpen,
  onMarkAsRead,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No notifications found.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onOpen={onOpen}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
