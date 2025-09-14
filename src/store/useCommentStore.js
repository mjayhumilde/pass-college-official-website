import { create } from "zustand";
import api from "../store/api";

const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parentComment?._id) {
      map[c.parentComment._id]?.replies.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });

  return roots;
};

const useCommentStore = create((set, get) => ({
  commentsByPost: {},
  loading: false,
  error: null,

  fetchCommentsByPost: async (postId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/v1/comment?post=${postId}`);

      const tree = buildCommentTree(res.data.data.comments);

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: tree,
        },
        loading: false,
      }));

      return tree;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  createComment: async (postId, text, parentComment = null) => {
    try {
      await api.post(`/api/v1/comment`, {
        post: postId,
        text,
        parentComment,
      });

      // Refresh comments
      await get().fetchCommentsByPost(postId);
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  updateComment: async (commentId, text, postId) => {
    try {
      await api.patch(`/api/v1/comment/${commentId}`, { text });

      // Refresh comments
      await get().fetchCommentsByPost(postId);
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },

  deleteComment: async (commentId, postId) => {
    try {
      await api.delete(`/api/v1/comment/${commentId}`);

      // Refresh comments
      await get().fetchCommentsByPost(postId);
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },
}));

export default useCommentStore;
