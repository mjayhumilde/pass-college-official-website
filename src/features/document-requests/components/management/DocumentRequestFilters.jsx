import { ChevronRight, Filter, Search } from "lucide-react";

export default function DocumentRequestFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Search Requests
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, course, or document type..."
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-600 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
        </div>

        <div className="lg:w-64">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Filter by Status
          </label>
          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              className="w-full py-2 pl-10 pr-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer appearance-none"
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="ready-to-pickup">Ready to Pickup</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <ChevronRight size={20} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
