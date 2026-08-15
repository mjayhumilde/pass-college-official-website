import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import useDocumentStore from "../../../store/useDocumentStore";
import DocumentRequestCard from "./DocumentRequestCard";

export default function MyDocumentRequests() {
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { myDocuments, loading, fetchMyDocuments, deleteMyDocument } =
    useDocumentStore();

  useEffect(() => {
    fetchMyDocuments();
  }, [fetchMyDocuments]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    setDeleteLoading(id);
    try {
      await deleteMyDocument(id);
      alert("Request deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete request");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-6 sm:-mt-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                My Requests
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Track the status of your document requests
              </p>
            </div>
            <div className="bg-red-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm self-start sm:self-auto">
              <span>{myDocuments.length}</span>
              <span className="ml-1">
                {myDocuments.length === 1 ? "Request" : "Requests"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {loading && !myDocuments.length ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <Loader2
                className="animate-spin text-red-primary mb-4"
                size={40}
              />
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Loading your requests...
              </p>
            </div>
          ) : myDocuments.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 mb-4 sm:mb-6">
                <FileText className="text-gray-400" size={40} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                No requests yet
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                Submit your first document request using the form above
              </p>
              <div className="inline-flex items-center gap-2 text-red-primary font-semibold text-sm sm:text-base">
                <div className="w-2 h-2 rounded-full bg-red-primary animate-pulse" />
                Ready when you are
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {myDocuments.map((document) => (
                <DocumentRequestCard
                  key={document._id}
                  deleteLoading={deleteLoading}
                  document={document}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
