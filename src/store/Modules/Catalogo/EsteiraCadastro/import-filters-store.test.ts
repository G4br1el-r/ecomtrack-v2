import { beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";

import { useImportFiltersStore } from "./import-filters-store";

describe("useImportFiltersStore", () => {
  beforeEach(() => useImportFiltersStore.getState().resetFilters());

  it("começa no padrão e volta a ele ao limpar", () => {
    expect(useImportFiltersStore.getState().filters).toEqual(DEFAULT_IMPORT_FILTERS);
    useImportFiltersStore.getState().setFilters({ ...DEFAULT_IMPORT_FILTERS, suppliers: ["ubiqfy"] });
    expect(useImportFiltersStore.getState().filters.suppliers).toEqual(["ubiqfy"]);
    useImportFiltersStore.getState().resetFilters();
    expect(useImportFiltersStore.getState().filters).toEqual(DEFAULT_IMPORT_FILTERS);
  });
});
