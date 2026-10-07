import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";
import { PIPELINE_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-table";
import { filterByStage } from "@/lib/Modules/Catalogo/EsteiraCadastro/filter-by-stage";
import { filterImportProducts } from "@/lib/Modules/Catalogo/EsteiraCadastro/filter-import-products";
import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";
import { useImportFiltersStore } from "@/store/Modules/Catalogo/EsteiraCadastro/import-filters-store";

import { ImportTable } from ".";

vi.mock("@/lib/Modules/Core/Shell/wait", () => ({ wait: () => Promise.resolve() }));

const IMPORTED = filterByStage(PIPELINE_PRODUCTS_MOCK, "importacao");
const CATEGORY = "Gift Cards";
const [FIRST_PAGE_SIZE] = PIPELINE_PAGE_SIZE_OPTIONS;

function renderTable() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ImportTable products={IMPORTED} loading={false} />
    </QueryClientProvider>,
  );
}

function visibleRows(total: number) {
  return Math.min(total, FIRST_PAGE_SIZE);
}

function rowCount() {
  return screen.queryAllByRole("checkbox", { name: "Selecionar linha", hidden: true }).length;
}

describe("ImportTable", () => {
  beforeEach(() => {
    localStorage.clear();
    useImportFiltersStore.getState().resetFilters();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("começa só com os disponíveis e mostra o chip da disponibilidade sem remover", () => {
    renderTable();
    expect(rowCount()).toBe(visibleRows(filterImportProducts(IMPORTED, DEFAULT_IMPORT_FILTERS).length));
    expect(screen.getByText("Disponibilidade:")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Remover filtro Disponibilidade/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Limpar filtros" })).not.toBeInTheDocument();
  });

  it("o atalho Ignorados alterna para a lista de ignorados", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: /^Ignorados/ }));
    expect(screen.getByRole("button", { name: /^Ignorados/ })).toHaveAttribute("aria-pressed", "true");
    expect(rowCount()).toBe(
      visibleRows(filterImportProducts(IMPORTED, { ...DEFAULT_IMPORT_FILTERS, showIgnored: true }).length),
    );
    const [firstRow] = screen.getAllByRole("checkbox", { name: "Selecionar linha" });
    await userEvent.click(firstRow);
    expect(await screen.findByRole("button", { name: "Reativar" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cadastrar" })).not.toBeInTheDocument();
  });

  it("escolhe categorias no dropdown com busca e remove pelo chip", async () => {
    const expected = filterImportProducts(IMPORTED, { ...DEFAULT_IMPORT_FILTERS, categories: [CATEGORY] }).length;
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: /^Filtros/ }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.click(within(sheet).getByRole("combobox", { name: "Categoria" }));
    await userEvent.type(await screen.findByPlaceholderText("Buscar categoria..."), "gift");
    await userEvent.click(await screen.findByRole("option", { name: new RegExp(CATEGORY) }));
    expect(within(sheet).getByRole("combobox", { name: "Categoria" })).toHaveTextContent(CATEGORY);
    expect(rowCount()).toBe(visibleRows(filterImportProducts(IMPORTED, DEFAULT_IMPORT_FILTERS).length));
    await userEvent.keyboard("{Escape}");
    await userEvent.click(within(sheet).getByRole("button", { name: `Mostrar ${expected} produtos` }));
    await waitFor(() => expect(rowCount()).toBe(visibleRows(expected)));
    await userEvent.click(await screen.findByRole("button", { name: `Remover filtro Categoria: ${CATEGORY}` }));
    await waitFor(() =>
      expect(rowCount()).toBe(visibleRows(filterImportProducts(IMPORTED, DEFAULT_IMPORT_FILTERS).length)),
    );
  });

  it("limpa só o filtro da seção", async () => {
    useImportFiltersStore
      .getState()
      .setFilters({ ...DEFAULT_IMPORT_FILTERS, suppliers: ["ubiqfy"], categories: [CATEGORY] });
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: /^Filtros/ }));
    const sheet = await screen.findByRole("dialog");
    expect(within(sheet).getByRole("button", { name: "Limpar Fornecedor" })).toBeEnabled();
    await userEvent.click(within(sheet).getByRole("button", { name: "Limpar Categoria" }));
    expect(within(sheet).getByRole("combobox", { name: "Categoria" })).toHaveTextContent("Todas as categorias");
    expect(within(sheet).getByRole("combobox", { name: "Fornecedor" })).toHaveTextContent("UBIQFY");
    expect(within(sheet).getByRole("button", { name: "Limpar Categoria" })).toBeDisabled();
    expect(within(sheet).queryByRole("button", { name: "Limpar Disponibilidade" })).not.toBeInTheDocument();
  });

  it("disponibilidade aceita uma opção só", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: /^Filtros/ }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.click(within(sheet).getByRole("combobox", { name: "Disponibilidade" }));
    await userEvent.click(await screen.findByRole("option", { name: /Todas/ }));
    expect(within(sheet).getByRole("combobox", { name: "Disponibilidade" })).toHaveTextContent("Todas");
    const all = filterImportProducts(IMPORTED, { ...DEFAULT_IMPORT_FILTERS, availability: "todas" }).length;
    await userEvent.click(within(sheet).getByRole("button", { name: `Mostrar ${all} produtos` }));
    await waitFor(() => expect(rowCount()).toBe(visibleRows(all)));
    expect(await screen.findByRole("button", { name: "Remover filtro Disponibilidade: Todas" })).toBeInTheDocument();
  });

  it("filtro sem resultado oferece limpar os filtros", async () => {
    useImportFiltersStore.getState().setFilters({ ...DEFAULT_IMPORT_FILTERS, categories: ["Categoria inexistente"] });
    renderTable();
    expect(screen.getByText("Nenhum produto com esses filtros")).toBeInTheDocument();
    const [clear] = screen.getAllByRole("button", { name: "Limpar filtros" });
    await userEvent.click(clear);
    expect(useImportFiltersStore.getState().filters).toEqual(DEFAULT_IMPORT_FILTERS);
  });
});
