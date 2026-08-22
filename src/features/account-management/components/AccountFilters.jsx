import { RefreshCw, Search, UserPlus } from "lucide-react";
import {
  AVAILABLE_COURSES,
  AVAILABLE_ROLES,
} from "../constants/accountOptions";

export default function AccountFilters({
  searchTerm,
  courseFilter,
  roleFilter,
  userRole,
  isLoading,
  onSearchChange,
  onCourseFilterChange,
  onRoleFilterChange,
  onCreateAccount,
  onRefresh,
}) {
  return (
    <div className="flex flex-col gap-3 mb-4 sm:mb-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 sm:h-5 sm:w-5" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
            placeholder="Search by name, email, or student number..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <select
          value={courseFilter}
          onChange={(event) => onCourseFilterChange(event.target.value)}
          className="block w-full sm:w-48 py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
        >
          <option value="">All Courses</option>
          {AVAILABLE_COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        {userRole === "admin" && (
          <select
            value={roleFilter}
            onChange={(event) => onRoleFilterChange(event.target.value)}
            className="block w-full sm:w-48 py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          >
            <option value="">All Roles</option>
            {AVAILABLE_ROLES.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCreateAccount}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-bold text-white transition rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer"
        >
          <UserPlus className="w-4 h-4 sm:h-5 sm:w-5" />
          <span>Create Account</span>
        </button>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 font-bold transition border rounded-full text-red-primary border-red-primary hover:bg-red-50 hover:cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 sm:h-5 sm:w-5 ${
              isLoading ? "animate-spin" : ""
            }`}
          />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
}
