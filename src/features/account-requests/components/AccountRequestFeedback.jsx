import { AlertTriangle, CheckCircle } from "lucide-react";

export default function AccountRequestFeedback({ type, message }) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div
      className={`p-4 mb-6 border-l-4 ${
        isSuccess ? "border-green-500 bg-green-50" : "border-red-800 bg-red-50"
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={`w-5 h-5 ${
              isSuccess ? "text-green-500" : "text-red-800"
            }`}
          />
        </div>
        <div className="ml-3">
          <p
            className={`text-sm ${
              isSuccess ? "text-green-700" : "text-red-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
