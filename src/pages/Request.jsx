import { useEffect, useState } from "react";
import useDocumentStore from "../store/useDocumentStore";
import useAvailableDocumentStore from "../store/useAvailableDocumentStore";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  XCircle,
  Loader2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Package,
  Mail,
  BookOpen,
  Plus,
  Trash2,
  Settings,
  List,
  UserCheck,
  Shield,
} from "lucide-react";

export default function Request() {
  const { documents, loading, error, fetchDocuments, updateDocumentStatus } =
    useDocumentStore();

  const {
    availableDocuments,
    loading: availableLoading,
    error: availableError,
    fetchAvailableDocuments,
    createAvailableDocument,
    deleteAvailableDocument,
  } = useAvailableDocumentStore();

  const [activeTab, setActiveTab] = useState("requests");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusLoading, setStatusLoading] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  // Available Documents States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    requiresClearance: false,
    assignedTeacher: "",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
    fetchAvailableDocuments();
  }, [fetchDocuments, fetchAvailableDocuments]);

  const filteredRequests = documents.filter((request) => {
    const studentName = `${request.requestedBy?.firstName || ""} ${
      request.requestedBy?.lastName || ""
    }`.toLowerCase();
    const email = (request.requestedBy?.email || "").toLowerCase();
    const course = (request.requestedBy?.course || "").toLowerCase();
    const documentType = (request.documentType || "").toLowerCase();

    const matchesSearch =
      studentName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      course.includes(searchTerm.toLowerCase()) ||
      documentType.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.documentStatus === statusFilter;

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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDocumentType = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "bg-yellow-50 text-yellow-700 border-yellow-300",
        icon: Clock,
        label: "Pending",
      },
      processing: {
        color: "bg-blue-50 text-blue-700 border-blue-300",
        icon: Loader2,
        label: "Processing",
      },
      "ready-to-pickup": {
        color: "bg-green-50 text-green-700 border-green-300",
        icon: Package,
        label: "Ready to Pickup",
      },
      completed: {
        color: "bg-gray-50 text-gray-700 border-gray-300",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-50 text-red-700 border-red-300",
        icon: XCircle,
        label: "Cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const handleStatusChange = async (requestId, currentStatus, newStatus) => {
    setStatusLoading(requestId);
    try {
      const payload = { status: newStatus };
      await updateDocumentStatus(requestId, payload);
      alert(`Status updated to ${newStatus.replace("-", " ")} successfully!`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setStatusLoading(null);
    }
  };

  const openCancelModal = (request) => {
    setSelectedRequest(request);
    setShowCancelModal(true);
    setCancelReason("");
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSelectedRequest(null);
    setCancelReason("");
  };

  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    setStatusLoading(selectedRequest._id);
    try {
      const payload = {
        status: "cancelled",
        cancelReason: cancelReason.trim(),
      };
      await updateDocumentStatus(selectedRequest._id, payload);
      alert("Request cancelled successfully!");
      closeCancelModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel request");
    } finally {
      setStatusLoading(null);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: "processing",
      processing: "ready-to-pickup",
      "ready-to-pickup": "completed",
    };
    return statusFlow[currentStatus];
  };

  const canAdvanceStatus = (status, requiresClearance, clearanceStatus) => {
    // Can't advance if clearance is required but not completed
    if (requiresClearance && clearanceStatus !== "completed") {
      return false;
    }
    return ["pending", "processing", "ready-to-pickup"].includes(status);
  };

  const canCancelStatus = (status) => {
    return ["pending", "processing"].includes(status);
  };

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusCounts = () => {
    return {
      all: documents.length,
      pending: documents.filter((d) => d.documentStatus === "pending").length,
      processing: documents.filter((d) => d.documentStatus === "processing")
        .length,
      "ready-to-pickup": documents.filter(
        (d) => d.documentStatus === "ready-to-pickup"
      ).length,
      completed: documents.filter((d) => d.documentStatus === "completed")
        .length,
      cancelled: documents.filter((d) => d.documentStatus === "cancelled")
        .length,
    };
  };

  const statusCounts = getStatusCounts();

  // Available Documents Handlers
  const openCreateModal = () => {
    setFormData({
      name: "",
      requiresClearance: false,
      assignedTeacher: "",
    });
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setFormData({
      name: "",
      requiresClearance: false,
      assignedTeacher: "",
    });
  };

  const handleCreateDocument = async () => {
    if (!formData.name.trim()) {
      alert("Document name is required");
      return;
    }

    if (formData.requiresClearance && !formData.assignedTeacher.trim()) {
      alert("Assigned teacher is required when clearance is needed");
      return;
    }

    setCreateLoading(true);
    try {
      await createAvailableDocument({
        name: formData.name.trim(),
        requiresClearance: formData.requiresClearance,
        assignedTeacher: formData.requiresClearance
          ? formData.assignedTeacher.trim()
          : undefined,
      });
      alert("Available document created successfully!");
      closeCreateModal();
      fetchAvailableDocuments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create document");
    } finally {
      setCreateLoading(false);
    }
  };

  const openDeleteModal = (doc) => {
    setSelectedDocument(doc);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedDocument(null);
  };

  const handleDeleteDocument = async () => {
    setDeleteLoading(true);
    try {
      await deleteAvailableDocument(selectedDocument._id);
      alert("Document deleted successfully!");
      closeDeleteModal();
      fetchAvailableDocuments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete document");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-12 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
              <FileText className="text-red-primary" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">
                Document Management System
              </h1>
              <p className="text-red-50 text-lg">
                Manage requests and available documents
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:cursor-pointer ${
                activeTab === "requests"
                  ? "bg-white text-red-primary shadow-lg"
                  : "bg-white bg-opacity-20 text-red-primary hover:bg-opacity-30"
              }`}
            >
              <List size={20} />
              Document Requests
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:cursor-pointer ${
                activeTab === "available"
                  ? "bg-white text-red-primary shadow-lg"
                  : "bg-white bg-opacity-20 text-red-primary hover:bg-opacity-30"
              }`}
            >
              <Settings size={20} />
              Available Documents
            </button>
          </div>

          {/* Stats Cards - Only show for requests tab */}
          {activeTab === "requests" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              {[
                {
                  label: "All",
                  count: statusCounts.all,
                  color: "bg-cyan-900 bg-opacity-20",
                },
                {
                  label: "Pending",
                  count: statusCounts.pending,
                  color: "bg-yellow-500 bg-opacity-30",
                },
                {
                  label: "Processing",
                  count: statusCounts.processing,
                  color: "bg-blue-500 bg-opacity-30",
                },
                {
                  label: "Ready",
                  count: statusCounts["ready-to-pickup"],
                  color: "bg-green-500 bg-opacity-30",
                },
                {
                  label: "Completed",
                  count: statusCounts.completed,
                  color: "bg-gray-500 bg-opacity-30",
                },
                {
                  label: "Cancelled",
                  count: statusCounts.cancelled,
                  color: "bg-red-900 bg-opacity-30",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.color} backdrop-blur-sm rounded-xl p-4 text-white`}
                >
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.count}</p>
                </div>
              ))}
            </div>
          )}

          {/* Available Documents Stats */}
          {activeTab === "available" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-amber-800 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-sm font-medium opacity-90">
                  Total Documents
                </p>
                <p className="text-3xl font-bold mt-1">
                  {availableDocuments.length}
                </p>
              </div>
              <div className="bg-green-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-sm font-medium opacity-90">With Clearance</p>
                <p className="text-3xl font-bold mt-1">
                  {availableDocuments.filter((d) => d.requiresClearance).length}
                </p>
              </div>
              <div className="bg-blue-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-sm font-medium opacity-90">No Clearance</p>
                <p className="text-3xl font-bold mt-1">
                  {
                    availableDocuments.filter((d) => !d.requiresClearance)
                      .length
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Display */}
        {(error || availableError) && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 shadow-md">
            <AlertCircle
              size={20}
              className="text-red-500 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-red-700 text-sm">{error || availableError}</p>
            </div>
          </div>
        )}

        {/* Document Requests Tab Content */}
        {activeTab === "requests" && (
          <>
            {/* Search and Filter Section */}
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
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
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
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
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

            {/* Loading State */}
            {loading && !documents.length ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <Loader2
                  className="animate-spin text-red-600 mx-auto mb-4"
                  size={56}
                />
                <p className="text-gray-600 font-medium text-lg">
                  Loading requests...
                </p>
              </div>
            ) : currentItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                  <FileText className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No requests found
                </h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No document requests have been submitted yet"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {currentItems.map((request) => {
                    const statusConfig = getStatusConfig(
                      request.documentStatus
                    );
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={request._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-600"
                      >
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            {/* Student Info */}
                            <div className="flex-1 space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  {request.photo ? (
                                    <img
                                      src={request.photo}
                                      alt={request.firstName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <img
                                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {request.requestedBy?.firstName}{" "}
                                    {request.requestedBy?.lastName}
                                  </h3>
                                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Mail size={14} />
                                      <span>{request.requestedBy?.email}</span>
                                    </div>
                                    {request.requestedBy?.course && (
                                      <div className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        <span>
                                          {request.requestedBy.course}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Document Info */}
                              <div className="ml-16 space-y-2">
                                <div className="flex items-center gap-2">
                                  <FileText
                                    size={16}
                                    className="text-red-600"
                                  />
                                  <span className="font-semibold text-gray-900">
                                    {formatDocumentType(request.documentType)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock size={14} />
                                  <span>
                                    Requested on{" "}
                                    {formatDate(request.dateRequest)}
                                  </span>
                                </div>
                              </div>

                              {/* Cancel Reason */}
                              {request.cancelReason && (
                                <div className="ml-16 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                  <p className="text-sm font-semibold text-red-900 mb-1">
                                    Cancellation Reason
                                  </p>
                                  <p className="text-sm text-red-700">
                                    {request.cancelReason}
                                  </p>
                                </div>
                              )}

                              {/* Clearance Blocking Message */}
                              {request.requiresClearance &&
                                request.clearanceStatus !== "completed" &&
                                request.documentStatus !== "cancelled" &&
                                request.documentStatus !== "completed" && (
                                  <div className="ml-16 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                    <div className="flex items-start gap-2">
                                      <AlertCircle
                                        size={16}
                                        className="text-amber-700 mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <p className="text-sm font-semibold text-amber-900 mb-1">
                                          Clearance Required
                                        </p>
                                        <p className="text-sm text-amber-700">
                                          This document requires teacher
                                          clearance before it can be processed.
                                          Status can only be updated after the
                                          assigned teacher completes the
                                          clearance.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>

                            {/* Status & Actions */}
                            <div className="flex flex-col items-end gap-4 lg:min-w-[220px]">
                              <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm ${statusConfig.color}`}
                              >
                                <StatusIcon size={16} />
                                {statusConfig.label}
                              </div>

                              <div className="flex gap-2">
                                {canAdvanceStatus(request.documentStatus) && (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        request._id,
                                        request.documentStatus,
                                        getNextStatus(request.documentStatus)
                                      )
                                    }
                                    disabled={statusLoading === request._id}
                                    className="px-4 py-2 rounded-full hover:cursor-pointer bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                                    title={`Mark as ${getNextStatus(
                                      request.documentStatus
                                    )
                                      .replace("-", " ")
                                      .toUpperCase()}`}
                                  >
                                    {statusLoading === request._id ? (
                                      <Loader2
                                        className="animate-spin"
                                        size={16}
                                      />
                                    ) : (
                                      <Check size={16} />
                                    )}
                                    <span className="hidden sm:inline ">
                                      Advance
                                    </span>
                                  </button>
                                )}

                                {canCancelStatus(request.documentStatus) && (
                                  <button
                                    onClick={() => openCancelModal(request)}
                                    disabled={statusLoading === request._id}
                                    className="px-4 py-2 hover:cursor-pointer rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                                    title="Cancel Request"
                                  >
                                    <XCircle size={16} />
                                    <span className="hidden sm:inline ">
                                      Cancel
                                    </span>
                                  </button>
                                )}

                                {!canAdvanceStatus(request.documentStatus) &&
                                  !canCancelStatus(request.documentStatus) && (
                                    <span className="text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-full font-medium">
                                      No actions available
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600 font-medium">
                      Showing{" "}
                      <span className="font-bold text-gray-900">
                        {indexOfFirstItem + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-bold text-gray-900">
                        {Math.min(indexOfLastItem, filteredRequests.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-900">
                        {filteredRequests.length}
                      </span>{" "}
                      requests
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-3 rounded-full transition-all ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
                        }`}
                      >
                        <ChevronLeft size={18} />
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
                              <span
                                key={`ellipsis-${page}`}
                                className="px-3 py-2 text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }

                          return (
                            <button
                              key={page}
                              onClick={() => changePage(page)}
                              className={`px-4 py-2 rounded-full font-bold transition-all ${
                                currentPage === page
                                  ? "bg-red-600 text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}

                      <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className={`p-3 rounded-full transition-all ${
                          currentPage === totalPages || totalPages === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
                        }`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Available Documents Tab Content */}
        {activeTab === "available" && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-red-primary">
                    Available Documents
                  </h2>
                  <p className="text-red-900 mt-1">
                    Manage document types available for request
                  </p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="flex items-center gap-2 px-6 py-3 hover:cursor-pointer bg-red-primary text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus size={20} />
                  Add Document
                </button>
              </div>
            </div>

            {availableLoading && !availableDocuments.length ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <Loader2
                  className="animate-spin text-red-600 mx-auto mb-4"
                  size={56}
                />
                <p className="text-gray-600 font-medium text-lg">
                  Loading available documents...
                </p>
              </div>
            ) : availableDocuments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                  <FileText className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No available documents
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by adding document types that students can request
                </p>
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus size={20} />
                  Add Your First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-red-600 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-red-primary flex items-center justify-center flex-shrink-0">
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">
                            {doc.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {doc.requiresClearance ? (
                              <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
                                <Shield size={12} />
                                Requires Clearance
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                                <CheckCircle size={12} />
                                No Clearance
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {doc.requiresClearance && doc.assignedTeacher && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 text-sm">
                            <UserCheck size={14} className="text-blue-600" />
                            <span className="font-medium text-blue-900">
                              Assigned Teacher
                            </span>
                          </div>
                          <p className="text-sm text-blue-700 mt-1 ml-6">
                            ID: {doc.assignedTeacher}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <Clock size={12} />
                        <span>Created {formatDate(doc.createdAt)}</span>
                      </div>

                      <button
                        onClick={() => openDeleteModal(doc)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-200 hover:cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete Document
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Cancel Request Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                  <XCircle className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Cancel Request
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Please provide a detailed reason for cancelling this document
                request. This will be visible to the student.
              </p>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Cancellation Reason <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter the reason for cancellation..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all resize-none"
                  rows="4"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Minimum 10 characters required
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeCancelModal}
                  disabled={statusLoading === selectedRequest?._id}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleCancel}
                  disabled={
                    statusLoading === selectedRequest?._id ||
                    !cancelReason.trim() ||
                    cancelReason.trim().length < 10
                  }
                  className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {statusLoading === selectedRequest?._id ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Cancelling...
                    </>
                  ) : (
                    "Confirm Cancel"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Available Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                  <Plus className="text-red-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Add Available Document
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Document Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Transcript of Records, Good Moral Certificate"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <input
                  type="checkbox"
                  id="requiresClearance"
                  checked={formData.requiresClearance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      requiresClearance: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-600 hover:cursor-pointer"
                />
                <label
                  htmlFor="requiresClearance"
                  className="flex-1 cursor-pointer"
                >
                  <span className="block font-bold text-gray-900">
                    Requires Teacher Clearance
                  </span>
                  <span className="block text-sm text-gray-600">
                    Check if this document needs teacher approval
                  </span>
                </label>
              </div>

              {formData.requiresClearance && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Assigned Teacher ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.assignedTeacher}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedTeacher: e.target.value,
                      })
                    }
                    placeholder="Enter teacher's user ID"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Required when clearance is needed
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeCreateModal}
                  disabled={createLoading}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDocument}
                  disabled={
                    createLoading ||
                    !formData.name.trim() ||
                    (formData.requiresClearance &&
                      !formData.assignedTeacher.trim())
                  }
                  className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Create Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                  <Trash2 className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Delete Document
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-900 font-semibold mb-2">
                  Are you sure you want to delete this document?
                </p>
                <p className="text-red-700 text-sm">
                  <strong>{selectedDocument.name}</strong>
                </p>
              </div>

              <p className="text-gray-600 text-sm">
                This action will soft-delete the document. It will no longer be
                available for students to request, but existing records will be
                preserved.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeDeleteModal}
                  disabled={deleteLoading}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 transition-all hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDocument}
                  disabled={deleteLoading}
                  className="flex-1 py-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
