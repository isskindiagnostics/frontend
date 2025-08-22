"use client";

import { FirebaseError } from "firebase/app";
import { Button, InputField, Link, Notification } from "isskinui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";

import * as styles from "./index.css";

export default function SignupForm() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useShowToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Check if fields are empty
    if (!email.trim()) {
      newErrors["email"] = "E-mail é obrigatório.";
    } else {
      // Check email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        newErrors["email"] = "Formato de e-mail inválido.";
      }
    }

    if (!password) {
      newErrors["password"] = "Senha é obrigatória.";
    } else {
      // Check password requirements
      if (password.length < 8) {
        newErrors["password"] = "A senha deve ter pelo menos 8 caracteres.";
      } else if (!/[a-z]/.test(password)) {
        newErrors["password"] =
          "A senha deve conter pelo menos uma letra minúscula.";
      } else if (!/[A-Z]/.test(password)) {
        newErrors["password"] =
          "A senha deve conter pelo menos uma letra maiúscula.";
      } else if (!/\d/.test(password)) {
        newErrors["password"] = "A senha deve conter pelo menos um número.";
      } else if (!/[@$!%*?&]/.test(password)) {
        newErrors["password"] =
          "A senha deve conter pelo menos um caractere especial (@$!%*?&).";
      }
    }

    return newErrors;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");
    setErrors({});
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await signUp(email, password);
      router.push("/signup/complete");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrors({ email: "Este e-mail já está em uso." });
            break;
          case "auth/invalid-email":
            setErrors({ email: "Formato de e-mail inválido." });
            break;
          case "auth/weak-password":
            setErrors({ password: "A senha é muito fraca." });
            break;
          case "auth/network-request-failed":
            setGeneralError(
              "Erro de rede. Verifique sua conexão com a internet e tente novamente."
            );
            break;
          case "auth/too-many-requests":
            setGeneralError("Muitas tentativas. Tente novamente mais tarde.");
            break;
          default:
            console.error("Erro Firebase:", error.code, error.message);
            setGeneralError("Ocorreu um erro inesperado. Tente novamente.");
        }
      } else {
        console.error("Erro não-Firebase:", error);
        setGeneralError("Erro desconhecido.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {generalError && <Notification type="error" label={generalError} />}

      <form className={styles.form} onSubmit={handleSignup}>
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="100%"
          error={errors["email"]}
          disabled={isSubmitting}
          required
        />
        <InputField
          label="Senha"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
          icon={showPassword ? "EyeOff" : "Eye"}
          type={showPassword ? "text" : "password"}
          iconOnClick={() => setShowPassword(!showPassword)}
          error={errors["password"]}
          disabled={isSubmitting}
          required
        />
        <Button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Criar Conta
        </Button>

        <p className={styles.privacy}>
          Ao clicar em criar conta você concorda com os <br />
          <Link href="/terms-of-service" target="_blank">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link href="/privacy-policy" target="_blank">
            Políticas de Privacidade.
          </Link>
        </p>
      </form>

      <p className={styles.bottomLogin}>
        Já possui uma conta?{" "}
        <Link onClick={() => router.push("/login")}>Entrar</Link>
      </p>
    </>
  );
}
