"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/Modules/Core/Auth/use-login";
import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";
import { type LoginFormValues, loginSchema } from "@/schemas/Modules/Core/Auth/login-schema";

export function LoginCredentialsForm({
  defaultEmail,
  onChallenge,
  onForgotPassword,
}: {
  defaultEmail: string;
  onChallenge: (challenge: LoginChallenge, email: string) => void;
  onForgotPassword: (email: string) => void;
}) {
  const { mutate: login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: defaultEmail, password: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        login(values, { onSuccess: (challenge) => onChallenge(challenge, values.email) }),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="login-email">E-mail</FieldLabel>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={errors.password ? true : undefined}>
          <FieldLabel htmlFor="login-password">Senha</FieldLabel>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Digite sua senha"
            aria-invalid={errors.password ? true : undefined}
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={isPending}
            onClick={() => onForgotPassword(getValues("email"))}
          >
            Esqueci minha senha
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
