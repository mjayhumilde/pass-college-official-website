import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

export default function ChangePasswordCard({ isLoading, onLoadingChange }) {
  const { logout, updateCurrentUserPassword } = useAuthStore();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password should be at least 8 characters long.");
      return;
    }

    onLoadingChange(true);

    try {
      const response = await updateCurrentUserPassword(
        currentPassword,
        newPassword,
        confirmPassword,
      );

      if (response) {
        setSuccessMessage("Password updated successfully.");
        logout();
        navigate("/login");
      } else {
        setError("Failed to update password.");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="container max-w-lg mx-auto space-y-4">
        <h3 className="mb-6 text-xl font-bold text-red-950">Change Password</h3>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Enter your current password"
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Enter your new password"
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Confirm your new password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleUpdatePassword}
              disabled={isLoading}
              className={`w-full py-2 font-bold text-white transition rounded-full bg-red-primary md:mx-9 hover:bg-opacity-90 ${
                isLoading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:cursor-pointer"
              }`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
