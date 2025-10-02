import { useAuth } from "@/context/AuthContext";

export const useCurrentUser = () => {
  const { user, loading } = useAuth();

  return {
    uid: user?.uid || null,
    user,
    loading,
    isAuthenticated: !!user,
  };
};
