"use client";
import { FirebaseError } from "firebase/app";
import { Button, InputField, Link, Notification } from "isskinui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { bottomLogin } from "@/app/signup/SignupForm/index.css";
import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";

import * as styles from "./index.css";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useShowToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const emailInvalid = error !== null && email === "";
  const passwordInvalid = error !== null && password === "";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (email === "" || password === "") {
      setError("Preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(email, password);
      router.push("/analysis");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("Credenciais inválidas. Verifique seu e-mail e senha");
            break;
          case "auth/user-not-found":
            setError("Usuário não encontrado");
            break;
          case "auth/wrong-password":
            setError("Senha incorreta");
            break;
          case "auth/too-many-requests":
            setError("Muitas tentativas de login. Tente novamente mais tarde");
            break;
          default:
            setError(error.message);
        }
      } else {
        setError("Erro inesperado. Tente novamente");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {error && <Notification type="error" label={error} />}

      <form className={styles.form} onSubmit={handleLogin}>
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="100%"
          error={emailInvalid ? "Esse campo é obrigatório" : ""}
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
          error={passwordInvalid ? "Esse campo é obrigatório" : ""}
          disabled={isSubmitting}
          required
        />

        <Button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>

      <p className={bottomLogin}>
        Ainda não possui uma conta?{" "}
        <Link onClick={() => router.push("/signup")}>Faça uma já!</Link>
      </p>
    </>
  );
}
