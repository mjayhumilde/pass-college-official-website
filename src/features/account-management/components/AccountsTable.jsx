import { Loader2, Trash2 } from "lucide-react";
import AccountRoleBadge from "./AccountRoleBadge";

export default function AccountsTable({ accounts, isLoading, onDeactivate }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow">
        <Loader2 className="w-8 h-8 animate-spin text-red-primary" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
              Name
            </th>
            <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 sm:table-cell">
              Email
            </th>
            <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
              Role
            </th>
            <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 md:table-cell">
              Department
            </th>
            <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 lg:table-cell">
              Student ID
            </th>
            <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account._id} className="hover:bg-gray-50">
                <td className="px-2 py-2 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                  {account.firstName} {account.lastName}
                </td>
                <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm sm:table-cell">
                  {account.email}
                </td>
                <td className="px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                  <AccountRoleBadge role={account.role} />
                </td>
                <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm md:table-cell">
                  {account.course && account.course !== "none"
                    ? account.course
                    : "N/A"}
                </td>
                <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm lg:table-cell">
                  {account.studentNumber || "N/A"}
                </td>
                <td className="px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                  <button
                    className="p-1 transition rounded-full bg-red-primary text-red-50 hover:bg-red-800 hover:cursor-pointer"
                    onClick={() => onDeactivate(account)}
                    aria-label="Deactivate account"
                    title="Deactivate Account"
                  >
                    <Trash2 className="w-4 h-4 sm:h-5 sm:w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-2 py-8 text-xs text-center text-gray-500 sm:px-6 sm:py-8 sm:text-sm"
              >
                No accounts found matching your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
