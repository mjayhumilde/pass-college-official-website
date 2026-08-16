export default function ProfileAvatar({
  isEditing,
  profileImageUrl,
  onPhotoChange,
}) {
  return (
    <div className="relative mb-4 md:mb-0">
      <div className="w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-md cursor-pointer sm:w-36 sm:h-36">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {isEditing && (
        <div className="text-center mt-3 text-white">
          <input
            type="file"
            onChange={(event) => onPhotoChange(event.target.files[0])}
            className="bg-red-900 p-2 rounded-full w-30"
          />
        </div>
      )}
    </div>
  );
}
