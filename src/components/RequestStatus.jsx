import React, { useState, useEffect } from "react";
import { requestDocs } from "../data/requestDocs/request";

const PendingRequestsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Custom styling - Primary color: rgb(128, 0, 0) - a deep maroon
  const styles = {
    primaryColor: "rgb(128, 0, 0)",
    primaryBg: "bg-[rgb(128,0,0)]",
    primaryText: "text-[rgb(128,0,0)]",
    primaryBorder: "border-[rgb(128,0,0)]",
    primaryHover: "hover:bg-[rgb(150,20,20)]",
  };

  // Simulate loading data from server
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to get filtered requests based on active tab
  const getFilteredRequests = () => {
    if (activeTab === "all") return requestDocs;
    if (activeTab === "ready")
      return requestDocs.filter((req) => req.status === "Ready for Pickup");
    return requestDocs;
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let color = "";

    switch (status) {
      case "Processing":
        color = "bg-blue-100 text-blue-800";
        break;
      case "Ready for Pickup":
        color = "bg-green-100 text-green-800";
        break;
      default:
        color = "bg-gray-100 text-gray-800";
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium ${color}`}>{status}</span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md p-6 max-w-4xl mx-auto mt-8">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 w-1/3"></div>
          <div className="h-10 bg-gray-200 w-full"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredRequests = getFilteredRequests();

  return (
    <div className=" bg-white shadow-md p-6 max-w-4xl mx-auto container">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Document Requests
      </h2> */}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav
          className="flex justify-center items-center space-x-6"
          aria-label="Tabs"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === "all"
                ? `${styles.primaryBorder} ${styles.primaryText}`
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Requests
          </button>

          <button
            onClick={() => setActiveTab("ready")}
            className={`px-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === "ready"
                ? `${styles.primaryBorder} ${styles.primaryText}`
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Ready for Pickup
          </button>
        </nav>
      </div>

      {/* Requests list */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No requests found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have any document requests matching your selection.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200">
          {filteredRequests.map((request, index) => (
            <div
              key={request.id}
              className={`bg-white px-4 py-5 sm:p-6 ${
                index < filteredRequests.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex-shrink-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    {request.documentType}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Request ID: {request.id}
                  </p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <StatusBadge status={request.status} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">
                    Request Date:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {request.requestDate}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">
                    Estimated Completion:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {request.estimatedCompletion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className="mt-6 text-center">
        <button
          className={`${styles.primaryBg} text-white py-2 px-6 ${styles.primaryHover} transition duration-300`}
        >
          Request New Document
        </button>
      </div> */}
    </div>
  );
};

export default PendingRequestsSection;
