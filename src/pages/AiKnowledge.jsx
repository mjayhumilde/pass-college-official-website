import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import useKnowledgeStore from "../store/useKnowledgeStore";

const KnowledgeManagement = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchKnowledges();
  }, [fetchKnowledges]);

  // Filter knowledge based on search
  const filteredKnowledges = Array.isArray(knowledges)
    ? knowledges.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ question: item.question, answer: item.answer });
    } else {
      setEditingItem(null);
      setFormData({ question: "", answer: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ question: "", answer: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    try {
      if (editingItem) {
        await updateKnowledge(editingItem._id, formData);
      } else {
        await createKnowledge(formData.question, formData.answer);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this knowledge item?")
    ) {
      await deleteKnowledge(id);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-primary mb-2">
            Knowledge Management
          </h1>
          <p className="text-gray-600">
            Manage your AI knowledge base with ease
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 w-full">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search knowledge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-red-primary text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
          >
            <Plus className="h-5 w-5" />
            Add Knowledge
          </button>
        </div>

        {/* Knowledge List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red mx-auto mb-4"></div>
              <p className="text-gray-600">Loading knowledge...</p>
            </div>
          ) : filteredKnowledges.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm
                ? "No knowledge found matching your search."
                : "No knowledge items yet. Add your first one!"}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredKnowledges.map((item) => (
                <div
                  key={item._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                      <div className="mt-3 text-sm text-gray-400">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-red-primary hover:cursor-pointer hover:text-red-700 transition-colors rounded-md hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-primary hover:cursor-pointer hover:text-red-700 transition-colors rounded-md hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-red-primary">
                    {editingItem ? "Edit Knowledge" : "Add New Knowledge"}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      className="block w-full p-2  placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-950 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      placeholder="Enter the question..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={formData.answer}
                      onChange={(e) =>
                        setFormData({ ...formData, answer: e.target.value })
                      }
                      rows={6}
                      className="block w-full p-2  placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-950 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      placeholder="Enter the answer..."
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-3 border hover:cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={
                        !formData.question.trim() || !formData.answer.trim()
                      }
                      className="hover:cursor-pointer px-6 py-3 bg-red-primary text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Save className="h-5 w-5" />
                      {editingItem ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeManagement;
