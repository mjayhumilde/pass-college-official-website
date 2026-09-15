import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { hasPermission } from "../auth/accessPolicy";

export default function ProtectedRoute({ permission }) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (permission && !hasPermission(userRole, permission)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ requestedPath: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
