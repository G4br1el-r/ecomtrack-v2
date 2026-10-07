import { describe, expect, it } from "vitest";

import { formatForeignAmount } from "./format-foreign-amount";

describe("formatForeignAmount", () => {
  it("mostra a moeda do fornecedor com duas casas", () => {
    expect(formatForeignAmount(1234.5, "USD")).toBe("USD 1.234,50");
    expect(formatForeignAmount(0, "EUR")).toBe("EUR 0,00");
  });
});
