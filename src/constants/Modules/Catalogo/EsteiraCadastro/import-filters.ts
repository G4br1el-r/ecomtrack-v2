import type { ImportAvailability, ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";

export const OUT_OF_STOCK_QUANTITY = 0;

export const DEFAULT_IMPORT_FILTERS: ImportFilters = {
  suppliers: [],
  categories: [],
  availability: "disponivel",
  showIgnored: false,
};

export const IMPORT_AVAILABILITY_LABEL: Record<ImportAvailability, string> = {
  disponivel: "Disponível",
  indisponivel: "Indisponível",
  todas: "Todas",
};

export const IMPORT_AVAILABILITY_VALUES: readonly ImportAvailability[] = ["disponivel", "indisponivel", "todas"];

export const IMPORT_SEARCH_PLACEHOLDER = "Buscar produto ou SKU...";
