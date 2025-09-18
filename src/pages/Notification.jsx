import { useState, useEffect } from "react";
import useNotificationStore from "../store/useNotificationStore";
import {
  Bell,
  Megaphone,
  Briefcase,
  Newspaper,
  Calendar,
  FileCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);

  const { notifications, fetchNotifications, markAsRead, deleteNotification } =
    useNotificationStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    };
    loadNotifications();
    window.scrollTo(0, 0);
  }, [fetchNotifications]);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.postType === activeTab
  );

  // Pagination
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );

  // Get icon based on notification type
  const getIcon = (postType) => {
    switch (postType) {
      case "announcement":
        return <Megaphone className="text-red-800" size={20} />;
      case "careers":
        return <Briefcase className="text-red-800" size={20} />;
      case "news":
        return <Newspaper className="text-red-800" size={20} />;
      case "events":
        return <Calendar className="text-red-800" size={20} />;
      case "uniforms-update":
        return <Megaphone className="text-red-800" size={20} />;
      case "document":
        return <FileCheck className="text-red-800" size={20} />;
      default:
        return <Bell className="text-red-800" size={20} />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "announcement", label: "Announcements" },
    { id: "careers", label: "Careers" },
    { id: "news", label: "News" },
    { id: "events", label: "Events" },
    { id: "uniforms-update", label: "Uniforms" },
    { id: "document", label: "Documents" },
  ];

  return (
    <main className="min-h-screen p-4 bg-gray-50 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold md:text-3xl text-red-primary">
            Notifications
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              {notifications.filter((n) => n.notifStatus === "unread").length}{" "}
              unread
            </span>
            <Bell className="text-red-800" size={20} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 md:space-x-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 text-sm md:text-base rounded-md transition-colors hover:cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-red-primary text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification List */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : currentNotifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {currentNotifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-4 sm:p-6 transition-colors ${
                    notification.notifStatus === "unread"
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
                        {getIcon(notification.postType)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          {notification.notifStatus === "unread" && (
                            <span className="w-2 h-2 ml-2 bg-red-800 rounded-full"></span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>{formatDate(notification.createdAt)}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">
                            {notification.postType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {notification.notifStatus === "unread" && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs text-red-800 hover:text-red-900 hover:cursor-pointer"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-red-primary hover:text-red-800 hover:cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No notifications found.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
              {/* ... keep your pagination code unchanged */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
