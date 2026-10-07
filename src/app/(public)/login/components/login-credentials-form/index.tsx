"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FORGOT_PASSWORD_HREF } from "@/constants/Modules/Core/Auth/auth";
import { useLogin } from "@/hooks/Modules/Core/Auth/use-login";
import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";
import { type LoginFormValues, loginSchema } from "@/schemas/Modules/Core/Auth/login-schema";

export function LoginCredentialsForm({ onChallenge }: { onChallenge: (challenge: LoginChallenge) => void }) {
  const { mutate: login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  return (
    <form noValidate onSubmit={handleSubmit((values) => login(values, { onSuccess: onChallenge }))}>
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
          <div className="flex items-center justify-between gap-2">
            <FieldLabel htmlFor="login-password">Senha</FieldLabel>
            <Link
              href={FORGOT_PASSWORD_HREF}
              className="rounded-sm text-primary text-sm underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:opacity-80"
            >
              Esqueci minha senha
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Digite sua senha"
            aria-invalid={errors.password ? true : undefined}
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : null}
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </FieldGroup>
    </form>
  );
}
