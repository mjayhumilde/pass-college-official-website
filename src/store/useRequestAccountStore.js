import { create } from "zustand";
import api from "./api";

const useRequestAccountStore = create((set, get) => ({
  requests: [],
  statusResult: null,
  loading: false,
  error: null,
  success: null,

  createRequest: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await api.post("api/v1/account-request", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ success: "Request submitted successfully" });
      return res.data.data.request;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to submit request" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  checkStatus: async (email) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("api/v1/account-request/check-status", {
        email,
      });
      set({ statusResult: res.data });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to check status" });
    } finally {
      set({ loading: false });
    }
  },

  getAllRequests: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("api/v1/account-request");
      set({ requests: res.data.data.requests });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch requests" });
    } finally {
      set({ loading: false });
    }
  },

  approveRequest: async (id) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await api.patch(`api/v1/account-request/${id}/approve`);
      set({
        success: "Request approved successfully",
        requests: get().requests.filter((req) => req._id !== id),
      });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to approve request",
      });
    } finally {
      set({ loading: false });
    }
  },

  rejectRequest: async (id, reason) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await api.patch(`api/v1/account-request/${id}/reject`, {
        reason,
      });
      set({
        success: "Request rejected successfully",
        requests: get().requests.filter((req) => req._id !== id),
      });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to reject request" });
    } finally {
      set({ loading: false });
    }
  },

  overrideRejectedRequest: async (id) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await api.patch(`api/v1/account-request/${id}/update-status`);
      set({
        success: "Rejected request overridden successfully",
        requests: get().requests.filter((req) => req._id !== id),
      });
      return res.data;
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to override rejected request",
      });
    } finally {
      set({ loading: false });
    }
  },

  resetMessages: () => set({ error: null, success: null }),
}));

export default useRequestAccountStore;
