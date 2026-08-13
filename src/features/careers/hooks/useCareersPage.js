import { useEffect } from "react";
import { useScrollToPost } from "../../../hook/useScrollPost";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";

const CAREER_MANAGER_ROLES = ["admin", "registrar"];

export default function useCareersPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const careers = usePostStore((state) => state.careers);
  const getAllPost = usePostStore((state) => state.getAllPost);

  useScrollToPost();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return {
    careers,
    canManageCareers:
      isAuthenticated && CAREER_MANAGER_ROLES.includes(userRole),
  };
}
