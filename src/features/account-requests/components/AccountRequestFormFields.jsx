import { Hash, Mail, User } from "lucide-react";
import {
  ACCOUNT_REQUEST_COURSES,
  ACCOUNT_REQUEST_ROLES,
} from "../constants/accountRequestOptions";

export default function AccountRequestFormFields({ formData, onChange }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.firstName}
              onChange={onChange}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="First name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={onChange}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Last name"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={onChange}
            className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
            placeholder="you@school_gmail.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={onChange}
          className="block w-full mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm bg-white"
        >
          {ACCOUNT_REQUEST_ROLES.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      {formData.role === "student" && (
        <div>
          <label
            htmlFor="studentNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Student Number <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Hash className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="studentNumber"
              name="studentNumber"
              type="text"
              required
              value={formData.studentNumber}
              onChange={onChange}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="e.g., 2024-1234"
            />
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="course"
          className="block text-sm font-medium text-gray-700"
        >
          Department
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={onChange}
          className="block w-full mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm bg-white"
        >
          {ACCOUNT_REQUEST_COURSES.map((course) => (
            <option key={course.value} value={course.value}>
              {course.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
