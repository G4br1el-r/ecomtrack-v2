import { describe, expect, it } from "vitest";

import { moveItem } from "./move-item";

describe("moveItem", () => {
  it("move o item para a nova posição", () => {
    expect(moveItem(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
  });

  it("devolve a mesma lista quando o destino está fora dos limites", () => {
    const items = ["a", "b"];
    expect(moveItem(items, 0, -1)).toBe(items);
    expect(moveItem(items, 1, 2)).toBe(items);
  });
});
