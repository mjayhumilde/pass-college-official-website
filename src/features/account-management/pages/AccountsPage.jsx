import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { ACCOUNTS_PER_PAGE } from "../constants/accountOptions";
import { filterActiveAccounts } from "../utils/accountFilters";
import { useUserStore } from "../store/useUserStore";
import AccountFilters from "../components/AccountFilters";
import AccountManagementAlerts from "../components/AccountManagementAlerts";
import AccountManagementHeader from "../components/AccountManagementHeader";
import AccountsPagination from "../components/AccountsPagination";
import AccountsTable from "../components/AccountsTable";
import CreateAccountModal from "../components/CreateAccountModal";
import DeactivateAccountModal from "../components/DeactivateAccountModal";
import DeactivatedAccountsModal from "../components/DeactivatedAccountsModal";

export default function AccountsPage() {
  const userRole = useAuthStore((state) => state.userRole);
  const {
    users,
    deactivatedUsers,
    loading,
    error,
    fetchUsers,
    fetchDeactivatedUsers,
    deactivateUser,
    reactivateUser,
  } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [accountToDeactivate, setAccountToDeactivate] = useState(null);
  const [isDeactivatedModalOpen, setIsDeactivatedModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchDeactivatedUsers();
    window.scrollTo(0, 0);
  }, [fetchUsers, fetchDeactivatedUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, courseFilter, roleFilter, users, userRole]);

  const visibleDeactivatedAccounts =
    userRole === "registrar"
      ? deactivatedUsers.filter((account) => account.role === "student")
      : deactivatedUsers;
  const filteredAccounts = filterActiveAccounts({
    accounts: users,
    userRole,
    searchTerm,
    courseFilter,
    roleFilter,
  });
  const totalPages = Math.ceil(filteredAccounts.length / ACCOUNTS_PER_PAGE);
  const startIndex = (currentPage - 1) * ACCOUNTS_PER_PAGE;
  const currentAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + ACCOUNTS_PER_PAGE,
  );

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleRefresh = () => {
    fetchUsers();
    fetchDeactivatedUsers();
  };

  const handleDeactivateAccount = async () => {
    if (!accountToDeactivate) {
      return;
    }

    await deactivateUser(accountToDeactivate._id);
    showSuccessMessage(
      `Account for ${accountToDeactivate.firstName} ${accountToDeactivate.lastName} has been deactivated`,
    );
    setAccountToDeactivate(null);
  };

  const handleReactivateAccount = async (userId, userName) => {
    await reactivateUser(userId);
    showSuccessMessage(`Account for ${userName} has been reactivated`);
  };

  return (
    <main className="max-w-6xl min-h-screen p-6 mx-auto md:py-10">
      <AccountManagementHeader
        deactivatedCount={visibleDeactivatedAccounts.length}
        onViewDeactivated={() => setIsDeactivatedModalOpen(true)}
      />
      <AccountManagementAlerts successMessage={successMessage} error={error} />
      <AccountFilters
        searchTerm={searchTerm}
        courseFilter={courseFilter}
        roleFilter={roleFilter}
        userRole={userRole}
        isLoading={loading}
        onSearchChange={setSearchTerm}
        onCourseFilterChange={setCourseFilter}
        onRoleFilterChange={setRoleFilter}
        onCreateAccount={() => setIsCreateModalOpen(true)}
        onRefresh={handleRefresh}
      />
      <AccountsTable
        accounts={currentAccounts}
        isLoading={loading}
        onDeactivate={setAccountToDeactivate}
      />
      {!loading && (
        <AccountsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={ACCOUNTS_PER_PAGE}
          totalAccounts={filteredAccounts.length}
          onPageChange={setCurrentPage}
        />
      )}

      <CreateAccountModal
        isOpen={isCreateModalOpen}
        userRole={userRole}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() =>
          showSuccessMessage(
            "Account created successfully! Welcome email sent to user.",
          )
        }
      />
      <DeactivateAccountModal
        account={accountToDeactivate}
        isLoading={loading}
        onClose={() => setAccountToDeactivate(null)}
        onConfirm={handleDeactivateAccount}
      />
      <DeactivatedAccountsModal
        isOpen={isDeactivatedModalOpen}
        accounts={visibleDeactivatedAccounts}
        onClose={() => setIsDeactivatedModalOpen(false)}
        onReactivate={handleReactivateAccount}
      />
    </main>
  );
}
