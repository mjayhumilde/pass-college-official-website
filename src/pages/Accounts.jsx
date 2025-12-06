import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import {
  Search,
  UserPlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  UserCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function Accounts() {
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isDeactivatedModalOpen, setIsDeactivatedModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Deactivated accounts search
  const [deactivatedSearchTerm, setDeactivatedSearchTerm] = useState("");
  const [deactivatedCourseFilter, setDeactivatedCourseFilter] = useState("");
  const [filteredDeactivatedAccounts, setFilteredDeactivatedAccounts] =
    useState([]);

  const [newAccount, setNewAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "student",
    course: "BSCS",
    studentNumber: "",
  });

  const itemsPerPage = 5;
  const { userRole } = useAuthStore();
  const {
    users,
    deactivatedUsers,
    loading,
    error,
    fetchUsers,
    fetchDeactivatedUsers,
    createUser,
    deactivateUser,
    reactivateUser,
  } = useUserStore();

  const AVAILABLE_COURSES = [
    "BSCS",
    "BSA",
    "BSBA",
    "BSHM",
    "BSTM",
    "BSCRIM",
    "BEED",
  ];
  const AVAILABLE_ROLES = ["student", "teacher", "admin", "registrar"];

  const baseDeactivatedUsers =
    userRole === "registrar"
      ? deactivatedUsers.filter((u) => u.role === "student")
      : deactivatedUsers;

  useEffect(() => {
    fetchUsers();
    fetchDeactivatedUsers();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let results = users;

    // Registrars only see students
    if (userRole === "registrar") {
      results = results.filter((account) => account.role === "student");
    }

    results = results.filter((account) => {
      const fullName = `${account.firstName} ${account.lastName}`.toLowerCase();
      const emailMatch = account.email.toLowerCase();
      const studentNumberMatch = account.studentNumber?.toLowerCase() || "";
      const searchMatch =
        fullName.includes(searchTerm.toLowerCase()) ||
        emailMatch.includes(searchTerm.toLowerCase()) ||
        studentNumberMatch.includes(searchTerm.toLowerCase());
      const courseMatch =
        courseFilter === "" || account.course === courseFilter;
      const roleMatch = roleFilter === "" || account.role === roleFilter;

      return searchMatch && courseMatch && roleMatch;
    });

    setFilteredAccounts(results);
    setCurrentPage(1);
  }, [searchTerm, courseFilter, roleFilter, users, userRole]);

  // Filter deactivated accounts
  useEffect(() => {
    let results = baseDeactivatedUsers;

    results = results.filter((account) => {
      const fullName = `${account.firstName} ${account.lastName}`.toLowerCase();
      const emailMatch = account.email.toLowerCase();
      const studentNumberMatch = account.studentNumber?.toLowerCase() || "";
      const searchMatch =
        fullName.includes(deactivatedSearchTerm.toLowerCase()) ||
        emailMatch.includes(deactivatedSearchTerm.toLowerCase()) ||
        studentNumberMatch.includes(deactivatedSearchTerm.toLowerCase());
      const courseMatch =
        deactivatedCourseFilter === "" ||
        account.course === deactivatedCourseFilter;

      return searchMatch && courseMatch;
    });

    setFilteredDeactivatedAccounts(results);
  }, [deactivatedSearchTerm, deactivatedCourseFilter, baseDeactivatedUsers]);

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    setFormError("");

    if (!newAccount.firstName.trim()) {
      setFormError("First name is required");
      return false;
    }

    if (!newAccount.lastName.trim()) {
      setFormError("Last name is required");
      return false;
    }

    if (!newAccount.email.trim()) {
      setFormError("Email is required");
      return false;
    }

    if (!isValidEmail(newAccount.email)) {
      setFormError("Please provide a valid email address");
      return false;
    }

    if (newAccount.role === "student") {
      if (!newAccount.studentNumber.trim()) {
        setFormError("Student Number is required for students");
        return false;
      }

      if (!newAccount.course) {
        setFormError("Course is required for students");
        return false;
      }
    }

    if (!newAccount.password) {
      setFormError("Password is required");
      return false;
    }

    if (newAccount.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }

    if (!newAccount.passwordConfirm) {
      setFormError("Password confirmation is required");
      return false;
    }

    if (newAccount.password !== newAccount.passwordConfirm) {
      setFormError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        firstName: newAccount.firstName.trim(),
        lastName: newAccount.lastName.trim(),
        email: newAccount.email.toLowerCase().trim(),
        password: newAccount.password,
        passwordConfirm: newAccount.passwordConfirm,
        role: newAccount.role,
      };

      if (newAccount.role === "student") {
        userData.course = newAccount.course;
        userData.studentNumber = newAccount.studentNumber.trim();
      }

      await createUser(userData);
      setSuccessMessage(
        "Account created successfully! Welcome email sent to user."
      );
      setIsCreateModalOpen(false);

      setNewAccount({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "student",
        course: "BSCS",
        studentNumber: "",
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create account";
      setFormError(errorMessage);
    }
  };

  const handleDeactivateAccount = async () => {
    if (accountToDelete) {
      try {
        await deactivateUser(accountToDelete._id);
        setSuccessMessage(
          `Account for ${accountToDelete.firstName} ${accountToDelete.lastName} has been deactivated`
        );
        setIsConfirmDeleteOpen(false);
        setAccountToDelete(null);
        setTimeout(() => setSuccessMessage(""), 5000);
      } catch (err) {
        setFormError("Failed to deactivate account");
        setTimeout(() => setFormError(""), 5000);
      }
    }
  };

  const handleReactivateAccount = async (userId, userName) => {
    try {
      await reactivateUser(userId);
      setSuccessMessage(`Account for ${userName} has been reactivated`);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setFormError("Failed to reactivate account");
      setTimeout(() => setFormError(""), 5000);
    }
  };

  const handleRoleChange = (role) => {
    setNewAccount({
      ...newAccount,
      role,
      course: role === "student" ? "BSCS" : "",
      studentNumber: role === "student" ? newAccount.studentNumber : "",
    });
  };

  return (
    <div className="max-w-6xl min-h-screen p-6 mx-auto md:py-10">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold sm:text-3xl text-red-primary">
          Accounts Management
        </h1>

        <button
          onClick={() => setIsDeactivatedModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer text-sm font-medium transition border rounded-full text-red-primary border-red-primary hover:bg-red-50"
        >
          <UserCheck className="w-4 h-4" />
          <span>View Deactivated ({baseDeactivatedUsers.length})</span>
        </button>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400 sm:h-5 sm:w-5" />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Search by name, email, or student number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
            >
              <option value="">All Courses</option>
              {AVAILABLE_COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {userRole === "admin" && (
            <div className="w-full sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              >
                <option value="">All Roles</option>
                {AVAILABLE_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-bold text-white transition rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer"
          >
            <UserPlus className="w-4 h-4 sm:h-5 sm:w-5" />
            <span>Create Account</span>
          </button>

          <button
            onClick={() => {
              fetchUsers();
              fetchDeactivatedUsers();
            }}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 font-bold transition border rounded-full text-red-primary border-red-primary hover:bg-red-50 hover:cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 sm:h-5 sm:w-5 ${
                loading ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow">
          <Loader2 className="w-8 h-8 animate-spin text-red-primary" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
                    Name
                  </th>
                  <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 sm:table-cell">
                    Email
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
                    Role
                  </th>
                  <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 md:table-cell">
                    Department
                  </th>
                  <th className="hidden px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 lg:table-cell">
                    Student ID
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAccounts.length > 0 ? (
                  currentAccounts.map((account) => (
                    <tr key={account._id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                        {account.firstName} {account.lastName}
                      </td>
                      <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm sm:table-cell">
                        {account.email}
                      </td>
                      <td className="px-2 py-2 text-xs text-gray-500 capitalize sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            account.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : account.role === "teacher"
                              ? "bg-blue-100 text-blue-800"
                              : account.role === "registrar"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-red-800"
                          }`}
                        >
                          {account.role}
                        </span>
                      </td>
                      <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm md:table-cell">
                        {account.course && account.course !== "none"
                          ? account.course
                          : "N/A"}
                      </td>
                      <td className="hidden px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm lg:table-cell">
                        {account.studentNumber || "N/A"}
                      </td>
                      <td className="px-2 py-2 text-xs text-gray-500 sm:px-6 sm:py-4 whitespace-nowrap sm:text-sm">
                        <button
                          className="p-1 transition rounded-full bg-red-primary text-red-50 hover:bg-red-800 hover:cursor-pointer"
                          title="Deactivate Account"
                          onClick={() => {
                            setAccountToDelete(account);
                            setIsConfirmDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 sm:h-5 sm:w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-2 py-8 text-xs text-center text-gray-500 sm:px-6 sm:py-8 sm:text-sm"
                    >
                      No accounts found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row sm:mt-6">
              <div className="w-full text-xs text-center text-gray-700 sm:text-sm sm:w-auto sm:text-left">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredAccounts.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredAccounts.length}</span>{" "}
                results
              </div>

              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-1 sm:p-2 rounded-full hover:cursor-pointer transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-primary text-white hover:bg-red-800"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 sm:h-5 sm:w-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const isCurrentPage = currentPage === index + 1;
                  const isFirstPage = index === 0;
                  const isLastPage = index === totalPages - 1;
                  const isAdjacentPage =
                    Math.abs(currentPage - (index + 1)) <= 1;
                  const showOnMobile =
                    isCurrentPage ||
                    isFirstPage ||
                    isLastPage ||
                    isAdjacentPage;

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`${
                        showOnMobile ? "flex" : "hidden sm:flex"
                      } px-3 py-2 rounded-full hover:cursor-pointer transition ${
                        currentPage === index + 1
                          ? "bg-red-primary text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-1 sm:p-2 rounded-full hover:cursor-pointer transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-primary text-white hover:bg-red-800"
                  }`}
                >
                  <ChevronRight className="w-4 h-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 mx-5 overflow-y-auto bg-white rounded-lg max-h-[90vh]">
            <h2 className="mb-4 text-xl font-bold text-red-primary">
              Create New Account
            </h2>

            {formError && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Enter first name"
                  value={newAccount.firstName}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Enter last name"
                  value={newAccount.lastName}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, lastName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="example@school.edu"
                  value={newAccount.email}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, email: e.target.value })
                  }
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be a valid email format
                </p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm hover:cursor-pointer"
                  value={newAccount.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  {userRole === "registrar" && (
                    <option value="student">Student</option>
                  )}

                  {userRole === "admin" && (
                    <>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="registrar">Registrar</option>
                      <option value="admin">Admin</option>
                    </>
                  )}
                </select>
              </div>

              {newAccount.role === "student" && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Student Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                      placeholder="e.g., 2024-12345"
                      value={newAccount.studentNumber}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          studentNumber: e.target.value,
                        })
                      }
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Required for student accounts
                    </p>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm hover:cursor-pointer"
                      value={newAccount.course}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, course: e.target.value })
                      }
                    >
                      {AVAILABLE_COURSES.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      Required for student accounts
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Minimum 8 characters"
                  value={newAccount.password}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, password: e.target.value })
                  }
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Re-enter password"
                  value={newAccount.passwordConfirm}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      passwordConfirm: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setFormError("");
                  setNewAccount({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    role: "student",
                    course: "BSCS",
                    studentNumber: "",
                  });
                }}
                className="px-4 py-2 font-bold border rounded-full text-red-primary hover:bg-red-100 border-red-primary hover:cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-4 mx-4 bg-white rounded-lg sm:p-6">
            <h2 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4 text-red-primary">
              Confirm Deactivation
            </h2>
            <p className="mb-4 text-sm sm:mb-6 sm:text-base text-gray-700">
              Are you sure you want to deactivate the account for{" "}
              <span className="font-semibold text-red-primary">
                {accountToDelete?.firstName} {accountToDelete?.lastName}
              </span>
              ? The account can be reactivated later from the deactivated
              accounts list.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsConfirmDeleteOpen(false);
                  setAccountToDelete(null);
                }}
                className="px-4 py-2 border rounded-full text-red-primary hover:bg-red-100 border-red-primary hover:cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateAccount}
                disabled={loading}
                className="px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer disabled:opacity-50 transition flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Deactivating..." : "Deactivate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeactivatedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-5xl p-4 mx-4 overflow-y-auto bg-white rounded-lg sm:p-6 max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold sm:text-xl text-red-primary">
                Deactivated Accounts ({baseDeactivatedUsers.length})
              </h2>
              <button
                onClick={() => {
                  setIsDeactivatedModalOpen(false);
                  setDeactivatedSearchTerm("");
                  setDeactivatedCourseFilter("");
                }}
                className="text-2xl text-gray-500 hover:text-red-800 hover:cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-4 sm:flex-row">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="Search by name, email, or student number..."
                  value={deactivatedSearchTerm}
                  onChange={(e) => setDeactivatedSearchTerm(e.target.value)}
                />
              </div>

              <div className="w-full sm:w-48">
                <select
                  value={deactivatedCourseFilter}
                  onChange={(e) => setDeactivatedCourseFilter(e.target.value)}
                  className="block w-full py-2 pl-3 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm hover:cursor-pointer text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                >
                  <option value="">All Courses</option>
                  {AVAILABLE_COURSES.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredDeactivatedAccounts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell">
                        Email
                      </th>
                      <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                        Department
                      </th>
                      <th className="hidden px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                        Student ID
                      </th>
                      <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDeactivatedAccounts.map((account) => (
                      <tr key={account._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {account.firstName} {account.lastName}
                        </td>
                        <td className="hidden px-4 py-2 text-sm text-gray-500 sm:table-cell">
                          {account.email}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                              account.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : account.role === "teacher"
                                ? "bg-blue-100 text-blue-800"
                                : account.role === "registrar"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-red-800"
                            }`}
                          >
                            {account.role}
                          </span>
                        </td>
                        <td className="hidden px-4 py-2 text-sm text-gray-500 md:table-cell">
                          {account.course && account.course !== "none"
                            ? account.course
                            : "N/A"}
                        </td>
                        <td className="hidden px-4 py-2 text-sm text-gray-500 lg:table-cell">
                          {account.studentNumber || "N/A"}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          <button
                            onClick={() =>
                              handleReactivateAccount(
                                account._id,
                                `${account.firstName} ${account.lastName}`
                              )
                            }
                            className="px-3 py-1 text-xs font-semibold hover:cursor-pointer text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition"
                          >
                            Reactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">
                  {deactivatedSearchTerm || deactivatedCourseFilter
                    ? "No deactivated accounts match your search."
                    : "No deactivated accounts found."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
