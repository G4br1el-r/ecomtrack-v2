"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { LoginEntryStepName, LoginStep } from "@/@types/Modules/Core/Auth/login";
import {
  LOGIN_FORM_REVEAL_DELAY_SECONDS,
  LOGIN_FORM_REVEAL_OFFSET,
  LOGIN_STEP_COPY,
} from "@/constants/Modules/Core/Auth/login";
import { DURATION_BASE, EASE_OUT, SLIDE_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

import { ForgotPasswordForm } from "../forgot-password-form";
import { LoginCodeForm } from "../login-code-form";
import { LoginCredentialsForm } from "../login-credentials-form";

export function LoginFlow({
  redirectTo,
  initialStep = "credentials",
}: {
  redirectTo: string;
  initialStep?: LoginEntryStepName;
}) {
  const [step, setStep] = useState<LoginStep>(initialStep === "forgot" ? { name: "forgot" } : { name: "credentials" });
  const [email, setEmail] = useState("");
  const copy = LOGIN_STEP_COPY[step.name];
  const backToCredentials = () => setStep({ name: "credentials" });

  return (
    <motion.div
      className="w-full max-w-sm lg:transform-none! lg:opacity-100! [&_[data-slot=button]]:rounded-full"
      initial={{ opacity: 0, y: LOGIN_FORM_REVEAL_OFFSET }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_SOFT, delay: LOGIN_FORM_REVEAL_DELAY_SECONDS }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.name}
          initial={{ opacity: 0, y: SLIDE_OFFSET_Y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -SLIDE_OFFSET_Y }}
          transition={{ duration: DURATION_BASE, ease: EASE_OUT }}
        >
          <header className="mb-8 space-y-1.5 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">{copy.title}</h1>
            <p className="text-pretty text-muted-foreground text-sm">{copy.description}</p>
          </header>
          {step.name === "credentials" ? (
            <LoginCredentialsForm
              defaultEmail={email}
              onChallenge={(challenge, value) => {
                setEmail(value);
                setStep({ name: "code", challenge });
              }}
              onForgotPassword={(value) => {
                setEmail(value);
                setStep({ name: "forgot" });
              }}
            />
          ) : null}
          {step.name === "code" ? (
            <LoginCodeForm
              challenge={step.challenge}
              redirectTo={redirectTo}
              onResent={(challenge) => setStep({ name: "code", challenge })}
              onBack={backToCredentials}
            />
          ) : null}
          {step.name === "forgot" ? <ForgotPasswordForm defaultEmail={email} onBack={backToCredentials} /> : null}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
