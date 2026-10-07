import type { Metadata } from "next";

import { AuthPage } from "@/components/Modules/Core/Auth/auth-page";
import { REDIRECT_PARAM } from "@/constants/Modules/Core/Auth/auth";
import { resolveSafeRedirect } from "@/lib/Modules/Core/Auth/resolve-safe-redirect";

import { LoginFlow } from "./components/login-flow";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse o EcomTrack com seu e-mail e senha.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const target = (await searchParams)[REDIRECT_PARAM];
  return (
    <AuthPage>
      <LoginFlow redirectTo={resolveSafeRedirect(typeof target === "string" ? target : null)} />
    </AuthPage>
  );
}
