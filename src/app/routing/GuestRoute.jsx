import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function getReturnPath(locationState) {
  const from = locationState?.from;

  if (!from?.pathname || !from.pathname.startsWith("/")) {
    return "/";
  }

  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
}

export default function GuestRoute() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={getReturnPath(location.state)} replace />;
  }

  return <Outlet />;
}
