import UniformManagementActions from "../components/UniformManagementActions";
import UniformsFeed from "../components/UniformsFeed";
import UniformsHeader from "../components/UniformsHeader";
import useUniformsPage from "../hooks/useUniformsPage";

export default function UniformsPage() {
  const { uniforms, canManageUniforms } = useUniformsPage();

  return (
    <>
      <UniformsHeader />
      <UniformManagementActions canManageUniforms={canManageUniforms} />
      <UniformsFeed uniforms={uniforms} />
    </>
  );
}
