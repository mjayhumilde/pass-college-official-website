import { useState } from "react";
import {
  filterManagedRequests,
  REQUESTS_PER_PAGE,
} from "../../utils/documentManagementUtils";
import CancelDocumentRequestModal from "./CancelDocumentRequestModal";
import DocumentRequestFilters from "./DocumentRequestFilters";
import DocumentRequestPagination from "./DocumentRequestPagination";
import ManagedDocumentRequestsList from "./ManagedDocumentRequestsList";

export default function DocumentRequestsManagementPanel({
  documents,
  isLoading,
  updateDocumentStatus,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusLoading, setStatusLoading] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredRequests = filterManagedRequests(
    documents,
    searchTerm,
    statusFilter,
  );
  const lastItemIndex = currentPage * REQUESTS_PER_PAGE;
  const firstItemIndex = lastItemIndex - REQUESTS_PER_PAGE;
  const currentRequests = filteredRequests.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredRequests.length / REQUESTS_PER_PAGE);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    setStatusLoading(requestId);
    try {
      await updateDocumentStatus(requestId, { status: newStatus });
      alert(`Status updated to ${newStatus.replace("-", " ")} successfully!`);
    } catch (requestError) {
      alert(requestError.response?.data?.message || "Failed to update status");
    } finally {
      setStatusLoading(null);
    }
  };

  const openCancelModal = (request) => {
    setSelectedRequest(request);
    setCancelReason("");
  };

  const closeCancelModal = () => {
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
      await updateDocumentStatus(selectedRequest._id, {
        status: "cancelled",
        cancelReason: cancelReason.trim(),
      });
      alert("Request cancelled successfully!");
      closeCancelModal();
    } catch (requestError) {
      alert(requestError.response?.data?.message || "Failed to cancel request");
    } finally {
      setStatusLoading(null);
    }
  };

  return (
    <>
      <DocumentRequestFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
      />
      <ManagedDocumentRequestsList
        isLoading={isLoading && !documents.length}
        requests={currentRequests}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        statusLoading={statusLoading}
        onAdvance={handleStatusChange}
        onCancel={openCancelModal}
      />
      {!isLoading && currentRequests.length > 0 && (
        <DocumentRequestPagination
          currentPage={currentPage}
          firstItemIndex={firstItemIndex}
          lastItemIndex={lastItemIndex}
          totalItems={filteredRequests.length}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CancelDocumentRequestModal
        cancelReason={cancelReason}
        isLoading={statusLoading === selectedRequest?._id}
        request={selectedRequest}
        onCancelReasonChange={setCancelReason}
        onClose={closeCancelModal}
        onConfirm={handleCancel}
      />
    </>
  );
}
