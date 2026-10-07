"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DURATION_BASE, EASE_OUT, SLIDE_OFFSET_Y } from "@/constants/Modules/Core/DesignSystem/motion";
import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";

import { LoginCodeForm } from "../login-code-form";
import { LoginCredentialsForm } from "../login-credentials-form";

export function LoginFlow({ redirectTo }: { redirectTo: string }) {
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          <h1>{challenge ? "Verificação em duas etapas" : "Entrar"}</h1>
        </CardTitle>
        <CardDescription>
          {challenge ? "Digite o código que enviamos para o seu e-mail." : "Acesse com seu e-mail e senha."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={challenge ? "code" : "credentials"}
            initial={{ opacity: 0, y: SLIDE_OFFSET_Y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -SLIDE_OFFSET_Y }}
            transition={{ duration: DURATION_BASE, ease: EASE_OUT }}
          >
            {challenge ? (
              <LoginCodeForm
                challenge={challenge}
                redirectTo={redirectTo}
                onResent={setChallenge}
                onBack={() => setChallenge(null)}
              />
            ) : (
              <LoginCredentialsForm onChallenge={setChallenge} />
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
