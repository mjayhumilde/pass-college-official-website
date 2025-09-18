import { create } from "zustand";
import api from "../store/api";

const useLikeStore = create((set) => ({
  likesByPost: {},
  loading: false,
  error: null,
  currentUserId: null,

  fetchLikes: async (postId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/v1/like?post=${postId}`);
      const likeData = res.data.data.likes || [];
      set((state) => ({
        likesByPost: {
          ...state.likesByPost,
          [postId]: likeData,
        },
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  addLike: async (postId) => {
    try {
      const res = await api.post(`/api/v1/like`, { post: postId });
      const newLike = res.data.data.like;
      set((state) => ({
        likesByPost: {
          ...state.likesByPost,
          [postId]: [...(state.likesByPost[postId] || []), newLike],
        },
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  removeLike: async (likeId, postId) => {
    try {
      await api.delete(`/api/v1/like/${likeId}`);
      set((state) => ({
        likesByPost: {
          ...state.likesByPost,
          [postId]: (state.likesByPost[postId] || []).filter(
            (like) => like._id !== likeId
          ),
        },
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  setCurrentUser: (id) => set({ currentUserId: id }),
}));

export default useLikeStore;
