import type { PipelineStatus } from "./pipeline-status";

export type Supplier = "ubiqfy" | "codeswholesale" | "manual";

export type Currency = "BRL" | "USD" | "EUR" | "GBP";

export type PipelineProduct = {
  id: string;
  name: string;
  sku: string;
  supplier: Supplier;
  status: PipelineStatus;
  supplierCategory: string;
  region: string;
  supplierDescription: string | null;
  supplierCost: number;
  currency: Currency;
  cost: number;
  stock: number;
  categoryPath: string[];
  brand: string | null;
  responsible: string | null;
  completedSteps: number;
  price: number | null;
  brandLinked: boolean;
  categoryLinked: boolean;
  importedAt: string;
  updatedAt: string;
};

export type PipelineColumnId =
  | "product"
  | "supplier"
  | "supplierCategory"
  | "region"
  | "category"
  | "brand"
  | "responsible"
  | "progress"
  | "cost"
  | "suggestedPrice"
  | "price"
  | "margin"
  | "integration"
  | "status"
  | "importedAt"
  | "updatedAt"
  | "actions";
