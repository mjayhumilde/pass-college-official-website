import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../store/api";

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      // Fetch notifications
      fetchNotifications: async () => {
        try {
          const res = await api.get("/api/v1/notification/me");
          set({ notifications: res.data.data.notifications });
        } catch (err) {
          console.error("Error fetching notifications:", err);
        }
      },

      // Mark a single notification as read
      markAsRead: async (id) => {
        try {
          await api.patch(`/api/v1/notification/${id}/read`);
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n._id === id ? { ...n, notifStatus: "read" } : n
            ),
          }));
        } catch (err) {
          console.error("Error marking as read:", err);
        }
      },

      // Mark all as read
      markAllAsRead: async () => {
        try {
          await api.patch("/api/v1/notification/mark-all-read");
          set((state) => ({
            notifications: state.notifications.map((n) => ({
              ...n,
              notifStatus: "read",
            })),
          }));
        } catch (err) {
          console.error("Error marking all as read:", err);
        }
      },

      // Delete one notification
      deleteNotification: async (id) => {
        try {
          await api.delete(`/api/v1/notification/${id}`);
          set((state) => ({
            notifications: state.notifications.filter((n) => n._id !== id),
          }));
        } catch (err) {
          console.error("Error deleting notification:", err);
        }
      },

      // Delete all notifications
      deleteAllMyNotifications: async () => {
        try {
          await api.delete("/api/v1/notification");
          set({ notifications: [] });
        } catch (err) {
          console.error("Error deleting all notifications:", err);
        }
      },

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
