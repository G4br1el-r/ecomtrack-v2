import { create } from "zustand";

import type { ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";

type ImportFiltersState = {
  filters: ImportFilters;
  setFilters: (filters: ImportFilters) => void;
  resetFilters: () => void;
};

export const useImportFiltersStore = create<ImportFiltersState>((set) => ({
  filters: DEFAULT_IMPORT_FILTERS,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: DEFAULT_IMPORT_FILTERS }),
}));
