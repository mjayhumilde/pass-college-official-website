import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: true,
  userRole: "user",
  login: (role) => set({ isAuthenticated: true, userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null }),
}));

export default useAuthStore;
