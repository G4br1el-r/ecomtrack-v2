import type { Metadata } from "next";

import { AuthLinkInvalid } from "@/components/Modules/Core/Auth/auth-link-invalid";
import { AuthPage } from "@/components/Modules/Core/Auth/auth-page";
import { FORGOT_PASSWORD_HREF } from "@/constants/Modules/Core/Auth/auth";

import { ResetPasswordForm } from "./components/reset-password-form";

export const metadata: Metadata = {
  title: "Criar nova senha",
  description: "Crie uma nova senha para entrar no EcomTrack.",
};

export default async function ResetPasswordPage({ params }: PageProps<"/redefinir-senha/[[...token]]">) {
  const [token] = (await params).token ?? [];
  return (
    <AuthPage title="Criar nova senha" description={token ? "Escolha uma senha nova para a sua conta." : undefined}>
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <AuthLinkInvalid
          message="Este link não é válido. Peça um novo link de troca de senha."
          actionHref={FORGOT_PASSWORD_HREF}
          actionLabel="Pedir novo link"
        />
      )}
    </AuthPage>
  );
}
