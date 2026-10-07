import type { Metadata } from "next";

import { AuthLinkInvalid } from "@/components/Modules/Core/Auth/auth-link-invalid";
import { AuthPage } from "@/components/Modules/Core/Auth/auth-page";
import { LOGIN_HREF } from "@/constants/Modules/Core/Auth/auth";

import { AcceptInvite } from "./components/accept-invite";

export const metadata: Metadata = {
  title: "Convite",
  description: "Crie a sua senha para entrar no EcomTrack.",
};

export default async function InvitePage({ params }: PageProps<"/convite/[[...token]]">) {
  const [token] = (await params).token ?? [];
  return (
    <AuthPage title="Bem-vindo ao EcomTrack">
      {token ? (
        <AcceptInvite token={token} />
      ) : (
        <AuthLinkInvalid
          message="Este link de convite não é válido. Peça um novo convite a quem te convidou."
          actionHref={LOGIN_HREF}
          actionLabel="Ir para o login"
        />
      )}
    </AuthPage>
  );
}
