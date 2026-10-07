import { describe, expect, it } from "vitest";

import { restoreAt } from "./restore-at";

describe("restoreAt", () => {
  it("devolve o item na posição original", () => {
    expect(restoreAt([{ id: "a" }, { id: "c" }], { item: { id: "b" }, index: 1 })).toEqual([
      { id: "a" },
      { id: "b" },
      { id: "c" },
    ]);
  });

  it("coloca no fim quando a posição não existe mais", () => {
    expect(restoreAt([{ id: "a" }], { item: { id: "b" }, index: 5 })).toEqual([{ id: "a" }, { id: "b" }]);
  });

  it("não duplica item já presente", () => {
    const list = [{ id: "a" }];
    expect(restoreAt(list, { item: { id: "a" }, index: 0 })).toBe(list);
  });
});
