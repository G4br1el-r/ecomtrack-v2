import { describe, expect, it } from "vitest";

import { getTotalPages } from "./get-total-pages";

describe("getTotalPages", () => {
  it("arredonda para cima", () => {
    expect(getTotalPages(20, 45)).toBe(3);
  });

  it("mantém ao menos uma página quando a lista está vazia", () => {
    expect(getTotalPages(20, 0)).toBe(1);
  });
});
