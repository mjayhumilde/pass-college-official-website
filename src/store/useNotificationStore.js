import { create } from "zustand";
import { notifications as initialNotifications } from "../data/notification/notification";

const useNotificationStore = create((set) => ({
  notifications: initialNotifications,

  // Mark a notification as read
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      ),
    })),

  // Delete a notification
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));

export default useNotificationStore;
