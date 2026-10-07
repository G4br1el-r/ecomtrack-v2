import type { ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";

export function countActiveImportFilters(filters: ImportFilters): number {
  const availabilityChanged = filters.availability !== DEFAULT_IMPORT_FILTERS.availability;
  return filters.suppliers.length + filters.categories.length + Number(availabilityChanged);
}
