import type {
  IntegrationArea,
  IntegrationAreaEndpoints,
} from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";

export const INTEGRATION_AREA_ENDPOINTS: Record<IntegrationArea, IntegrationAreaEndpoints> = {
  ecommerce: API_ENDPOINTS.ecommerceIntegrations,
  email: API_ENDPOINTS.emailIntegrations,
  ai: API_ENDPOINTS.aiIntegrations,
  supplier: API_ENDPOINTS.supplierIntegrations,
};

export const INTEGRATION_AREA_COPY: Record<IntegrationArea, { connectionsTitle: string; noun: string; empty: string }> =
  {
    ecommerce: {
      connectionsTitle: "Lojas conectadas",
      noun: "loja",
      empty: "Conecte a primeira loja escolhendo uma plataforma acima.",
    },
    email: {
      connectionsTitle: "Contas de envio",
      noun: "conta de envio",
      empty: "Sem conta própria, os e-mails saem pela conta padrão da plataforma.",
    },
    ai: {
      connectionsTitle: "Provedores de IA conectados",
      noun: "conexão de IA",
      empty: "Conecte um provedor de IA escolhendo uma opção acima.",
    },
    supplier: {
      connectionsTitle: "Fornecedores conectados",
      noun: "fornecedor",
      empty: "Conecte um fornecedor para trazer o catálogo dele.",
    },
  };

export const INTEGRATIONS_QUERY_KEY = ["administracao", "integracoes"] as const;
export const INTEGRATION_PROVIDERS_QUERY_KEY = ["administracao", "integracoes", "provedores"] as const;
export const INTEGRATION_FORM_ID = "integration-form";
export const SECRET_KEEP_PLACEHOLDER = "Deixe em branco para manter a atual";

export const INTEGRATION_FIELD_INPUT_TYPE: Record<string, string> = {
  text: "text",
  url: "url",
  email: "email",
  secret: "password",
};

const INTEGRATION_TABLE_BASE = {
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar pelo nome da conexão...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
} satisfies Omit<DataTableSettings, "id">;

export const INTEGRATION_TABLE_SETTINGS: Record<IntegrationArea, DataTableSettings> = {
  ecommerce: { ...INTEGRATION_TABLE_BASE, id: "administracao-integracoes-ecommerce" },
  email: { ...INTEGRATION_TABLE_BASE, id: "administracao-integracoes-email" },
  ai: { ...INTEGRATION_TABLE_BASE, id: "administracao-integracoes-ia" },
  supplier: { ...INTEGRATION_TABLE_BASE, id: "administracao-integracoes-fornecedores" },
};

export const INTEGRATION_COLUMN_SIZE = { name: 280, provider: 200, status: 130, updatedAt: 170, actions: 64 } as const;
