import type { PipelineColumnId } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { IMPORT_SEARCH_PLACEHOLDER } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";

export const PIPELINE_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const PIPELINE_COLUMN_SIZE: Record<PipelineColumnId, number> = {
  product: 240,
  supplier: 130,
  supplierCategory: 130,
  region: 100,
  category: 170,
  brand: 150,
  responsible: 190,
  progress: 170,
  cost: 120,
  suggestedPrice: 130,
  price: 130,
  margin: 150,
  integration: 210,
  status: 160,
  importedAt: 120,
  updatedAt: 140,
  actions: 56,
};

export const PIPELINE_STAGE_COLUMNS: Record<PipelineStage, readonly PipelineColumnId[]> = {
  importacao: ["product", "supplier", "supplierCategory", "region", "cost", "status", "importedAt", "actions"],
  cadastro: ["product", "supplier", "responsible", "progress", "status", "updatedAt"],
  precificacao: ["product", "supplier", "category", "brand", "cost", "suggestedPrice", "price", "margin", "status"],
  publicacao: ["product", "category", "brand", "price", "margin", "integration", "status", "updatedAt"],
  validacao: ["product", "category", "brand", "price", "margin", "status", "updatedAt"],
  finalizado: ["product", "supplier", "category", "brand", "cost", "price", "margin", "status", "updatedAt"],
};

const PIPELINE_TABLE_FEATURES: DataTableSettings["features"] = {
  sorting: false,
  columnResizing: false,
  expanding: false,
  rowPinning: false,
};

export const PIPELINE_TABLE_SETTINGS: Record<PipelineStage, DataTableSettings> = {
  importacao: {
    id: "esteira-cadastro-importacao",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
    searchPlaceholder: IMPORT_SEARCH_PLACEHOLDER,
  },
  cadastro: {
    id: "esteira-cadastro-cadastro",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
  },
  precificacao: {
    id: "esteira-cadastro-precificacao",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
  },
  publicacao: {
    id: "esteira-cadastro-publicacao",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
  },
  validacao: {
    id: "esteira-cadastro-validacao",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
  },
  finalizado: {
    id: "esteira-cadastro-finalizado",
    features: PIPELINE_TABLE_FEATURES,
    pagination: { pageSizeOptions: PIPELINE_PAGE_SIZE_OPTIONS },
  },
};
