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

// Main Notification Component
export default function NotificationPage() {
  // State for notifications and active tab
  const [activeTab, setActiveTab] = useState("all");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);

  const { notifications, markAsRead, deleteNotification } =
    useNotificationStore();

  // Sample notification data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    window.scrollTo(0, 0);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(
    (notification) => activeTab === "all" || notification.postType === activeTab
  );

  // Pagination logic
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
      case "career":
        return <Briefcase className="text-red-800" size={20} />;
      case "news":
        return <Newspaper className="text-red-800" size={20} />;
      case "event":
        return <Calendar className="text-red-800" size={20} />;
      case "uniform":
        return <Megaphone className="text-red-800" size={20} />;
      case "document":
        return <FileCheck className="text-red-800" size={20} />;
      default:
        return <Bell className="text-red-800" size={20} />;
    }
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Tabs configuration
  const tabs = [
    { id: "all", label: "All" },
    { id: "announcement", label: "Announcements" },
    { id: "career", label: "Careers" },
    { id: "news", label: "News" },
    { id: "event", label: "Events" },
    { id: "uniform", label: "Uniforms" },
    { id: "document", label: "Documents" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-red-primary">
            Notifications
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              {notifications.filter((n) => n.status === "unread").length} unread
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
                className={`px-3 py-2 text-sm md:text-base rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-red-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
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
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : currentNotifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {currentNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 sm:p-6 transition-colors ${
                    notification.status === "unread" ? "bg-red-50" : "bg-white"
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
                          {notification.status === "unread" && (
                            <span className="ml-2 h-2 w-2 rounded-full bg-red-800"></span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.description}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span>{formatDate(notification.date)}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">
                            {notification.postType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {notification.status === "unread" && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-red-800 hover:text-red-900"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-500"
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
            <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstNotification + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        indexOfLastNotification,
                        filteredNotifications.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredNotifications.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? "z-10 bg-red-800 border-red-800 text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
