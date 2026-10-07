"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { CodeInput } from "@/components/Modules/Core/DesignSystem/code-input";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { PIN_SETTINGS } from "@/constants/Modules/Core/Conta/account";
import { useSetPin } from "@/hooks/Modules/Core/Conta/use-set-pin";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";
import { type SetPinFormValues, setPinSchema } from "@/schemas/Modules/Core/Conta/set-pin-schema";

const EMPTY_PIN_FORM: SetPinFormValues = { pin: "", confirmPin: "", currentPassword: "" };

export function PinDialog({
  type,
  created,
  open,
  onOpenChange,
}: {
  type: PinType;
  created: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const settings = PIN_SETTINGS[type];
  const { mutate: save, isPending, error, reset: resetMutation } = useSetPin();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetPinFormValues>({
    resolver: zodResolver(setPinSchema(settings.length)),
    defaultValues: EMPTY_PIN_FORM,
  });

  const close = (next: boolean) => {
    if (!next) {
      reset(EMPTY_PIN_FORM);
      resetMutation();
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <form
          noValidate
          onSubmit={handleSubmit(({ pin, currentPassword }) =>
            save(
              { type, pin, currentPassword },
              {
                onSuccess: () => {
                  toast.success(created ? `${settings.title} alterado` : `${settings.title} criado`);
                  close(false);
                },
              },
            ),
          )}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>{created ? `Trocar ${settings.title}` : `Criar ${settings.title}`}</DialogTitle>
            <DialogDescription>
              Evite números repetidos ou em sequência. Para confirmar, informe a sua senha atual.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FormErrorAlert message={error?.message} />
            <Field data-invalid={errors.pin ? true : undefined}>
              <FieldLabel htmlFor={`pin-${type}`}>Novo PIN</FieldLabel>
              <Controller
                control={control}
                name="pin"
                render={({ field }) => (
                  <CodeInput
                    id={`pin-${type}`}
                    length={settings.length}
                    invalid={Boolean(errors.pin)}
                    autoFocus
                    {...field}
                  />
                )}
              />
              <FieldError errors={[errors.pin]} className="text-center" />
            </Field>
            <Field data-invalid={errors.confirmPin ? true : undefined}>
              <FieldLabel htmlFor={`confirm-pin-${type}`}>Repita o PIN</FieldLabel>
              <Controller
                control={control}
                name="confirmPin"
                render={({ field }) => (
                  <CodeInput
                    id={`confirm-pin-${type}`}
                    length={settings.length}
                    invalid={Boolean(errors.confirmPin)}
                    {...field}
                  />
                )}
              />
              <FieldError errors={[errors.confirmPin]} className="text-center" />
            </Field>
            <Field data-invalid={errors.currentPassword ? true : undefined}>
              <FieldLabel htmlFor={`pin-password-${type}`}>Senha atual</FieldLabel>
              <PasswordInput
                id={`pin-password-${type}`}
                autoComplete="current-password"
                aria-invalid={errors.currentPassword ? true : undefined}
                {...register("currentPassword")}
              />
              <FieldError errors={[errors.currentPassword]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => close(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner data-icon="inline-start" /> : null}
              {isPending ? "Salvando..." : "Salvar PIN"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
