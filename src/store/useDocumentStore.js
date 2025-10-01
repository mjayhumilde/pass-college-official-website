import { create } from "zustand";
import api from "./api";

const useDocumentStore = create((set) => ({
  documents: [],
  myDocuments: [],
  loading: false,
  error: null,

  // (admin/registrar only)
  fetchDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/v1/document");
      set({ documents: res.data.data.doc, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch documents",
        loading: false,
      });
    }
  },

  // (student only)
  fetchMyDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/v1/document/my-request");
      set({ myDocuments: res.data.data.docs, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch my requests",
        loading: false,
      });
    }
  },

  // (student)
  createDocument: async (payload) => {
    try {
      const res = await api.post("/api/v1/document", payload);
      set((state) => ({
        myDocuments: [res.data.data.doc, ...state.myDocuments],
      }));
      return res.data.data.doc;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create request" });
      throw err;
    }
  },

  // (student, only pending)
  deleteMyDocument: async (id) => {
    try {
      await api.delete(`/api/v1/document/my-request/${id}`);
      set((state) => ({
        myDocuments: state.myDocuments.filter((doc) => doc._id !== id),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete request" });
      throw err;
    }
  },

  // (admin/registrar)
  updateDocumentStatus: async (id, payload) => {
    try {
      const res = await api.patch(`/api/v1/document/${id}/status`, payload);
      set((state) => ({
        documents: state.documents.map((doc) =>
          doc._id === id ? res.data.data.doc : doc
        ),
      }));
      return res.data.data.doc;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update status",
      });
      throw err;
    }
  },
}));

export default useDocumentStore;
