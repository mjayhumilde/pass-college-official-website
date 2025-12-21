import { create } from "zustand";
import api from "./api";

const useClearanceStore = create((set) => ({
  pendingClearances: [],
  myClearanceMeetings: null,
  loading: false,
  error: null,

  // Fetch pending clearance requests (teacher only)
  fetchPendingClearances: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/v1/document/clearance/pending");
      set({ pendingClearances: res.data.data.docs, loading: false });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch pending clearances",
        loading: false,
      });
    }
  },

  // Schedule clearance meeting (teacher only)
  scheduleClearanceMeeting: async (documentId, payload) => {
    try {
      const res = await api.post(`/api/v1/clearance/${documentId}`, payload);
      // Refresh the list to get updated clearance status
      set((state) => ({
        pendingClearances: state.pendingClearances.map((doc) =>
          doc._id === documentId
            ? {
                ...doc,
                clearanceStatus: "scheduled",
                clearanceMeeting: res.data.data.meeting,
              }
            : doc
        ),
      }));
      return res.data.data.meeting;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to schedule meeting",
      });
      throw err;
    }
  },

  // Reschedule clearance meeting (teacher only)
  rescheduleClearanceMeeting: async (documentId, payload) => {
    try {
      const res = await api.patch(
        `/api/v1/clearance/${documentId}/reschedule`,
        payload
      );
      // Update the local state with rescheduled meeting
      set((state) => ({
        pendingClearances: state.pendingClearances.map((doc) =>
          doc._id === documentId
            ? { ...doc, clearanceMeeting: res.data.data.meeting }
            : doc
        ),
      }));
      return res.data.data.meeting;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to reschedule meeting",
      });
      throw err;
    }
  },

  // Complete clearance (teacher only)
  completeClearance: async (documentId) => {
    try {
      const res = await api.patch(`/api/v1/clearance/${documentId}/complete`);
      // Remove from pending list or update status
      set((state) => ({
        pendingClearances: state.pendingClearances.filter(
          (doc) => doc._id !== documentId
        ),
      }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to complete clearance",
      });
      throw err;
    }
  },

  // Get my clearance meetings (student only)
  fetchMyClearanceMeetings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/v1/clearance/my-meeting");
      set({ myClearanceMeetings: res.data.data.meeting, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch my meetings",
        loading: false,
      });
    }
  },
}));

export default useClearanceStore;
