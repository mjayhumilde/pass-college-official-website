import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../../store/useNotificationStore";
import NotificationList from "../components/NotificationList";
import NotificationPagination from "../components/NotificationPagination";
import NotificationsHeader from "../components/NotificationsHeader";
import NotificationTabs from "../components/NotificationTabs";

const NOTIFICATIONS_PER_PAGE = 5;

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { notifications, fetchNotifications, markAsRead, deleteNotification } =
    useNotificationStore();

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      await fetchNotifications();
      setIsLoading(false);
    };

    loadNotifications();
    window.scrollTo(0, 0);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(
    (notification) => notification.notifStatus === "unread"
  ).length;
  const filteredNotifications = notifications.filter(
    (notification) =>
      activeTab === "all" || notification.postType === activeTab
  );
  const indexOfLastNotification = currentPage * NOTIFICATIONS_PER_PAGE;
  const indexOfFirstNotification =
    indexOfLastNotification - NOTIFICATIONS_PER_PAGE;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  const totalPages = Math.ceil(
    filteredNotifications.length / NOTIFICATIONS_PER_PAGE
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleNotificationOpen = async (notification) => {
    if (notification.notifStatus === "unread") {
      await markAsRead(notification._id);
    }

    const postId = notification.relatedPost || notification.relatedDocument;

    if (!postId) {
      console.warn("No related post/document found for this notification");
      return;
    }

    switch (notification.postType) {
      case "announcement":
        navigate(`/announcements?postId=${postId}`);
        break;
      case "careers":
        navigate(`/careers?postId=${postId}`);
        break;
      case "news":
      case "events":
        navigate(`/news-events?postId=${postId}`);
        break;
      case "uniforms-update":
        navigate(`/uniforms?postId=${postId}`);
        break;
      case "document":
        navigate(`/reqdocs?docId=${postId}`);
        break;
      default:
        console.warn("Unknown post type:", notification.postType);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <NotificationsHeader unreadCount={unreadCount} />
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="bg-white rounded-lg shadow-md">
          <NotificationList
            notifications={currentNotifications}
            isLoading={isLoading}
            onOpen={handleNotificationOpen}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
          <NotificationPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={() =>
              setCurrentPage((previousPage) => Math.max(previousPage - 1, 1))
            }
            onNextPage={() =>
              setCurrentPage((previousPage) =>
                Math.min(previousPage + 1, totalPages)
              )
            }
          />
        </div>
      </div>
    </main>
  );
}
