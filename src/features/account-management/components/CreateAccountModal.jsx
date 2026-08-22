import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  AVAILABLE_COURSES,
  createEmptyAccount,
} from "../constants/accountOptions";
import { useUserStore } from "../store/useUserStore";

const validateAccount = (account) => {
  if (!account.firstName.trim()) return "First name is required";
  if (!account.lastName.trim()) return "Last name is required";
  if (!account.email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) {
    return "Please provide a valid email address";
  }
  if (account.role === "student" && !account.studentNumber.trim()) {
    return "Student Number is required for students";
  }
  if (account.role === "student" && !account.course) {
    return "Course is required for students";
  }
  if (!account.password) return "Password is required";
  if (account.password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!account.passwordConfirm) return "Password confirmation is required";
  if (account.password !== account.passwordConfirm) {
    return "Passwords do not match";
  }

  return "";
};

export default function CreateAccountModal({
  isOpen,
  userRole,
  onClose,
  onCreated,
}) {
  const [account, setAccount] = useState(createEmptyAccount);
  const [formError, setFormError] = useState("");
  const { createUser, loading } = useUserStore();

  if (!isOpen) {
    return null;
  }

  const updateField = (field, value) => {
    setAccount((currentAccount) => ({
      ...currentAccount,
      [field]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setAccount((currentAccount) => ({
      ...currentAccount,
      role,
      course: role === "student" ? "BSCS" : "",
      studentNumber: role === "student" ? currentAccount.studentNumber : "",
    }));
  };

  const resetAndClose = () => {
    setFormError("");
    setAccount(createEmptyAccount());
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateAccount(account);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    const userData = {
      firstName: account.firstName.trim(),
      lastName: account.lastName.trim(),
      email: account.email.toLowerCase().trim(),
      password: account.password,
      passwordConfirm: account.passwordConfirm,
      role: account.role,
    };

    if (account.role === "student") {
      userData.course = account.course;
      userData.studentNumber = account.studentNumber.trim();
    }

    try {
      await createUser(userData);
      onCreated();
      resetAndClose();
    } catch (createError) {
      setFormError(
        createError.response?.data?.message || "Failed to create account",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 mx-5 overflow-y-auto bg-white rounded-lg max-h-[90vh]"
      >
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
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Enter first name"
              value={account.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Enter last name"
              value={account.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="example@school.edu"
              value={account.email}
              onChange={(event) => updateField("email", event.target.value)}
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
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm hover:cursor-pointer"
              value={account.role}
              onChange={(event) => handleRoleChange(event.target.value)}
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

          {account.role === "student" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Student Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="e.g., 2024-12345"
                  value={account.studentNumber}
                  onChange={(event) =>
                    updateField("studentNumber", event.target.value)
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
                  className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm hover:cursor-pointer"
                  value={account.course}
                  onChange={(event) =>
                    updateField("course", event.target.value)
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
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Minimum 8 characters"
              value={account.password}
              onChange={(event) => updateField("password", event.target.value)}
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
              className="block w-full py-2 px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="Re-enter password"
              value={account.passwordConfirm}
              onChange={(event) =>
                updateField("passwordConfirm", event.target.value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={resetAndClose}
            className="px-4 py-2 font-bold border rounded-full text-red-primary hover:bg-red-100 border-red-primary hover:cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
