export default function ProfileEditForm({ userData, onFieldChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={userData.firstName}
            onChange={(event) => onFieldChange("firstName", event.target.value)}
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
            onChange={(event) => onFieldChange("lastName", event.target.value)}
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
          onChange={(event) => onFieldChange("email", event.target.value)}
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
            onChange={(event) => onFieldChange("course", event.target.value)}
            className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
