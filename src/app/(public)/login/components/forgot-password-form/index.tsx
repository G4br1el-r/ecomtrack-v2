"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/Modules/Core/Auth/use-forgot-password";
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schemas/Modules/Core/Auth/forgot-password-schema";

import { LoginDrawnIcon } from "../login-drawn-icon";

export function ForgotPasswordForm({ defaultEmail, onBack }: { defaultEmail: string; onBack: () => void }) {
  const { mutate: sendLink, isPending, isSuccess, error, variables } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: defaultEmail },
  });

  if (isSuccess) {
    return (
      <div role="status" className="flex flex-col items-start gap-5">
        <span className="grid size-16 place-items-center rounded-full bg-success-soft text-success ring-8 ring-success-soft/40">
          <LoginDrawnIcon name="sent" className="size-7" />
        </span>
        <p className="text-sm">
          Se <strong className="font-medium">{variables?.email}</strong> estiver cadastrado, você vai receber um link
          para criar uma nova senha. Ele vale por 60 minutos.
        </p>
        <Button type="button" variant="outline" size="lg" className="w-full" onClick={onBack}>
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Voltar para o login
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit((values) => sendLink(values))}>
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="forgot-email">E-mail</FieldLabel>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : null}
          {isPending ? "Enviando..." : "Enviar link"}
        </Button>
        <Button type="button" variant="ghost" size="sm" className="self-start" disabled={isPending} onClick={onBack}>
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Voltar
        </Button>
      </FieldGroup>
    </form>
  );
}
