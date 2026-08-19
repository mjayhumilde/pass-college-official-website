import { useState } from "react";
import { Mail, Search } from "lucide-react";
import useRequestAccountStore from "../store/useRequestAccountStore";
import AccountRequestFeedback from "./AccountRequestFeedback";
import RequestStatusResult from "./RequestStatusResult";

export default function AccountRequestStatusChecker({
  onCreateRequest,
  onBackToLogin,
}) {
  const [email, setEmail] = useState("");
  const { loading, error, statusResult, checkStatus } =
    useRequestAccountStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      await checkStatus(email);
    } catch (submitError) {
      console.error("Error checking status:", submitError);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Check Request Status
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Enter your email to check your account request status
        </p>
      </div>

      {error && <AccountRequestFeedback type="error" message={error} />}
      <RequestStatusResult statusResult={statusResult} />

      <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
              placeholder="you@school_gmail.com"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className={`font-bold hover:cursor-pointer rounded-full w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${
            loading || !email.trim() ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Search className="w-4 h-4 mr-2" />
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">or</span>
          </div>
        </div>
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={onCreateRequest}
            className="block mx-auto text-sm font-medium text-red-950 hover:underline hover:cursor-pointer"
          >
            Create new account request
          </button>
          <button
            type="button"
            onClick={onBackToLogin}
            className="block mx-auto text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"
          >
            Back to login
          </button>
        </div>
      </div>
    </>
  );
}
