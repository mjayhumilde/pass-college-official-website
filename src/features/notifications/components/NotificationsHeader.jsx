import { Bell } from "lucide-react";

export default function NotificationsHeader({ unreadCount }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold md:text-3xl text-red-primary">
        Notifications
      </h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-500">
          {unreadCount} unread
        </span>
        <Bell className="text-red-800" size={20} />
      </div>
    </div>
  );
}
