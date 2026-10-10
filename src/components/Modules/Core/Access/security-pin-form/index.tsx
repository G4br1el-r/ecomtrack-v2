"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { DialogFooter } from "@/components/animate-ui/components/radix/dialog";
import { CodeInput } from "@/components/Modules/Core/DesignSystem/code-input";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PIN_SETTINGS } from "@/constants/Modules/Core/Conta/account";
import {
  type SecurityPinFormValues,
  securityPinFormSchema,
} from "@/schemas/Modules/Core/Access/security-pin-form-schema";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

export function SecurityPinForm({
  type,
  invalid,
  onSubmit,
  onCancel,
}: {
  type: PinType;
  invalid: boolean;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}) {
  const settings = PIN_SETTINGS[type];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityPinFormValues>({
    resolver: zodResolver(securityPinFormSchema(settings.length)),
    defaultValues: { pin: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(({ pin }) => onSubmit(pin))} className="space-y-6">
      <FieldGroup>
        <FormErrorAlert message={invalid ? "PIN incorreto. Confira e tente de novo." : undefined} />
        <Field data-invalid={errors.pin ? true : undefined}>
          <FieldLabel htmlFor="security-pin" className="sr-only">
            {settings.title}
          </FieldLabel>
          <Controller
            control={control}
            name="pin"
            render={({ field }) => (
              <CodeInput
                id="security-pin"
                length={settings.length}
                invalid={Boolean(errors.pin) || invalid}
                autoFocus
                {...field}
              />
            )}
          />
          <FieldError errors={[errors.pin]} className="text-center" />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </DialogFooter>
    </form>
  );
}
