"use client";
import { FirebaseError } from "firebase/app";
import { Button, Notification } from "isskinui";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";

const EmailVerificationButton = () => {
  const { user, sendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();

  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Don't show banner if user email is verified
  if (user?.emailVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await sendVerificationEmail();
      setSuccessMessage("E-mail de verificação enviado com sucesso!");
      setCooldown(60);
    } catch (error) {
      console.error("Error sending verification email:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/too-many-requests":
            setErrorMessage("Muitas tentativas. Tente novamente mais tarde.");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Erro de rede. Verifique sua conexão.");
            break;
          case "auth/user-not-found":
            setErrorMessage("Usuário não encontrado.");
            break;
          default:
            setErrorMessage("Erro ao enviar e-mail de verificação.");
        }
      } else {
        setErrorMessage("Erro inesperado ao enviar e-mail de verificação.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {successMessage && <Notification type="success" label={successMessage} />}
      {errorMessage && <Notification type="error" label={errorMessage} />}

      <Button
        variant="outlined"
        onClick={handleResendVerification}
        disabled={isResending || cooldown > 0}
      >
        {isResending
          ? "Enviando"
          : cooldown > 0
            ? `Reenviar (${cooldown}s)`
            : "Verificar e-mail"}
      </Button>
    </>
  );
};

export default EmailVerificationButton;
