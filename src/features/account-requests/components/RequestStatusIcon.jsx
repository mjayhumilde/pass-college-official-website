import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

export default function RequestStatusIcon({ status, size = 16 }) {
  switch (status) {
    case "pending":
      return <Clock size={size} className="text-yellow-500" />;
    case "approved":
      return <CheckCircle size={size} className="text-green-500" />;
    case "rejected":
      return <XCircle size={size} className="text-red-500" />;
    default:
      return <AlertTriangle size={size} className="text-gray-500" />;
  }
}
