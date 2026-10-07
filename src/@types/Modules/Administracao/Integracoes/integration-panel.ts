import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import type { IntegrationProvider } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

export type IntegrationPanel =
  | { mode: "create"; provider: IntegrationProvider }
  | { mode: "edit"; provider: IntegrationProvider; integration: CompanyIntegration };
