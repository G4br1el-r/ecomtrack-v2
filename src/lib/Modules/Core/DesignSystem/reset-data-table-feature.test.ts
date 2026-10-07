import { describe, expect, it, vi } from "vitest";

import { resetDataTableFeature } from "./reset-data-table-feature";

function createTable() {
  return {
    resetSorting: vi.fn(),
    resetColumnSizing: vi.fn(),
    resetExpanded: vi.fn(),
    resetRowPinning: vi.fn(),
  };
}

describe("resetDataTableFeature", () => {
  it("limpa só o estado do recurso desligado", () => {
    const table = createTable();
    resetDataTableFeature(table, "rowPinning");
    expect(table.resetRowPinning).toHaveBeenCalledWith(true);
    expect(table.resetSorting).not.toHaveBeenCalled();
  });

  it("ao desligar o redimensionamento volta as larguras originais", () => {
    const table = createTable();
    resetDataTableFeature(table, "columnResizing");
    expect(table.resetColumnSizing).toHaveBeenCalledWith(true);
  });
});
