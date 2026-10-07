import { describe, expect, it } from "vitest";

import { DATA_TABLE_DEFAULT_COLUMN_LAYOUT } from "@/constants/Modules/Core/DesignSystem/data-table";

import { buildColumnsDraft } from "./build-columns-draft";

const COLUMNS = [
  { id: "name", label: "Produto" },
  { id: "price", label: "Preço" },
  { id: "stock", label: "Estoque" },
];

describe("buildColumnsDraft", () => {
  it("mantém a ordem declarada e tudo visível sem preferência salva", () => {
    expect(buildColumnsDraft(COLUMNS, DATA_TABLE_DEFAULT_COLUMN_LAYOUT)).toEqual([
      { id: "name", label: "Produto", visible: true },
      { id: "price", label: "Preço", visible: true },
      { id: "stock", label: "Estoque", visible: true },
    ]);
  });

  it("aplica a ordem e a visibilidade salvas", () => {
    const draft = buildColumnsDraft(COLUMNS, {
      columnOrder: ["stock", "name"],
      columnVisibility: { name: false },
    });
    expect(draft.map((item) => item.id)).toEqual(["stock", "name", "price"]);
    expect(draft.find((item) => item.id === "name")?.visible).toBe(false);
  });
});
