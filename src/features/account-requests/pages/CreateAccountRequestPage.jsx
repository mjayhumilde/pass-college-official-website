import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequestAccountStore from "../store/useRequestAccountStore";
import AccountRequestStatusChecker from "../components/AccountRequestStatusChecker";
import AccountRequestSubmission from "../components/AccountRequestSubmission";
import PublicAccountRequestLayout from "../components/PublicAccountRequestLayout";

export default function CreateAccountRequestPage() {
  const navigate = useNavigate();
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { success, error, resetMessages } = useRequestAccountStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCheckingStatus]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(resetMessages, 15000);
      return () => clearTimeout(timer);
    }
  }, [success, error, resetMessages]);

  return (
    <PublicAccountRequestLayout showLogo={isCheckingStatus}>
      {isCheckingStatus ? (
        <AccountRequestStatusChecker
          onCreateRequest={() => setIsCheckingStatus(false)}
          onBackToLogin={() => navigate("/login")}
        />
      ) : (
        <AccountRequestSubmission
          onCheckStatus={() => setIsCheckingStatus(true)}
          onBackToLogin={() => navigate("/login")}
        />
      )}
    </PublicAccountRequestLayout>
  );
}
