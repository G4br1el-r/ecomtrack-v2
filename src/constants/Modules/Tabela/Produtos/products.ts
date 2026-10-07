import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";
import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import type { ProductStatus } from "@/@types/Modules/Tabela/Produtos/product";

export const PRODUCTS_QUERY_KEY = ["tabela", "produtos"] as const;

export const PRODUCT_STATUS_BADGE: Record<ProductStatus, { label: string; tone: BadgeTone }> = {
  ativo: { label: "Ativo", tone: "success" },
  pausado: { label: "Pausado", tone: "warning" },
  "sem-estoque": { label: "Sem estoque", tone: "destructive" },
};

export const PRODUCTS_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const PRODUCTS_TABLE_SETTINGS: DataTableSettings = {
  id: "tabela-produtos",
  features: {
    sorting: false,
    columnResizing: false,
    expanding: false,
    rowPinning: false,
  },
  pagination: { pageSizeOptions: PRODUCTS_PAGE_SIZE_OPTIONS },
};

export const PRODUCT_COLUMN_SIZE = {
  name: 300,
  category: 170,
  brand: 150,
  supplier: 200,
  channel: 190,
  status: 140,
  stock: 110,
  minStock: 140,
  price: 120,
  cost: 120,
  margin: 110,
  sold30d: 140,
  revenue30d: 170,
  rating: 120,
  lastSaleAt: 130,
  createdAt: 140,
} as const;
