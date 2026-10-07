import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";

export const AUDIT_LOGS_QUERY_KEY = ["administracao", "auditoria", "lista"] as const;
export const AUDIT_LOG_DETAIL_QUERY_KEY = ["administracao", "auditoria", "detalhe"] as const;

export const AUDIT_LOGS_TABLE_SETTINGS: DataTableSettings = {
  id: "administracao-auditoria",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar na descrição, nome ou e-mail...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const AUDIT_LOG_COLUMN_SIZE = {
  createdAt: 150,
  type: 150,
  description: 380,
  user: 240,
  page: 150,
  entity: 180,
  actions: 64,
} as const;

export const AUDIT_DIFF_COLUMN_SIZE = { field: 180, before: 260, after: 260 } as const;
