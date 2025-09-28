import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "./api";

const useKnowledgeStore = create(
  persist(
    (set, get) => ({
      knowledges: [],
      loading: false,
      error: null,
      chatResponse: null,

      // Fetch all knowledge
      fetchKnowledges: async () => {
        set({ loading: true, error: null });
        try {
          const res = await api.get("/api/v1/knowledge");
          set({ knowledges: res.data.data.doc || [], loading: false });
        } catch (err) {
          console.error("Error fetching knowledge:", err);
          set({
            error: err.response?.data?.message || "Failed to fetch knowledge",
            loading: false,
          });
        }
      },

      // Create knowledge
      createKnowledge: async (question, answer) => {
        set({ error: null });
        try {
          const res = await api.post("/api/v1/knowledge", { question, answer });
          const currentKnowledges = get().knowledges || [];
          set({
            knowledges: [...currentKnowledges, res.data.data],
          });
        } catch (err) {
          console.error("Error creating knowledge:", err);
          set({
            error: err.response?.data?.message || "Failed to create knowledge",
          });
        }
      },

      // Update knowledge
      updateKnowledge: async (id, updates) => {
        set({ error: null });
        try {
          const res = await api.patch(`/api/v1/knowledge/${id}`, updates);
          const currentKnowledges = get().knowledges || [];
          set({
            knowledges: currentKnowledges.map((k) =>
              k._id === id ? res.data.data : k
            ),
          });
        } catch (err) {
          console.error("Error updating knowledge:", err);
          set({
            error: err.response?.data?.message || "Failed to update knowledge",
          });
        }
      },

      // Delete knowledge
      deleteKnowledge: async (id) => {
        set({ error: null });
        try {
          await api.delete(`/api/v1/knowledge/${id}`);
          const currentKnowledges = get().knowledges || [];
          set({
            knowledges: currentKnowledges.filter((k) => k._id !== id),
          });
        } catch (err) {
          console.error("Error deleting knowledge:", err);
          set({
            error: err.response?.data?.message || "Failed to delete knowledge",
          });
        }
      },

      // Chat with knowledge base AI
      chat: async (question) => {
        set({ error: null, chatResponse: null, loading: true });
        try {
          const res = await api.post("/api/v1/knowledge/chat", { question });
          set({
            chatResponse: res.data,
            loading: false,
          });
        } catch (err) {
          console.error("Error chatting:", err);
          set({
            error: err.response?.data?.message || "Failed to get chat response",
            loading: false,
          });
        }
      },
    }),
    {
      name: "knowledge-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        knowledges: state.knowledges,
      }),
    }
  )
);

export default useKnowledgeStore;
