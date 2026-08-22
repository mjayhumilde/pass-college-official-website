import { useState } from "react";
import { Search, X } from "lucide-react";
import { AVAILABLE_COURSES } from "../constants/accountOptions";
import { filterDeactivatedAccounts } from "../utils/accountFilters";
import AccountRoleBadge from "./AccountRoleBadge";

export default function DeactivatedAccountsModal({
  isOpen,
  accounts,
  onClose,
  onReactivate,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  if (!isOpen) {
    return null;
  }

  const filteredAccounts = filterDeactivatedAccounts({
    accounts,
    searchTerm,
    courseFilter,
  });

  const handleClose = () => {
    setSearchTerm("");
    setCourseFilter("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-5xl p-4 mx-4 overflow-y-auto bg-white rounded-lg sm:p-6 max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold sm:text-xl text-red-primary">
            Deactivated Accounts ({accounts.length})
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-800 hover:cursor-pointer"
            aria-label="Close deactivated accounts"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-4 sm:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Search by name, email, or student number..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <select
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
            className="block w-full sm:w-48 py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          >
            <option value="">All Courses</option>
            {AVAILABLE_COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {filteredAccounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                    Department
                  </th>
                  <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Student ID
                  </th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {account.firstName} {account.lastName}
                    </td>
                    <td className="hidden px-4 py-2 text-sm text-gray-500 sm:table-cell">
                      {account.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <AccountRoleBadge role={account.role} />
                    </td>
                    <td className="hidden px-4 py-2 text-sm text-gray-500 md:table-cell">
                      {account.course && account.course !== "none"
                        ? account.course
                        : "N/A"}
                    </td>
                    <td className="hidden px-4 py-2 text-sm text-gray-500 lg:table-cell">
                      {account.studentNumber || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <button
                        onClick={() =>
                          onReactivate(
                            account._id,
                            `${account.firstName} ${account.lastName}`,
                          )
                        }
                        className="px-3 py-1 text-xs font-semibold hover:cursor-pointer text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition"
                      >
                        Reactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              {searchTerm || courseFilter
                ? "No deactivated accounts match your search."
                : "No deactivated accounts found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
