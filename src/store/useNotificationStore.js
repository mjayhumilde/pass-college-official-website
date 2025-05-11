import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { notifications as initialNotifications } from "../data/notification/notification";

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: initialNotifications,

      // Mark a notification as read
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, notifStatus: "read" }
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

      // Add New Notifications
      addNewNotification: (newNotification) =>
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        })),
    }),
    {
      name: "notifications-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNotificationStore;
