import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import type { IntegrationField } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

import { isSecretField } from "./is-secret-field";

export function getStoredSecrets(fields: IntegrationField[], integration: CompanyIntegration | null): string[] {
  if (!integration) return [];
  return fields.filter((field) => isSecretField(field) && integration.values[field.name]).map((field) => field.name);
}
