import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, AlertTriangle } from "lucide-react";
import logo from "../assets/images/pass_log-removebg-preview.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === "test@example.com" && password === "wrongpassword") {
        setError("Invalid email or password");
      } else {
        console.log("Login successful!", { email, password });
      }
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <div className="flex flex-col justify-center px-4 py-3 bg-gray sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center mx-auto mb-1 rounded-full ">
          <img src={logo} alt="" className="w-2/5" />
        </div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="you@school_gmail.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-2 pl-10 pr-10 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-red-800 hover:text-red-900"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loggin in..." : "Log in"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  New student?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p href="#" className="text-sm font-medium text-red-950">
                Go to school registrar office
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>© {new Date().getFullYear()} Pass College. All rights reserved.</p>
        <div className="hidden mt-2">
          <a href="#" className="mx-2 text-red-800 hover:text-red-900">
            Privacy Policy
          </a>
          <a href="#" className="mx-2 text-red-800 hover:text-red-900">
            Terms of Service
          </a>
          <a href="#" className="mx-2 text-red-800 hover:text-red-900">
            Contact Support
          </a>
        </div>
        <div className="mt-10 space-x-2 space-y-2 bg-blue-100">
          <p className="text-xl text-red-700">
            *for development navigation only bayybiii!😉*
          </p>
          <button
            onClick={() => {
              login("user");
              navigate("/");
            }}
            className="px-2 py-2 text-blue-100 bg-blue-400 sm:px-7 hover:cursor-pointer hover:bg-blue-800"
          >
            Log in as USER
          </button>
          <button
            onClick={() => {
              login("teacher");
              navigate("/");
            }}
            className="px-2 py-2 text-blue-100 bg-blue-400 sm:px-7 hover:cursor-pointer hover:bg-blue-800"
          >
            Log in as TEACHER
          </button>
          <button
            onClick={() => {
              login("admin");
              navigate("/");
            }}
            className="px-2 py-2 text-blue-100 bg-blue-400 sm:px-7 hover:cursor-pointer hover:bg-blue-800"
          >
            Log in as ADMIN
          </button>
        </div>
      </div>
    </div>
  );
}
