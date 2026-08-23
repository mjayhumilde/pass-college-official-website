import { useState } from "react";
import { Plus } from "lucide-react";
import { createEmptyAvailableDocumentForm } from "../../utils/documentManagementUtils";
import AvailableDocumentsList from "./AvailableDocumentsList";
import CreateAvailableDocumentModal from "./CreateAvailableDocumentModal";
import DeleteAvailableDocumentModal from "./DeleteAvailableDocumentModal";

export default function AvailableDocumentsManagementPanel({
  createAvailableDocument,
  deleteAvailableDocument,
  documents,
  fetchAvailableDocuments,
  isLoading,
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState(createEmptyAvailableDocumentForm);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreateModal = () => {
    setFormData(createEmptyAvailableDocumentForm());
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormData(createEmptyAvailableDocumentForm());
  };

  const openDeleteModal = (document) => {
    setSelectedDocument(document);
  };

  const closeDeleteModal = () => {
    setSelectedDocument(null);
  };

  const handleFormFieldChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
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
    } catch (requestError) {
      alert(
        requestError.response?.data?.message || "Failed to create document",
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteDocument = async () => {
    setDeleteLoading(true);
    try {
      await deleteAvailableDocument(selectedDocument._id);
      alert("Document deleted successfully!");
      closeDeleteModal();
      fetchAvailableDocuments();
    } catch (requestError) {
      alert(
        requestError.response?.data?.message || "Failed to delete document",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
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

      <AvailableDocumentsList
        documents={documents}
        isLoading={isLoading && !documents.length}
        onCreate={openCreateModal}
        onDelete={openDeleteModal}
      />
      <CreateAvailableDocumentModal
        formData={formData}
        isLoading={createLoading}
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onFieldChange={handleFormFieldChange}
        onSubmit={handleCreateDocument}
      />
      <DeleteAvailableDocumentModal
        document={selectedDocument}
        isLoading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteDocument}
      />
    </>
  );
}
