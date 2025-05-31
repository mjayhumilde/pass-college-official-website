import React, { useState } from "react";

const DocumentRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    documentType: "",
    purpose: "",
    urgency: "normal",
    additionalInfo: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const documentTypes = [
    "Transcript",
    "Recommendation Letter",
    "Certificate of Enrollment",
    "Diploma Copy",
    "Graduation Certificate",
    "Transfer Credit Evaluation",
    "Fee Structure",
    "Assessment Report",
    "Attendance Record",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        studentId: "",
        email: "",
        documentType: "",
        purpose: "",
        urgency: "normal",
        additionalInfo: "",
      });
    }, 1500);
  };

  const handleNewRequest = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center max-w-lg p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Request Submitted!
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Your document request has been successfully submitted. You will
          receive an email confirmation shortly.
        </p>
        <p className="mb-6 text-center text-gray-600">
          Your request will be processed according to your selected urgency
          level.
        </p>
        <button
          onClick={handleNewRequest}
          className="px-6 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
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
      </div>
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        School Document Request
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="studentId"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your ID"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="documentType"
          >
            Document Type
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Document Type</option>
            {documentTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="purpose"
          >
            Purpose of Request
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Why do you need this document?"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Urgency Level
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgency"
                value="urgent"
                checked={formData.urgency === "urgent"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Urgent (1-2 days)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgency"
                value="normal"
                checked={formData.urgency === "normal"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Normal (3-5 days)</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="additionalInfo"
          >
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional details about your request..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default DocumentRequestForm;
