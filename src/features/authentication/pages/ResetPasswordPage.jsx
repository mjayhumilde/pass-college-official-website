import { useEffect } from "react";
import resetPasswordLogo from "../../../assets/images/pass_log-removebg-preview.png";
import AuthPageLayout from "../components/AuthPageLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthPageLayout
      logoSrc={resetPasswordLogo}
      logoAlt="PASS College logo"
      backgroundClassName="bg-gray-50"
    >
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
