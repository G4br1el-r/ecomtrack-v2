"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { PasswordInput } from "@/components/Modules/Core/DesignSystem/password-input";
import { Input } from "@/components/ui/input";
import {
  INTEGRATION_FIELD_INPUT_TYPE,
  SECRET_KEEP_PLACEHOLDER,
} from "@/constants/Modules/Administracao/Integracoes/integrations";
import { isSecretField } from "@/lib/Modules/Administracao/Integracoes/is-secret-field";
import type { IntegrationField } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

export function IntegrationFieldInput({
  id,
  field,
  registration,
  storedMask,
  invalid,
}: {
  id: string;
  field: IntegrationField;
  registration: UseFormRegisterReturn;
  storedMask?: string;
  invalid: boolean;
}) {
  if (isSecretField(field)) {
    return (
      <PasswordInput
        id={id}
        autoComplete="off"
        placeholder={storedMask ? `${storedMask} · ${SECRET_KEEP_PLACEHOLDER}` : undefined}
        aria-invalid={invalid ? true : undefined}
        {...registration}
      />
    );
  }
  return (
    <Input
      id={id}
      type={INTEGRATION_FIELD_INPUT_TYPE[field.type] ?? "text"}
      autoComplete="off"
      aria-invalid={invalid ? true : undefined}
      {...registration}
    />
  );
}
