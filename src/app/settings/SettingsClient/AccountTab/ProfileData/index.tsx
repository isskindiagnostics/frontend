"use client";
import { FirebaseError } from "firebase/app";
import { InputField, Notification, Button } from "isskinui";
import { useState, useEffect } from "react";

import ContentBlock from "@/components/ContentBlock";
import EmailVerificationButton from "@/components/EmailVerificationButton";
import PhotoSettings from "@/components/PhotoSettings";
import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";

import { titleAndDescription } from "../../index.css";
import {
  accountButtonWrapper,
  accountContentBlock,
  inputWrapper,
  profileSettings,
} from "../index.css";

export default function ProfileData() {
  const { user } = useAuth();
  const {
    userData,
    updateProfilePicture,
    updateUserData,
    updateUserEmailWithPassword,
  } = useUserData();
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEmailUpdateMode, setIsEmailUpdateMode] = useState(false);

  const hasNameChanges = name !== originalName;
  const hasEmailChanges = email !== originalEmail;
  const hasChanges = hasNameChanges || hasEmailChanges;

  useEffect(() => {
    if (userData?.userData) {
      const userName = userData.userData.name || "";
      const userEmail = userData.userData.email || "";

      setName(userName);
      setEmail(userEmail);
      setOriginalName(userName);
      setOriginalEmail(userEmail);
    }
  }, [userData]);

  const handleUploadComplete = async (url: string) => {
    try {
      const success = await updateProfilePicture(url);

      if (success) {
        setSuccessMessage("Foto do perfil atualizada com sucesso!");
      } else {
        setErrorMessage(
          "Falha ao carregar a imagem. Por favor, tente novamente."
        );
      }
    } catch (error) {
      console.error("Failed to update profile after upload:", error);
      setErrorMessage(
        "Falha ao carregar a imagem. Por favor, tente novamente."
      );
    }
  };

  const handleUploadError = (error: Error) => {
    setErrorMessage("Falha ao carregar a imagem. Por favor, tente novamente.");
    console.error("Upload failed:", error);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      // Handle name update
      if (hasNameChanges) {
        const nameSuccess = await updateUserData({
          "userData.name": name,
        });

        if (!nameSuccess) {
          setErrorMessage("Falha ao atualizar nome. Tente novamente.");
          setIsSaving(false);
          return;
        }
      }

      // Handle email update (requires verification and password)
      if (hasEmailChanges) {
        if (!user?.emailVerified) {
          setErrorMessage(
            "Você precisa verificar seu e-mail atual antes de alterá-lo."
          );
          setIsSaving(false);
          return;
        }

        if (!currentPassword) {
          setErrorMessage("Senha atual é obrigatória para alterar o e-mail.");
          setIsSaving(false);
          return;
        }

        const emailSuccess = await updateUserEmailWithPassword(
          email,
          currentPassword
        );

        if (!emailSuccess) {
          setErrorMessage(
            "Falha ao atualizar e-mail. Verifique sua senha e tente novamente."
          );
          setIsSaving(false);
          return;
        }

        setSuccessMessage(
          "E-mail atualizado! Verifique sua nova caixa de entrada para confirmar."
        );
        setCurrentPassword("");
        setIsEmailUpdateMode(false);
      } else if (hasNameChanges) {
        setSuccessMessage("Perfil atualizado com sucesso!");
      }

      // Update original values
      setOriginalName(name);
      setOriginalEmail(email);
    } catch (error) {
      console.error("Failed to save profile:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMessage("Senha atual incorreta.");
            break;
          case "auth/requires-recent-login":
            setErrorMessage(
              "Por segurança, faça login novamente antes de alterar o e-mail."
            );
            break;
          case "auth/too-many-requests":
            setErrorMessage("Muitas tentativas. Tente novamente mais tarde.");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Erro de rede. Verifique sua conexão.");
            break;
          case "auth/user-not-found":
            setErrorMessage("Usuário não encontrado.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Formato de e-mail inválido.");
            break;
          default:
            setErrorMessage("Falha ao atualizar perfil. Tente novamente.");
        }
      } else if (error instanceof Error) {
        if (error.message?.includes("password verification")) {
          setErrorMessage("Senha atual é obrigatória para alterar o e-mail.");
        } else {
          setErrorMessage("Erro interno. Tente novamente.");
        }
      } else {
        setErrorMessage("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== originalEmail && !isEmailUpdateMode) {
      setIsEmailUpdateMode(true);
    } else if (e.target.value === originalEmail && isEmailUpdateMode) {
      setIsEmailUpdateMode(false);
      setCurrentPassword("");
    }
  };

  return (
    <>
      {successMessage && <Notification type="success" label={successMessage} />}
      {errorMessage && <Notification type="error" label={errorMessage} />}
      <ContentBlock className={accountContentBlock}>
        <div className={profileSettings}>
          <PhotoSettings
            defaultImage={userData?.userData?.profilePicture}
            width={94}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
          <div className={titleAndDescription}>
            <h3>Perfil</h3>
            <p>Mantenha os dados da sua conta seguros e atualizados.</p>
          </div>
        </div>

        <div className={inputWrapper}>
          <InputField
            label="Nome"
            name="name"
            width="100%"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="E-mail"
            type="email"
            name="email"
            width="100%"
            value={email}
            onChange={handleEmailChange}
            disabled={!user?.emailVerified}
            hint={
              !user?.emailVerified
                ? "Verifique seu e-mail atual antes de alterá-lo"
                : hasEmailChanges
                  ? "Alterar o e-mail requer nova verificação"
                  : undefined
            }
          />

          {isEmailUpdateMode && hasEmailChanges && (
            <InputField
              label="Senha"
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              width="100%"
              value={currentPassword}
              icon={showPassword ? "EyeOff" : "Eye"}
              iconOnClick={() => setShowPassword(!showPassword)}
              onChange={(e) => setCurrentPassword(e.target.value)}
              hint="Digite sua senha para confirmar a alteração do e-mail"
              required
            />
          )}

          {hasChanges && (
            <div className={accountButtonWrapper}>
              <EmailVerificationButton /> {/* TODO: Not shwoing */}
              <Button onClick={handleSave} disabled={isSaving}>
                Salvar alterações
              </Button>
            </div>
          )}
        </div>
      </ContentBlock>
    </>
  );
}
