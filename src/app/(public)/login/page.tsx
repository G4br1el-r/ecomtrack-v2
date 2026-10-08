import type { Metadata } from "next";

import { LOGIN_FORGOT_STEP, LOGIN_STEP_PARAM, REDIRECT_PARAM } from "@/constants/Modules/Core/Auth/auth";
import { resolveSafeRedirect } from "@/lib/Modules/Core/Auth/resolve-safe-redirect";

import { LoginBrandPanel } from "./components/login-brand-panel";
import { LoginFlow } from "./components/login-flow";
import { LoginIntro } from "./components/login-intro";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse o EcomTrack com seu e-mail e senha.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const target = params[REDIRECT_PARAM];
  return (
    <main className="min-h-dvh bg-background lg:flex lg:items-center lg:justify-center lg:bg-muted lg:p-8">
      <LoginIntro />
      <div className="lg:grid lg:min-h-160 lg:w-full lg:max-w-5xl lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:overflow-hidden lg:rounded-3xl lg:bg-background lg:shadow-overlay">
        <LoginBrandPanel />
        <section className="flex justify-center px-6 pt-2 pb-10 lg:items-center lg:px-14 lg:py-10">
          <LoginFlow
            redirectTo={resolveSafeRedirect(typeof target === "string" ? target : null)}
            initialStep={params[LOGIN_STEP_PARAM] === LOGIN_FORGOT_STEP ? "forgot" : "credentials"}
          />
        </section>
      </div>
    </main>
  );
}
