"use client";
import { FirebaseError } from "firebase/app";
import { InputField, Notification, Button, IconLink } from "isskinui";
import { useState } from "react";

import ContentBlock from "@/components/ContentBlock";
import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";

import {
  accountButtonWrapper,
  accountContentBlock,
  headingAction,
  inputWrapper,
  passwordBlock,
} from "../index.css";


export default function PasswordData() {
  const { updateUserPassword } = useAuth();
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleUpdatePassword = async () => {
    // Validation
    if (!currentPassword) {
      setErrorMessage("Por favor, insira sua senha atual");
      return;
    }

    if (!newPassword) {
      setErrorMessage("Por favor, insira uma nova senha");
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "A nova senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial"
      );
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage("A nova senha deve ser diferente da senha atual");
      return;
    }

    setIsLoading(true);

    try {
      await updateUserPassword(currentPassword, newPassword);
      setSuccessMessage("Senha atualizada com sucesso!");

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setIsPasswordOpen(false);
    } catch (error) {
      console.error("Password update error:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMessage("Senha atual incorreta");
            break;
          case "auth/weak-password":
            setErrorMessage("A nova senha é muito fraca");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Muitas tentativas. Tente novamente mais tarde");
            break;
          case "auth/requires-recent-login":
            setErrorMessage(
              "Por favor, faça login novamente e tente atualizar sua senha"
            );
            break;
          default:
            setErrorMessage("Erro ao atualizar senha. Tente novamente");
        }
      } else {
        setErrorMessage("Erro inesperado. Tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setIsPasswordOpen(false);
    setErrorMessage("");
  };

  return (
    <>
      {successMessage && <Notification type="success" label={successMessage} />}
      {errorMessage && <Notification type="error" label={errorMessage} />}

      <ContentBlock className={`${accountContentBlock} ${passwordBlock}`}>
        <div>
          <div className={headingAction}>
            <h3>Senha</h3>
            {!isPasswordOpen && (
              <IconLink icon="Swap" onClick={() => setIsPasswordOpen(true)}>
                Alterar senha
              </IconLink>
            )}
          </div>
          <p>
            {isPasswordOpen
              ? "A nova senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial. Para manter sua conta ainda mais segura, evite reutilizar senhas de outros sites."
              : "Use uma senha forte e exclusiva para manter sua conta protegida."}
          </p>
        </div>

        {isPasswordOpen && (
          <>
            <div className={inputWrapper}>
              <InputField
                label="Senha atual"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                width="100%"
                value={currentPassword}
                icon={showCurrentPassword ? "EyeOff" : "Eye"}
                iconOnClick={() => setShowCurrentPassword(!showCurrentPassword)}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <InputField
                label="Nova senha"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                width="100%"
                value={newPassword}
                icon={showNewPassword ? "EyeOff" : "Eye"}
                iconOnClick={() => setShowNewPassword(!showNewPassword)}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className={accountButtonWrapper}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdatePassword} disabled={isLoading}>
                Atualizar senha
              </Button>
            </div>
          </>
        )}
      </ContentBlock>
    </>
  );
}
