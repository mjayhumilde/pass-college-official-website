import { useEffect } from "react";
import { useScrollToPost } from "../../../hook/useScrollPost";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";

const UNIFORM_MANAGER_ROLES = ["admin", "registrar"];

export default function useUniformsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const uniforms = usePostStore((state) => state.uniforms);
  const getAllPost = usePostStore((state) => state.getAllPost);

  useScrollToPost();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return {
    uniforms,
    canManageUniforms:
      isAuthenticated && UNIFORM_MANAGER_ROLES.includes(userRole),
  };
}
