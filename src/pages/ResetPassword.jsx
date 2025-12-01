import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import logo from "../assets/images/pass_log-removebg-preview.png";
import useAuthStore from "../store/useAuthStore";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async () => {
    setError("");

    // Validation
    if (!password || !passwordConfirm) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(token, password, passwordConfirm);

      if (result.success) {
        setSuccess(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(
          result.error || "Failed to reset password. The link may have expired."
        );
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center mx-auto mb-1 rounded-full">
          <img src={logo} alt="Pass College Logo" className="w-2/5" />
        </div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
          <h2 className="mb-6 text-2xl font-bold text-center text-red-primary">
            Reset Your Password
          </h2>

          {/* Success Message */}
          {success && (
            <div className="p-4 mb-6 border-l-4 border-green-500 bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    Password reset successful! Redirecting to login...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
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

          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="••••••••"
                  disabled={isLoading || success}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none hover:cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="••••••••"
                  disabled={isLoading || success}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none hover:cursor-pointer"
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || success}
                className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
                  isLoading || success ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading
                  ? "Resetting Password..."
                  : success
                  ? "Password Reset!"
                  : "Reset Password"}
              </button>
            </div>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-red-800 hover:text-red-900 hover:underline hover:cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>© {new Date().getFullYear()} Pass College. All rights reserved.</p>
      </div>
    </div>
  );
}
