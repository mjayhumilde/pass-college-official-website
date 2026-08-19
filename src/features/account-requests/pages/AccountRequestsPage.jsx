import { useEffect, useState } from "react";
import useRequestAccountStore from "../store/useRequestAccountStore";
import AccountRequestAlerts from "../components/AccountRequestAlerts";
import AccountRequestControls from "../components/AccountRequestControls";
import AccountRequestDetailsModal from "../components/AccountRequestDetailsModal";
import AccountRequestsHeader from "../components/AccountRequestsHeader";
import AccountRequestsTable from "../components/AccountRequestsTable";
import RejectRequestModal from "../components/RejectRequestModal";

export default function AccountRequestsPage() {
  const {
    requests,
    loading,
    error,
    success,
    getAllRequests,
    approveRequest,
    rejectRequest,
    overrideRejectedRequest,
    resetMessages,
  } = useRequestAccountStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(resetMessages, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, resetMessages]);

  const filteredRequests = requests.filter((request) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(normalizedSearch) ||
      request.firstName?.toLowerCase().includes(normalizedSearch) ||
      request.lastName?.toLowerCase().includes(normalizedSearch) ||
      request.email?.toLowerCase().includes(normalizedSearch) ||
      request.course?.toLowerCase().includes(normalizedSearch) ||
      request.studentNumber?.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
    } catch (approveError) {
      console.error("Error approving request:", approveError);
    }
  };

  const handleReject = async (event) => {
    event.preventDefault();

    if (!selectedRequest || !rejectReason.trim()) {
      return;
    }

    try {
      await rejectRequest(selectedRequest._id, rejectReason);
      closeRejectModal();
    } catch (rejectError) {
      console.error("Error rejecting request:", rejectError);
    }
  };

  const handleOverride = async (id) => {
    try {
      await overrideRejectedRequest(id);
    } catch (overrideError) {
      console.error("Error overriding request:", overrideError);
    }
  };

  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectReason("");
    setSelectedRequest(null);
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <AccountRequestsHeader />
        <AccountRequestAlerts success={success} error={error} />
        <AccountRequestControls
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          isLoading={loading}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          onRefresh={getAllRequests}
        />
        <AccountRequestsTable
          requests={filteredRequests}
          isLoading={loading}
          onView={openDetailsModal}
          onApprove={handleApprove}
          onReject={openRejectModal}
          onOverride={handleOverride}
        />
        <RejectRequestModal
          isOpen={isRejectModalOpen}
          reason={rejectReason}
          isLoading={loading}
          onReasonChange={setRejectReason}
          onClose={closeRejectModal}
          onSubmit={handleReject}
        />
        <AccountRequestDetailsModal
          request={isDetailsModalOpen ? selectedRequest : null}
          onClose={closeDetailsModal}
        />
      </div>
    </main>
  );
}
