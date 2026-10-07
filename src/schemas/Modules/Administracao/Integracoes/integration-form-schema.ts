import { z } from "zod";

import { NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";
import { isSecretField } from "@/lib/Modules/Administracao/Integracoes/is-secret-field";

import type { IntegrationField } from "./integration-provider-schema";

const URL_CHECK = z.url();
const EMAIL_CHECK = z.email();

export function integrationFormSchema(fields: IntegrationField[], storedSecrets: string[]) {
  return z
    .object({
      name: z.string().trim().max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
      isActive: z.boolean(),
      values: z.record(z.string(), z.string()),
    })
    .superRefine((form, context) => {
      for (const field of fields) {
        const value = form.values[field.name]?.trim() ?? "";
        const path = ["values", field.name];
        const keepsStored = isSecretField(field) && storedSecrets.includes(field.name);
        if (form.isActive && field.required && !value && !keepsStored) {
          context.addIssue({ code: "custom", path, message: `Informe ${field.label}.` });
        }
        if (value && field.type === "url" && !URL_CHECK.safeParse(value).success) {
          context.addIssue({ code: "custom", path, message: "Informe um endereço válido, começando com https://." });
        }
        if (value && field.type === "email" && !EMAIL_CHECK.safeParse(value).success) {
          context.addIssue({ code: "custom", path, message: "Informe um e-mail válido." });
        }
      }
    });
}

export type IntegrationFormValues = z.infer<ReturnType<typeof integrationFormSchema>>;
