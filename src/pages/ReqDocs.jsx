import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FileText,
  Trash2,
  AlertCircle,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Shield,
  Info,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useDocumentStore from "../store/useDocumentStore";
import useAvailableDocumentStore from "../store/useAvailableDocumentStore";

const ReqDocs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [deleteLoading, setDeleteLoading] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const selectedDocId = watch("documentType");

  const {
    myDocuments,
    loading,
    error,
    fetchMyDocuments,
    createDocument,
    deleteMyDocument,
  } = useDocumentStore();

  const {
    availableDocuments,
    loading: availableDocsLoading,
    error: availableDocsError,
    fetchAvailableDocuments,
  } = useAvailableDocumentStore();

  const { user } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMyDocuments();
    fetchAvailableDocuments();
  }, [fetchMyDocuments, fetchAvailableDocuments]);

  const selectedDocument = availableDocuments.find(
    (doc) => doc._id === selectedDocId
  );

  const onSubmitForm = async (formData) => {
    setSubmitLoading(true);
    try {
      const selectedDoc = availableDocuments.find(
        (doc) => doc._id === formData.documentType
      );

      const payload = {
        documentType: selectedDoc.name,
      };

      await createDocument(payload);
      reset();
      alert("Document request submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    setDeleteLoading(id);
    try {
      await deleteMyDocument(id);
      alert("Request deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete request");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: Clock,
        iconColor: "text-yellow-500",
        label: "Pending",
      },
      processing: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Loader2,
        iconColor: "text-blue-500",
        label: "Processing",
      },
      "ready-to-pickup": {
        color: "bg-green-50 text-green-700 border-green-200",
        icon: Package,
        iconColor: "text-green-500",
        label: "Ready to Pickup",
      },
      completed: {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        icon: CheckCircle,
        iconColor: "text-gray-500",
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
        iconColor: "text-red-500",
        label: "Cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDocumentType = (type) => {
    if (type.includes("-")) {
      return type
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return type;
  };

  const getStatusTimeline = (status) => {
    const statuses = ["pending", "processing", "ready-to-pickup", "completed"];
    const currentIndex = statuses.indexOf(status);
    return { statuses, currentIndex };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
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

          {/* Request Form Card */}
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
                    {availableDocuments.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name}
                        {doc.requiresClearance && " (Clearance Required)"}
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

              {/* Document Info Card - Shows when document is selected */}
              {selectedDocument && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">
                        Document Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="font-semibold text-gray-700">
                            {selectedDocument.name}
                          </span>
                        </div>

                        {selectedDocument.requiresClearance ? (
                          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                              <span className="font-bold text-amber-900 text-xs sm:text-sm">
                                Requires Clearance Approval
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                              This document requires clearance from your
                              assigned teacher before processing. You'll be
                              notified once the clearance is approved.
                            </p>
                          </div>
                        ) : (
                          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                              <span className="font-bold text-green-900 text-xs sm:text-sm">
                                No Clearance Required
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-green-800 mt-1 leading-relaxed">
                              This document will be processed immediately after
                              submission.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

      {/* My Requests Section */}
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

          {/* Requests List */}
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
                  <div className="w-2 h-2 rounded-full bg-red-primary animate-pulse"></div>
                  Ready when you are
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {myDocuments.map((doc) => {
                  const statusConfig = getStatusConfig(doc.documentStatus);
                  const StatusIcon = statusConfig.icon;
                  const { statuses, currentIndex } = getStatusTimeline(
                    doc.documentStatus
                  );

                  return (
                    <div
                      key={doc._id}
                      className="group border-2 border-gray-100 rounded-xl p-4 sm:p-6 hover:border-red-primary hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="flex-1 space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-primary group-hover:scale-110 transition-all duration-300">
                              <FileText className="text-red-primary group-hover:text-white w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="text-base sm:text-xl font-bold text-gray-900 break-words">
                                  {formatDocumentType(doc.documentType)}
                                </h4>
                                {doc.requiresClearance && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] sm:text-xs font-bold border border-amber-300">
                                    <Shield
                                      size={10}
                                      className="sm:w-3 sm:h-3"
                                    />
                                    <span>Clearance Required</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                <Clock
                                  size={12}
                                  className="sm:w-3.5 sm:h-3.5 flex-shrink-0"
                                />
                                <span className="break-words">
                                  Requested {formatDate(doc.dateRequest)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Clearance Status Badge */}
                          {doc.requiresClearance && doc.clearanceStatus && (
                            <div className="ml-0 sm:ml-16">
                              {doc.clearanceStatus === "awaiting" && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs sm:text-sm font-semibold">
                                  <Clock
                                    size={12}
                                    className="sm:w-3.5 sm:h-3.5"
                                  />
                                  <span>
                                    Awaiting Clearance Meeting Schedule
                                  </span>
                                </div>
                              )}
                              {doc.clearanceStatus === "approved" && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs sm:text-sm font-semibold">
                                  <CheckCircle
                                    size={12}
                                    className="sm:w-3.5 sm:h-3.5"
                                  />
                                  <span>Clearance Approved</span>
                                </div>
                              )}
                              {doc.clearanceStatus === "rejected" && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs sm:text-sm font-semibold">
                                  <XCircle
                                    size={12}
                                    className="sm:w-3.5 sm:h-3.5"
                                  />
                                  <span>Clearance Rejected</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Status Timeline only show if not cancelled */}
                          {doc.documentStatus !== "cancelled" && (
                            <div className="ml-0 sm:ml-16 mt-3 sm:mt-4 overflow-x-auto">
                              <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-2">
                                {statuses.map((status, index) => (
                                  <div
                                    key={status}
                                    className="flex items-center"
                                  >
                                    <div
                                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                                        index <= currentIndex
                                          ? "bg-red-primary border-red-primary"
                                          : "bg-white border-gray-300"
                                      }`}
                                    >
                                      {index < currentIndex ? (
                                        <CheckCircle
                                          size={12}
                                          className="text-white sm:w-4 sm:h-4"
                                        />
                                      ) : index === currentIndex ? (
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                                      ) : (
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300"></div>
                                      )}
                                    </div>
                                    {index < statuses.length - 1 && (
                                      <div
                                        className={`w-8 sm:w-12 h-0.5 sm:h-1 ${
                                          index < currentIndex
                                            ? "bg-red-primary"
                                            : "bg-gray-200"
                                        }`}
                                      ></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 mt-2 min-w-max">
                                {statuses.map((status, index) => (
                                  <div
                                    key={status}
                                    className="flex items-center"
                                  >
                                    <span
                                      className={`text-[10px] sm:text-xs font-medium w-14 sm:w-20 ${
                                        index === currentIndex
                                          ? "text-red-primary"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {status === "ready-to-pickup"
                                        ? "Ready"
                                        : status.charAt(0).toUpperCase() +
                                          status.slice(1)}
                                    </span>
                                    {index < statuses.length - 1 && (
                                      <div className="w-8 sm:w-12"></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Cancel Reason */}
                          {doc.cancelReason && (
                            <div className="ml-0 sm:ml-16 mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                              <p className="text-xs sm:text-sm font-semibold text-red-900 mb-1">
                                Cancellation Reason
                              </p>
                              <p className="text-xs sm:text-sm text-red-700 break-words">
                                {doc.cancelReason}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <div
                            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-bold text-xs sm:text-sm ${statusConfig.color}`}
                          >
                            <StatusIcon
                              size={14}
                              className={`${statusConfig.iconColor} sm:w-4 sm:h-4`}
                            />
                            <span className="whitespace-nowrap">
                              {statusConfig.label}
                            </span>
                          </div>

                          {doc.documentStatus === "pending" && (
                            <button
                              onClick={() => handleDelete(doc._id)}
                              disabled={deleteLoading === doc._id}
                              className="inline-flex hover:cursor-pointer items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-red-600 border-2 border-red-200 rounded-full hover:bg-red-50 hover:border-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                              {deleteLoading === doc._id ? (
                                <>
                                  <Loader2 className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  <span>Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                  <span>Delete</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReqDocs;
