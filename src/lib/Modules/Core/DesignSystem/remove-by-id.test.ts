import { describe, expect, it } from "vitest";

import { removeById } from "./remove-by-id";

const LIST = [{ id: "a" }, { id: "b" }, { id: "c" }];

describe("removeById", () => {
  it("remove o item e guarda a posição original", () => {
    expect(removeById(LIST, "b")).toEqual({
      list: [{ id: "a" }, { id: "c" }],
      removed: { item: { id: "b" }, index: 1 },
    });
  });

  it("não altera a lista quando o id não existe", () => {
    const result = removeById(LIST, "z");
    expect(result.list).toBe(LIST);
    expect(result.removed).toBeNull();
  });
});
