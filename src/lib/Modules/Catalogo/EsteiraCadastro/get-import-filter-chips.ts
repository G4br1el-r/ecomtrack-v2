import type { ImportFilterChip, ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import {
  DEFAULT_IMPORT_FILTERS,
  IMPORT_AVAILABILITY_LABEL,
} from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";
import { SUPPLIER_LABEL } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function getImportFilterChips(filters: ImportFilters): ImportFilterChip[] {
  return [
    ...(filters.showIgnored
      ? [{ id: "ignored", field: "Exibindo", label: "Ignorados", next: { ...filters, showIgnored: false } }]
      : []),
    {
      id: "availability",
      field: "Disponibilidade",
      label: IMPORT_AVAILABILITY_LABEL[filters.availability],
      next:
        filters.availability === DEFAULT_IMPORT_FILTERS.availability
          ? undefined
          : { ...filters, availability: DEFAULT_IMPORT_FILTERS.availability },
    },
    ...filters.suppliers.map((supplier) => ({
      id: `supplier-${supplier}`,
      field: "Fornecedor",
      label: SUPPLIER_LABEL[supplier],
      next: { ...filters, suppliers: filters.suppliers.filter((item) => item !== supplier) },
    })),
    ...filters.categories.map((category) => ({
      id: `category-${category}`,
      field: "Categoria",
      label: category,
      next: { ...filters, categories: filters.categories.filter((item) => item !== category) },
    })),
  ];
}
