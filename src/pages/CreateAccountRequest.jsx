import React, { useState, useEffect } from "react";
import passLogo from "../assets/images/logo/pass_logo.png";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertTriangle,
  Upload,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Hash,
} from "lucide-react";
import useRequestAccountStore from "../store/useRequestAccountStore";
import { useNavigate } from "react-router-dom";

const CreateAccountRequest = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    role: "student",
    studentNumber: "",
  });
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [showCheckStatus, setShowCheckStatus] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");

  const navigate = useNavigate();

  const {
    loading,
    error,
    success,
    statusResult,
    createRequest,
    checkStatus,
    resetMessages,
  } = useRequestAccountStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCheckStatus]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        resetMessages();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [success, error, resetMessages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "role" && value !== "student") {
      setFormData((prev) => ({
        ...prev,
        studentNumber: "",
      }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "front") {
        setFrontImage(file);
        setFrontPreview(URL.createObjectURL(file));
      } else {
        setBackImage(file);
        setBackPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!frontImage || !backImage) {
      alert(
        "Please upload both front and back images of your registration form"
      );
      return;
    }

    if (formData.role === "student" && !formData.studentNumber.trim()) {
      alert("Student number is required for student accounts");
      return;
    }

    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("email", formData.email);
    submitData.append("course", formData.course);
    submitData.append("role", formData.role);

    if (formData.role === "student") {
      submitData.append("studentNumber", formData.studentNumber);
    }

    submitData.append("front", frontImage);
    submitData.append("back", backImage);

    try {
      await createRequest(submitData);
    } catch (err) {
      console.error("Error creating request:", err);
    } finally {
      // Always reset the form after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        role: "student",
        studentNumber: "",
      });

      setFrontImage(null);
      setBackImage(null);
      setFrontPreview(null);
      setBackPreview(null);

      if (document.getElementById("frontInput")) {
        document.getElementById("frontInput").value = "";
      }
      if (document.getElementById("backInput")) {
        document.getElementById("backInput").value = "";
      }
    }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!checkEmail.trim()) return;

    try {
      await checkStatus(checkEmail);
    } catch (err) {
      console.error("Error checking status:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (showCheckStatus) {
    return (
      <div className="flex flex-col justify-center px-4 py-3 bg-gray sm:px-6 lg:px-8 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center mx-auto mb-1 rounded-full">
            <img src={passLogo} alt="" className="w-2/5" />
          </div>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Check Request Status
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Enter your email to check your account request status
              </p>
            </div>

            {error && (
              <div className="p-4 mb-6 border-l-4 border-red-800 bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {statusResult && (
              <div
                className={`p-4 mb-6 border rounded-lg ${getStatusColor(
                  statusResult.data?.status
                )}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getStatusIcon(statusResult.data?.status)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">
                      Request Status: {statusResult.data?.status}
                    </h3>
                    {statusResult.data?.status === "rejected" &&
                      statusResult.data?.rejectionReason && (
                        <p className="text-sm mt-1">
                          Reason: {statusResult.data?.rejectionReason}
                        </p>
                      )}
                    <p className="text-xs mt-1">
                      Submitted:{" "}
                      {new Date(
                        statusResult.data?.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleCheckStatus} className="space-y-6">
              <div>
                <label
                  htmlFor="checkEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="checkEmail"
                    name="checkEmail"
                    type="email"
                    autoComplete="email"
                    value={checkEmail}
                    onChange={(e) => setCheckEmail(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                    placeholder="you@school_gmail.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !checkEmail.trim()}
                  className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
                    loading || !checkEmail.trim()
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? "Checking..." : "Check Status"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">or</span>
                </div>
              </div>

              <div className="mt-6 text-center space-y-2">
                <p
                  onClick={() => setShowCheckStatus(false)}
                  className="text-sm font-medium text-red-950 hover:underline hover:cursor-pointer"
                >
                  Create new account request
                </p>
                <p
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"
                >
                  Back to login
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} Pass College. All rights reserved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center px-4 py-3 bg-gray sm:px-6 lg:px-8 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-red-900">
              Request Account Creation
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Fill out the form below to request a new account
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 border-l-4 border-red-800 bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-800" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 border-l-4 border-green-500 bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="you@school_gmail.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm bg-white"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="registrar">Registrar</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {formData.role === "student" && (
              <div>
                <label
                  htmlFor="studentNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student Number <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Hash className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="studentNumber"
                    name="studentNumber"
                    type="text"
                    required
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                    className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                    placeholder="e.g., 2024-1234"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <div className="mt-1">
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm bg-white"
                >
                  <option value="none" disabled>
                    Select your course
                  </option>
                  {/* <option value="none">NOT STUDENT</option> */}
                  <option value="BSCS">BSCS</option>
                  <option value="BSA">BSA</option>
                  <option value="BSBA">BSBA</option>
                  <option value="BSHM">BSHM</option>
                  <option value="BSTM">BSTM</option>
                  <option value="BSCRIM">BSCRIM</option>
                  <option value="BEED">BEED</option>
                </select>
              </div>
            </div>

            {/* Registration Form Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Form Images
                </label>
                <p className="text-xs text-gray-500 mb-4">
                  Please upload clear photos of both sides of your registration
                  form
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Front Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Front Side
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
                      {frontPreview ? (
                        <div className="relative">
                          <img
                            src={frontPreview}
                            alt="Front preview"
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFrontImage(null);
                              setFrontPreview(null);
                              document.getElementById("frontInput").value = "";
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10 hover:cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            Upload front side
                          </p>
                        </div>
                      )}
                      <input
                        id="frontInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "front")}
                        className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer z-0"
                      />
                    </div>
                  </div>

                  {/* Back Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Back Side
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
                      {backPreview ? (
                        <div className="relative">
                          <img
                            src={backPreview}
                            alt="Back preview"
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setBackImage(null);
                              setBackPreview(null);
                              document.getElementById("backInput").value = "";
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10 hover:cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            Upload back side
                          </p>
                        </div>
                      )}
                      <input
                        id="backInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "back")}
                        className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer z-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Already have a request?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p
                onClick={() => setShowCheckStatus(true)}
                className="text-sm font-medium text-red-950 hover:underline hover:cursor-pointer"
              >
                Check request status
              </p>
              <p
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"
              >
                Back to login
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>© {new Date().getFullYear()} Pass College. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CreateAccountRequest;
