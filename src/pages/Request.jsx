import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  RefreshCw,
  Check,
} from "lucide-react";

// Custom CSS for the primary color
const styles = `

`;

// Sample data for demo purposes
const initialRequests = [
  {
    id: 1,
    name: "Mjay Humilde",
    course: "BSCD",
    year: 1,
    reqDocs: "Memorandum of Agreement",
    reqDate: "2025-05-04T08:30:00",
    status: "processing",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: "BSIT",
    year: 2,
    reqDocs: "Transcript of Records",
    reqDate: "2025-05-04T09:15:00",
    status: "processing",
  },
  {
    id: 3,
    name: "Alex Johnson",
    course: "BSCS",
    year: 3,
    reqDocs: "Certificate of Enrollment",
    reqDate: "2025-05-03T14:20:00",
    status: "ready for pickup",
  },
  {
    id: 4,
    name: "Maria Garcia",
    course: "BSED",
    year: 4,
    reqDocs: "Good Moral Certificate",
    reqDate: "2025-05-03T10:45:00",
    status: "processing",
  },
  {
    id: 5,
    name: "John Doe",
    course: "BSBA",
    year: 2,
    reqDocs: "Form 137",
    reqDate: "2025-05-02T13:30:00",
    status: "ready for pickup",
  },
  {
    id: 6,
    name: "Sarah Lee",
    course: "BSHRM",
    year: 1,
    reqDocs: "Letter of Recommendation",
    reqDate: "2025-05-02T11:20:00",
    status: "processing",
  },
  {
    id: 7,
    name: "Michael Brown",
    course: "BSA",
    year: 3,
    reqDocs: "Diploma",
    reqDate: "2025-05-01T15:45:00",
    status: "processing",
  },
  {
    id: 8,
    name: "Emily Chen",
    course: "BSCD",
    year: 4,
    reqDocs: "Certificate of Good Standing",
    reqDate: "2025-05-01T09:50:00",
    status: "ready for pickup",
  },
  {
    id: 9,
    name: "David Wilson",
    course: "BSIT",
    year: 2,
    reqDocs: "Class Schedule",
    reqDate: "2025-04-30T14:15:00",
    status: "processing",
  },
  {
    id: 10,
    name: "Lisa Taylor",
    course: "BSCS",
    year: 1,
    reqDocs: "Clearance Form",
    reqDate: "2025-04-30T10:10:00",
    status: "processing",
  },
  {
    id: 11,
    name: "Ryan Martinez",
    course: "BSED",
    year: 3,
    reqDocs: "Evaluation Form",
    reqDate: "2025-04-29T16:30:00",
    status: "ready for pickup",
  },
  {
    id: 12,
    name: "Olivia Clark",
    course: "BSBA",
    year: 4,
    reqDocs: "Registration Form",
    reqDate: "2025-04-29T11:40:00",
    status: "processing",
  },
];

export default function Request() {
  const [requests, setRequests] = useState(initialRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter requests based on search term and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reqDocs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Update request status
  const updateStatus = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  // Delete request
  const deleteRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  // Handle page change
  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <div className="w-full p-6 bg-gray-50">
      <style>{styles}</style>

      {/* Header */}
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-red-primary">
          Document Requests Management
        </h1>
        <p className="text-gray-600">
          Review and manage student document requests
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, course, or document..."
            className="w-full p-2 border border-gray-300"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="w-full md:w-1/4">
          <select
            className="w-full p-2 border border-gray-300"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="ready for pickup">Ready for Pickup</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-primary text-white">
              <th className="p-3 text-left border border-gray-300">ID</th>
              <th className="p-3 text-left border border-gray-300">Name</th>
              <th className="p-3 text-left border border-gray-300">Course</th>
              <th className="p-3 text-left border border-gray-300">Year</th>
              <th className="p-3 text-left border border-gray-300">
                Requested Document
              </th>
              <th className="p-3 text-left border border-gray-300">
                Date Requested
              </th>
              <th className="p-3 text-left border border-gray-300">Status</th>
              <th className="p-3 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((request) => (
                <tr key={request.id} className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{request.id}</td>
                  <td className="p-3 border border-gray-300">{request.name}</td>
                  <td className="p-3 border border-gray-300">
                    {request.course}
                  </td>
                  <td className="p-3 border border-gray-300">{request.year}</td>
                  <td className="p-3 border border-gray-300">
                    {request.reqDocs}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {formatDate(request.reqDate)}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <span
                      className={`px-2 py-1 ${
                        request.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <div className="flex space-x-2">
                      {request.status === "processing" ? (
                        <button
                          onClick={() =>
                            updateStatus(request.id, "ready for pickup")
                          }
                          className="p-1 bg-green-600 text-white flex items-center"
                          title="Mark as Ready for Pickup"
                        >
                          <Check size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(request.id, "processing")}
                          className="p-1 bg-yellow-500 text-white flex items-center"
                          title="Mark as Processing"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteRequest(request.id)}
                        className="p-1 bg-red-primary text-white flex items-center"
                        title="Delete Request"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-3 text-center border border-gray-300"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing {currentItems.length} of {filteredRequests.length} requests
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 flex items-center ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-red-primary text-white"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => {
              // Add ellipsis
              if (index > 0 && page > array[index - 1] + 1) {
                return (
                  <span key={`ellipsis-${page}`} className="p-2 bg-gray-200">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-2 ${
                    currentPage === page
                      ? "bg-red-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 flex items-center ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-200 text-gray-400"
                : "bg-red-primary text-white"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
