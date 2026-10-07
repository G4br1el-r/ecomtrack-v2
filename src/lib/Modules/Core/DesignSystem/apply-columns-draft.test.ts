import { describe, expect, it } from "vitest";

import { applyColumnsDraft } from "./apply-columns-draft";

describe("applyColumnsDraft", () => {
  it("transforma o rascunho em ordem e visibilidade", () => {
    expect(
      applyColumnsDraft([
        { id: "price", label: "Preço", visible: true },
        { id: "name", label: "Produto", visible: false },
        { id: "status", label: "Status", visible: true },
      ]),
    ).toEqual({
      columnOrder: ["price", "name", "status"],
      columnVisibility: { price: true, name: false, status: true },
    });
  });
});
