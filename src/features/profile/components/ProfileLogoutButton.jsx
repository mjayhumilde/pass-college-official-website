import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

export default function ProfileLogoutButton({ isLoading }) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container flex justify-center p-5 mx-auto mt-5">
      <button
        className="px-8 py-1 rounded-full bg-red-primary text-red-50"
        disabled={isLoading}
        onClick={handleLogout}
      >
        <span className="flex items-center justify-center gap-1 font-bold hover:cursor-pointer">
          {isLoading ? "Logging out..." : "Log out"}
        </span>
      </button>
    </div>
  );
}
