import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../../assets/images/logo/pass_logo.png";
import useAuthStore from "../../../store/useAuthStore";
import AuthPageLayout from "../components/AuthPageLayout";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AuthPageLayout logoSrc={loginLogo} logoAlt="PASS College logo">
        <LoginForm onForgotPassword={() => setIsForgotPasswordOpen(true)} />
      </AuthPageLayout>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}
