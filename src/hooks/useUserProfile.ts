import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { StepData } from "@/types/formSteps";
import { Subscription } from "@/types/subscription";
import { User, UserData, UserProfessionalInfo } from "@/types/user";
import {
  createDefaultUserData,
  createDefaultProfessionalInfo,
  createDefaultSubscription,
  mergeProfessionalInfo,
  mergeSubscription,
  mergeUserData,
} from "@/utils/userDefaults";

import type { User as FirebaseUser } from "firebase/auth";

type UserProfileState = {
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
  subscription: Subscription;
  profileCompleted: boolean;
};

type UserProfileActions = {
  saveStep: (stepData: StepData) => Promise<boolean>;
  completeProfile: () => Promise<boolean>;
  updateLocalState: (updates: Partial<UserProfileState>) => void;
};

export const useUserProfile = () => {
  const [profileState, setProfileState] = useState<UserProfileState>({
    userData: createDefaultUserData(),
    professionalInfo: createDefaultProfessionalInfo(),
    subscription: createDefaultSubscription(),
    profileCompleted: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useAuth();

  // Initialize user profile
  useEffect(() => {
    const initializeUserProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const existingData = userSnap.data() as Partial<User>;

          const safeUserData = mergeUserData(
            existingData.userData || {},
            createDefaultUserData(user.email || "", user.emailVerified)
          );

          const safeProfessionalInfo = mergeProfessionalInfo(
            existingData.professionalInfo || {},
            createDefaultProfessionalInfo()
          );

          const safeSubscription = mergeSubscription(
            existingData.subscription || {},
            createDefaultSubscription()
          );

          setProfileState({
            userData: safeUserData,
            professionalInfo: safeProfessionalInfo,
            subscription: safeSubscription,
            profileCompleted: !!existingData.subscription?.plan,
          });

          // Redirect if profile is completed
          if (
            existingData.subscription?.plan &&
            existingData.subscription.plan !== "free"
          ) {
            router.push("/analysis");
            return;
          }
        } else {
          // Create initial user document
          const initialProfile = await createInitialUserProfile(user);
          setProfileState((prev) => ({
            ...prev,
            userData: initialProfile.userData,
            subscription: initialProfile.subscription,
          }));
        }
      } catch (error) {
        console.error("Error initializing user profile:", error);
        setSaveError("Erro ao carregar perfil do usuário.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUserProfile();
  }, [user, router]);

  const createInitialUserProfile = async (
    user: FirebaseUser
  ): Promise<User> => {
    const initialSubscription: Subscription = {
      plan: "free",
      status: "active",
      startDate: Timestamp.now(),
      endDate: null,
      usage: {
        analysisCount: 0,
        analysisLimit: 10,
        pdfCount: 0,
        pdfLimit: 5,
      },
    };

    const initialProfile: User = {
      userData: createDefaultUserData(user.email || "", user.emailVerified),
      professionalInfo: createDefaultProfessionalInfo(),
      subscription: initialSubscription,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, initialProfile);

    return initialProfile;
  };

  const saveStep = async (stepData: StepData): Promise<boolean> => {
    if (!user) return false;

    setSaveError(null);
    setIsSubmitting(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const updatedData = {
        ...stepData,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(userRef, updatedData);

      // Update local state with safe merging
      setProfileState((prev) => {
        const newState = { ...prev };

        if (stepData.userData) {
          newState.userData = mergeUserData(stepData.userData, prev.userData);
        }

        if (stepData.professionalInfo) {
          newState.professionalInfo = mergeProfessionalInfo(
            stepData.professionalInfo,
            prev.professionalInfo
          );
        }

        if (stepData.subscription) {
          newState.subscription = mergeSubscription(
            stepData.subscription,
            prev.subscription
          );
        }

        return newState;
      });

      return true;
    } catch (error) {
      console.error("Error saving step data:", error);
      setSaveError("Erro ao salvar dados. Tente novamente.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeProfile = async (): Promise<boolean> => {
    if (!user) return false;

    setIsSubmitting(true);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        updatedAt: Timestamp.now(),
      });

      router.push("/analysis");
      return true;
    } catch (error) {
      console.error("Error completing profile:", error);
      setSaveError("Erro ao finalizar cadastro. Tente novamente.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLocalState = (updates: Partial<UserProfileState>) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
  };

  const actions: UserProfileActions = {
    saveStep,
    completeProfile,
    updateLocalState,
  };

  return {
    ...profileState,
    isLoading,
    isSubmitting,
    saveError,
    actions,
  };
};
