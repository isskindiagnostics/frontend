import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { StepData } from "@/types/formSteps";
import { Subscription } from "@/types/subscription";
import {
  User,
  UserBillingAddress,
  UserData,
  UserProfessionalInfo,
} from "@/types/user";
import {
  createDefaultUserData,
  createDefaultProfessionalInfo,
  createDefaultSubscription,
  mergeProfessionalInfo,
  mergeSubscription,
  mergeUserData,
  createDefaultBillingAddress,
  mergeBillingAddress,
} from "@/utils/userDefaults";

import type { User as FirebaseUser } from "firebase/auth";

type UserProfileState = {
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
  subscription: Subscription;
  billingAddress: UserBillingAddress;
  profileCompleted: boolean;
};

type UserProfileActions = {
  saveStep: (stepData: StepData) => Promise<boolean>;
  completeProfile: () => Promise<boolean>;
  updateLocalState: (updates: Partial<UserProfileState>) => void;
  refreshUserData: () => Promise<void>;
};

export const useUserProfile = () => {
  const [profileState, setProfileState] = useState<UserProfileState>({
    userData: createDefaultUserData(),
    professionalInfo: createDefaultProfessionalInfo(),
    subscription: createDefaultSubscription(),
    billingAddress: createDefaultBillingAddress(),
    profileCompleted: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const isBillingAddressComplete = (address?: UserBillingAddress): boolean => {
    if (!address) return false;
    return Object.values(address).every(
      (value) => !!value && value.trim() !== ""
    );
  };

  const isProfileComplete = (userData: Partial<User>): boolean => {
    const subscription = userData.subscription;

    if (!subscription?.plan || !subscription?.status) {
      return false;
    }

    // For free plan, status should be "active" and basic info should be complete
    if (subscription.plan === "free") {
      return (
        subscription.status === "active" &&
        !!userData.userData?.name &&
        !!userData.professionalInfo?.fieldOfWork
      );
    }

    if (subscription.plan === "flex") {
      return (
        subscription.status === "active" &&
        !!userData.userData?.name &&
        !!userData.professionalInfo?.fieldOfWork
      );
    }

    // For premium plan, everything must be complete
    if (subscription.plan === "premium") {
      return (
        subscription.status === "active" &&
        !!userData.userData?.name &&
        !!userData.professionalInfo?.fieldOfWork &&
        isBillingAddressComplete(userData.billingAddress) &&
        !!subscription.stripeData?.defaultPaymentMethodId
      );
    }

    return false;
  };

  const createInitialUserProfile = async (
    user: FirebaseUser
  ): Promise<User> => {
    const initialSubscription: Subscription = {
      plan: null,
      status: "incomplete",
      startDate: null,
      endDate: null,
      usage: {
        analysisCount: 0,
        analysisLimit: 10,
        pdfCount: 0,
        pdfLimit: -1,
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

  // Function to load user data
  const loadUserData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      setDataLoaded(false);
      return;
    }

    try {
      setIsLoading(true);
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

        const safeBillingAddress = mergeBillingAddress(
          existingData.billingAddress || {},
          createDefaultBillingAddress()
        );

        const profileCompleted = isProfileComplete(existingData);

        setProfileState({
          userData: safeUserData,
          professionalInfo: safeProfessionalInfo,
          subscription: safeSubscription,
          billingAddress: safeBillingAddress,
          profileCompleted,
        });

        setDataLoaded(true);

        if (profileCompleted) {
          console.log("Profile completed - redirecting to analysis");
          router.push("/signup/success");
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
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setSaveError("Erro ao carregar perfil do usuário.");
      setDataLoaded(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  // Initialize user profile
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Function to reload user data
  const refreshUserData = useCallback(async () => {
    await loadUserData();
  }, [loadUserData]);

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

        if (stepData.billingAddress) {
          newState.billingAddress = mergeBillingAddress(
            stepData.billingAddress,
            prev.billingAddress
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

      const userSnap = await getDoc(userRef);
      let currentState;

      if (userSnap.exists()) {
        currentState = userSnap.data() as Partial<User>;
      } else {
        // Fallback to local state if document doesn't exist
        currentState = {
          userData: profileState.userData,
          professionalInfo: profileState.professionalInfo,
          subscription: profileState.subscription,
          billingAddress: profileState.billingAddress,
        };
      }

      await updateDoc(userRef, {
        updatedAt: Timestamp.now(),
      });

      const profileCompleted = isProfileComplete(currentState);

      if (profileCompleted) {
        router.push("/signup/success");
      } else {
        console.log("Profile is not complete yet");
      }

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
    refreshUserData,
  };

  return {
    ...profileState,
    isLoading,
    isSubmitting,
    saveError,
    dataLoaded,
    actions,
  };
};
