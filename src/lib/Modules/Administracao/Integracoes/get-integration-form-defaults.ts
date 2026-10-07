import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import type { IntegrationFormValues } from "@/schemas/Modules/Administracao/Integracoes/integration-form-schema";
import type { IntegrationField } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

import { isSecretField } from "./is-secret-field";

export function getIntegrationFormDefaults(
  fields: IntegrationField[],
  integration: CompanyIntegration | null,
): IntegrationFormValues {
  return {
    name: integration?.name ?? "",
    isActive: integration?.isActive ?? true,
    values: Object.fromEntries(
      fields.map((field) => [field.name, isSecretField(field) ? "" : (integration?.values[field.name] ?? "")]),
    ),
  };
}
