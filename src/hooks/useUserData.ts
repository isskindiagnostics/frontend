import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { User } from "@/types/user";

export const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUserEmail } = useAuth();

  const loadUserData = useCallback(async () => {
    if (!user?.uid) {
      setIsLoading(false);
      setUserData(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as User;
        setUserData(data);
      } else {
        setUserData(null);
        setError("User document not found");
      }
    } catch (err) {
      console.error("Error loading user data:", err);
      setError("Failed to load user data");
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  const updateUserData = useCallback(
    async (
      updates: Record<string, string | number | boolean>
    ): Promise<boolean> => {
      if (!user?.uid) {
        setError("No authenticated user");
        return false;
      }

      try {
        setError(null);

        const emailUpdate = updates["userData.email"];
        if (emailUpdate) {
          throw new Error(
            "Email updates require password verification. Use updateUserEmail instead."
          );
        }

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          ...updates,
          updatedAt: Timestamp.now(),
        });

        // Refresh data to ensure local state is in sync
        await loadUserData();

        return true;
      } catch (err) {
        console.error("Error updating user data:", err);
        setError("Failed to update user data");
        return false;
      }
    },
    [user?.uid, loadUserData]
  );

  const updateUserEmailWithPassword = useCallback(
    async (newEmail: string, currentPassword: string): Promise<boolean> => {
      try {
        setError(null);
        await updateUserEmail(newEmail, currentPassword);
        await loadUserData();
        return true;
      } catch (err) {
        console.error("Error updating email:", err);
        setError("Failed to update email");
        return false;
      }
    },
    [updateUserEmail, loadUserData]
  );

  const updateProfilePicture = useCallback(
    async (profilePicture: string): Promise<boolean> => {
      return updateUserData({
        "userData.profilePicture": profilePicture,
      });
    },
    [updateUserData]
  );

  const refreshUserData = useCallback(() => {
    loadUserData();
  }, [loadUserData]);

  // Load data on mount and when user changes
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    userData,
    isLoading,
    error,
    updateUserData,
    updateUserEmailWithPassword,
    updateProfilePicture,
    refreshUserData,
  };
};
