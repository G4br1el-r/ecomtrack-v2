import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";

export const PLANS_LIST_QUERY_KEY = ["plataforma", "planos", "lista"] as const;
export const PLAN_DETAIL_QUERY_KEY = ["plataforma", "planos", "detalhe"] as const;
export const PLAN_FORM_ID = "plan-form";
export const PLAN_PERMISSIONS_FORM_ID = "plan-permissions-form";

export const PLANS_TABLE_SETTINGS: DataTableSettings = {
  id: "plataforma-planos",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar plano...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const PLAN_COLUMN_SIZE = { plan: 320, pages: 110, components: 120, companies: 120, actions: 64 } as const;
