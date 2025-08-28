"use client";
import { useUserData } from "@/hooks/useUserData";

import AccountSkeleton from "./AccountSkeleton";
import { accountContentWrapper } from "./index.css";
import PasswordData from "./PasswordData";
import ProfileData from "./ProfileData";

export default function AcountTab() {
  const { isLoading } = useUserData();

  if (isLoading) {
    return <AccountSkeleton />;
  }

  return (
    <div className={accountContentWrapper}>
      <ProfileData />
      <PasswordData />
    </div>
  );
}
