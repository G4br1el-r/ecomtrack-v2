import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";
import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";
import type { CompanyStatus } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

export const COMPANIES_QUERY_KEY = ["plataforma", "empresas"] as const;
export const MY_COMPANY_QUERY_KEY = ["plataforma", "empresas", "minha"] as const;
export const COMPANY_DETAIL_QUERY_KEY = ["plataforma", "empresas", "detalhe"] as const;
export const COMPANY_FORM_ID = "company-form";

export const COMPANY_STATUS_BADGE: Record<CompanyStatus, { label: string; tone: BadgeTone }> = {
  Active: { label: "Ativa", tone: "success" },
  Suspended: { label: "Suspensa", tone: "destructive" },
};

export const COMPANIES_TABLE_SETTINGS: DataTableSettings = {
  id: "plataforma-empresas",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar por nome ou documento...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const COMPANY_COLUMN_SIZE = {
  name: 300,
  document: 190,
  plan: 180,
  users: 110,
  status: 130,
  createdAt: 150,
  actions: 64,
} as const;
