import type { IntegrationField } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

export function isSecretField(field: IntegrationField): boolean {
  return field.isSecret === true || field.type === "secret";
}
