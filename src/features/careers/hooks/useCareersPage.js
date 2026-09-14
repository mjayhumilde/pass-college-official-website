import { useEffect } from "react";
import { useScrollToPost } from "../../../shared/hooks";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";
import { hasPermission, PERMISSIONS } from "../../../app/auth/accessPolicy";

export default function useCareersPage() {
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
    canManageCareers: hasPermission(userRole, PERMISSIONS.MANAGE_POSTS),
  };
}
