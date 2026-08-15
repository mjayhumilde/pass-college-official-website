import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import useAvailableDocumentStore from "../../../store/useAvailableDocumentStore";
import useDocumentStore from "../../../store/useDocumentStore";
import SelectedDocumentInfo from "./SelectedDocumentInfo";

export default function DocumentRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const { error, createDocument } = useDocumentStore();
  const {
    availableDocuments,
    loading: availableDocsLoading,
    error: availableDocsError,
    fetchAvailableDocuments,
  } = useAvailableDocumentStore();

  const selectedDocId = watch("documentType");
  const selectedDocument = availableDocuments.find(
    (document) => document._id === selectedDocId,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAvailableDocuments();
  }, [fetchAvailableDocuments]);

  const onSubmitForm = async (formData) => {
    setSubmitLoading(true);

    try {
      const selectedDoc = availableDocuments.find(
        (document) => document._id === formData.documentType,
      );
      const payload = {
        documentType: selectedDoc.name,
      };

      await createDocument(payload);
      reset();
      alert("Document request submitted successfully!");
    } catch (submitError) {
      alert(submitError.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-primary to-red-700 pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-3 sm:mb-4">
            <FileText className="text-red-primary" size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 px-4">
            Document Request
          </h1>
          <p className="text-red-50 text-base sm:text-lg px-4">
            Submit your official document request in seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
          {(error || availableDocsError) && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2 sm:gap-3">
              <AlertCircle
                size={18}
                className="text-red-500 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5"
              />
              <div>
                <p className="font-semibold text-red-800 text-sm sm:text-base">
                  Error
                </p>
                <p className="text-red-700 text-xs sm:text-sm">
                  {error || availableDocsError}
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                Select Document Type <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("documentType", {
                    required: "Please select a document type",
                  })}
                  disabled={availableDocsLoading}
                  className="block w-full py-2.5 sm:py-3 px-3 sm:px-4 pr-10 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 focus:outline-none focus:border-red-primary focus:bg-white transition-all duration-200 hover:border-gray-300 cursor-pointer appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {availableDocsLoading
                      ? "Loading documents..."
                      : "Choose a document..."}
                  </option>
                  {availableDocuments.map((document) => (
                    <option key={document._id} value={document._id}>
                      {document.name}
                      {document.requiresClearance && " (Clearance Required)"}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-400">
                  {availableDocsLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {errors.documentType && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                  {errors.documentType.message}
                </p>
              )}

              {availableDocuments.length === 0 && !availableDocsLoading && (
                <p className="mt-2 text-xs sm:text-sm text-yellow-600 flex items-center gap-1">
                  <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                  No documents are currently available for request
                </p>
              )}
            </div>

            <SelectedDocumentInfo document={selectedDocument} />

            <button
              type="submit"
              disabled={
                submitLoading ||
                availableDocsLoading ||
                availableDocuments.length === 0
              }
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-red-primary text-white font-bold text-sm sm:text-base rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {submitLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    Submitting Request...
                  </span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 hover:cursor-pointer">
                  <FileText size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Submit Request</span>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
