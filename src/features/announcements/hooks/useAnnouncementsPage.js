import { useEffect } from "react";
import { useScrollToPost } from "../../../shared/hooks";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";
import { hasPermission, PERMISSIONS } from "../../../app/auth/accessPolicy";

export default function useAnnouncementsPage() {
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
    canManageAnnouncements: hasPermission(userRole, PERMISSIONS.MANAGE_POSTS),
  };
}
