import { useState } from "react";
import { X, Mail, AlertTriangle, CheckCircle } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { forgotPassword } = useAuthStore();

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        setSuccess(true);
        setEmail("");

        // Auto close after 3 seconds on success
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 3000);
      } else {
        setError(result.error || "Failed to send reset email");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && !isLoading && !success) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="hover:cursor-pointer absolute text-gray-400 top-4 right-4 hover:text-red-primary"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold text-red-primary">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {/* Success Message */}
          {success && (
            <div className="p-4 mt-4 border-l-4 border-green-500 bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    Password reset link sent! Check your email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 mt-4 border-l-4 border-red-800 bg-red-50">
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

          {/* Input Field */}
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="you@school_gmail.com"
                  disabled={isLoading || success}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex hover:cursor-pointer justify-center flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || success || !email}
                className={`flex-1 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
                  isLoading || success || !email
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading
                  ? "Sending..."
                  : success
                  ? "Sent!"
                  : "Send Reset Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
