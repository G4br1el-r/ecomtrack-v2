import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";

export const SUPPLIER_PRODUCTS_QUERY_KEY = ["administracao", "fornecedores", "catalogo"] as const;

export const SUPPLIERS_TABS = { connections: "conexoes", catalog: "catalogo" } as const;

export const CATALOG_SCOPE = { available: "disponiveis", all: "todos" } as const;

export const SUPPLIER_PRODUCTS_TABLE_SETTINGS: DataTableSettings = {
  id: "administracao-fornecedores-catalogo",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar pelo nome ou código do fornecedor...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const SUPPLIER_PRODUCT_COLUMN_SIZE = {
  product: 320,
  supplier: 170,
  platform: 140,
  region: 120,
  languages: 160,
  price: 150,
  stock: 130,
  syncedAt: 170,
  integrated: 140,
} as const;
