"use client";
import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { Notification } from "isskinui";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import SmallLogo from "@/assets/svgs/SmallLogo";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { Subscription } from "@/types/subscription";

import {
  createDefaultUserData,
  createDefaultProfessionalInfo,
  createDefaultSubscription,
  mergeProfessionalInfo,
  mergeSubscription,
  mergeUserData,
} from "../../utils/userDefaults";

import * as styles from "./index.css";
import { logo } from "./index.css";
import PaymentMethod from "./steps/PaymentMethod";
import PaymentPlan from "./steps/PaymentPlan";
import PersonalInfo from "./steps/PersonalInfo";
import ProfessionalInfo from "./steps/ProfessionalInfo";
import WorkField from "./steps/WorkField";

import type { User, UserData, UserProfessionalInfo } from "@/types/user";

type FormState = {
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
  subscription: Subscription;
  currentStep: number;
  profileCompleted: boolean;
};

export default function CompleteSignup() {
  const [formState, setFormState] = useState<FormState>({
    userData: createDefaultUserData(),
    professionalInfo: createDefaultProfessionalInfo(),
    subscription: createDefaultSubscription(),
    currentStep: 1,
    profileCompleted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { user } = useAuth();

  // Initialize user profile in Firestore and load existing data
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
          // Load existing data with safe merging
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

          setFormState({
            userData: safeUserData,
            professionalInfo: safeProfessionalInfo,
            subscription: safeSubscription,
            currentStep: 1,
            profileCompleted: !!existingData.subscription?.plan,
          });

          // If profile is already completed, redirect
          if (
            existingData.subscription?.plan &&
            existingData.subscription.plan !== "free"
          ) {
            router.push("/analyse");
            return;
          }
        } else {
          // Create initial user document with free subscription
          const initialSubscription: Subscription = {
            plan: "free",
            status: "active",
            startDate: Timestamp.now(),
            endDate: null,
            usage: {
              analysisCount: 0,
              analysisLimit: 10, // Free tier limit
              pdfCount: 0,
              pdfLimit: 5, // Free tier limit
            },
          };

          const initialProfile: User = {
            userData: createDefaultUserData(
              user.email || "",
              user.emailVerified
            ),
            professionalInfo: createDefaultProfessionalInfo(),
            subscription: initialSubscription,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          await setDoc(userRef, initialProfile);

          setFormState((prev) => ({
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

  // Save data progressively
  const saveStep = async (
    stepData: Partial<
      Pick<User, "userData" | "professionalInfo" | "subscription">
    >
  ) => {
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
      setFormState((prev) => {
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

  // Complete profile setup
  const completeProfile = async () => {
    if (!user) return false;

    setIsSubmitting(true);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        updatedAt: Timestamp.now(),
      });

      router.push("/analyse");
      return true;
    } catch (error) {
      console.error("Error completing profile:", error);
      setSaveError("Erro ao finalizar cadastro. Tente novamente.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async (
    stepData?: Partial<
      Pick<User, "userData" | "professionalInfo" | "subscription">
    >
  ) => {
    if (stepData) {
      const saved = await saveStep(stepData);
      if (!saved) return; // Don't proceed if save failed
    }

    setFormState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const prevStep = () => {
    setFormState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const totalSteps = 6;
  const getProgressPercentage = () => {
    return Math.min(
      ((formState.currentStep - 1) / (totalSteps - 1)) * 100,
      100
    );
  };

  const renderStep = () => {
    if (!user || isLoading) {
      return <div>Carregando...</div>;
    }

    switch (formState.currentStep) {
      case 1:
        return (
          <PersonalInfo
            userData={formState.userData}
            onNext={(userData) => nextStep({ userData })}
            isSubmitting={isSubmitting}
          />
        );
      case 2:
        return (
          <WorkField
            professionalInfo={formState.professionalInfo}
            onNext={(professionalInfo) => nextStep({ professionalInfo })}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return (
          <ProfessionalInfo
            professionalInfo={formState.professionalInfo}
            onNext={(professionalInfo) => nextStep({ professionalInfo })}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 4:
        return (
          <PaymentPlan
            onNext={(plan) =>
              nextStep({
                subscription: { ...formState.subscription, plan },
              })
            }
            isSubmitting={isSubmitting}
          />
        );
      case 5:
        return (
          <PaymentMethod
            onNext={(paymentData) => {
              nextStep();
            }}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 6:
        return <>Passo 6</>;
      default:
        return null;
    }
  };

  // if (!user) {
  //   router.push("/signup");
  //   return null;
  // }

  return (
    <>
      {saveError && <Notification type="error" label={saveError} />}

      <div className={styles.container}>
        <div className={styles.header}>
          <SmallLogo className={logo} />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className={styles.stepIndicators}>
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, currentStep: i + 1 }))
                  }
                  key={i}
                  className={`${styles.stepIndicator} ${
                    i < formState.currentStep ? styles.completed : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        <main className={styles.main}>{renderStep()}</main>
      </div>
    </>
  );
}
