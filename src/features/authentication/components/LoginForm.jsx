import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import AuthFeedbackMessage from "./AuthFeedbackMessage";
import PasswordField from "./PasswordField";

export default function LoginForm({ onForgotPassword }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error: authError } = useAuthStore();

  useEffect(() => {
    if (authError) {
      console.log("Login failed:", authError);
    }
  }, [authError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <>
      {authError && (
        <AuthFeedbackMessage
          type="error"
          message={authError}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="you@school_gmail.com"
            />
          </div>
        </div>

        <PasswordField
          id="password"
          label="Password"
          value={password}
          isVisible={isPasswordVisible}
          onChange={setPassword}
          onToggleVisibility={() =>
            setIsPasswordVisible((currentVisibility) => !currentVisibility)
          }
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-red-800 hover:text-red-900 hover:cursor-pointer"
          >
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              New student? / No account?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("create-account-request")}
            className="text-sm font-medium text-red-950 underline hover:cursor-pointer hover:text-red-800"
          >
            REQUEST FOR AN ACCOUNT CREATION
          </button>
        </div>
      </div>
    </>
  );
}
