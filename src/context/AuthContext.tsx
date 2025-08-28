"use client";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "@/firebase/config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateUserEmail: (newEmail: string, currentPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create initial user document in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        userData: {
          email: user.email,
          emailVerified: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Send verification email automatically after signup
    await sendEmailVerification(user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (!user) {
      throw new Error("No authenticated user");
    }

    if (user.emailVerified) {
      throw new Error("Email is already verified");
    }

    await sendEmailVerification(user);
  };

  const refreshUser = async () => {
    if (!user) return;

    await user.reload();

    if (user.emailVerified) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "userData.emailVerified": true,
        updatedAt: Timestamp.now(),
      });
    }
  };

  const updateUserEmail = async (newEmail: string, currentPassword: string) => {
    if (!user) {
      throw new Error("No authenticated user");
    }

    if (!user.emailVerified) {
      throw new Error("Current email must be verified before updating");
    }

    try {
      // Re-authenticate the user first
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, newEmail);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "userData.email": newEmail,
        "userData.emailVerified": false, // New email needs verification
        updatedAt: Timestamp.now(),
      });

      await sendEmailVerification(user);
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        logout,
        resetPassword,
        sendVerificationEmail,
        updateUserEmail,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
