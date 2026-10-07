import { describe, expect, it } from "vitest";

import type { ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";
import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

import { countActiveImportFilters } from "./count-active-import-filters";
import { filterByStage } from "./filter-by-stage";
import { filterImportProducts } from "./filter-import-products";
import { getImportFilterChips } from "./get-import-filter-chips";
import { getImportFilterOptions } from "./get-import-filter-options";
import { matchesAvailability } from "./matches-availability";

const IMPORTED: PipelineProduct[] = filterByStage(PIPELINE_PRODUCTS_MOCK, "importacao");

function withFilters(patch: Partial<ImportFilters>): ImportFilters {
  return { ...DEFAULT_IMPORT_FILTERS, ...patch };
}

describe("matchesAvailability", () => {
  const [inStock] = IMPORTED.filter((product) => product.stock > 0);
  const [outOfStock] = IMPORTED.filter((product) => product.stock === 0);

  it("todas aceita qualquer estoque", () => {
    expect(matchesAvailability(inStock, "todas")).toBe(true);
    expect(matchesAvailability(outOfStock, "todas")).toBe(true);
  });

  it("separa com e sem estoque no fornecedor", () => {
    expect(matchesAvailability(inStock, "disponivel")).toBe(true);
    expect(matchesAvailability(outOfStock, "disponivel")).toBe(false);
    expect(matchesAvailability(outOfStock, "indisponivel")).toBe(true);
    expect(matchesAvailability(inStock, "indisponivel")).toBe(false);
  });
});

describe("filterImportProducts", () => {
  it("por padrão mostra só os disponíveis e esconde os ignorados", () => {
    const result = filterImportProducts(IMPORTED, DEFAULT_IMPORT_FILTERS);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.stock > 0 && product.status !== "ignorado")).toBe(true);
  });

  it("todas mostra com e sem estoque", () => {
    const notIgnored = IMPORTED.filter((product) => product.status !== "ignorado");
    expect(filterImportProducts(IMPORTED, withFilters({ availability: "todas" }))).toHaveLength(notIgnored.length);
  });

  it("com Ignorados ligado mostra só os ignorados", () => {
    const result = filterImportProducts(IMPORTED, withFilters({ showIgnored: true, availability: "todas" }));
    expect(result).toHaveLength(IMPORTED.filter((product) => product.status === "ignorado").length);
  });

  it("combina fornecedores e categorias", () => {
    const result = filterImportProducts(
      IMPORTED,
      withFilters({ suppliers: ["ubiqfy"], categories: ["Gift Cards", "Recargas"], availability: "todas" }),
    );
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (product) => product.supplier === "ubiqfy" && ["Gift Cards", "Recargas"].includes(product.supplierCategory),
      ),
    ).toBe(true);
  });
});

describe("countActiveImportFilters", () => {
  it("não conta o padrão nem o atalho de ignorados", () => {
    expect(countActiveImportFilters(withFilters({ showIgnored: true }))).toBe(0);
  });

  it("conta cada fornecedor, cada categoria e a disponibilidade fora do padrão", () => {
    expect(
      countActiveImportFilters(withFilters({ suppliers: ["ubiqfy"], categories: ["A", "B"], availability: "todas" })),
    ).toBe(4);
    expect(countActiveImportFilters(withFilters({ availability: "indisponivel" }))).toBe(1);
  });
});

describe("getImportFilterChips", () => {
  it("a disponibilidade padrão aparece sem botão de remover", () => {
    const [chip] = getImportFilterChips(DEFAULT_IMPORT_FILTERS);
    expect(chip).toMatchObject({ field: "Disponibilidade", label: "Disponível" });
    expect(chip.next).toBeUndefined();
  });

  it("um chip por valor e remover tira só aquele filtro", () => {
    const filters = withFilters({
      showIgnored: true,
      availability: "todas",
      suppliers: ["ubiqfy"],
      categories: ["Gift Cards"],
    });
    const chips = getImportFilterChips(filters);
    expect(chips.map((chip) => `${chip.field}: ${chip.label}`)).toEqual([
      "Exibindo: Ignorados",
      "Disponibilidade: Todas",
      "Fornecedor: UBIQFY",
      "Categoria: Gift Cards",
    ]);
    expect(chips[0].next?.showIgnored).toBe(false);
    expect(chips[1].next?.availability).toBe("disponivel");
    expect(chips[2].next).toEqual({ ...filters, suppliers: [] });
  });
});

describe("getImportFilterOptions", () => {
  it("lista as opções presentes, sem repetir e em ordem alfabética", () => {
    const options = getImportFilterOptions(IMPORTED);
    expect(options.availability.map((option) => option.label)).toEqual(["Disponível", "Indisponível", "Todas"]);
    expect(options.suppliers.map((option) => option.label)).toEqual(["Codeswholesale", "UBIQFY"]);
    const categories = [...new Set(IMPORTED.map((product) => product.supplierCategory))].sort((first, second) =>
      first.localeCompare(second),
    );
    expect(options.categories.map((option) => option.label)).toEqual(categories);
  });
});
