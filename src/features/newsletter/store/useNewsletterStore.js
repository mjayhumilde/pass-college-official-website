import { create } from "zustand";
import api from "../../../store/api";

export const useNewsletterStore = create((set) => ({
  subscribers: [],
  loadingSubscribers: false,
  subscriberError: null,

  sending: false,
  sendError: null,
  sendSuccess: null,

  fetchSubscribers: async () => {
    try {
      set({ loadingSubscribers: true, subscriberError: null });
      const res = await api.get("/api/v1/subscribers");
      set({
        subscribers: res.data.data.subscribers,
        loadingSubscribers: false,
      });
    } catch (err) {
      set({
        subscriberError:
          err.response?.data?.message || "Failed to fetch subscribers",
        loadingSubscribers: false,
      });
    }
  },

  addSubscriber: async (email, name) => {
    try {
      set({ loadingSubscribers: true, subscriberError: null });
      const res = await api.post("/api/v1/subscribers", { email, name });
      set((state) => ({
        subscribers: [res.data.data.subscriber, ...state.subscribers],
        loadingSubscribers: false,
      }));
      return true;
    } catch (err) {
      set({
        subscriberError:
          err.response?.data?.message || "Failed to add subscriber",
        loadingSubscribers: false,
      });
      return false;
    }
  },

  deleteSubscriber: async (id) => {
    try {
      await api.delete(`/api/v1/subscribers/${id}`);
      set((state) => ({
        subscribers: state.subscribers.filter((subscriber) => {
          return subscriber._id !== id;
        }),
      }));
      return true;
    } catch (err) {
      set({
        subscriberError:
          err.response?.data?.message || "Failed to delete subscriber",
      });
      return false;
    }
  },

  sendNewsletter: async (subject, blocks) => {
    try {
      set({ sending: true, sendError: null, sendSuccess: null });
      const res = await api.post("/api/v1/subscribers/send-newsletter", {
        subject,
        blocks,
      });
      set({
        sending: false,
        sendSuccess: res.data.message,
      });
      return true;
    } catch (err) {
      set({
        sending: false,
        sendError: err.response?.data?.message || "Failed to send newsletter",
      });
      return false;
    }
  },

  clearMessages: () =>
    set({ sendError: null, sendSuccess: null, subscriberError: null }),
}));

export default useNewsletterStore;
