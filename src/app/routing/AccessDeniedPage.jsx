import { ArrowLeft, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccessDeniedPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="w-full max-w-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <ShieldX className="mx-auto mb-5 text-red-primary" size={52} />
        <h1 className="text-2xl font-bold text-red-950">Access denied</h1>
        <p className="mt-3 text-gray-600">
          Your account does not have permission to open this page.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 bg-red-primary px-5 py-2 font-semibold text-white hover:bg-red-900"
        >
          <ArrowLeft size={18} />
          Return home
        </Link>
      </div>
    </main>
  );
}
