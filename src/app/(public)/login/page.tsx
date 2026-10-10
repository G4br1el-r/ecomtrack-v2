import type { Metadata } from "next";

import { LOGIN_FORGOT_STEP, LOGIN_STEP_PARAM, REDIRECT_PARAM } from "@/constants/Modules/Core/Auth/auth";
import { resolveSafeRedirect } from "@/lib/Modules/Core/Auth/resolve-safe-redirect";

import { LoginFlow } from "./components/login-flow";
import { LoginMobileHero } from "./components/login-mobile-hero";
import { LoginShowcase } from "./components/login-showcase";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse o EcomTrack com seu e-mail e senha.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const target = params[REDIRECT_PARAM];
  return (
    <main className="min-h-dvh bg-background lg:grid lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <LoginMobileHero />
      <LoginShowcase />
      <section className="flex justify-center bg-background px-6 pb-10 lg:items-center lg:px-14 lg:py-10">
        <LoginFlow
          redirectTo={resolveSafeRedirect(typeof target === "string" ? target : null)}
          initialStep={params[LOGIN_STEP_PARAM] === LOGIN_FORGOT_STEP ? "forgot" : "credentials"}
        />
      </section>
    </main>
  );
}
