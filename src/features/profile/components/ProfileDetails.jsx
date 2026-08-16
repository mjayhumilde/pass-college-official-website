export default function ProfileDetails({ userData, userRole }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-gray-500">First Name</p>
          <p className="font-bold text-gray-900">{userData.firstName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Last Name</p>
          <p className="font-bold text-gray-900">{userData.lastName}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">Email</p>
        <p className="font-bold text-gray-900">{userData.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-gray-500">Department</p>
          <p className="font-bold text-gray-900">{userData.course}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Role</p>
          <p className="font-bold text-gray-900">
            {userRole.toUpperCase() || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
