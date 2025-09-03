import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userRole: "guest",
      error: null,

      // Login function to authenticate and store the response
      login: async (email, password) => {
        set({ isAuthenticated: false, user: null, token: null, error: null });

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/api/v1/user/login",
            { email, password }
          );

          if (response.data.status === "success") {
            const { token, data } = response.data;
            set({
              isAuthenticated: true,
              user: data.user,
              token: token,
              userRole: data.user.role,
            });

            localStorage.setItem("authToken", token);
          } else {
            set({
              error: response.data.message || "Invalid email or password",
              isAuthenticated: false,
              user: null,
              token: null,
            });
          }
        } catch (error) {
          console.error("Login failed:", error); // Log the entire error
          set({
            error: error.response
              ? error.response.data.message
              : "An error occurred while logging in. Please try again.",
            isAuthenticated: false,
            user: null,
            token: null,
          });
        }
      },

      // Logout function to reset state and clear stored data
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null, error: null });
        localStorage.removeItem("authToken"); // Clear token from localStorage
      },

      // Update function to update the current login user
      updateMe: async (firstName, lastName, email, course, photo) => {
        try {
          const token = localStorage.getItem("authToken");

          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("course", course);
          if (photo) {
            formData.append("photo", photo); // Append the file if it exists
          }

          const response = await axios.patch(
            "http://127.0.0.1:5000/api/v1/user/updateMe",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
              },
            }
          );

          if (response.data.status === "success") {
            const { updatedUser } = response.data; // Adjusted to access updatedUser directly
            set({
              user: updatedUser,
            });
          } else {
            set({
              error: response.data.message || "Failed to update user details.",
            });
          }
        } catch (error) {
          console.error("Error updating user:", error);
          set({
            error: error.response
              ? error.response.data.message
              : "An error occurred while updating your information. Please try again.",
          });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
