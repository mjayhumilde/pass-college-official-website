import { FileText, List, Settings } from "lucide-react";
import { getDocumentStatusCounts } from "../../utils/documentManagementUtils";

const REQUEST_STATS = [
  { key: "all", label: "All", color: "bg-cyan-900 bg-opacity-20" },
  {
    key: "pending",
    label: "Pending",
    color: "bg-yellow-500 bg-opacity-30",
  },
  {
    key: "processing",
    label: "Processing",
    color: "bg-blue-500 bg-opacity-30",
  },
  {
    key: "ready-to-pickup",
    label: "Ready",
    color: "bg-green-500 bg-opacity-30",
  },
  {
    key: "completed",
    label: "Completed",
    color: "bg-gray-500 bg-opacity-30",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    color: "bg-red-900 bg-opacity-30",
  },
];

export default function DocumentManagementHeader({
  activeTab,
  availableDocuments,
  documents,
  onTabChange,
}) {
  const statusCounts = getDocumentStatusCounts(documents);
  const documentsWithClearance = availableDocuments.filter(
    (document) => document.requiresClearance,
  ).length;

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-12 shadow-lg">
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

        <div className="flex gap-2 mt-8">
          <button
            onClick={() => onTabChange("requests")}
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
            onClick={() => onTabChange("available")}
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

        {activeTab === "requests" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {REQUEST_STATS.map((stat) => (
              <div
                key={stat.key}
                className={`${stat.color} backdrop-blur-sm rounded-xl p-4 text-white`}
              >
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">
                  {statusCounts[stat.key]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-amber-800 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">Total Documents</p>
              <p className="text-3xl font-bold mt-1">
                {availableDocuments.length}
              </p>
            </div>
            <div className="bg-green-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">With Clearance</p>
              <p className="text-3xl font-bold mt-1">
                {documentsWithClearance}
              </p>
            </div>
            <div className="bg-blue-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium opacity-90">No Clearance</p>
              <p className="text-3xl font-bold mt-1">
                {availableDocuments.length - documentsWithClearance}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
