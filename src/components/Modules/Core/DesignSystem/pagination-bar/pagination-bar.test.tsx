import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PaginationBar } from ".";

const TOTAL_ITEMS = 45;
const ITEMS_PER_PAGE = 20;
const TOTAL_PAGES = 3;
const PAGE_SIZE_OPTIONS = [20, 50, 100];

function renderBar(currentPage: number) {
  const onPageChange = vi.fn();
  render(
    <PaginationBar
      currentPage={currentPage}
      totalPages={TOTAL_PAGES}
      totalItems={TOTAL_ITEMS}
      itemsPerPage={ITEMS_PER_PAGE}
      onPageChange={onPageChange}
    />,
  );
  return onPageChange;
}

describe("PaginationBar", () => {
  beforeEach(() => {
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

  it("desabilita o botão anterior na primeira página", () => {
    renderBar(1);
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeEnabled();
  });

  it("desabilita o botão seguinte na última página", () => {
    renderBar(TOTAL_PAGES);
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
  });

  it("navega pelos botões", async () => {
    const onPageChange = renderBar(2);
    await userEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    expect(onPageChange).toHaveBeenCalledWith(TOTAL_PAGES);
  });

  it("vai para a página digitada ao pressionar Enter", async () => {
    const onPageChange = renderBar(1);
    const input = screen.getByRole("textbox", { name: "Página atual" });
    await userEvent.clear(input);
    await userEvent.type(input, "3{Enter}");
    expect(onPageChange).toHaveBeenCalledWith(TOTAL_PAGES);
  });

  it("descarta página inválida e volta ao valor atual", async () => {
    const onPageChange = renderBar(1);
    const input = screen.getByRole("textbox", { name: "Página atual" });
    await userEvent.clear(input);
    await userEvent.type(input, "9{Enter}");
    expect(onPageChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("1");
  });

  it("troca a quantidade de itens por página", async () => {
    const onItemsPerPageChange = vi.fn();
    render(
      <PaginationBar
        currentPage={1}
        totalPages={TOTAL_PAGES}
        totalItems={TOTAL_ITEMS}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={vi.fn()}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onItemsPerPageChange={onItemsPerPageChange}
      />,
    );
    await userEvent.click(screen.getByRole("combobox", { name: "Itens por página" }));
    await userEvent.click(await screen.findByRole("option", { name: "50" }));
    expect(onItemsPerPageChange).toHaveBeenCalledWith(50);
  });

  it("não mostra a quantidade por página sem opções", () => {
    renderBar(1);
    expect(screen.queryByRole("combobox", { name: "Itens por página" })).not.toBeInTheDocument();
  });
});
