import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { DataTableColumn, DataTableServer } from "@/@types/Modules/Core/DesignSystem/data-table";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { DataTable } from ".";

type Fruit = { id: string; name: string; color: string };

const FRUITS: Fruit[] = [
  { id: "1", name: "Banana", color: "Amarela" },
  { id: "2", name: "Abacaxi", color: "Verde" },
];

const COLUMNS: DataTableColumn<Fruit>[] = [{ accessorKey: "name", meta: { label: "Nome" } }];

const MOBILE_WIDTH = 375;

const CARD_COLUMNS: DataTableColumn<Fruit>[] = [
  { accessorKey: "name", meta: { label: "Nome" } },
  { accessorKey: "color", meta: { label: "Cor" } },
  { id: "actions", cell: ({ row }) => <button type="button">Ações de {row.original.name}</button> },
];

const EXTRA_FIELD_LABELS = ["Origem", "Safra", "Sabor", "Tamanho", "Peso"];

const SLOTTED_COLUMNS: DataTableColumn<Fruit>[] = [
  { accessorKey: "name", meta: { label: "Nome" } },
  { id: "status", cell: () => <span>Madura</span>, meta: { label: "Situação", card: "badge" } },
  { id: "price", cell: () => <span>R$ 5,00</span>, meta: { label: "Preço", card: "highlight" } },
  { id: "internal", cell: () => <span>Código interno</span>, meta: { label: "Interno", card: "hidden" } },
  ...EXTRA_FIELD_LABELS.map((label) => ({ id: label, cell: () => <span>Valor de {label}</span>, meta: { label } })),
];

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

  describe("no celular", () => {
    beforeEach(() => {
      vi.stubGlobal("innerWidth", MOBILE_WIDTH);
    });

    it("mostra cada linha como card, com título, campos rotulados e ações", () => {
      render(<DataTable columns={CARD_COLUMNS} data={FRUITS} getRowId={(fruit) => fruit.id} />);

      expect(screen.queryByRole("table")).not.toBeInTheDocument();
      const cards = screen.getAllByRole("listitem");
      expect(cards).toHaveLength(FRUITS.length);
      const [banana] = cards;
      expect(within(banana).getByText("Banana")).toBeInTheDocument();
      expect(within(banana).getByRole("term")).toHaveTextContent("Cor");
      expect(within(banana).getByRole("definition")).toHaveTextContent("Amarela");
      expect(within(banana).queryByText("Nome")).not.toBeInTheDocument();
      expect(within(banana).getByRole("button", { name: "Ações de Banana" })).toBeInTheDocument();
    });

    it("seleciona um card e todos pelo checkbox acima da lista", async () => {
      const onRowSelectionChange = vi.fn();
      render(
        <DataTable
          columns={CARD_COLUMNS}
          data={FRUITS}
          getRowId={(fruit) => fruit.id}
          settings={{ id: "frutas-celular", features: {} }}
          rowSelection={{}}
          onRowSelectionChange={onRowSelectionChange}
        />,
      );

      await userEvent.click(screen.getAllByRole("checkbox", { name: "Selecionar linha" })[0]);
      expect(onRowSelectionChange).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole("checkbox", { name: "Selecionar todos" }));
      expect(onRowSelectionChange).toHaveBeenCalledTimes(2);
    });

    it("abre o detalhe dentro do card", async () => {
      render(
        <DataTable
          columns={CARD_COLUMNS}
          data={FRUITS}
          getRowId={(fruit) => fruit.id}
          settings={{ id: "frutas-detalhe", features: { expanding: true } }}
          renderDetail={(fruit) => <p>Detalhe de {fruit.name}</p>}
        />,
      );

      const [banana] = screen.getAllByRole("listitem");
      await userEvent.click(within(banana).getByRole("button", { name: "Ver detalhes" }));
      expect(within(banana).getByText("Detalhe de Banana")).toBeInTheDocument();
    });

    it("põe badge no topo, destaque em evidência e esconde a coluna oculta", () => {
      render(<DataTable columns={SLOTTED_COLUMNS} data={FRUITS} getRowId={(fruit) => fruit.id} />);

      const [banana] = screen.getAllByRole("listitem");
      expect(within(banana).getByText("Madura")).toBeInTheDocument();
      expect(within(banana).queryByText("Situação")).not.toBeInTheDocument();
      expect(within(banana).getByText("Preço")).toBeInTheDocument();
      expect(within(banana).getByText("R$ 5,00")).toBeInTheDocument();
      expect(within(banana).queryByText("Código interno")).not.toBeInTheDocument();
    });

    it("mostra os primeiros campos e revela o resto em Mais informações", async () => {
      render(<DataTable columns={SLOTTED_COLUMNS} data={FRUITS} getRowId={(fruit) => fruit.id} />);

      const [banana] = screen.getAllByRole("listitem");
      expect(within(banana).getByText("Valor de Tamanho")).toBeInTheDocument();
      expect(within(banana).queryByText("Valor de Peso")).not.toBeInTheDocument();
      await userEvent.click(within(banana).getByRole("button", { name: "Mais informações (1)" }));
      expect(within(banana).getByText("Valor de Peso")).toBeInTheDocument();
      expect(within(banana).getByRole("button", { name: "Menos informações" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("mostra o estado vazio no lugar dos cards", () => {
      render(
        <DataTable columns={CARD_COLUMNS} data={[]} getRowId={(fruit) => fruit.id} empty={<p>Nenhuma fruta</p>} />,
      );

      expect(screen.getByText("Nenhuma fruta")).toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("mostra o skeleton de cards enquanto carrega", () => {
      const { container } = render(
        <DataTable columns={CARD_COLUMNS} data={[]} getRowId={(fruit) => fruit.id} loading />,
      );

      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
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
