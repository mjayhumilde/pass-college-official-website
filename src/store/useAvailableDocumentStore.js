import { create } from "zustand";
import api from "./api";

const useAvailableDocumentStore = create((set) => ({
  availableDocuments: [],
  loading: false,
  error: null,

  // Fetch all active available documents (public/student)
  fetchAvailableDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/v1/available-documents");
      set({
        availableDocuments: res.data.data.docs,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch available documents",
        loading: false,
      });
    }
  },

  // Create available document (admin/registrar only)
  createAvailableDocument: async (payload) => {
    try {
      const res = await api.post("/api/v1/available-documents", payload);
      set((state) => ({
        availableDocuments: [...state.availableDocuments, res.data.data.doc],
      }));
      return res.data.data.doc;
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to create available document",
      });
      throw err;
    }
  },

  // Delete available document (admin/registrar only - soft delete)
  deleteAvailableDocument: async (id) => {
    try {
      await api.delete(`/api/v1/available-documents/${id}`);
      set((state) => ({
        availableDocuments: state.availableDocuments.filter(
          (doc) => doc._id !== id
        ),
      }));
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to delete available document",
      });
      throw err;
    }
  },
}));

export default useAvailableDocumentStore;
