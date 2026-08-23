import { FileText, Loader2, Plus } from "lucide-react";
import AvailableDocumentCard from "./AvailableDocumentCard";

export default function AvailableDocumentsList({
  documents,
  isLoading,
  onCreate,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <Loader2 className="animate-spin text-red-600 mx-auto mb-4" size={56} />
        <p className="text-gray-600 font-medium text-lg">
          Loading available documents...
        </p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
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
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Your First Document
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <AvailableDocumentCard
          key={document._id}
          document={document}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
