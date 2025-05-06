import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Search,
  UserPlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    role: "student",
    course: "",
  });

  const itemsPerPage = 5;

  const userRole = useAuthStore((state) => state.userRole);

  // Mock data for demonstration
  useEffect(() => {
    const mockAccounts = [
      {
        id: 1,
        name: "Mjay Humilde",
        email: "humilde.doe@school.edu",
        role: "student",
        course: "BSCS",
      },
      {
        id: 2,
        name: "Shane Cosme",
        email: "cosme.smith@school.edu",
        role: "student",
        course: "BSBA",
      },
      {
        id: 3,
        name: "Shien Meng",
        email: "goh.j@school.edu",
        role: "student",
        course: "BSA",
      },
      {
        id: 4,
        name: "Lhenard Kulop",
        email: "kulop.d@school.edu",
        role: "student",
        course: "BSCRIM",
      },
      {
        id: 5,
        name: "Karl RedFlag",
        email: "magno.b@school.edu",
        role: "student",
        course: "BSCS",
      },
      {
        id: 6,
        name: "Noel Katikati",
        email: "katikati.w@school.edu",
        role: "student",
        course: "BSCS",
      },
      {
        id: 7,
        name: "John Carlo",
        email: "sociopath.l@school.edu",
        role: "student",
        course: "BSCS",
      },
      {
        id: 8,
        name: "Princess Spartan",
        email: "spartan.m@school.edu",
        role: "teacher",
        course: "BSCRIM",
      },
      {
        id: 9,
        name: "Paulo Gay",
        email: "gay.t@school.edu",
        role: "student",
        course: "BSBA",
      },
      {
        id: 10,
        name: "Junya Sharingan",
        email: "sharingan.r@school.edu",
        role: "student",
        course: "BSA",
      },
    ];

    setAccounts(mockAccounts);
    setFilteredAccounts(mockAccounts);
  }, []);

  // Filter accounts based on search term, course, and role
  useEffect(() => {
    const results = accounts.filter((account) => {
      const nameMatch = account.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const courseMatch =
        courseFilter === "" || account.course === courseFilter;
      const roleMatch = roleFilter === "" || account.role === roleFilter;
      return nameMatch && courseMatch && roleMatch;
    });

    setFilteredAccounts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, courseFilter, roleFilter, accounts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Available courses (derived from accounts)
  const courses = [...new Set(accounts.map((account) => account.course))];

  // Available roles (derived from accounts)
  const roles = [...new Set(accounts.map((account) => account.role))];

  // Handle account creation
  const handleCreateAccount = () => {
    const newId = Math.max(...accounts.map((account) => account.id), 0) + 1;
    const createdAccount = { ...newAccount, id: newId };

    setAccounts([...accounts, createdAccount]);
    setIsCreateModalOpen(false);
    setNewAccount({ name: "", email: "", role: "student", course: "" });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (accountToDelete) {
      setAccounts(
        accounts.filter((account) => account.id !== accountToDelete.id)
      );
      setIsConfirmDeleteOpen(false);
      setAccountToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-primary mb-4 sm:mb-8">
        Accounts Management
      </h1>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 ring-red-primary"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-red-primary"
            >
              <option value="">All Courses</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Role filter for admin users */}
          {userRole === "admin" && (
            <div className="w-full sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-red-primary"
              >
                <option value="">All Roles</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-red-primary text-white px-4 py-2 hover-bg-red-primary transition"
        >
          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Create Account</span>
        </button>
      </div>

      {/* Accounts table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Course
              </th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAccounts.length > 0 ? (
              currentAccounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {account.name}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                    {account.email}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 capitalize">
                    {account.role}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                    {account.course}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Account"
                        onClick={() => {
                          setAccountToDelete(account);
                          setIsConfirmDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-2 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500"
                >
                  No accounts found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {filteredAccounts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3">
          <div className="text-xs sm:text-sm text-gray-700 w-full sm:w-auto text-center sm:text-left">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredAccounts.length)}
            </span>{" "}
            of <span className="font-medium">{filteredAccounts.length}</span>{" "}
            results
          </div>

          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-1 sm:p-2 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              // For mobile, only show current page, first, last, and adjacent pages
              const isCurrentPage = currentPage === index + 1;
              const isFirstPage = index === 0;
              const isLastPage = index === totalPages - 1;
              const isAdjacentPage = Math.abs(currentPage - (index + 1)) <= 1;

              // Only show certain pages on small screens
              const showOnMobile =
                isCurrentPage || isFirstPage || isLastPage || isAdjacentPage;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    showOnMobile ? "flex" : "hidden sm:flex"
                  } items-center justify-center min-w-[32px] px-2 sm:px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-red-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
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
              className={`p-1 sm:p-2 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-red-primary"
                  value={newAccount.name}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAccount.email}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAccount.role}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, role: e.target.value })
                  }
                >
                  <option value="student">Student</option>
                  {userRole === "admin" && (
                    <option value="teacher">Teacher</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAccount.course}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, course: e.target.value })
                  }
                >
                  <option value="">Select Course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAccount}
                className="px-4 py-2 bg-red-primary text-white rounded-lg hover-bg-red-primary"
                disabled={
                  !newAccount.name || !newAccount.email || !newAccount.course
                }
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete the account for{" "}
              <span className="font-semibold">{accountToDelete?.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-3 sm:px-4 py-2 text-sm bg-red-primary text-white rounded-lg hover-bg-red-primary"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
