import { describe, expect, it } from "vitest";

import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("deixa a primeira letra maiúscula", () => {
    expect(capitalize("setembro 2026")).toBe("Setembro 2026");
  });

  it("mantém string vazia", () => {
    expect(capitalize("")).toBe("");
  });
});
