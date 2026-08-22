import { UserCheck } from "lucide-react";

export default function AccountManagementHeader({
  deactivatedCount,
  onViewDeactivated,
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
      <h1 className="text-2xl font-bold sm:text-3xl text-red-primary">
        Accounts Management
      </h1>
      <button
        onClick={onViewDeactivated}
        className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer text-sm font-medium transition border rounded-full text-red-primary border-red-primary hover:bg-red-50"
      >
        <UserCheck className="w-4 h-4" />
        <span>View Deactivated ({deactivatedCount})</span>
      </button>
    </div>
  );
}
