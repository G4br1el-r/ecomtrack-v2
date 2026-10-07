import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { DataTableFeatureFlags } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DATA_TABLE_FEATURE_KEYS } from "@/constants/Modules/Core/DesignSystem/data-table";
import { DEFAULT_DENSITY } from "@/constants/Modules/Core/DesignSystem/density";
import { PRODUCTS_PAGE_SIZE_OPTIONS, PRODUCTS_TABLE_SETTINGS } from "@/constants/Modules/Tabela/Produtos/products";
import { PRODUCTS_MOCK } from "@/mocks/Modules/Tabela/Produtos/products";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";

import { ProductsTable } from ".";

vi.mock("@/lib/Modules/Core/Shell/wait", () => ({ wait: () => Promise.resolve() }));

const FIRST_PRODUCT = PRODUCTS_MOCK[0].name;
const RANGE_END_INDEX = 3;
const PINNED_ROW_INDEX = 4;
const [PAGE_SIZE] = PRODUCTS_PAGE_SIZE_OPTIONS;
const LARGER_PAGE_SIZE = 50;

function renderTable(features: Partial<DataTableFeatureFlags> = {}) {
  useDataTablePreferencesStore.setState({ tables: { [PRODUCTS_TABLE_SETTINGS.id]: { features } } });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ProductsTable />
    </QueryClientProvider>,
  );
}

async function openSettingsTab(tab: string) {
  await userEvent.click(await screen.findByRole("button", { name: "Configurações da tabela" }));
  await userEvent.click(await screen.findByRole("tab", { name: new RegExp(tab) }));
  return screen.getByRole("tabpanel", { name: tab });
}

function openSettings() {
  return openSettingsTab("Recursos");
}

function openColumns() {
  return openSettingsTab("Colunas");
}

function storedTable() {
  return useDataTablePreferencesStore.getState().tables[PRODUCTS_TABLE_SETTINGS.id];
}

describe("ProductsTable", () => {
  beforeEach(() => {
    localStorage.clear();
    useDataTablePreferencesStore.setState({ tables: {} });
    useDensityStore.setState({ density: DEFAULT_DENSITY });
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

  it("começa com checkbox e busca, e com os recursos da engrenagem desligados", async () => {
    renderTable();
    expect(await screen.findAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(PAGE_SIZE);
    expect(screen.getByRole("searchbox", { name: "Buscar na tabela" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Redimensionar coluna/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fixar linha no topo" })).not.toBeInTheDocument();
    const panel = await openSettings();
    const switches = within(panel).getAllByRole("switch");
    expect(switches).toHaveLength(DATA_TABLE_FEATURE_KEYS.length);
    expect(switches.every((item) => item.getAttribute("aria-checked") === "false")).toBe(true);
  });

  it("seleciona uma linha pelo checkbox e mostra a contagem", async () => {
    renderTable();
    const [firstRow] = await screen.findAllByRole("checkbox", { name: "Selecionar linha" });
    await userEvent.click(firstRow);
    expect(firstRow).toBeChecked();
    expect(await screen.findByText("1 selecionado(s)")).toBeInTheDocument();
  });

  it("seleciona o intervalo com Shift + clique", async () => {
    const user = userEvent.setup();
    renderTable();
    const rows = await screen.findAllByRole("checkbox", { name: "Selecionar linha" });
    await user.click(rows[0]);
    await user.keyboard("{Shift>}");
    await user.click(rows[RANGE_END_INDEX]);
    await user.keyboard("{/Shift}");
    const checked = screen
      .getAllByRole("checkbox", { name: "Selecionar linha" })
      .filter((row) => row.getAttribute("aria-checked") === "true");
    expect(checked).toHaveLength(RANGE_END_INDEX + 1);
    expect(await screen.findByText(`${RANGE_END_INDEX + 1} selecionado(s)`)).toBeInTheDocument();
  });

  it("seleciona todas as linhas da página pelo checkbox do cabeçalho", async () => {
    renderTable();
    await userEvent.click(await screen.findByRole("checkbox", { name: "Selecionar todos" }));
    expect(await screen.findByText(`${PAGE_SIZE} selecionado(s)`)).toBeInTheDocument();
  });

  it("só filtra ao dar Enter na busca", async () => {
    const steamProducts = PRODUCTS_MOCK.filter((product) => product.brand === "Steam");
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const search = screen.getByRole("searchbox", { name: "Buscar na tabela" });
    await userEvent.type(search, "steam");
    expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(PAGE_SIZE);
    await userEvent.type(search, "{Enter}");
    await waitFor(() =>
      expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(steamProducts.length),
    );
  });

  it("filtra pelo botão de pesquisar e volta tudo ao apagar a busca", async () => {
    const steamProducts = PRODUCTS_MOCK.filter((product) => product.brand === "Steam");
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const search = screen.getByRole("searchbox", { name: "Buscar na tabela" });
    await userEvent.type(search, "steam");
    await userEvent.click(screen.getByRole("button", { name: "Pesquisar" }));
    await waitFor(() =>
      expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(steamProducts.length),
    );
    await userEvent.clear(search);
    await waitFor(() => expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(PAGE_SIZE));
  });

  it("limpa a busca pelo X e volta a mostrar tudo", async () => {
    const steamProducts = PRODUCTS_MOCK.filter((product) => product.brand === "Steam");
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const search = screen.getByRole("searchbox", { name: "Buscar na tabela" });
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();
    await userEvent.type(search, "steam{Enter}");
    await waitFor(() =>
      expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(steamProducts.length),
    );
    await userEvent.click(screen.getByRole("button", { name: "Limpar busca" }));
    expect(search).toHaveValue("");
    expect(search).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(PAGE_SIZE));
  });

  it("a tecla / leva o cursor para a busca", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    await userEvent.keyboard("/");
    const search = screen.getByRole("searchbox", { name: "Buscar na tabela" });
    expect(search).toHaveFocus();
    expect(search).toHaveValue("");
  });

  it("pagina as linhas e troca a quantidade por página", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    expect(screen.queryByText(PRODUCTS_MOCK[PAGE_SIZE].name)).not.toBeInTheDocument();
    const [topNext, bottomNext] = screen.getAllByRole("button", { name: "Próxima página" });
    expect(bottomNext).toBeInTheDocument();
    await userEvent.click(topNext);
    expect(await screen.findByText(PRODUCTS_MOCK[PAGE_SIZE].name)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(FIRST_PRODUCT)).not.toBeInTheDocument());
    const pageSizePickers = screen.getAllByRole("combobox", { name: "Itens por página" });
    expect(pageSizePickers).toHaveLength(2);
    await userEvent.click(pageSizePickers[1]);
    await userEvent.click(await screen.findByRole("option", { name: String(LARGER_PAGE_SIZE) }));
    await waitFor(() =>
      expect(screen.getAllByRole("checkbox", { name: "Selecionar linha" })).toHaveLength(PRODUCTS_MOCK.length),
    );
    expect(storedTable()?.pageSize).toBe(LARGER_PAGE_SIZE);
    for (const summary of screen.getAllByText(/^Mostrando/)) expect(summary).toHaveTextContent("1–30 de 30");
  });

  it("liga a ordenação pela engrenagem", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    expect(screen.queryByRole("button", { name: "Preço" })).not.toBeInTheDocument();
    await openSettings();
    await userEvent.click(screen.getByRole("switch", { name: /Ordenação/ }));
    expect(screen.getByRole("button", { name: "Preço" })).toBeInTheDocument();
  });

  it("mostra a alça de redimensionar ao ligar o recurso", async () => {
    renderTable({ columnResizing: true });
    await screen.findByText(FIRST_PRODUCT);
    expect(screen.getByRole("button", { name: /^Redimensionar coluna Produto/ })).toBeInTheDocument();
  });

  it("fixa a linha no topo pelo alfinete", async () => {
    const pinned = PRODUCTS_MOCK[PINNED_ROW_INDEX];
    renderTable({ rowPinning: true });
    const buttons = await screen.findAllByRole("button", { name: "Fixar linha no topo" });
    await userEvent.click(buttons[PINNED_ROW_INDEX]);
    const [firstRow] = within(screen.getAllByRole("rowgroup")[1]).getAllByRole("row");
    expect(within(firstRow).getByText(pinned.name)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Desafixar linha" })).toBeInTheDocument();
  });

  it("restaurar padrão desliga tudo de novo", async () => {
    renderTable({ sorting: true, rowPinning: true });
    await screen.findAllByRole("button", { name: "Fixar linha no topo" });
    const panel = await openSettings();
    await userEvent.click(within(panel).getByRole("button", { name: "Restaurar padrão" }));
    expect(screen.queryByRole("button", { name: "Fixar linha no topo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Preço" })).not.toBeInTheDocument();
  });

  it("só oculta a coluna depois de aplicar", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const panel = await openColumns();
    await userEvent.click(within(panel).getByRole("checkbox", { name: "Custo" }));
    expect(screen.getByRole("columnheader", { name: /^Custo/ })).toBeInTheDocument();
    await userEvent.click(within(panel).getByRole("button", { name: "Aplicar" }));
    expect(screen.queryByRole("columnheader", { name: /^Custo/ })).not.toBeInTheDocument();
    expect(storedTable()?.columnVisibility?.cost).toBe(false);
  });

  it("descarta o rascunho de colunas ao cancelar", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const panel = await openColumns();
    await userEvent.click(within(panel).getByRole("checkbox", { name: "Custo" }));
    await userEvent.click(within(panel).getByRole("button", { name: "Cancelar" }));
    expect(screen.getByRole("columnheader", { name: /^Custo/ })).toBeInTheDocument();
    expect(storedTable()?.columnVisibility).toBeUndefined();
  });

  it("troca a densidade pela aba Exibição", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    const panel = await openSettingsTab("Exibição");
    await userEvent.click(within(panel).getByRole("radio", { name: "Compacto" }));
    expect(useDensityStore.getState().density).toBe("compact");
  });

  it("reordena pelo teclado e restaurar padrão volta à ordem original", async () => {
    renderTable();
    await screen.findByText(FIRST_PRODUCT);
    let panel = await openColumns();
    within(panel)
      .getByRole("button", { name: /^Mover Categoria/ })
      .focus();
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.click(within(panel).getByRole("button", { name: "Aplicar" }));
    expect(storedTable()?.columnOrder?.slice(0, 2)).toEqual(["category", "name"]);
    panel = await openColumns();
    await userEvent.click(within(panel).getByRole("button", { name: "Restaurar padrão" }));
    await userEvent.click(within(panel).getByRole("button", { name: "Aplicar" }));
    expect(storedTable()?.columnOrder?.slice(0, 2)).toEqual(["name", "category"]);
  });
});
