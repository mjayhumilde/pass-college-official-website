import { useEffect, useState } from "react";
import ChangePasswordCard from "../components/ChangePasswordCard";
import ProfileInformationCard from "../components/ProfileInformationCard";
import ProfileLogoutButton from "../components/ProfileLogoutButton";

export default function ProfilePage() {
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto space-y-6">
        <ProfileInformationCard />
        <ChangePasswordCard
          isLoading={isPasswordUpdating}
          onLoadingChange={setIsPasswordUpdating}
        />
      </div>
      <ProfileLogoutButton isLoading={isPasswordUpdating} />
    </main>
  );
}
