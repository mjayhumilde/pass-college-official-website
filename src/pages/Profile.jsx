import { useState, useEffect } from "react";
import { Edit, Camera, LogOutIcon } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout, isAuthenticated, user, updateMe, updateCurrentUserPassword } =
    useAuthStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // To ensure that we always have the updated user in the UI
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    course: user.course,
    photo: user.photo,
  });

  // Reactively update the profile picture
  const profileImageUrl = user?.photo
    ? `http://127.0.0.1:5000${user.photo}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Fallback image

  useEffect(() => {
    // Update userData state whenever the user in the store is updated
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      course: user.course,
      photo: user.photo,
    });
  }, [user]); // Dependency on 'user' will trigger when user changes in the store

  // Handle save changes and update user
  const handleSaveChanges = async () => {
    await updateMe(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.course,
      userData.photo
    );

    setIsEditing(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Reset previous error messages
    setError("");
    setSuccessMessage("");

    // Basic form validation
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

    setIsLoading(true);

    try {
      const response = await updateCurrentUserPassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      if (response) {
        setSuccessMessage("Password updated successfully.");
        logout(); // Assuming `logout()` is defined elsewhere
        navigate("/login"); // Assuming `navigate()` is from react-router
      } else {
        setError("Failed to update password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <div className="container px-4 py-8 mx-auto space-y-6">
        {/* Profile Information Card */}
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Profile Image with Upload Functionality */}
            <div className="relative mb-4 md:mb-0">
              {!isEditing ? (
                <div className="w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-md cursor-pointer sm:w-36 sm:h-36">
                  <img
                    src={profileImageUrl} // Using the full URL for the profile image
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div>
                  <div className="w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-md cursor-pointer sm:w-36 sm:h-36">
                    <img
                      src={profileImageUrl} // Using the full URL for the profile image
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-center mt-3 text-white">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setUserData({
                          ...userData,
                          photo: file,
                        });
                      }}
                      className="bg-red-900 p-2 rounded-full w-30"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* User Information */}
            <div className="flex-1 w-full">
              <div className="flex flex-col justify-between gap-2 mb-6 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold text-center sm:text-left">
                  {!isEditing
                    ? `${userData.firstName} ${userData.lastName}`
                    : ""}
                </h2>
                {!isEditing ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 mx-auto font-bold text-white rounded-full bg-red-primary sm:mx-0 hover:cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={18} />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white rounded-full bg-red-primary sm:w-auto hover:cursor-pointer"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {isEditing ? (
                  // Edit Form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={userData.firstName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              firstName: e.target.value,
                            })
                          }
                          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={userData.lastName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastName: e.target.value,
                            })
                          }
                          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Department
                        </label>
                        <input
                          type="text"
                          value={userData.course}
                          onChange={(e) =>
                            setUserData({ ...userData, course: e.target.value })
                          }
                          className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display Information
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          First Name
                        </p>
                        <p className="font-bold text-gray-900">
                          {userData.firstName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Last Name
                        </p>
                        <p className="font-bold text-gray-900">
                          {userData.lastName}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-bold text-gray-900">
                        {userData.email}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Department
                        </p>
                        <p className="font-bold text-gray-900">
                          {userData.course}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Role
                        </p>
                        <p className="font-bold text-gray-900">
                          {isAuthenticated && user.role === "student"
                            ? user.role
                            : isAuthenticated && user.role === "teacher"
                            ? "Teacher"
                            : "Admin"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
          <div className="container max-w-lg mx-auto space-y-4">
            <h3 className="mb-6 text-xl font-bold text-red-950">
              Change Password
            </h3>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Success Message */}
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
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
      <div className="container flex justify-center p-5 mx-auto mt-5">
        <button
          className="px-8 py-1 rounded-full bg-red-primary text-red-50"
          disabled={isLoading}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <span className="flex items-center justify-center gap-1 font-bold hover:cursor-pointer">
            {isLoading
              ? `${(<LogOutIcon size={20} />)} Logging out...`
              : "Log out"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
