import type { Metadata } from "next";

import { AuthPage } from "@/components/Modules/Core/Auth/auth-page";

import { ForgotPasswordForm } from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Esqueci a senha",
  description: "Receba um link para criar uma nova senha.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPage
      title="Esqueci a senha"
      description="Informe o seu e-mail e enviaremos um link para criar uma nova senha."
    >
      <ForgotPasswordForm />
    </AuthPage>
  );
}
