"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { CodeInput } from "@/components/Modules/Core/DesignSystem/code-input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { LOGIN_CODE_LENGTH } from "@/constants/Modules/Core/Auth/auth";
import { useResendLoginCode } from "@/hooks/Modules/Core/Auth/use-resend-login-code";
import { useVerifyLogin } from "@/hooks/Modules/Core/Auth/use-verify-login";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";
import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";
import { type LoginCodeFormValues, loginCodeSchema } from "@/schemas/Modules/Core/Auth/login-code-schema";

import { LoginFailureAnimation } from "../login-failure-animation";
import { LoginSuccessAnimation } from "../login-success-animation";

export function LoginCodeForm({
  challenge,
  redirectTo,
  onResent,
  onBack,
}: {
  challenge: LoginChallenge;
  redirectTo: string;
  onResent: (challenge: LoginChallenge) => void;
  onBack: () => void;
}) {
  const router = useRouter();
  const { mutate: verify, isPending: verifying, isSuccess: verified, variables } = useVerifyLogin();
  const { mutate: resend, isPending: resending } = useResendLoginCode();
  const [failedCode, setFailedCode] = useState<string | null>(null);
  const busy = verifying || failedCode !== null;
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<LoginCodeFormValues>({ resolver: zodResolver(loginCodeSchema), defaultValues: { code: "" } });

  if (verified && variables) {
    return <LoginSuccessAnimation code={variables.code} onComplete={() => router.replace(redirectTo)} />;
  }

  const submit = handleSubmit(({ code }) =>
    verify(
      { challengeId: challenge.challengeId, code },
      {
        onError: (error) => {
          setFailedCode(code);
          setError("code", { message: error.message });
        },
      },
    ),
  );

  const resendCode = () =>
    resend(challenge.challengeId, {
      onSuccess: (next) => {
        resetField("code");
        onResent(next);
        toast.success("Código reenviado", { description: `Enviamos um novo código para ${next.maskedEmail}.` });
      },
      onError: (error) => toast.error("Não foi possível reenviar o código", { description: error.message }),
    });

  return (
    <form noValidate onSubmit={submit}>
      <FieldGroup>
        <Field data-invalid={errors.code ? true : undefined}>
          <FieldLabel htmlFor="login-code">Código de verificação</FieldLabel>
          {failedCode ? (
            <LoginFailureAnimation
              code={failedCode}
              onComplete={() => {
                setValue("code", "");
                setFailedCode(null);
              }}
            />
          ) : (
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CodeInput
                  id="login-code"
                  length={LOGIN_CODE_LENGTH}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onComplete={() => submit()}
                  autoComplete="one-time-code"
                  autoFocus
                  disabled={verifying}
                  invalid={Boolean(errors.code)}
                />
              )}
            />
          )}
          <FieldDescription className="text-center">
            Enviado para {challenge.maskedEmail}. Vale até {formatDisplayTime(challenge.expiresAt)}.
          </FieldDescription>
          <FieldError errors={[errors.code]} className="text-center" />
        </Field>
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {verifying ? <Spinner data-icon="inline-start" /> : null}
          {verifying ? "Verificando código..." : "Verificar"}
        </Button>
        <div className="flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={busy}>
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            Voltar
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={resendCode} disabled={resending || busy}>
            {resending ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
            )}
            Reenviar código
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
