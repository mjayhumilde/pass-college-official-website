import { useEffect, useState } from "react";
import loginLogo from "../../../assets/images/logo/pass_logo.png";
import AuthPageLayout from "../components/AuthPageLayout";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

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
