import { useEffect, useState } from "react";
import useRequestDocsStore from "../store/useRequestDocsStore";
import useNotificationStore from "../store/useNotificationStore";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  RefreshCw,
  Check,
} from "lucide-react";

export default function Request() {
  const allUserRequest = useRequestDocsStore((state) => state.allUserRequest);
  const { updateUserRequestStatus, deleteUserRequest } = useRequestDocsStore();

  const { addNewNotification } = useNotificationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = allUserRequest.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

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

  const handleStatusChange = async (reqId, currentStatus) => {
    const newStatus =
      currentStatus.toLowerCase() === "processing"
        ? "ready for pickup"
        : "processing";

    await updateUserRequestStatus(reqId, newStatus);

    const updatedData = allUserRequest.find((request) => request.id === reqId);

    if (updatedData) {
      const { id, documentType } = updatedData;
      const notificationMessage =
        newStatus === "ready for pickup"
          ? `Your requested ${documentType} are ready to pickup.`
          : `Your requested ${documentType} are being re-processed.`;

      const newNotif = {
        ...updatedData,
        id: id + allUserRequest.length,
        notifStatus: "unread",
        description: notificationMessage,

        title: `Status Update: ${documentType} Request`,
        date: new Date().toISOString().slice(0, 10),
      };
      addNewNotification(newNotif);
    } else {
      console.error(
        `Could not find user request with ID: ${reqId} after update.`
      );
    }
  };

  const handleDelete = (id) => {
    deleteUserRequest(id);
  };

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full p-6 bg-gray-50">
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
      <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row">
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
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="text-white bg-red-primary">
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
                    {request.documentType}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {formatDate(request.requestDate)}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <span
                      className={`px-2 py-1 ${
                        request.status.toLowerCase() === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(request.id, request.status)
                        }
                        className={`p-1 ${
                          request.status.toLowerCase() === "processing"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        } text-white flex items-center`}
                        title={
                          request.status.toLowerCase() === "processing"
                            ? "Mark as Ready for Pickup"
                            : "Mark as Processing"
                        }
                      >
                        {request.status.toLowerCase() === "processing" ? (
                          <Check size={16} />
                        ) : (
                          <RefreshCw size={16} />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(request.id)}
                        className="flex items-center p-1 text-white bg-red-primary"
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
      <div className="flex items-center justify-between mt-6">
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

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => {
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
