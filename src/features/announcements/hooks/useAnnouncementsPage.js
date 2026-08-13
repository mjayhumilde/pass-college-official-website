import { useEffect } from "react";
import { useScrollToPost } from "../../../hook/useScrollPost";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";

const ANNOUNCEMENT_MANAGER_ROLES = ["admin", "registrar"];

export default function useAnnouncementsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const announcements = usePostStore((state) => state.announcements);
  const getAllPost = usePostStore((state) => state.getAllPost);

  useScrollToPost();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return {
    announcements,
    canManageAnnouncements:
      isAuthenticated && ANNOUNCEMENT_MANAGER_ROLES.includes(userRole),
  };
}
