import { Filter, RefreshCw, Search } from "lucide-react";

export default function AccountRequestControls({
  searchTerm,
  statusFilter,
  isLoading,
  onSearchChange,
  onStatusFilterChange,
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col w-full sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, course, or student number..."
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 hover:cursor-pointer rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-red-primary text-white rounded-lg hover:bg-red-800 hover:cursor-pointer transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
    </div>
  );
}
