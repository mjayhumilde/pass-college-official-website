import { useEffect, useState } from "react";
import KnowledgeErrorBanner from "../components/KnowledgeErrorBanner";
import KnowledgeFormModal from "../components/KnowledgeFormModal";
import KnowledgeList from "../components/KnowledgeList";
import KnowledgeManagementHeader from "../components/KnowledgeManagementHeader";
import KnowledgeToolbar from "../components/KnowledgeToolbar";
import useKnowledgeStore from "../store/useKnowledgeStore";

const emptyFormData = { question: "", answer: "" };

export default function KnowledgeManagementPage() {
  const {
    knowledges,
    loading,
    error,
    fetchKnowledges,
    createKnowledge,
    updateKnowledge,
    deleteKnowledge,
  } = useKnowledgeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    fetchKnowledges();
  }, [fetchKnowledges]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredKnowledges = Array.isArray(knowledges)
    ? knowledges.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ question: item.question, answer: item.answer });
    } else {
      setEditingItem(null);
      setFormData(emptyFormData);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyFormData);
  };

  const handleFieldChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      return;
    }

    try {
      if (editingItem) {
        await updateKnowledge(editingItem._id, formData);
      } else {
        await createKnowledge(formData.question, formData.answer);
      }

      handleCloseModal();
    } catch (submitError) {
      console.error("Error submitting form:", submitError);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this knowledge item?")
    ) {
      await deleteKnowledge(id);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <KnowledgeManagementHeader />
        <KnowledgeErrorBanner error={error} />
        <KnowledgeToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddKnowledge={() => handleOpenModal()}
        />
        <KnowledgeList
          items={filteredKnowledges}
          isLoading={loading}
          searchTerm={searchTerm}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
        <KnowledgeFormModal
          isOpen={isModalOpen}
          editingItem={editingItem}
          formData={formData}
          onFieldChange={handleFieldChange}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
