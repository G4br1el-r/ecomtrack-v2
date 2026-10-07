"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { type NewPasswordFormValues, newPasswordSchema } from "@/schemas/Modules/Core/Auth/new-password-schema";

export function NewPasswordForm({
  submitLabel,
  pendingLabel,
  pending,
  error,
  onSubmit,
  children,
}: {
  submitLabel: string;
  pendingLabel: string;
  pending: boolean;
  error?: string;
  onSubmit: (password: string) => void;
  children?: React.ReactNode;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(({ password }) => onSubmit(password))}>
      <FieldGroup>
        <FormErrorAlert message={error} />
        {children}
        <Field data-invalid={errors.password ? true : undefined}>
          <FieldLabel htmlFor="new-password">Nova senha</FieldLabel>
          <PasswordInput
            id="new-password"
            autoComplete="new-password"
            aria-invalid={errors.password ? true : undefined}
            {...register("password")}
          />
          <FieldDescription>Pelo menos 10 caracteres, com letra e número. Não use o seu e-mail.</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field data-invalid={errors.confirmPassword ? true : undefined}>
          <FieldLabel htmlFor="confirm-password">Repita a nova senha</FieldLabel>
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? true : undefined}
            {...register("confirmPassword")}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? <Spinner data-icon="inline-start" /> : null}
          {pending ? pendingLabel : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
