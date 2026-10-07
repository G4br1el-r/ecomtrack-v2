import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { DataTableColumn, DataTableServer } from "@/@types/Modules/Core/DesignSystem/data-table";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { DataTable } from ".";

type Fruit = { id: string; name: string };

const FRUITS: Fruit[] = [
  { id: "1", name: "Banana" },
  { id: "2", name: "Abacaxi" },
];

const COLUMNS: DataTableColumn<Fruit>[] = [{ accessorKey: "name", meta: { label: "Nome" } }];

describe("DataTable", () => {
  beforeEach(() => {
    localStorage.clear();
    useDataTablePreferencesStore.setState({ tables: {} });
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

  it("sem configuração não mostra busca nem engrenagem", () => {
    render(<DataTable columns={COLUMNS} data={FRUITS} getRowId={(fruit) => fruit.id} />);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Configurações da tabela" })).not.toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("só mostra checkbox quando a tela controla a seleção", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={FRUITS}
        getRowId={(fruit) => fruit.id}
        settings={{ id: "frutas", features: {} }}
      />,
    );
    expect(screen.queryByRole("checkbox", { name: "Selecionar linha" })).not.toBeInTheDocument();
  });

  it("a engrenagem mostra só os recursos que a tabela declarou", async () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={FRUITS}
        getRowId={(fruit) => fruit.id}
        settings={{ id: "frutas", features: { sorting: true, rowPinning: false } }}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Configurações da tabela" }));
    await userEvent.click(screen.getByRole("tab", { name: "Recursos" }));
    expect(screen.getAllByRole("switch")).toHaveLength(2);
    expect(screen.getByRole("switch", { name: /Ordenação/ })).toBeChecked();
    expect(screen.queryByRole("switch", { name: /Redimensionar/ })).not.toBeInTheDocument();
  });

  it("a busca filtra as linhas", async () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={FRUITS}
        getRowId={(fruit) => fruit.id}
        settings={{ id: "frutas", features: {} }}
      />,
    );
    await userEvent.type(screen.getByRole("searchbox", { name: "Buscar na tabela" }), "aba{Enter}");
    expect(screen.getByText("Abacaxi")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Banana")).not.toBeInTheDocument());
  });

  it("mostra o estado vazio fora da área com rolagem da tabela", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={[]}
        getRowId={(fruit) => fruit.id}
        settings={{ id: "frutas", features: {} }}
        empty={<p>Nenhuma fruta</p>}
      />,
    );
    const message = screen.getByText("Nenhuma fruta");
    expect(message.closest("table")).toBeNull();
    expect(message.closest('[data-slot="table-container"]')).toBeNull();
  });

  describe("modo servidor", () => {
    const SERVER_SETTINGS = { id: "frutas-servidor", features: {}, pagination: { pageSizeOptions: [2, 10] } };
    const TOTAL = 5;

    function renderServer(overrides: Partial<DataTableServer> = {}) {
      const server: DataTableServer = {
        totalCount: TOTAL,
        pageIndex: 0,
        pageSize: 2,
        search: "",
        onPageIndexChange: vi.fn(),
        onPageSizeChange: vi.fn(),
        onSearch: vi.fn(),
        ...overrides,
      };
      render(
        <DataTable
          columns={COLUMNS}
          data={FRUITS}
          getRowId={(fruit) => fruit.id}
          settings={SERVER_SETTINGS}
          server={server}
        />,
      );
      return server;
    }

    it("mostra a página que veio da API com o total do servidor", () => {
      renderServer({ pageIndex: 1 });

      expect(screen.getAllByText((_, element) => element?.textContent === "Mostrando 3–4 de 5")[0]).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Abacaxi")).toBeInTheDocument();
    });

    it("pede a próxima página para a tela", async () => {
      const server = renderServer();

      await userEvent.click(screen.getAllByRole("button", { name: "Próxima página" })[0]);

      expect(server.onPageIndexChange).toHaveBeenCalledWith(1);
    });

    it("manda a busca para a tela sem filtrar as linhas no navegador", async () => {
      const server = renderServer();

      await userEvent.type(screen.getByRole("searchbox", { name: "Buscar na tabela" }), "uva{Enter}");

      expect(server.onSearch).toHaveBeenCalledWith("uva");
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });
});
