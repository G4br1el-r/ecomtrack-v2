"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useLogout } from "@/hooks/Modules/Core/Auth/use-logout";
import { useChangePassword } from "@/hooks/Modules/Core/Conta/use-change-password";
import {
  type ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schemas/Modules/Core/Conta/change-password-schema";

export function PasswordForm({ readOnly }: { readOnly: boolean }) {
  const { mutate: change, isPending, error } = useChangePassword();
  const { mutate: logout } = useLogout();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  return (
    <Card>
      <form
        noValidate
        onSubmit={handleSubmit(({ currentPassword, newPassword }) =>
          change(
            { currentPassword, newPassword },
            {
              onSuccess: () => {
                toast.success("Senha alterada", { description: "Por segurança, entre de novo com a nova senha." });
                logout();
              },
            },
          ),
        )}
      >
        <CardHeader>
          <CardTitle>Senha</CardTitle>
          <CardDescription>Depois de trocar, todas as suas sessões são encerradas, inclusive esta.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FormErrorAlert message={error?.message} />
            <Field data-invalid={errors.currentPassword ? true : undefined}>
              <FieldLabel htmlFor="current-password">Senha atual</FieldLabel>
              <PasswordInput
                id="current-password"
                autoComplete="current-password"
                disabled={readOnly}
                aria-invalid={errors.currentPassword ? true : undefined}
                {...register("currentPassword")}
              />
              <FieldError errors={[errors.currentPassword]} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={errors.newPassword ? true : undefined}>
                <FieldLabel htmlFor="new-password">Nova senha</FieldLabel>
                <PasswordInput
                  id="new-password"
                  autoComplete="new-password"
                  disabled={readOnly}
                  aria-invalid={errors.newPassword ? true : undefined}
                  {...register("newPassword")}
                />
                <FieldDescription>Pelo menos 10 caracteres, com letra e número.</FieldDescription>
                <FieldError errors={[errors.newPassword]} />
              </Field>
              <Field data-invalid={errors.confirmPassword ? true : undefined}>
                <FieldLabel htmlFor="confirm-new-password">Repita a nova senha</FieldLabel>
                <PasswordInput
                  id="confirm-new-password"
                  autoComplete="new-password"
                  disabled={readOnly}
                  aria-invalid={errors.confirmPassword ? true : undefined}
                  {...register("confirmPassword")}
                />
                <FieldError errors={[errors.confirmPassword]} />
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isPending || readOnly}>
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            {isPending ? "Trocando..." : "Trocar senha"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
