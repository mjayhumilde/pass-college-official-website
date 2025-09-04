import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

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
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error: null,
          userRole: null,
        });
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

      updateCurrentUserPassword: async (
        passwordCurrent,
        password,
        passwordConfirm
      ) => {
        try {
          // Check if passwords match
          if (password !== passwordConfirm) {
            throw new Error("Passwords do not match.");
          }

          // Get the token from local storage
          const token = localStorage.getItem("authToken");
          if (!token) {
            throw new Error("Authorization token is missing.");
          }

          // Prepare the data to send in the request
          const requestData = {
            passwordCurrent,
            password,
            passwordConfirm,
          };

          // Send the PATCH request with JSON content type
          const response = await axios.patch(
            "http://127.0.0.1:5000/api/v1/user/updateMyPassword",
            requestData, // Send data as JSON
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Set Content-Type to application/json
              },
            }
          );

          // Check if response was successful
          if (response && response.data.status === "success") {
            console.log("Password updated successfully");
            return response.data; // return data if needed
          } else {
            throw new Error(
              response.data.message || "Failed to update password."
            );
          }
        } catch (error) {
          // Log the error details for easier debugging
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
