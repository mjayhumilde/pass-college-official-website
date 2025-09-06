import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "./api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userRole: null,
      error: null,

      // Login function to authenticate and store the response
      login: async (email, password) => {
        set({ isAuthenticated: false, user: null, token: null, error: null });

        try {
          const response = await api.post("/user/login", { email, password });

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
          console.error("Login failed:", error);
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

      logout: async () => {
        try {
          // logout request to the backend
          const response = await api.get("/user/logout");

          if (response.data.status === "success") {
            console.log(response.data.message); //  log the success message from the server
          }

          // Reset the application state
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            error: null,
            userRole: null,
          });

          // Remove the token from localStorage
          localStorage.removeItem("authToken");
        } catch (error) {
          // Handle errors (e.g., network issues, server errors)
          console.error("Logout failed:", error);
          set({
            error: error.response
              ? error.response.data.message
              : "An error occurred while logging out. Please try again.",
          });
        }
      },

      // Update function to update the current logged-in user
      updateMe: async (firstName, lastName, email, course, photo) => {
        try {
          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("course", course);
          if (photo) {
            formData.append("photo", photo);
          }

          const response = await api.patch("/user/updateMe", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
            },
          });

          if (response.data.status === "success") {
            const { updatedUser } = response.data;
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

      // Password update function
      updateCurrentUserPassword: async (
        passwordCurrent,
        password,
        passwordConfirm
      ) => {
        try {
          if (password !== passwordConfirm) {
            throw new Error("Passwords do not match.");
          }

          const requestData = {
            passwordCurrent,
            password,
            passwordConfirm,
          };

          const response = await api.patch(
            "/user/updateMyPassword",
            requestData, // Send data as JSON
            {
              headers: {
                "Content-Type": "application/json", // Set Content-Type to application/json
              },
            }
          );

          if (response && response.data.status === "success") {
            console.log("Password updated successfully");
            return response.data; // return data if needed
          } else {
            throw new Error(
              response.data.message || "Failed to update password."
            );
          }
        } catch (error) {
          console.error(
            "Error updating password:",
            error.response || error.message
          );
          return {
            error: error.response ? error.response.data.message : error.message,
          };
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
