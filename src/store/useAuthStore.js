import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    name: "Mjay Humilde",
    email: "humildemarkjohn00@gmail.com",
    course: "BSCS",
    year: "3",
  },
  isAuthenticated: true,
  userRole: "admin",

  login: (role) => set({ isAuthenticated: true, userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null }),
}));

export default useAuthStore;
