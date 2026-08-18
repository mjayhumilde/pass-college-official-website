import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import AuthFeedbackMessage from "./AuthFeedbackMessage";
import PasswordField from "./PasswordField";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

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
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(
          result.error ||
            "Failed to reset password. The link may have expired.",
        );
      }
    } catch (submitError) {
      setError(
        submitError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-center text-red-primary">
        Reset Your Password
      </h2>

      {isSuccess && (
        <AuthFeedbackMessage
          type="success"
          message="Password reset successful! Redirecting to login..."
          className="mb-6"
        />
      )}
      {error && (
        <AuthFeedbackMessage type="error" message={error} className="mb-6" />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordField
          id="password"
          label="New Password"
          value={password}
          isVisible={isPasswordVisible}
          onChange={setPassword}
          onToggleVisibility={() =>
            setIsPasswordVisible((currentVisibility) => !currentVisibility)
          }
          autoComplete="new-password"
          disabled={isLoading || isSuccess}
          helpText="Must be at least 8 characters long"
        />
        <PasswordField
          id="passwordConfirm"
          label="Confirm New Password"
          value={passwordConfirm}
          isVisible={isPasswordConfirmVisible}
          onChange={setPasswordConfirm}
          onToggleVisibility={() =>
            setIsPasswordConfirmVisible(
              (currentVisibility) => !currentVisibility,
            )
          }
          autoComplete="new-password"
          disabled={isLoading || isSuccess}
        />

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
            isLoading || isSuccess ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? "Resetting Password..."
            : isSuccess
              ? "Password Reset!"
              : "Reset Password"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-red-800 hover:text-red-900 hover:underline hover:cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </>
  );
}
