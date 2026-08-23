import { useEffect, useState } from "react";
import AvailableDocumentsManagementPanel from "../components/management/AvailableDocumentsManagementPanel";
import DocumentManagementError from "../components/management/DocumentManagementError";
import DocumentManagementHeader from "../components/management/DocumentManagementHeader";
import DocumentRequestsManagementPanel from "../components/management/DocumentRequestsManagementPanel";
import useAvailableDocumentStore from "../store/useAvailableDocumentStore";
import useDocumentStore from "../store/useDocumentStore";

export default function DocumentManagementPage() {
  const [activeTab, setActiveTab] = useState("requests");
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

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
    fetchAvailableDocuments();
  }, [fetchDocuments, fetchAvailableDocuments]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DocumentManagementHeader
        activeTab={activeTab}
        availableDocuments={availableDocuments}
        documents={documents}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <DocumentManagementError error={error || availableError} />

        <div className={activeTab === "requests" ? "" : "hidden"}>
          <DocumentRequestsManagementPanel
            documents={documents}
            isLoading={loading}
            updateDocumentStatus={updateDocumentStatus}
          />
        </div>
        <div className={activeTab === "available" ? "" : "hidden"}>
          <AvailableDocumentsManagementPanel
            createAvailableDocument={createAvailableDocument}
            deleteAvailableDocument={deleteAvailableDocument}
            documents={availableDocuments}
            fetchAvailableDocuments={fetchAvailableDocuments}
            isLoading={availableLoading}
          />
        </div>
      </div>
    </main>
  );
}
