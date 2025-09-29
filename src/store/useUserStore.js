import { create } from "zustand";
import api from "../store/api";

export const useUserStore = create((set, get) => ({
  users: [],
  deactivatedUsers: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true });
      const res = await api.get("api/v1/user");
      set({ users: res.data.data.doc, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },

  fetchDeactivatedUsers: async () => {
    try {
      set({ loading: true });
      const res = await api.get("api/v1/user/deactivated");
      set({ deactivatedUsers: res.data.data.users, loading: false });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch deactivated users",
        loading: false,
      });
    }
  },

  createUser: async (userData) => {
    try {
      set({ loading: true });
      const res = await api.post("api/v1/user", userData);
      set((state) => ({
        users: [...state.users, res.data.data.user],
        loading: false,
      }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "User creation failed",
        loading: false,
      });
      throw err;
    }
  },

  deactivateUser: async (id) => {
    try {
      await api.patch(`api/v1/user/${id}/deactivate`);
      set((state) => ({
        users: state.users.filter((u) => u._id !== id),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Deactivation failed" });
    }
  },

  reactivateUser: async (id) => {
    try {
      await api.patch(`api/v1/user/${id}/reactivate`);
      await get().fetchDeactivatedUsers();
      await get().fetchUsers();
    } catch (err) {
      set({ error: err.response?.data?.message || "Reactivation failed" });
    }
  },
}));
