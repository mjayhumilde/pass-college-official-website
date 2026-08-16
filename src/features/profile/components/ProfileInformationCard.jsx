import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileInformationCard() {
  const { user, updateMe } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    course: user.course,
    photo: user.photo,
  });

  const profileImageUrl = user?.photo
    ? `${user.photo}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      course: user.course,
      photo: user.photo,
    });
  }, [user]);

  const handleFieldChange = (field, value) => {
    setUserData((currentUserData) => ({
      ...currentUserData,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    await updateMe(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.course,
      userData.photo,
    );

    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <ProfileAvatar
          isEditing={isEditing}
          profileImageUrl={profileImageUrl}
          onPhotoChange={(photo) => handleFieldChange("photo", photo)}
        />

        <div className="flex-1 w-full">
          <div className="flex flex-col justify-between gap-2 mb-6 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold text-center sm:text-left">
              {!isEditing ? `${userData.firstName} ${userData.lastName}` : ""}
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
              <ProfileEditForm
                userData={userData}
                onFieldChange={handleFieldChange}
              />
            ) : (
              <ProfileDetails userData={userData} userRole={user.role} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
