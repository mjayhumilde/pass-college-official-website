import { Search } from "lucide-react";

export default function ClearanceSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Search Clearance Requests
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by student name, email, course, or document type..."
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-red-800 focus:border-red-primary sm:text-sm"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
