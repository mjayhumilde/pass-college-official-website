import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { Edit, Camera, LogOutIcon } from "lucide-react";

const Profile = () => {
  const { logout } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  const navigate = useNavigate();

  // use data || MOCK DATA
  const [userData, setUserData] = useState({
    firstName: "Mark John",
    lastName: "Humilde",
    email: "humildemarkjohn00@gmail.com",
    course: "Computer Science",
    role: "Student",
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  // File input reference
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // upload this file to a server
      // for now just create a local URL to display the image
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        profileImage: imageUrl,
      });
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle save changes
  const handleSaveChanges = () => {
    console.log(userData);

    setIsEditing(false);
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
              <div
                className="w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-md cursor-pointer sm:w-36 sm:h-36"
                onClick={handleProfileImageClick}
              >
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-[rgba(128,0,0,0.6)] hover:opacity-100 md:bg-[rgba(128,0,0,0)] md:hover:bg-[rgba(128,0,0,0.7)] opacity-100 md:opacity-0 md:hover:opacity-100 rounded-full flex items-center justify-center transition-colors">
                  <Camera size={40} className="text-white" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
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
                          Course
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
                      <div className="hidden">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <input
                          type="text"
                          value={userData.role}
                          onChange={(e) =>
                            setUserData({ ...userData, year: e.target.value })
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
                          Course
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
                          {isAuthenticated && userRole === "user"
                            ? userData.role
                            : isAuthenticated && userRole === "teacher"
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
            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Enter your current password"
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
                />
              </div>

              <div className="flex items-center justify-center pt-2">
                <button className="w-full py-2 font-bold text-white transition rounded-full bg-red-primary md:mx-9 hover:bg-opacity-90 hover:cursor-pointer">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-center p-5 mx-auto mt-5">
        <button
          className="px-8 py-1 rounded-full bg-red-primary text-red-50"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <span className="flex items-center justify-center gap-1 font-bold hover:cursor-pointer">
            <LogOutIcon size={20} /> Log Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
